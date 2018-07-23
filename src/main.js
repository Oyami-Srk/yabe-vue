// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import NProgress from 'muse-ui-progress';
import 'muse-ui/dist/muse-ui.css';
import Sidebar from '@/components/Sidebar';

Vue.config.productionTip = false;
// Vue.use(iView);
Vue.use(MuseUI);
Vue.use(Toast);
Vue.use(NProgress);

axios.defaults.auth = {
  username: '',
  password: ''
};

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.commit('del_token');
        router.push('/login');
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.required) {
    if (localStorage.token) {
      console.log('Local token found!');
      store.commit('set_token', localStorage.token);
      axios.defaults.auth = {
        username: store.state.token,
        password: store.state.token
      };
      NProgress.start();
      next();
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    NProgress.start();
    next();
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
