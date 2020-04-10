import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Switch,
  Button,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Row,
  Col,
  Slider,
} from 'element-ui';

import '@/assets/style/theme/index.css'
import 'video.js/dist/video-js.css'

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Slider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
