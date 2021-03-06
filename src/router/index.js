import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import CreatePost from "../views/CreatePost.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import ViewBlog from "../views/ViewBlog.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta : {
      title: "Home"
    }
  },
  {
    path: "/Blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta : {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta : {
      title: "Register"
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta : {
      title: "Forgot-password"
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta : {
      title: "CreatePost"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta : {
      title: "Profile"
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta : {
      title: "Admin"
    }
  },
  {
    path: "/view-blog",
    name: "ViewBlog",
    component: ViewBlog,
    meta : {
      title: "ViewBlog"
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _ , next)=> {
  document.title = `${to.meta.title} | Phantomblog`
  next();
})

export default router;
