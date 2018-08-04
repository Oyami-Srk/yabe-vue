<template>
  <div id="app">
    <top-bar />
  <div id="main-view">
    <transition>
      <router-view/>
    </transition>
  </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

export default {
  name: "App",
  components: {
    "top-bar": TopBar,
    "side-bar": SideBar
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  #main-view {
    padding: 0px;
  }
}
</style>
