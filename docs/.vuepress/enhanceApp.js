import VueProgressBar from 'vue-progressbar';
import routerConfig from '@/config/router';
import Home from '@theme/global-components/Home';
import archives from '@theme/global-components/archives';
import categories from '@theme/global-components/categories';

export default ({ Vue, router }) => {
    Vue.use(VueProgressBar, {
        color: 'rgb(143, 255, 199)',
        failedColor: 'red',
        thickness: '2px'
    });
    routerConfig(router, Vue);
    Vue.component('Home', Home);
    Vue.component('archives', archives);
    Vue.component('categories', categories);
};
