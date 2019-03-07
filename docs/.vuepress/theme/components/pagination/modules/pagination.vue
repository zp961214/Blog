<template>
    <ul @click="onPagerClick" class="el-pager">
        <li :class="{ active: currentPage === 1, disabled }" class="number" v-if="pageCount > 0">1</li>
        <li
            :class="[quickprevIconClass, { disabled }]"
            @mouseenter="onMouseenter('left')"
            @mouseleave="quickprevIconClass = 'el-icon-more'"
            class="el-icon more btn-quickprev"
            v-if="showPrevMore"
        ></li>
        <li :class="{ active: currentPage === pager, disabled }" :key="pager" class="number" v-for="pager in pagers">{{ pager }}</li>
        <li
            :class="[quicknextIconClass, { disabled }]"
            @mouseenter="onMouseenter('right')"
            @mouseleave="quicknextIconClass = 'el-icon-more'"
            class="el-icon more btn-quicknext"
            v-if="showNextMore"
        ></li>
        <li :class="{ active: currentPage === pageCount, disabled }" class="number" v-if="pageCount > 1">{{ pageCount }}</li>
    </ul>
</template>

<script>
export default {
    name: 'pagination',

    props: {
        currentPage: Number,

        pageCount: Number,

        pagerCount: Number,

        disabled: Boolean
    },

    watch: {
        showPrevMore(val) {
            if (!val) this.quickprevIconClass = 'el-icon-more';
        },

        showNextMore(val) {
            if (!val) this.quicknextIconClass = 'el-icon-more';
        }
    },

    methods: {
        onPagerClick(event) {
            const target = event.target;
            if (target.tagName === 'UL' || this.disabled) {
                return;
            }

            let newPage = Number(event.target.textContent);
            const pageCount = this.pageCount;
            const currentPage = this.currentPage;
            const pagerCountOffset = this.pagerCount - 2;

            if (target.className.indexOf('more') !== -1) {
                if (target.className.indexOf('quickprev') !== -1) {
                    newPage = currentPage - pagerCountOffset;
                } else if (target.className.indexOf('quicknext') !== -1) {
                    newPage = currentPage + pagerCountOffset;
                }
            }

            /* istanbul ignore if */
            if (!isNaN(newPage)) {
                if (newPage < 1) {
                    newPage = 1;
                }

                if (newPage > pageCount) {
                    newPage = pageCount;
                }
            }

            if (newPage !== currentPage) {
                this.$emit('change', newPage);
            }
        },

        onMouseenter(direction) {
            if (this.disabled) return;
            if (direction === 'left') {
                this.quickprevIconClass = 'el-icon-d-arrow-left';
            } else {
                this.quicknextIconClass = 'el-icon-d-arrow-right';
            }
        }
    },

    computed: {
        pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;

            const currentPage = Number(this.currentPage);
            const pageCount = Number(this.pageCount);

            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            const array = [];

            if (showPrevMore && !showNextMore) {
                const startPage = pageCount - (pagerCount - 2);
                for (let i = startPage; i < pageCount; i++) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            } else {
                for (let i = 2; i < pageCount; i++) {
                    array.push(i);
                }
            }
            /* eslint-disable-next-line */
            (this.showPrevMore = showPrevMore), (this.showNextMore = showNextMore);

            return array;
        }
    },

    data() {
        return {
            current: null,
            showPrevMore: false,
            showNextMore: false,
            quicknextIconClass: 'el-icon-more',
            quickprevIconClass: 'el-icon-more'
        };
    }
};
</script>
<style lang="css">
.el-pagination i {
    font-size: 12px;
}
@font-face {
    font-family: 'iconfont'; /* project id 1073387 */
    src: url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.eot');
    src: url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.woff') format('woff'), url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1073387_x6n7qqmggsk.svg#iconfont') format('svg');
}
</style>

<style>
@import './style/pagination.css';
</style>
