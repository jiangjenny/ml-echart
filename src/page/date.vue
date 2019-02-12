<template>
  <div>
    <span>{{ nowTime | formatDate }}</span>
    <span>{{ nowTime | getWeek }}</span>
    <span>{{ nowTime | formatTime }}</span>
  </div>
</template>
<script>
export default {
  data(){
    return {
      nowTime: new Date() // 当前时间
    }
  },
  mounted(){
    setInterval(()=>{
      this.nowTime = new Date();
    },1000);
  },
  filters: {
    formatDate(time) {
      return require("moment")(time).format('YYYY-MM-DD');
    },
    formatTime(time) {
      return require("moment")(time).format('HH:mm:ss');
    },
    getWeek(time){
      return "星期" + "日一二三四五六".charAt(time.getDay());
    }
  }


}
</script>
<style lang="less" scoped>
</style>
