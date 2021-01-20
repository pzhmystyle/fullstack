<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
  },
  data() {
    return {
      model:{
        icon:'',
        name:''
      },
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put(`./nest/items/${this.id}`,this.model)
      }else{
        await this.$http.post('./nest/items',this.model)
      }
      this.$router.push("/items/list")
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`./nest/items/${this.id}`)
      this.model = res.data
    },
    // async fetchParents(){
    //   const res = await this.$http.get(`./nest/items`)
    //   console.log(res)
    // },
    afterUpload(res){
      this.$set(this.model, 'icon', res.url)
      this.model.icon = res.url
    }
  },
  async created(){
    // await this.fetchParents()
    this.id && await this.fetch()
  }
}
</script>
<style scoped>

</style>