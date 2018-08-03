// import HelloWorld from '@/components/HelloWorld';
import AllPosts from '@/components/AllPosts';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Post from '@/components/Post';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        required: true
      }
    }, {
      path: '/all_posts',
      name: 'AllPosts',
      component: AllPosts,
      meta: {
        required: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/post/:id',
      name: 'post',
      component: Post,
      props: true,
      meta: {
        required: true
      }
    }
  ]
});
