export default (router, Vue) => {
    router.options.scrollBehavior = () => {
        return { x: 0, y: document.documentElement.scrollTop };
    };
    router.beforeHooks[0] = (to, from, next) => {
        Vue.prototype.$Progress.start();
        Vue.prototype.refresh = from.name === null ? true : false;
        next();
    };
    router.afterHooks[0] = () =>
        setTimeout(() => {
            Vue.prototype.$Progress.finish();
        }, 1000);
};
