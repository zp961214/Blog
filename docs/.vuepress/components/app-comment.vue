<template>
    <div class="app-comment">
        <app-container @mounted="footerHandle">
            <h2>留言板</h2>
            <p>这里就是唠嗑，咨询，感慨的地方啦，我会定期抽时间查看回复的~。</p>
            <div><img src="~@/assets/images/comment.jpg" alt="" /></div>
            <div id="disqus_thread" slot="footer"></div>
        </app-container>
    </div>
</template>

<script>
import DisqusJS from 'disqusjs';

export default {
    name: 'app-comment',
    data() {
        return {};
    },
    methods: {
        footerHandle() {
            new DisqusJS({
                shortname: 'izp-me',
                siteName: 'izp.me',
                identifier: document.location.origin + document.location.pathname + document.location.search,
                url: document.location.origin + document.location.pathname + document.location.search,
                api: 'https://disqus.skk.moe/disqus/',
                apikey: 'HplZkNQIgZwjGaxqaWErD6XyEl0hzqnV08qqfG8dhTCQRWUK6glTCw8vz12pMCM3',
                admin: 'valor_coc',
                adminLabel: ''
            });
        }
    },

    mounted() {}
};
</script>
<style lang="scss" scoped>
.app-comment {
    img {
        display: block;
        width: 250px;
        max-width: 100%;
        margin: 15px auto;
    }
    #disqus_thread {
        padding: 40px;
        box-sizing: border-box;
    }
}
</style>
