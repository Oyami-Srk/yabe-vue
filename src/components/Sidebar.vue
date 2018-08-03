<template>
  <div id="sidebar">
  <mu-drawer id= "drawer" :open.sync="open" :docked="docked" :right="position === 'right'">
    <mu-list>
      <mu-list-item button>
        <mu-list-item-title>Menu Item 1</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>Menu Item 2</mu-list-item-title>
      </mu-list-item>
      <mu-list-item  @click="open = false" button>
        <mu-list-item-title>Close</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
  </div>
</template>
<style lang="less">
#drawer {
  margin-top: 64px;
}
</style>
<script>
export default {
  name: "Sidebar",
  props: ["docked", "open"],
  data() {
    return {
      position: "left"
    };
  }
};
</script>
