<template>
  <div>
     <component :is="componentId"></component>
  </div>
</template>
<script>
import Home from './Home.vue';
export default {
  components:{Home},
  data(){
    return {
      componentId:'home'
    }
  },
  created(){
    console.log(1);
  }
}
</script>
<style lang="scss" scoped>

</style>

