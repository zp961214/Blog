import VueProgressBar from 'vuepress-progressbar';
import routerConfig from '@/config/router';

export default ({ Vue, router }) => {
    Vue.use(VueProgressBar, {
        color: 'rgb(143, 255, 199)',
        failedColor: 'red',
        thickness: '2px'
    });
    routerConfig(router, Vue);
};
