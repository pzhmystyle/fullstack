<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="margin:0 auto;display:block">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      model:{

      }
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login',this.model)
      this.$message.success(res.data.message)
      console.log(res)
      sessionStorage.setItem('token',res.data.token)
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .login-card{
    width: 25rem;
    margin: 8rem auto;
  }
</style>