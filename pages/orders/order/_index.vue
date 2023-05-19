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
                    <a-input
                      placeholder="Дата заказы"
                      v-model="order.created_at"
                      disabled
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="№ заказы">
                    <a-input placeholder="№ заказы" v-model="order.id" disabled />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Сумма">
                    <a-input-number
                      disabled
                      style="background: #f5f5f5"
                      placeholder="Сумма"
                      v-model="order.amount"
                      :formatter="
                        (value) => {
                          if (Number(value)) {
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                          } else {
                            var num = [];
                            value.split('').forEach((item) => {
                              if (Number(item) || item == 0) {
                                num.push(item);
                              }
                            });
                            return `${num.join('')}`.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ' '
                            );
                          }
                        }
                      "
                      :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3" label="Способ оплаты">
                    <a-input
                      style="text-transform: capitalize"
                      placeholder="Способ оплаты"
                      v-model="order.payment_method"
                      disabled
                    />
                  </a-form-model-item>
                </div>
              </div>

              <div class="card_block main-table px-4 mt-4 py-4" v-if="order.client">
                <FormTitle title="Клиент" />
                <div class="order-client-grid-3">
                  <a-form-model-item class="form-item mb-0" label="ID Клиент">
                    <a-input placeholder="ID" v-model="order.client.id" disabled />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Имя Клиента">
                    <a-input
                      placeholder="Имя Клиента"
                      v-model="order.client.name"
                      disabled
                    />
                  </a-form-model-item>

                  <a-form-model-item
                    class="form-item mb-0 disabled_input"
                    label="Номер клиента "
                  >
                    <the-mask
                      disabled
                      class="w-100"
                      type="text"
                      placeholder="(___) ___-____"
                      :mask="['+ (998) ## ### ## ##', '+ (998) ## ### ## ##']"
                      v-model="order.client.phone_number"
                      label-position="top"
                    />
                  </a-form-model-item>
                </div>
              </div>
              <div class="card_block main-table px-4 mt-4 py-4" v-if="order.comments">
                <FormTitle title="Описание" />
                <div class="">
                  <a-form-model-item class="form-item mb-0" >
                    <quill-editor
                      v-model="order.comments"
                      disabled
                      class="product-editor mt-1"
                      :options="editorOption"
                    />
                  </a-form-model-item>
                </div>
              </div>
              <div class="mt-5">
                <FormTitle title="Билеты" />
              </div>
              <div class="order-bilets">
                <BiletCard
                  v-for="orderIn in order.orders"
                  :key="orderIn.id"
                  :orderIn="orderIn"
                  :isPaid="order.is_paid"
                />
              </div>
            </div>
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Параметры" />

                <a-form-model-item class="form-item mb-3" label="Статус">
                  <a-select v-model="statusValue" placeholder="Tags Mode">
                    <a-select-option v-for="elem in statusData" :key="elem.value">
                      {{ elem.label }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-button
                  class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center"
                  style="height: 42px"
                  type="primary"
                  @click="onSubmit"
                  v-if="checkAccess('orders', 'put')"
                >
                  Изменить статус
                </a-button>
                <a-form-model-item class="form-item mb-3 mt-3" label="Принял оператор">
                  <a-input
                    v-model="form.telegram"
                    placeholder="Принял оператор"
                    disabled
                  />
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3" label="Дата принайте">
                  <a-input v-model="form.facebook" placeholder="Дата принайте" disabled />
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
import authAccess from "../../../mixins/authAccess";

import BiletCard from "../../../components/cards/biletCard.vue";
import moment from "moment";

export default {
  mixins: [status,authAccess],
  head: {
    title: "Новости",
  },
  data() {
    return {
      statusValue: "new",
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
      statusData: [
        {
          label: "Ожидание",
          value: "in_process",
        },
        {
          label: "Принятые",
          value: "accepted",
        },
        {
          label: "Отмененные",
          value: "canceled",
        },
      ],
      order: {
        client: {
          id: "",
          name: "",
          phone_number: "",
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
  async mounted() {
    this.__GET_ORDERS_BY_ID();
    await this.$store.dispatch("fetchOrders/editOrders", {
      id: this.$route.params.index,
      data: { status: "in_process" },
    });
    this.$store.dispatch("getOrders");
  },
  methods: {
    moment,
    onSubmit() {
      this.__EDIT_CATEGORIES({ status: this.statusValue });
    },
    async __EDIT_CATEGORIES(res) {
      try {
        await this.$store.dispatch("fetchOrders/editOrders", {
          id: this.$route.params.index,
          data: res,
        });
        this.$store.dispatch("getOrders");
        this.$router.go(-1);
        this.notification("success", "success", "Заказ успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_ORDERS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchOrders/getOrdersById",
          this.$route.params.index
        );
        this.order = data?.order;
        this.statusValue = data?.order?.status;
        this.order.created_at = moment(data?.order?.created_at).format(
          "Do MMMM. YYYY hh:mm"
        );
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __POST_POSTS(data) {
      try {
        await this.$store.dispatch("fetchPosts/postPosts", data);
        this.notification("success", "success", "Успешно добавлен");
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
