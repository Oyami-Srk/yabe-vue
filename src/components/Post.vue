<template>
  <div class="post-div">
    <mu-container fluid>
      <mu-paper :z-depth="4">
        <div class="main-post">
          <h1 class="h1-title">
            {{ post.title }}
          </h1>
          <span class="post-info first"><mu-icon class="info-icon" size="16" value="person" ></mu-icon>{{ post.author }}</span>
          <span class="post-info last"><mu-icon class="info-icon" size="16" value="date_range" ></mu-icon>{{ post_time }}</span>
          <!-- <span class="post-info last"><mu-icon class="info-icon" size="16" value="person" ></mu-icon>{{ post.author }}</span> -->
          <div class="post-content">
            <markdown-render :source="post.content" />
          </div>
        </div>
        <div class="main-comment">
          <comment v-for="comment in post.comments" :key="comment.id" :body="comment"/>
        </div>
      </mu-paper>
    </mu-container>
  </div>
</template>

<style lang="less">
.main-post {
  padding: 10px;
}

.h1-title {
  color: black;
  margin: 0px;
}

.post-info {
  color: grey;
  margin: 0px;
  font-size: 14px;
  border-right: 1px solid grey;
  padding-right: 1em;
  padding-left: 1em;
}
.post-info.first {
  padding-left: 0em;
}
.post-info.last {
  padding-right: 0em;
  border-right: none;
}
.post-info > .info-icon {
  vertical-align: middle;
  color: darkslategray;
}
.post-content {
  margin-top: 2em;
  text-align: left;
  padding-right: 10em;
  padding-left: 10em;
  @media screen and (max-width: 990px) {
    padding-right: 1em;
    padding-left: 1em;
  }
}

.post-div {
  text-align: center;
}

.main-comment {
  margin-top: 3em;
  margin-bottom: 2em;
  padding-right: 10em;
  padding-left: 10em;
  @media screen and (max-width: 990px) {
    padding-right: 1em;
    padding-left: 1em;
  }
  padding-bottom: 2em;
}
</style>

<script>
import VueMarkdown from "vue-markdown";
import MarkdownRender from "@/components/Markdown";
import Comment from "@/components/Comment";
import moment from "moment";

export default {
  props: ["id"],
  data() {
    return {
      post: {}
    };
  },
  components: {
    "vue-markdown": VueMarkdown,
    "markdown-render": MarkdownRender,
    comment: Comment
  },
  method: {},
  computed: {
    post_time() {
      return moment(this.post.post_time).format("YY-MM-DD");
    }
  },
  created() {
    this.$axios
      .get("/api/get_post", {
        params: {
          post_id: this.id
        }
      })
      .then(response => {
        this.post = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$Message.error(error);
      });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.$axios
      .get("/api/get_post", {
        params: {
          post_id: this.id
        }
      })
      .then(response => {
        this.post = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$Message.error(error);
      });
  }
};
</script>
