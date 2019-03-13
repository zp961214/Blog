export default (router, Vue) => {
    router.options.scrollBehavior = () => {
        return { x: 0, y: document.documentElement.scrollTop };
    };
    router.beforeHooks[0] = (to, from, next) => {
        Vue.prototype.$Progress.start();
        const to_detaipage = new RegExp(`^/post/(.*)/.*`);
        Vue.prototype.refresh_scroll = from.name === null && to_detaipage.test(to.path) ? true : false;
        next();
    };
    router.afterHooks[0] = () =>
        setTimeout(() => {
            Vue.prototype.$Progress.finish();
        }, 1000);
};
