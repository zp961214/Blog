import decodeUriComponent from 'decode-uri-component';

export default {
    computed: {
        items() {
            const is_post = new RegExp(`^/post/(.*)/.*`);
            const post = this.$site.pages.filter(v => is_post.test(v.path)).sort((a, b) => b.lastUpdated - a.lastUpdated);
            return post.map(v => ((v.classify = decodeUriComponent(v.path.replace(is_post, '$1'))), v));
        },

        classifyObj() {
            return this.items.reduce((prev, current) => {
                const { classify } = current;
                if (!prev[classify]) prev[classify] = 1;
                else prev[classify] += 1;
                return prev;
            }, {});
        },

        classifyCount() {
            return Object.keys(this.classifyObj).length;
        },

        logCount() {
            return this.items.length || 0;
        }
    }
};
