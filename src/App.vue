<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {  
    if(document.getElementById('Loading') != null){
      document.body.removeChild(document.getElementById('Loading')) 
    }  
  }
};
</script>

<style lang="less" scoped>
  #app{
    height: 100%
  }

</style>

