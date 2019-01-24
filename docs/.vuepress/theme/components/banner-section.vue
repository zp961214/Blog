<template>
    <div class="banner-section">
        <div class="site-banner-author">
            <img alt="avatar" class="avatar tada" src="../images/headpic.png" />
            <div class="site-banner-desc">
                <span>想要我写的代码，</span>
                <span>对世界有一点改变。</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'banner-section',
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
@keyframes tada {
    0% {
        -webkit-transform: scale(1);
    }

    10%,
    20% {
        -webkit-transform: scale(0.9) rotate(-3deg);
    }

    30%,
    50%,
    70%,
    90% {
        -webkit-transform: scale(1.1) rotate(3deg);
    }

    40%,
    60%,
    80% {
        -webkit-transform: scale(1.1) rotate(-3deg);
    }

    100% {
        -webkit-transform: scale(1) rotate(0);
    }
}
.banner-section {
    position: relative;
    height: 600px;
    background: url('../images/bg.jpg') center center no-repeat;
    background-size: cover;
    .site-banner-author {
        width: 750px;
        height: 240px;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        left: 50%;
        bottom: 50px;
        background: rgba(230, 244, 249, 0.8);
        margin-left: -375px;
        box-sizing: border-box;
        padding: 10px 20px;
        .avatar {
            display: block;
            width: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
            &:hover {
                animation: tada 1s ease 0.1s 1;
            }
        }
        .site-banner-desc {
            span {
                font-size: 16px;
                font-weight: 700;
                &:first-child {
                    color: #00a7e0;
                }
                &:last-child {
                    color: #ff3f1a;
                }
            }
        }
    }
}
</style>
