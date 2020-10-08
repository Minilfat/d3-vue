<template>
  <div class="w-100">
    <div class="d-flex justify-content-center align-items-center carousel-wrapper">
      <div class="carousel-controls left"></div>
      <div class="carousel-content">
        <div class="background-image">
          <img :src="imageUrl" alt="img" />
        </div>
        <div class="info">
          <div class="wrapper d-flex flex-column justify-content-between align-items-center">
            <div><img src="/img/open-doors.svg" alt="" /></div>
            <div class="text">
              Ассоциация проводит ежегодную международную олимпиаду в рамках проекта Open doors для того чтобы тут
              накопирайтили корректный текст под контент баннера. Можно писать достаточно объёмные описания для тех
              проектов, которым недостаточно одного абзаца!
            </div>
            <div>
              <b-button variant="primary">УЗНАТЬ БОЛЬШЕ!</b-button>
            </div>
          </div>
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
// @import "~bootstrap/scss/variables";

.carousel {
  &-wrapper {
    margin: 20px auto;
  }

  &-controls {
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
    background-color: var(--brand);
    -webkit-clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);
    clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);

    .background-image {
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

    .info {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 35%;
      height: calc(100% - 8px);
      -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%);
      background: linear-gradient(0.25turn, transparent, 20%, rgba(0, 0, 0, 0.5));

      .wrapper {
        height: 100%;
        padding: 30px 40px 60px;

        .text {
          font: 14px/16px OfficinaSansMediumC;
          color: var(--white);
        }

        button {
          font: 16px/24px OfficinaSansBoldC;
          color: var(--white);
        }
      }
    }
  }
}
</style>
