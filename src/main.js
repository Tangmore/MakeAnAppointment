// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 
import 'lib-flexible/flexible'
import './assets/font/iconfont.css' 
  
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import { Toast, Popup, Picker, Checklist, IndexList, IndexSection, 
  Navbar, TabItem, Range ,Switch ,Button ,Header, Field } from "mint-ui"; 
Vue.component(Header.name, Header);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Picker.name, Picker);
Vue.component(Checklist.name, Checklist);
Vue.component(Popup.name, Popup);
Vue.component(Navbar.name, Navbar); 
Vue.component(TabItem.name, TabItem);
Vue.component(Range .name, Range );
Vue.component(Switch .name, Switch );
Vue.component(Button .name, Button );
Vue.component(Field.name, Field);  
Vue.prototype.$toast = Toast;
Vue.use(Mint);  

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

axios.defaults.withCredentials=true;

Vue.prototype.$axios = axios;

let instance = axios.create({
  baseURL: global.baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});
Vue.prototype.instance = instance;

import QS from 'qs'
Vue.prototype.qs = QS;

import VueTouch from"vue-touch";
Vue.use(VueTouch, {name:'v-touch'})

Vue.config.productionTip = false;
 
import globalVariable from './global_variable'
Vue.prototype.global=globalVariable;
  
// import vConsole from 'vconsole'
// Vue.prototype.vConsole= new vConsole();
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // mounted(){
  //   let par='http://'+window.location.host+'/clouds';
  //   sessionStorage.setItem('localUrl',par);
  // }
});
