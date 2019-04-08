<script>
import axios from 'axios';

export default {
    name: 'utils-obcount',
    computed: {},
    methods: {
        async fetchCount() {
            axios.post(`http://izp.me/blog/observer`);
        }
    },
    async mounted() {
        this.fetchCount();
    },
    render() {
        return '';
    }
};
</script>
