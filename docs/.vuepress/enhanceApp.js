import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/mouseClick';
import axios from 'axios';
axios.defaults.baseURL =
    process.env.NODE_ENV === 'production' ? (location.protocol === 'http:' ? 'http://www.norchant.com/' : 'https://www.norchant.com/') : 'http://127.0.0.1:7001/';
export default ({ Vue }) => Vue.use(Element);
