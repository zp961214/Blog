import VueProgressBar from 'vue-progressbar';
import routerConfig from '@/config/router';

export default ({ Vue, router }) => {
    Vue.use(VueProgressBar, {
        color: 'rgb(143, 255, 199)',
        failedColor: 'red',
        height: '2px'
    });
    routerConfig(router, Vue);
};
