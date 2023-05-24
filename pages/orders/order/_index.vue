<template lang="html">
  <div class="posts">
    <TitleBlock
      :title="`Заказ №${this.$route.params.index}`"
      :breadbrumb="['Заказы']"
      :lastLink="`Заказ №${this.$route.params.index}`"
    >
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
                  <a-form-model-item class="form-item mb-0" label="Дата заказа">
                    <a-input
                      placeholder="Дата заказа"
                      v-model="order.created_at"
                      disabled
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="№ заказa">
                    <a-input placeholder="№ заказa" v-model="order.id" disabled />
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
                      placeholder="Наличные\Безналичные"
                      v-model="order.payment_method"
                      disabled
                    />
                  </a-form-model-item>
                </div>
              </div>

              <div class="card_block main-table px-4 mt-4 py-4" v-if="order.client">
                <FormTitle title="Клиент" />
                <div class="order-client-grid-3">
                  <a-form-model-item class="form-item mb-0" label="ID клиента">
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
                  <a-form-model-item class="form-item mb-0">
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
              <div class="order-bilets" v-for="orderIn in order.orders" :key="orderIn.id">
                <div class="bilet-card">
                  <div class="bilet-card-header">
                    <h5>{{ orderIn?.service?.name?.ru }}</h5>
                    <div class="d-flex">
                      <span class="bilet-card-header-text"
                        >Номер билета:
                        <p>{{ orderIn.id }}</p></span
                      >
                      <div class="column-btns">
                        <span>
                          <a
                            :href="`https://api.safarpark.uz/api/orders/${orderIn.id}/get_ticket`"
                            class="action-btn"
                            download
                            v-if="order.is_paid"
                            @click.prevent="
                              downloadItem(
                                `https://api.safarpark.uz/api/orders/${orderIn.id}/get_ticket`
                              )
                            "
                            v-html="ticketIcon"
                          >
                          </a>
                          <span
                            class="action-btn"
                            @click="visible = true"
                            v-html="editIcon"
                          >
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="bilet-card-body flex-column">
                    <div
                      class="d-flex"
                      v-for="(dataIn, index) in orderIn.data"
                      :key="index"
                    >
                      <div class="bilet-card-services">
                        <span>{{ dataIn?.name }}</span>
                      </div>
                      <p>
                        <span>{{ dataIn.count }} x </span>
                        {{ dataIn.price }} сум
                      </p>
                    </div>
                  </div>
                  <div class="bilet-card-footer">
                    <div class="d-flex align-items-center">
                      <span>Заказ на:</span>
                      <div>
                        {{ moment(orderIn.created_at).format("DD.MM.YYYY") }}
                        <span v-if="orderIn.session">{{ orderIn.session }}</span>
                      </div>
                    </div>
                    <h6>{{ orderIn.amount }} сум</h6>
                  </div>
                </div>
                <!-- <BiletCard
                  v-for="orderIn in order.orders"
                  :key="orderIn.id"
                  :orderIn="orderIn"
                  :isPaid="order.is_paid"
                /> -->
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
                    v-model="order.user.name"
                    placeholder="Принял оператор"
                    disabled
                  />
                </a-form-model-item>
                <a-form-model-item class="form-item mb-3" label="Дата принятия">
                  <a-input
                    v-model="order.user.created_at"
                    placeholder="Дата принятия"
                    disabled
                  />
                </a-form-model-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
    <a-modal
      v-model="visible"
      centered
      title="Изменить заказ"
      :closable="false"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          <a-form-model
            :model="formModal"
            ref="ruleFormFaq"
            :rules="rulesModal"
            layout="vertical"
          >
            <a-form-model-item class="form-item mb-3" label="Дата">
              <a-input type="date" v-model="formModal.name" />
            </a-form-model-item>
            <a-form-model-item
              class="d-flex justify-content-start flex-column mb-3"
              label="Сессия"
            >
              <span class="d-flex justify-content-start"
                ><span class="time_picker position-relative" style="margin-right: 16px">
                  <input
                    v-model="formModal.name"
                    type="time"
                    id="time-input"
                    name="time"
                    min="00:00"
                    max="23:59"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                  />
                  <span
                    class="d-flex align-items-center"
                    style="margin-left: 3px; margin-right: 3px"
                    >-</span
                  >
                  <input
                    v-model="formModal.name"
                    type="time"
                    id="time-input"
                    name="time"
                    min="00:00"
                    max="23:59"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                  /> </span
              ></span>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOk"
          >
            Отмена
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            type="primary"
            @click="saveData"
          >
            Сохранять
          </a-button>
        </div>
      </template>
    </a-modal>
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
  mixins: [status, authAccess],
  head: {
    title: "Новости",
  },
  data() {
    return {
      visible: false,
      ticketIcon: require("../../../assets/svg/ticket.svg?raw"),
      editIcon: require("../../../assets/svg/edit.svg?raw"),
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
        user: {
          name: "",
          created_at: "",
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
      rulesModal: {
        name: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      formModal: {
        name: "",
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
        user: {
          name: "",
        },
        poster: "",
        instagram: "",
        telegram: "",
        facebook: "",
        visible: false,
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
    downloadItem(url) {
      this.$axios
        .$get(url, { responseType: "blob" })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "Safar park ticket";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((err) => {
          this.statusFunc(err);
        });
    },
    onSubmit() {
      this.__EDIT_CATEGORIES({ status: this.statusValue });
    },
    handleOk() {
      this.visible = false;
    },
    saveData() {},
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
        this.order.user.created_at = moment(data?.order?.user?.created_at).format(
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
