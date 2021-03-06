import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth"

import db from "../firebase/firebaseInit"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2021",
      },
    ],
    blogPosts:[],
    postLoaded:null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileUserName: null,
    profileInitials:null
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      console.log(payload)
      state.blogPhotoName = payload
    },
    createFileURL(state, payload){
      state.blogPhotoFileURL = payload
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview;
    }
    ,
    updateUser(state, payload){
      state.user = payload
    }
    ,
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state,doc){
  
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    },
    setProfileInitials(state){
   
      state.profileInitials = state.profileFirstName.match(/(\b\s)?/g).join("") + state.profileLastName.match(/(\b\s)?/g).join("")
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUserName = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials")
   
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
    async getPost({state}){
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc)=> {
        if(!state.blogPosts.some((post)=> post.blogId === doc.id)){
          const data = {
            blogId : doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date
          }
          state.blogPosts.push(data)
        }
      });
      state.postLoaded = true;
      console.log(state.blogPosts)
    }
  },
  modules: {},
});
