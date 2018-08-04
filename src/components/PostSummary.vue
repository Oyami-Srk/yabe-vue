<template>
  <div id="post-summary">
    <mu-paper class="paper" :z-depth="4">
      <div class="header">
        <router-link :to="{name: 'post', params: {id: post.id}}">
          <span class="title">{{ post.title }}</span>
        </router-link>
        <span class="post-time">
          <mu-icon class="info-icon" size="16" value="person" />{{ post_time }}
          <br/>
          <mu-icon class="info-icon" size="16" value="date_range" />{{post.author}}
        </span>
      </div>
      <hr />
      <p>{{ post.summary || "No summary provided" }}</p>
      <div v-if="post.category[0] || post.tags.length > 0" class="cy-tag">
        <span class="category" v-if="post.category[0]">
          <router-link :to="{name: 'category', params: {id: post.category[0]}}">
            {{ post.category[1] }}
          </router-link>
        </span>
        <div class="tags">
          <mu-chip v-if="!isMobile" class="chip desktop" v-for="tag in post.tags" :key="tag[0]" @mouseover="onHoverTag(tag)" @click="onClickTag(tag)">{{tag[1]}}</mu-chip>
          <span v-if="isMobile" class="chip mobile" v-for="tag in post.tags" :key="tag[0]" @click="onClickTag(tag)" @mouseover="onHoverTag(tag)">
            #{{ tag[1] }}
          </span>
        </div>
      </div>
    </mu-paper>
  </div>
</template>

<style lang="less">
#post-summary {
  .paper {
    padding: 1em;
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center; // background: red;
    .title {
      color: black;
      font-weight: bold;
      font-size: 24px;
    }
    .post-time {
      color: darkgray;
      font-weight: lighter;
      padding: 0px;
      margin: 0px;
    }
  }
  .cy-tag {
    display: flex;
    justify-content: start;
    align-items: center;
    .category {
      color: darkgray;
      font-weight: normal;
      border-right: 1px solid;
      padding-right: 1em;
    }
    .tags {
      text-align: center;
      .chip {
        margin-left: 1em;
      }
      .chip.desktop {
        margin-bottom: 0.5em;
      }
      .chip.mobile {
        color: darkgray;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import moment from "moment";

export default {
  data() {
    return {
      post: this.source,
      screenWidth: document.body.clientWidth
    };
  },
  props: {
    source: {
      type: Object
    }
  },
  computed: {
    post_time() {
      var momentTime = moment(this.post.post_time);
      return momentTime.isAfter(moment().subtract(1, "days"))
        ? momentTime.fromNow()
        : momentTime.calender(null, {
            sameElse: momentTime.isAfter(moment().subtract(1, "years"))
              ? "MM/DD hh:mm"
              : "YY/MM/DD hh:mm"
          });
    },
    isMobile() {
      return this.screenWidth > 480 ? false : true;
    }
  },
  methods: {
    titleClick() {
      console.log("12");
    },
    onClickTag(tag) {
      this.$router.push("/post/2");
    },
    onHoverTag(tag) {}
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>
