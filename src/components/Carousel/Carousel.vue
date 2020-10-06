<template>
  <div class="w-100">
    <div class="d-flex justify-content-center align-items-center carousel-wrapper">
      <div class="carousel-controls left"></div>
      <div class="carousel-content">
        <div class="inner">
          <img :src="imageUrl" alt="img" />
        </div>
      </div>
      <div class="carousel-controls right"></div>
    </div>
  </div>
</template>

<script>
// TODO: do not mock data, add slider

export default {
  name: "Carousel",
  data() {
    return {
      imageUrl: "/img/slider-min.jpeg",
    };
  },
};
</script>

<style scoped lang="scss">
.carousel {
  &-wrapper {
    margin: 20px auto;
  }

  &-controls {
    // margin: 20px 10px 10px 10px;
    width: 48px;
    min-width: 48px;
    height: 36px;
    cursor: pointer;

    &.left {
      margin-right: 20px;
      background-image: url("/img/slider-left-control.svg");
    }

    &.right {
      margin-left: 20px;
      background-image: url("/img/slider-right-control.svg");
    }
  }

  &-content {
    width: 900px;
    height: 450px;
    position: relative;
    background-color: #f12578;
    -webkit-clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);
    clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);

    .inner {
      width: calc(100% - 8px);
      height: 442px;

      -webkit-clip-path: polygon(38px 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%, 0 38px);
      clip-path: polygon(38px 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%, 0 38px);

      display: block;
      position: absolute;
      top: 4px;
      left: 4px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// .header-menu-item {
//   position: relative;
//   cursor: pointer;

//   width: 200px;
//   height: 50px;
//   background-color: #f12578;

//   -webkit-clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
//   clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);

//   &-inner {
//     width: calc(100% - 4px);
//     height: 46px;

//     -webkit-clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
//     clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);

//     background-color: #f6f8fb;
//     display: block;
//     position: absolute;
//     top: 2px;
//     left: 2px;
//   }
// }
</style>
