<template>
  <div id="login">
    <mu-container fluid>
      <mu-flex class="flex-wrapper" justify-content="center" align-items="center">
    <mu-flex class="flex-demo" justify-content="center" >
      <mu-paper class="login-paper" :z-depth="5">
        <mu-form ref="form" :model="validateForm" class="login-form">
          <mu-form-item icon="account_circle" label="用户名" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username" @keyup.native.enter="submit"></mu-text-field>
          </mu-form-item>
          <mu-form-item icon="locked" label="密码" prop="password" :rules="passwordRules">
            <mu-text-field :action-icon="visibility ? 'visibility_off' : 'visibility'" @keyup.native.enter="submit" :action-click="() => (visibility = !visibility)"
              :type="visibility ? 'text' : 'password'" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-flex justify-content="center" align-items="center">
            <mu-form-item>
              <mu-button color="primary" @click="submit" ripple>提交</mu-button>
              <mu-button @click="clear" ripple>重置</mu-button>
            </mu-form-item>
          </mu-flex>
        </mu-form>
      </mu-paper>
      </mu-flex>
        </mu-flex>
    </mu-container>
  </div>
</template>
<style lang="less">
#login {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 600px) {
    left: 0%;
    transform: translate(0%, -50%);
    width: 100%;
  }
  .login-paper {
    padding: 10vh;
    padding-top: 3vh;
    padding-bottom: 0vh;
    @media screen and (max-width: 400px) {
      padding: 3vh;
      padding-bottom: 0vh;
    }
    @media screen and (max-width: 280px) {
      padding: 0vh;
      padding-top: 3vh;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      usernameRules: [
        {
          validate: val => !!val,
          message: "用户名是一定要填写的哟!"
        },
        {
          validate: val => val.length >= 3,
          message: "用户名不要太短哦, 至少要三个字符的说!"
        }
      ],
      passwordRules: [
        {
          validate: val => !!val,
          message: "可不要忘记填写密码呢=w="
        },
        {
          validate: val => val.length >= 6,
          message: "密码太短啦! 起码要六位呀~"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      },
      visibility: false
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.$axios.defaults.auth = {
            username: this.validateForm.username,
            password: this.validateForm.password
          };
          this.$axios
            .get("/api/login")
            .then(response => {
              this.$toast.success("登录成功喵 >w<");
              let data = response.data;
              this.$store.commit("set_token", data);
              console.log("Login successed! token is " + localStorage.token);
              this.$router.go(-1);
            })
            .catch(error => {
              this.$toast.error("登录失败了...");
              console.log(error);
            });
        } else {
          this.$toast.error("表单认证不通过!");
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: ""
      };
    }
  }
};
</script>
