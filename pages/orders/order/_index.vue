<template lang="html">
  <div class="posts">
    <TitleBlock title="Заказ №565" :breadbrumb="['Заказы']" lastLink="Заказ №565">
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.go(-1)"
        >
          Отмена
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
        >
          <span class="svg-icon"> </span>
          Добавить
        </a-button>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="order-grid">
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Данные заказа" />
                <div class="order-grid-2">
                  <a-form-model-item class="form-item mb-0" label="Дата заказы">
                    <a-input placeholder="Дата заказы" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="№ заказы">
                    <a-input placeholder="№ заказы" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Сумма">
                    <a-input placeholder="Сумма" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3" label="Способ оплаты">
                    <a-input placeholder="Способ оплаты" />
                  </a-form-model-item>
                </div>
              </div>
              <div class="card_block main-table px-4 mt-4 py-4">
                <FormTitle title="Клиент" />
                <div class="order-client-grid-3">
                  <a-form-model-item class="form-item mb-0" label="ID Клиент">
                    <a-input placeholder="ID" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Номер клиента">
                    <a-input placeholder="Номер клиента" />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Имя Клиента">
                    <a-input placeholder="Имя Клиента" />
                  </a-form-model-item>
                </div>
              </div>
              <div class="mt-5">
                <FormTitle title="Билеты" />
              </div>
              <div class="order-bilets">
                <BiletCard />
                <BiletCard />
                <BiletCard />
                <BiletCard />
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
                <a-form-model-item class="form-item mb-3 mt-3" label="Принял оператор">
                  <a-input v-model="form.telegram" placeholder="Принял оператор" />
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3" label="Дата принайте">
                  <a-input v-model="form.facebook" placeholder="Дата принайте" />
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
import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import status from "../../../mixins/status";
import BiletCard from "../../../components/cards/biletCard.vue";
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
@import "../../../assets/css/pages/order.css";
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
