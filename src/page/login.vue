<template>
  <div class="ml_container" >
    <transition name="form-fade" mode="in-out">
      <div class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p class="manage">管理平台</p>
          <span class="line"></span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input type="username" v-model="loginForm.username" placeholder="请输入用户名" >
              <br>
            </el-input>
						<font-awesome-icon class="icon" icon="user" fixed-width />
          </el-form-item>
          <el-form-item prop="password" class="psw">
            <el-input :type="pwdType" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native = "submitForm('loginForm')"></el-input>
            <font-awesome-icon class="icon" icon="lock" fixed-width />
            <font-awesome-icon class="eye_icon" :icon="showIcon?'eye':'eye-slash'" fixed-width @click='toggle()' />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')" >登&nbsp;录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  		},
      showLogin: false,
      showIcon: true,
      pwdType: 'password',
    };
  },
  beforeCreate() {
    // 设置背景图片
    document.querySelector("body").setAttribute("style", "overflow:hidden;");
    document.getElementsByTagName("body")[0].className = "ml_container";
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    // 切换图标
    toggle() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.showIcon=!this.showIcon;
    },
    // 验证表单
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          let ws = "ws://weixin.meloon.cn/wb/websocket/";
          ws +=this.loginForm.username + '/' + this.$md5(this.loginForm.password);
          this.$store.dispatch('setws',ws);
          this.$router.push('trade')
        }else{
          this.$message({
              message: '用户名或者密码错误，请重新输入',
              type: 'error',
              showClose: true,
              duration: 2000
          }) 
          this.loginForm.username = '';
          this.loginForm.password = '';
        };
      })
    }
  }
};
</script>

<style lang="less" scoped >
.ml_container {
  width: 19.2rem;
  height: 100%;
  background: url("../../static/img/login.jpg") no-repeat center bottom;
  background-size: cover;
  display: block;
  position: relative;
  top: 0;
  left: 0;
}
.form_contianer {
  width: 24%;
  height: 46%;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  top: 15%;
  left: 55%;
  padding: 15px 25px;
  border-radius: 5px;
  text-align: center;
  .manage_tip {
    position: absolute;
    width: 100%;
    padding-top: 35px;
    text-align: center;
    top: 0;
    left: 0;
    .manage {
      font-size: 18px;
      color: #20a7fa;
      padding: 0 0 5px 0;
      letter-spacing: 0.08rem;
    }
    .line {
      width: 150px;
      height: 2px;
      display: block;
      margin: 0 auto;
      background-image: linear-gradient(
        to right,
        rgba(32, 167, 250, 0.2),
        rgba(32, 167, 250, 0.7),
        #20a7fa,
        rgba(32, 167, 250, 1),
        rgba(32, 167, 250, 0.7),
        rgba(32, 167, 250, 0.2)
      )
    }
  }
  .el-form {
    margin-top: 75px;
    position: relative;
    top: 0;
    left: 0;
    .icon{
      position: absolute;
      left: 13px;
      top: 13px;
      color: #20a7fa;
    }
    .eye_icon{
      position: absolute;
      right: 13px;
      top: 15px;
      color: #c3c3c3;
    }
  }
  .psw {
    margin-bottom: 32px;
  }
  .el-button{
    width: 100%;
  }
   
}

</style>
