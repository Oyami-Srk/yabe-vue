<template>
  <div id="app">
    <sidebar :open.sync="open" :docked="docked" :home="home"></sidebar>
    <div class="app-content" :class="{'is-open': (!home && open && docked)}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "App",
  data() {
    return {
      docked: isDesktop(),
      open: false,
      isMobile: isMobile()
    };
  },
  mounted() {
    this.changeNav();
    this.handleResize = () => {
      this.changeNav();
      this.isMobile = isMobile();
    };
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    home() {
      return (
        this.$route && this.$route.meta && this.$route.meta.name === "home"
      );
    }
  },
  methods: {
    changeNav() {
      const desktop = isDesktop();
      this.docked = this.home ? false : desktop;
      if (desktop === this.desktop) return;
      if (!desktop && this.desktop && this.open) {
        this.open = false;
      }
      if (desktop && !this.desktop && !this.open && !this.home) {
        this.open = true;
      }
      this.desktop = desktop;
    },
    toggleMenu() {
      this.open = !this.open;
    }
  },
  components: {
    sidebar: Sidebar
  }
};

function isDesktop() {
  return window.innerWidth > 993;
}

function isMobile() {
  return window.innerWidth < 660;
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-content {
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}
.app-content.is-open {
  padding-left: 256px;
}
</style>
