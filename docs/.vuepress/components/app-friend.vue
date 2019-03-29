<template>
    <div class="app-friend">
        <app-container>
            <h2>友链</h2>
            <slot />
            <div id="disqus_thread" slot="footer"></div>
        </app-container>
    </div>
</template>

<script>
import DisqusJS from 'disqusjs';
// import appContainer from '@theme/components/app-container';
export default {
    name: 'app-friend',
    // components: { appContainer },
    data() {
        return {};
    },
    methods: {},
    mounted() {
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
};
</script>
<style lang="scss" scoped>
.app-friend {
    h2 {
        text-align: center;
    }
    #disqus_thread {
        padding: 40px;
        box-sizing: border-box;
    }
}
</style>
