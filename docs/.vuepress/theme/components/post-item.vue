<template>
    <div class="post-item">
        <div class="post-date">
            <p class="month">{{ date | format('MM') }}月</p>
            <p class="day">{{ date | format('DD') }}</p>
        </div>
        <div class="post-badge">{{ content.classify | initialUpperCase }}</div>
        <div class="post-content">
            <div class="title" @click="handlerClick(content.path)">
                <span>{{ content.title }}</span>
            </div>
            <div class="post-meta">
                <span class="date">
                    <span>发表于{{ date | format('YYYY-MM-DD') }}</span>
                    <i class="el-icon-date"></i>
                </span>
                <span class="words-count">
                    <span class="dot">•</span>
                    <span class="label-desc">字数统计 {{ content.frontmatter['word-count'] }}</span>
                </span>
                <span class="read-times">
                    <span class="dot">•</span>
                    <span class="label-desc">阅读次数</span>
                </span>
            </div>
            <div class="post-content">
                <div class="description" v-html="content.excerpt"></div>
                <img :src="content.img" class="image" v-if="content.img" />
            </div>
            <div class="post-button">
                <a @click="handlerClick(content.path)" class="btn" rel="contents">阅读全文 »</a>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
export default {
    name: 'post-item',
    props: {
        content: {
            type: Object
        }
    },

    computed: {
        date() {
            return this.content.frontmatter.date || this.content.lastUpdated;
        }
    },

    filters: {
        format(value, type) {
            return format(value, type);
        },

        initialUpperCase(value) {
            return value.slice(0, 1).toLocaleUpperCase() + value.slice(1);
        }
    },
    data() {
        return {};
    },
    methods: {
        handlerClick(link) {
            this.$router.push(link);
        }
    }
};
</script>
<style lang="scss" scoped>
.post-item {
    background: #fff;
    position: relative;
    margin-bottom: 40px;
    padding: 40px;
    box-sizing: border-box;
    .post-date {
        background-color: #97dffd;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        position: absolute;
        top: -20px;
        left: -30px;
        display: flex;
        flex-direction: column;
        height: 70px;
        width: 70px;
        padding-top: 10px;
        box-sizing: border-box;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        .month {
            margin-top: 0;
            line-height: 16px;
        }
        .day {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 3px;
            font-size: 30px;
            font-weight: 700;
            line-height: 30px;
        }
    }
    .post-badge {
        position: absolute;
        left: -16px;
        top: 105px;
        border-color: #47456d;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        background-color: #97dffd;
        margin: 5px 0 15px 2px;
        font-size: 14px;
        letter-spacing: 1px;
        color: #fff;
        border-radius: 0 4px 4px 0;
        display: inline-block;
        padding: 7px 11px 7px 32px;
        line-height: 1;
        font-weight: 600;
    }
    .post-content {
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            padding-bottom: 8px;
            span {
                position: relative;
                color: #555;
                font-weight: 700;
                font-size: 24px;
                text-align: center;
                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: -5px;
                    left: 0;
                    background-color: #222;
                    visibility: hidden;
                    transform: scaleX(0);
                    transition: all 0.2s ease-in-out 0s;
                }
                &:hover {
                    &::before {
                        visibility: visible;
                        transform: scaleX(1);
                    }
                }
            }
        }
        .post-meta {
            margin: 5px 0 60px 0;
            font-size: 12px;
            text-align: center;
            .date {
                color: #00a7e0;
            }
            .words-count {
                color: #000;
            }
            .read-times {
                color: #ff3f1a;
            }
            .dot {
                margin: 0px 0.5em;
            }
            .label-desc {
                margin: 0 3px;
            }
        }
        .post-content {
            overflow: hidden;
            .description {
                margin-bottom: 10px;
                p {
                    margin-bottom: 10px;
                }
            }
            .image {
                display: block;
                max-width: 100%;
                border-radius: 6px;
                margin: 10px auto 0px;
                box-sizing: border-box;
            }
        }
        .post-button {
            margin-top: 40px;
            text-align: center;
            .btn {
                cursor: pointer;
                display: inline-block;
                background: #97dffd;
                color: #fff;
                font-size: 13px;
                padding: 6px 15px;
                box-sizing: border-box;
                border-radius: 5px;
                border: none;
                transition: background-color 0.2s ease-in-out;
                &:hover {
                    background: #47456d;
                }
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .post-item {
        .post-date {
            display: none;
        }

        .post-badge {
            display: none;
        }
    }
}
</style>
<style lang="scss">
.post-item {
    h1 {
        margin: 0 0 10px;
        font-size: 20px;
    }
    h2 {
        margin: 0 0 10px;
        font-size: 16px;
    }
    .description {
        p {
            &:first-child {
                margin-top: 0;
            }
            img {
                display: block;
                max-width: 100%;
            }
        }
    }
}
</style>
