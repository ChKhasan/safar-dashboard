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
        <a-spin :spinning="spinning" :delay="delayTime">
          <div class="container_xl app-container d-flex flex-column spin-content">
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
                <div class="order-bilets">
                  <div
                    class="bilet-card"
                    v-for="orderIn in order.orders"
                    :key="orderIn.id"
                  >
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
                              @click="editTicket(orderIn)"
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
                          <span>{{ dataIn?.name?.ru }}</span>
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
                          {{ moment(orderIn.date).format("DD.MM.YYYY") }}
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

                  <a-form-model-item
                    class="form-item mb-3 status-style"
                    :class="classObject"
                    label="Статус"
                  >
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
                      v-if="order.user?.name"
                      v-model="order.user.name"
                      placeholder="Принял оператор"
                      disabled
                    />
                    <a-input v-else placeholder="Принял оператор" disabled />
                  </a-form-model-item>
                  <a-form-model-item
                    v-if="order.date_of_adoption"
                    class="form-item mb-3"
                    label="Дата принятия"
                  >
                    <a-input
                      v-model="order.date_of_adoption"
                      placeholder="Дата принятия"
                      disabled
                    />
                  </a-form-model-item>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
      </div>
    </a-form-model>
    <a-modal
      v-model="visible"
      centered
      title="Изменить заказa"
      :closable="false"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <a-calendar
          v-model="targetTicket.date"
          mode="month"
          :disabled-date="disabledDate"
          @change="changeCalendar"
          @panelChange="panelChange"
        >
          <ul slot="dateCellRender" slot-scope="value" class="events">
            <li v-for="item in getListData(value)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </ul>
          <template slot="monthCellRender" slot-scope="value">
            <div v-if="getMonthData(value)" class="notes-month">
              <section>{{ getMonthData(value) }}</section>
              <span>Backlog number</span>
            </div>
          </template>
        </a-calendar>
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
            :disabled="disabledBtn"
            @click="saveCalendar"
          >
            Сохранять
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      v-model="visibleSessions"
      centered
      :title="targetTicket?.tariff?.name?.ru"
      :closable="false"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <a-form-model
          :model="formModal"
          ref="ruleFormSession"
          :rules="rulesModal"
          layout="vertical"
        >
          <a-form-model-item
            class="form-item mb-3"
            :class="{ 'select-placeholder': formModal.session == null }"
            label="Сессия"
            prop="session"
          >
            <a-select v-model="formModal.session" placeholder="Сессия">
              <a-select-option v-for="(session, index) in sessions" :key="session">
                {{ session }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="(visible = true), (visibleSessions = false)"
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
  head() {
    return {
      title: `Заказ №${this.order?.id}`,
    };
  },
  data() {
    return {
      visible: false,
      visibleSessions: false,
      spinning: true,
      delayTime: 0,
      emptyDate: [],
      currentDay: new Date(),
      disabledBtn: true,
      targetTicket: {},
      disabledDates: [],
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
        session: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      formModal: {
        name: "",
        order_id: null,
        session: null,
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
      sessions: {},
    };
  },
  computed: {
    classObject: function () {
      return {
        "status-process": this.statusValue == "in_process",
        "status-inactive": this.statusValue == "canceled",
        "status-accepted": this.statusValue == "accepted",
      };
    },
  },
  async mounted() {
    this.spinning = await true;
    console.log(this.spinning);
    this.__GET_ORDERS_BY_ID();
    // this.__GET_EMPTY_DATE();
    // await this.$store.dispatch("fetchOrders/editOrders", {
    //   id: this.$route.params.index,
    //   data: { status: "in_process" },
    // });
    this.$store.dispatch("getOrders");
  },
  methods: {
    disabledDate(current) {
      return (
        (current && current.valueOf() < Date.now()) ||
        this.disabledDates.find((date) => date === moment(current).format("YYYY-MM-DD"))
      );
    },
    async changeCalendar(e) {
      console.log(this.order);
      this.currentDay = e;
      this.disabledDays();
      this.__GET_TARIFF_SESSIONS({
        tariff_id: this.targetTicket.tariff.id,
        date: moment(this.currentDay).format("YYYY-MM-DD"),
        guests_count: this.countSumm(),
      });
    },
    countSumm() {
      let summ = 0;
      this.targetTicket.data.forEach((elem) => {
        summ += elem.count;
      });
      return summ;
    },
    async panelChange(e) {
      this.currentDay = await e;
      await this.__GET_EMPTY_DATE();
      await this.disabledDays();
    },
    async editTicket(data) {
      console.log(data);
      this.targetTicket = await {...data};
      await this.__GET_EMPTY_DATE();
      await this.disabledDays();
      this.visible = true;
    },
    disabledDays() {
      const dates = this.emptyDate.filter((item) => item.available < this.countSumm());
      if (dates.length > 0) {
        this.disabledDates = dates.map((elem) => {
          return `${moment(this.currentDay).format("YYYY")}-${moment(
            this.currentDay
          ).format("MM")}-${
            JSON.stringify(elem.day)?.length == 1 ? `0${elem.day}` : elem.day
          }`;
        });
      } else {
        this.disabledDates = dates;
      }
    },
    getListData(value) {
      let listData;

      this.emptyDate.forEach((item) => {
        if (value.date() == item.day) {
          if (Number(item.available) >= Number(this.countSumm())) {
            listData = [
              {
                type: "success",
                content: `${item.available}`,
              },
            ];
          } else {
            listData = [
              {
                type: "error",
                content: `${item.available}`,
              },
            ];
          }
        }
      });

      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
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
    saveCalendar() {
      this.__EDIT_ORDER();
    },
    saveData() {
      this.$refs["ruleFormSession"].validate((valid) => {
        if (valid) {
          this.__EDIT_ORDER();
        } else {
          return false;
        }
      });
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
    async __EDIT_ORDER(res) {
      try {
        await this.$store.dispatch("fetchTariff/editTicket", {
          order_id: this.targetTicket.id,
          date: moment(this.currentDay).format("YYYY-MM-DD"),
          session: this.formModal.session,
        });
        this.__GET_ORDERS_BY_ID();
        this.visibleSessions = false;
        this.visible = false;
        this.$store.dispatch("getOrders");
        this.notification("success", "success", "Успешно изменена");
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
        this.order = {...data?.order};
        this.statusValue = data?.order?.status;
        this.order.created_at = moment(data?.order?.created_at).format(
          "Do MMMM. YYYY hh:mm"
        );
        if (this.order.user)
          this.order.user.created_at = moment(data?.order?.user?.created_at).format(
            "Do MMMM. YYYY hh:mm"
          );
      } catch (e) {
        this.statusFunc(e);
      } finally {
        this.spinning = false;
      }
    },
    async __GET_EMPTY_DATE(data) {
      try {
        const data = await this.$store.dispatch("fetchTariff/getEmptyDate", {
          month: moment(this.currentDay).format("MM"),
          year: moment(this.currentDay).format("YYYY"),
          tariff_id: this.targetTicket?.tariff?.id,
        });
        this.emptyDate = data?.days;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_TARIFF_SESSIONS(data1) {
      try {
        const data = await this.$store.dispatch("fetchTariff/getTariffSessions", data1);
        this.sessions = data.sessions;
        this.formModal.session = null;
        if (this.sessions == null) {
          this.disabledBtn = false;
        } else if (this.sessions.length > 0) {
          this.disabledBtn = true;
          this.visibleSessions = true;
          this.visible = false;
        }
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
.order-bilets {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ant-fullcalendar-fullscreen .ant-fullcalendar-month,
.ant-fullcalendar-fullscreen .ant-fullcalendar-date {
  height: 70px !important;
}

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

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}

.ant-fullcalendar-last-month-cell {
  pointer-events: none !important;
  opacity: 0;

  background-color: rgba(0, 0, 0, 0.06) !important;
}

.ant-fullcalendar-next-month-btn-day,
.ant-fullcalendar-last-month-btn-day {
  pointer-events: none !important;
  opacity: 0;
}

.ant-fullcalendar td {
  overflow: hidden;
}

.ant-fullcalendar-disabled-cell {
  background-color: rgba(0, 0, 0, 0.06) !important;
}

.ant-fullcalendar-fullscreen .ant-fullcalendar-header .ant-radio-group {
  display: none !important;
}
</style>
