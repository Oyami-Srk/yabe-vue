<template>
  <div id="allposts">
    <p>Hello world</p>
    {{ msg }}
    <Button @click="logout">注销</Button>
  </div>
</template>
<script>
export default {
  name: "AllPosts",
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    logout() {
      this.$store.commit("del_token");
      this.$router.push("/login");
    }
  },
  created() {
    this.$axios
      .get("/api/get_all_posts")
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$Message.error(error);
      });
  }
};
</script>
