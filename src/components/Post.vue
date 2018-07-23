<template>
  <div id="post" :style="style">
    <mu-container>
      <mu-paper class="post-paper" :z-depth="4">
        <mu-container class="post-container">
          <mu-row class="level1">
            <mu-col span="12">
              <div class="grid-cell main-frame">
                <mu-row class="title-row">
                  <mu-col span="12">
                    <div class="title-frame">
                      <div style="background-color: red; position:absolute; height:40%; width:100%; bottom:20px;">
                        <mu-flex class="flex-wrapper" justify-content="start">
                          <mu-flex class="flex-demo" justify-content="center">left</mu-flex>
                        </mu-flex>
                        <mu-flex class="flex-wrapper" justify-content="center">
                          <mu-flex class="flex-demo" justify-content="center">center</mu-flex>
                        </mu-flex>
                        <mu-flex class="flex-wrapper" justify-content="end">
                          <mu-flex class="flex-demo" justify-content="end">right</mu-flex>
                        </mu-flex>
                        <mu-flex class="flex-wrapper" justify-content="end">
                          <mu-flex class="flex-demo" justify-content="end">right</mu-flex>
                        </mu-flex>
                      </div>
                    </div>
                  </mu-col>
                </mu-row>
                <mu-row class="content-row">
                </mu-row>
              </div>
            </mu-col>
          </mu-row>
          <mu-row class="level1">
            <mu-col span="12">
              <div class="grid-cell"></div>
            </mu-col>
          </mu-row>
        </mu-container>
      </mu-paper>
    </mu-container>
  </div>
</template>
<style lang="less">
.post-paper {
  border-style: none;
  margin: 0px;
  border-radius: 10px;
  border-width: 0px;
}

.post-container {
  padding: 0px;
  .level1 {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .grid-cell {
    height: 600px;
    background: rgba(0, 255, 255, 0.8);

    border-radius: 10px;
  }
  .main-frame {
  }
  .title-frame {
    width: 100%;
    background: red;
    height: 250px;
    background-image: url("/static/testheader.png");
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 10px 10px;
  }
}
</style>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "post",
  props: ["id"],
  data() {
    return {
      post: {},
      style: {
        background: "#eee",
        padding: "20px",
        textAlign: "left"
      }
    };
  },
  components: {
    VueMarkdown
  },
  methods: {
    back_to_home() {
      this.$router.push("/");
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
