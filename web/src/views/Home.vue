<template>
  <div class="mySwiper">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide >
        <img class="w-100" src="../assets/images/28f7b76cbb6458ed5e84fbd70d0a1e95.jpeg" alt="">
      </swiper-slide>
      <swiper-slide >
        <img class="w-100" src="../assets/images/0cfcfac2d60121aa7c23b8c54b87f5c0.jpeg" alt="">
      </swiper-slide>
      <swiper-slide >
        <img class="w-100" src="../assets/images/8c11dd16889233c2eaa8941025c25212.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination" style="text-align: right" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  data(){
    return {
      swiperOption: {
        // autoplay: true,
        delay:3000,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
          bulletClass : 'my-bullet',//需设置.my-bullet样式
          bulletActiveClass : 'my-bullet-active',//需设置.my-bullet样式
        },
      }
    }
  },
}
</script>
<style lang="scss">
@import '../assets/scss/variables';
.mySwiper{
  .my-bullet{
    width: 0.6154rem;
    height: 0.6154rem;
    display: inline-block;
    border-radius: 0.1538rem;
    background-color:map-get($colors,'white' );
    margin-right: 0.7692rem;
    // opacity: .2;
  }
  .my-bullet-active{
    background: map-get($colors,'info' );
  }
}
</style>