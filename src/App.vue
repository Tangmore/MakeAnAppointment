<template>
  <div id="app"> 
    <!--页面返回不刷新-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
  
<script>
export default {
  name: "App",
  mounted() { 
  }
};
</script>

<style>
html {
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  /* background: url("assets/img/bgi.png") no-repeat fixed; */
  background: url("assets/img/bgi2.png") no-repeat fixed;
  background-size: cover;
  padding: 0;
  max-width: 750px;
  margin: 0 auto;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
  overflow: hidden;
}
ul,
li {
  padding: 0;
  margin: 0;
}

  .picker {
    width: 100%;
    height: 100%;
  }

  .mint-popup {
    width: 100%; 
  }
  .mint-popup-bottom{
     border-radius: 12px 12px 0 0;
  }

  .picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    font-size: 16px; 
    background: linear-gradient(to right, #474750, #29535a);
    color: #fff;
    border-radius: 12px 12px 0 0;
  }

  .usi-btn-cancel,
  .usi-btn-sure {
    color: #fff;
  }

</style>
