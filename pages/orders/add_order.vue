<template lang="html">
  <div class="posts">
    <TitleBlock title="Добавить заказ" :breadbrumb="['Заказы']" lastLink="Добавить заказ">
      <div class="d-flex"></div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="order-grid">
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Данные заказа" />
                <div class="order-grid-2 mb-4">
                  <a-form-model-item class="form-item mb-0" label="Дата заказы">
                    <a-input placeholder="Дата заказы" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="№ заказы">
                    <a-input placeholder="№ заказы" />
                  </a-form-model-item>
                </div>
                <div>
                  <a-form-model-item
                    class="form-item mb-3"
                    label="Дополнительная информация"
                  >
                    <quill-editor class="product-editor mt-1" :options="editorOption" />
                  </a-form-model-item>
                </div>
              </div>
              <div class="order-bilets">
                <div class="card_block main-table mt-4 py-4">
                  <div class="px-4"><FormTitle title="Ручное бронирование" /></div>
                  <div class="order-grid-3 px-4">
                    <a-form-model-item class="form-item mb-0" label="Остаток">
                      <a-input placeholder="Остаток" />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Минимальный клиент">
                      <a-input placeholder="Минимальный клиент" />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Максимальный клиент">
                      <a-input placeholder="Максимальный клиент" />
                    </a-form-model-item>
                  </div>
                  <div class="order-client-tariffs px-4 pt-4 mt-4">
                    <div class="order-client-card">
                      <div class="order-client-card-tariffs">
                        <span> Юный Стрелок </span>
                        <span> Юный Стрелок </span>
                      </div>
                      <div class="order-client-card-count">
                        <div class="order-client-card-btn">-</div>
                        <span class="mx-3"> 4</span>
                        <div class="order-client-card-btn">+</div>
                      </div>
                    </div>
                    <div class="order-client-card">
                      <div class="order-client-card-tariffs">
                        <span> Юный Стрелок </span>
                        <span> Юный Стрелок </span>
                      </div>
                      <div class="order-client-card-count">
                        <div class="order-client-card-btn">-</div>
                        <span class="mx-3"> 4</span>
                        <div class="order-client-card-btn">+</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card_block main-table mt-4 py-4">
                  <div class="px-4"><FormTitle title="Ручное бронирование" /></div>
                  <div class="order-grid-3 px-4">
                    <a-form-model-item class="form-item mb-0" label="Остаток">
                      <a-input placeholder="Остаток" />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Минимальный клиент">
                      <a-input placeholder="Минимальный клиент" />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Максимальный клиент">
                      <a-input placeholder="Максимальный клиент" />
                    </a-form-model-item>
                  </div>
                  <div class="order-client-tariffs px-4 pt-4 mt-4">
                    <div class="order-client-card">
                      <div class="order-client-card-tariffs">
                        <span> Юный Стрелок </span>
                        <span> Юный Стрелок </span>
                      </div>
                      <div class="order-client-card-count">
                        <div class="order-client-card-btn">-</div>
                        <span class="mx-3"> 4</span>
                        <div class="order-client-card-btn">+</div>
                      </div>
                    </div>
                    <div class="order-client-card">
                      <div class="order-client-card-tariffs">
                        <span> Юный Стрелок </span>
                        <span> Юный Стрелок </span>
                      </div>
                      <div class="order-client-card-count">
                        <div class="order-client-card-btn">-</div>
                        <span class="mx-3"> 4</span>
                        <div class="order-client-card-btn">+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Параметры" />

                <a-form-model-item class="form-item mb-3" label="№ заказы">
                  <a-select v-model="secondCity">
                    <a-select-option v-for="city in cities" :key="city">
                      {{ city }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-button
                  class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center"
                  style="height: 42px"
                  type="primary"
                >
                  Изменить статус
                </a-button>
                <a-form-model-item class="form-item mb-3 mt-3" label="Добавил операторр">
                  <a-input v-model="form.telegram" placeholder="Добавил операторр" />
                </a-form-model-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
  </div>
</template>
<script>
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../mixins/status";
import BiletCard from "../../components/cards/biletCard.vue";
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};
export default {
  mixins: [status],
  head: {
    title: "Новости",
  },
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                font: [],
              },
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],
            [
              {
                color: [],
              },
              {
                background: [],
              },
            ],
            [
              {
                script: "super",
              },
              {
                script: "sub",
              },
            ],
            [
              {
                header: [false, 1, 2, 3, 4, 5, 6],
              },
              "blockquote",
              "code-block",
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [
              "direction",
              {
                align: [],
              },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      },
      rules: {
        title: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
      },
      form: {
        title: {
          ru: "",
          uz: "",
        },
        subtitle: {
          ru: "",
          uz: "",
        },
        desc: {
          ru: "",
          uz: "",
        },
        poster: "",
        instagram: "",
        telegram: "",
        facebook: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.__POST_POSTS(this.form);
        } else {
          return false;
        }
      });
    },
    async __POST_POSTS(data) {
      try {
        await this.$store.dispatch("fetchPosts/postPosts", data);
        this.notification("success", "success", "Пост успешно добавлен");
        this.$router.push("/news");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  components: { TitleBlock, FormTitle, BiletCard },
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
.posts-grid {
  display: grid;
  grid-gap: 13px;
  grid-template-columns: 5fr 2fr;
}
.posts .ant-upload.ant-upload-select-picture-card,
.posts .ant-upload-list-picture-card .ant-upload-list-item,
.posts .ant-upload-list-picture-card-container {
  width: 100% !important;
  height: 150px !important;
}
</style>
