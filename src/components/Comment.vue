<template>
  <div id="comment">
    <mu-container fluid>
      <mu-paper :z-depth="5" id="mu-paper">
        <div class="body">
          <div class="avatar">
            <img class="avatar-img" :src="avatar_link" />
          </div>
          <div class="content">
            <div class="info">
              <span id="username">{{ comment.username }} </span>
              <span style="color: grey"> said it on </span>
              <span id="post-time">{{ post_time }}</span>
            </div>
            <hr/>
            <span id="comment-body">{{ comment.content }}</span>
          </div>
        </div>
      </mu-paper>
    </mu-container>
  </div>
</template>
<style lang="less">
#comment {
  margin: 1em;
  margin-bottom: 2em;
  text-align: left;
  #mu-paper {
    border-radius: 20px;
    background-color: whitesmoke;
  }
  .body {
    display: flex;
    .avatar {
      display: flex !important;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .avatar-img {
        height: 64px;
        margin-left: 1em;
        border-radius: 50%;
        @media screen and (max-width: 468px) {
          display: none;
        }
      }
    }
    .content {
      display: block;
      height: auto;
      width: 100%;
      margin: 1em;
      hr {
        color: grey;
      }
      #username {
        font-weight: bold;
      }
      #post-time {
        font-weight: bold;
      }
    }
  }
}
</style>
<script>
import md5 from "js-md5";
import moment from "moment";

export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comment: this.body
    };
  },
  computed: {
    avatar_link() {
      return `https://www.gravatar.com/avatar/${md5(
        this.comment.email.toLowerCase()
      )}?d=identicon&s=64`;
    },
    post_time() {
      return moment(this.comment.post_time).format("YY-MM-DD");
    }
  }
};
</script>
