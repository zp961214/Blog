import Pager from './pagination.vue';

export default {
    name: 'ElPagination',

    props: {
        pageSize: {
            type: Number,
            default: 10
        },

        small: Boolean,

        total: Number,

        pageCount: Number,

        pagerCount: {
            type: Number,
            validator(value) {
                return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
            },
            default: 7
        },

        currentPage: {
            type: Number,
            default: 1
        },

        layout: {
            default: 'prev, pager, next, jumper, ->, total'
        },

        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 40, 50, 100];
            }
        },

        popperClass: String,

        prevText: String,

        nextText: String,

        background: Boolean,

        disabled: Boolean
    },

    data() {
        return {
            internalCurrentPage: 1,
            internalPageSize: 0,
            lastEmittedPage: -1,
            userChangePageSize: false
        };
    },

    render() {
        let template = (
            <div
                class={[
                    'el-pagination',
                    {
                        'is-background': this.background,
                        'el-pagination--small': this.small
                    }
                ]}
            />
        );
        const layout = this.layout || '';
        if (!layout) return;
        const TEMPLATE_MAP = {
            prev: <prev />,
            jumper: <jumper />,
            pager: (
                <pager
                    currentPage={this.internalCurrentPage}
                    pageCount={this.internalPageCount}
                    pagerCount={this.pagerCount}
                    on-change={this.handleCurrentChange}
                    disabled={this.disabled}
                />
            ),
            next: <next />,
            sizes: <sizes pageSizes={this.pageSizes} />,
            slot: <my-slot />,
            total: <total />
        };
        const components = layout.split(',').map(item => item.trim());
        const rightWrapper = <div class="el-pagination__rightwrapper" />;
        let haveRightWrapper = false;

        template.children = template.children || [];
        rightWrapper.children = rightWrapper.children || [];
        components.forEach(compo => {
            if (compo === '->') {
                haveRightWrapper = true;
                return;
            }

            if (!haveRightWrapper) {
                template.children.push(TEMPLATE_MAP[compo]);
            } else {
                rightWrapper.children.push(TEMPLATE_MAP[compo]);
            }
        });

        if (haveRightWrapper) {
            template.children.unshift(rightWrapper);
        }

        return template;
    },

    components: {
        MySlot: {
            render() {
                return this.$parent.$slots.default ? this.$parent.$slots.default[0] : '';
            }
        },
        Prev: {
            render() {
                return (
                    <button type="button" class="btn-prev" disabled={this.$parent.disabled || this.$parent.internalCurrentPage <= 1} on-click={this.$parent.prev}>
                        {this.$parent.prevText ? <span>{this.$parent.prevText}</span> : <i class="iconfont icon-shangyiye">&#xe674;</i>}
                    </button>
                );
            }
        },

        Next: {
            render() {
                return (
                    <button
                        type="button"
                        class="btn-next"
                        disabled={this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0}
                        on-click={this.$parent.next}
                    >
                        {this.$parent.nextText ? <span>{this.$parent.nextText}</span> : <i class="iconfont">&#xe673;</i>}
                    </button>
                );
            }
        },

        Sizes: {
            props: {
                pageSizes: Array
            },

            watch: {
                pageSizes: {
                    immediate: true,
                    handler(newVal, oldVal) {
                        if (valueEquals(newVal, oldVal)) return;
                        if (Array.isArray(newVal)) {
                            this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1 ? this.$parent.pageSize : this.pageSizes[0];
                        }
                    }
                }
            },

            render() {
                return (
                    <span class="el-pagination__sizes">
                        <el-select
                            value={this.$parent.internalPageSize}
                            popperClass={this.$parent.popperClass || ''}
                            size="mini"
                            on-input={this.handleChange}
                            disabled={this.$parent.disabled}
                        >
                            {this.pageSizes.map(item => (
                                <el-option value={item} label={item + this.t('el.pagination.pagesize')} />
                            ))}
                        </el-select>
                    </span>
                );
            },

            // components: {
            //     ElSelect,
            //     ElOption
            // },

            methods: {
                handleChange(val) {
                    if (val !== this.$parent.internalPageSize) {
                        this.$parent.internalPageSize = val = parseInt(val, 10);
                        this.$parent.userChangePageSize = true;
                        this.$parent.$emit('update:pageSize', val);
                        this.$parent.$emit('size-change', val);
                    }
                }
            }
        },

        Total: {
            render() {
                return typeof this.$parent.total === 'number' ? <span class="el-pagination__total">{this.t('el.pagination.total', { total: this.$parent.total })}</span> : '';
            }
        },

        Pager
    },

    methods: {
        handleCurrentChange(val) {
            this.internalCurrentPage = this.getValidCurrentPage(val);
            this.userChangePageSize = true;
            this.emitChange();
        },

        prev() {
            if (this.disabled) return;
            const newVal = this.internalCurrentPage - 1;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
            this.$emit('prev-click', this.internalCurrentPage);
            this.emitChange();
        },

        next() {
            if (this.disabled) return;
            const newVal = this.internalCurrentPage + 1;
            this.internalCurrentPage = this.getValidCurrentPage(newVal);
            this.$emit('next-click', this.internalCurrentPage);
            this.emitChange();
        },

        getValidCurrentPage(value) {
            value = parseInt(value, 10);

            const havePageCount = typeof this.internalPageCount === 'number';

            let resetValue;
            if (!havePageCount) {
                if (isNaN(value) || value < 1) resetValue = 1;
            } else {
                if (value < 1) {
                    resetValue = 1;
                } else if (value > this.internalPageCount) {
                    resetValue = this.internalPageCount;
                }
            }

            if (resetValue === undefined && isNaN(value)) {
                resetValue = 1;
            } else if (resetValue === 0) {
                resetValue = 1;
            }

            return resetValue === undefined ? value : resetValue;
        },

        emitChange() {
            this.$nextTick(() => {
                if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
                    this.$emit('current-change', this.internalCurrentPage);
                    this.lastEmittedPage = this.internalCurrentPage;
                    this.userChangePageSize = false;
                }
            });
        }
    },

    computed: {
        internalPageCount() {
            if (typeof this.total === 'number') {
                return Math.max(1, Math.ceil(this.total / this.internalPageSize));
            } else if (typeof this.pageCount === 'number') {
                return Math.max(1, this.pageCount);
            }
            return null;
        }
    },

    watch: {
        currentPage: {
            immediate: true,
            handler(val) {
                this.internalCurrentPage = this.getValidCurrentPage(val);
            }
        },

        pageSize: {
            immediate: true,
            handler(val) {
                this.internalPageSize = isNaN(val) ? 10 : val;
            }
        },

        internalCurrentPage: {
            immediate: true,
            handler(newVal) {
                this.$emit('update:currentPage', newVal);
                this.lastEmittedPage = -1;
            }
        },

        internalPageCount(newVal) {
            /* istanbul ignore if */
            const oldPage = this.internalCurrentPage;
            if (newVal > 0 && oldPage === 0) {
                this.internalCurrentPage = 1;
            } else if (oldPage > newVal) {
                this.internalCurrentPage = newVal === 0 ? 1 : newVal;
                this.userChangePageSize && this.emitChange();
            }
            this.userChangePageSize = false;
        }
    }
};
function valueEquals(a, b) {
    // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i !== a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
