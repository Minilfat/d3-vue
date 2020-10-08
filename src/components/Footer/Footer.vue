<template>
  <div class="footer-wrapper">
    <div class="image"></div>
    <div class="info d-flex flex-column align-items-center">
      <div class="links">
        <div class="d-flex justify-content-around">
          <div>
            <div class="label">
              {{ $t("footer_contacts") }}
            </div>
            <div class="d-flex flex-column texts">
              <span>{{ $t("footer_address") }}</span>
              <span>
                <a href="tel:+74956233783"> +7 (495) 623 3783 </a>
              </span>
              <span>
                <a class="brand" href="mailto:globaluni@hse.ru"> globaluni@hse.ru </a>
              </span>
            </div>
          </div>
          <div class="mx-3">
            <div class="label">
              {{ $t("footer_useful-links") }}
            </div>
            <div class="d-flex flex-column texts">
              <span>
                <a href="http://xn--80abucjiibhv9a.xn--p1ai/" target="_blank">
                  {{ $t("useful-links.ministry") }}
                </a>
              </span>
              <span>
                <a href="http://www.edu.ru/" target="_blank">
                  {{ $t("useful-links.education") }}
                </a>
              </span>
              <span>
                <a href="https://5top100.ru/council/" target="_blank">
                  {{ $t("useful-links.council") }}
                </a>
              </span>
              <span>
                <a class="brand" href="http://keep-learning.globaluni.ru/" target="_blank">
                  {{ $t("useful-links.help") }}
                </a>
              </span>
            </div>
          </div>
          <div>
            <div class="label">
              {{ $t("footer_subscribe") }}
            </div>
            <div class="updates">
              <b-form-input type="email" :placeholder="$t('subscription_mail.placeholder')"></b-form-input>
              <b-button variant="brand" class="w-100 mt-1">{{ $t("subscription_mail.send") }} </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        <span>
          {{ $t("copyright") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
.footer-wrapper {
  margin-top: 120px;

  .image {
    background-image: url("/img/universities-footer.png");
    height: 150px;
  }

  .info {
    width: 100%;
    background-color: #02274c;

    .links {
      width: 100%;
      margin: 30px 0;

      .label {
        text-transform: uppercase;
        font: 18px/24px OfficinaSansMediumC;
        color: #7993a6;
      }

      .texts {
        margin: 15px 0 0 10px;

        .brand {
          color: var(--brand);
        }

        a,
        span {
          font: 18px/24px OfficinaSansMediumC;
          letter-spacing: -0.45px;
          color: #e3e3e3;
          margin: 0;
        }
      }

      .updates {
        margin-top: 15px;
      }
    }

    .copyright {
      margin-bottom: 10px;
      span {
        font: 14px/24px OfficinaSansMediumC;
        letter-spacing: -0.35px;
        color: #7993a6;
      }
    }
  }
}
</style>
