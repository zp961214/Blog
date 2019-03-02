import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default ({ Vue, router }) => {
    router.options.scrollBehavior = () => {
        return { x: 0, y: document.documentElement.scrollTop };
    };
    Vue.use(Element);
};
