<template>
  <div id="allposts">
    <post-summary v-for="post in posts" :key="post.id" :source="post" style="margin: 2em;"/>
  </div>
</template>
<script>
import PostSummary from "@/components/PostSummary";

export default {
  name: "AllPosts",
  data() {
    return {
      posts: {},
      count: 0,
      next: "",
      prev: ""
    };
  },
  methods: {
    logout() {
      this.$store.commit("del_token");
      this.$router.push("/login");
    }
  },
  components: {
    "post-summary": PostSummary
  },
  created() {
    this.$axios
      .get("/api/get_all_posts", {
        params: {
          summary: true
        }
      })
      .then(response => {
        console.log(response);
        this.posts = response.data.posts;
        this.count = response.data.count;
        this.next = response.data.next;
        this.prev = response.data.prev;
      })
      .catch(error => {
        console.log(error);
        this.$Message.error(error);
      });
  }
};
</script>
