<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img class="logo" src="../assets/images/logo.png" alt="">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    
    <div class="bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around pb-1">
        <div class="nav-item active">
          <router-link to="home" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="home" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="home" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.logo{
  width: 2.3077rem;
  height: 2.3077rem;
}
</style>