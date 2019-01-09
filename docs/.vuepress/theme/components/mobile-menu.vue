<template>
  <div class="mobile-menu">
    <a class="menu-button"></a>
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  }  
}
</script>
<style lang="scss" scoped>
.mobile-menu{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 40px;
  z-index: 6;
    display: none;
    .menu-button{
      width: 24px;
      height: 24px;
      position: absolute;
      top:0;
      left:10px;
      background: url('../../assets/img/menu.png') center center no-repeat;
      background-size:24px; 
    }
  }
</style>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .mobile-menu{
    display: block;
  }
}
</style>
