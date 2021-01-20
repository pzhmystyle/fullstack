<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
        @click="model.items.push({})"
        class="el-icon-plus"
        size="small"
        type="primary"
        >添加广告位</el-button
      >
      <el-row>
        <el-col :span="24" v-for="(item, i) in model.items" :key="i">
          <el-form-item label="跳转链接（URL）">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="
                (res) => {
                  $set(item, 'image', res.url);
                }
              "
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="model.items.splice(i, 1)"
              >删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-top: 1em" native-type="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        items:[]
      },
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`./nest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("./nest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`./nest/ads/${this.id}`);
      this.model = Object.assign({},this.model,res.data)
    },
  },
  async created() {
    this.id && (await this.fetch());
  },
};
</script>
<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 10rem;
  height: 10rem;
  line-height: 10rem;
  text-align: center;
}
.avatar {
  min-width: 10rem;
  height: 10rem;
  display: block;
}
</style>