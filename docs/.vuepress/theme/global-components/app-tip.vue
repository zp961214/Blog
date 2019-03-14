<template>
    <div class="app-tip">
        <app-container>
            <h2>赞赏</h2>
            <p>我是valor，你也可以叫我“斯蒂芬张”，平时喜欢在业余时间折腾点东西，前端萌新一枚，请多指教~</p>
            <p>如果你感觉我的博客写的不错，或者对你有帮助。</p>
            <p>或者觉得这个前端萌新很有趣，或者土豪任性。愿意打赏支持的话。我这里先谢过啦~</p>
            <h3>赞赏方式</h3>
            <ul>
                <li><span @click="showAlipay = !showAlipay"> 支付宝扫一扫</span><img :style="AlipayStyle" src="~@theme/images/alipay_tip.png" alt="" /></li>
                <li><span @click="showWepay = !showWepay">微信扫一扫</span><img :style="wepayStyle" src="~@theme/images/wepay_tip.png" alt="" /></li>
            </ul>
            <div id="disqus_thread" slot="footer"></div>
        </app-container>
    </div>
</template>

<script>
import DisqusJS from 'disqusjs';
import appContainer from '@theme/components/app-container';
export default {
    name: 'app-tip',
    components: { appContainer },
    data() {
        return {
            showAlipay: false,
            showWepay: false
        };
    },
    computed: {
        AlipayStyle() {
            return { width: this.showAlipay ? '150px' : 0 };
        },
        wepayStyle() {
            return { width: this.showWepay ? '150px' : 0 };
        }
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
    },
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
.app-tip {
    h2 {
        text-align: center;
    }
    h3 {
        margin: 30px 0;
    }
    ul {
        padding-left: 2rem;
        box-sizing: border-box;

        li {
            span {
                cursor: pointer;
                color: #ab3300;
            }
            img {
                display: block;
                width: 0px;
                transition: all 0.2s;
                margin: 0 auto;
            }
            list-style: circle;
            margin: 10px 0;
        }
    }
    #disqus_thread {
        padding: 40px;
        box-sizing: border-box;
    }
}
</style>
