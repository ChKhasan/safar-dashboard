<template lang="html">
  <div class="posts">
    <TitleBlock title="Добавить заказ" :breadbrumb="['Заказы']" lastLink="Добавить заказ">
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.go('-1')"
        >
          Отмена
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="onSubmit"
        >
          <span class="svg-icon"> </span>
          Сохранять
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
                <div class="order-grid-1 mb-4">
                  <a-form-model-item class="form-item mb-0" label="Дата заказа">
                    <a-input placeholder="Дата заказа" disabled v-model="form.date" />
                  </a-form-model-item>
                </div>
                <div>
                  <a-form-model-item
                    class="form-item mb-3"
                    label="Дополнительная информация"
                  >
                    <quill-editor
                      class="product-editor mt-1"
                      :options="editorOption"
                      v-model="form.comments"
                    />
                  </a-form-model-item>
                </div>
              </div>
              <div class="order-bilets">
                <div class="card_block main-table mt-4 py-4">
                  <div class="px-4 d-flex justify-content-between">
                    <FormTitle title="Ручное бронирование" />
                  </div>
                  <div class="order-grid-3 px-4" v-if="tariff.type == 'by_count'">
                    <a-form-model-item class="form-item mb-0" label="Остаток">
                      <a-input placeholder="Остаток" disabled v-model="booked" />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Минимальный клиент">
                      <a-input
                        placeholder="Минимальный клиент"
                        disabled
                        v-model="tariff.min_clients"
                      />
                    </a-form-model-item>
                    <a-form-model-item class="form-item mb-0" label="Максимальный клиент">
                      <a-input
                        placeholder="Максимальный клиент"
                        disabled
                        v-model="tariff.max_clients"
                      />
                    </a-form-model-item>
                  </div>
                  <div
                    class="order-client-tariffs px-4 pt-4"
                    :class="{ 'mt-4': tariff.type == 'by_count' }"
                  >
                    <div class="tariff_info d-flex">
                      <h4>{{ tariff.name?.ru }}</h4>
                      <span>{{ tariff?.subtitle?.ru }}</span>
                    </div>
                    <div class="order-client-card-tariff" v-if="tariff.type == 'tariff'">
                      <span>{{ tariff.tab_start_text?.ru }}</span>
                      <p
                        v-for="(elem, index) in form?.data"
                        :key="index"
                        @click="chooseActive(elem.indexId)"
                        :class="{ 'active_tab-tariff': elem.active }"
                      >
                        {{ elem.name }}
                      </p>
                    </div>
                    <div
                      class="order-client-card"
                      v-if="tariff.type == 'by_count'"
                      v-for="(elem, index) in form?.data"
                      :key="index"
                    >
                      <div class="order-client-card-tariffs">
                        <span> {{ tariff?.name?.ru }} </span>
                        <span> {{ elem.name }} </span>
                      </div>
                      <div class="order-client-card-count">
                        <div
                          class="order-client-card-btn"
                          @click="countDown(elem.indexId)"
                        >
                          -
                        </div>
                        <span
                          class="mx-3 d-flex justify-content-center"
                          style="width: 24px"
                          >{{ elem.count }}</span
                        >
                        <div class="order-client-card-btn" @click="countUp(elem.indexId)">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Параметры" />

                <a-form-model-item class="form-item mb-3" label="№ заказa">
                  <a-select v-model="statusValue" disabled>
                    <a-select-option v-for="status in statusData" :key="status.value">
                      {{ status.label }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <!-- <a-button
                  class="py-3 add-btn btn-primary d-flex justify-content-center align-items-center"
                  style="height: 42px"
                  type="primary"
                  @click="onSubmit"
                >
                  Изменить статус
                </a-button> -->
                <a-form-model-item class="form-item mb-3 mt-3" label="Добавил операторр">
                  <a-input
                    disabled
                    v-model="$store.state.operator.name"
                    placeholder="Добавил операторр"
                  />
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
import moment from "moment";

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
      value: "",
      statusData: [
        {
          label: "Новые",
          value: "new",
        },
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
      statusValue: "Принятые",
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      tariff: {},
      booked: "",
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
        tariff_id: 2,
        session: null,
        date: "2023-05-02",
        comments: "",
        data: [
          {
            indexId: 1,
            name: "",
            count: 1,
            active: false,
          },
        ],
      },
      service: [],
      countBooked: "",
    };
  },
  mounted() {
    this.$route.query.session
      ? (this.form.date = moment(
          `${this.$route.query.date} ${this.$route.query.session}`
        ).format("Do MMMM. YYYY hh:mm-hh:mm"))
      : (this.form.date = moment(moment(this.$route.query.date, "DD-MM-YYYY")).format(
          "Do MMMM. YYYY"
        ));
    this.__GET_TARIFF_BY_ID();
  },
  methods: {
    onSubmit() {
      const data = {
        ...this.form,
        session: this.$route.query.session ? this.$route.query.session : null,
        date: this.$route.query.date,
        data: this.form.data.map((item) => {
          if (this.tariff.type == "tariff") {
            return {
              name: item.active ? item.name : null,
              count: 1,
            };
          } else {
            return {
              name: item.name,
              count: item.count,
            };
          }
        }),
      };
      data.data = data.data.filter((item) => item.name && item.count > 0);
      this.$refs["ruleForm"].validate((valid) => {
        valid ? this.__POST_ORDER(data) : false;
      });
    },
    countUp(id) {
      const obj = this.form.data.find((item) => item.indexId == id);
      let summ = 0;
      this.form.data.forEach((item) => {
        summ = summ + item.count;
      });
      summ = summ + this.countBooked;
      if (summ < this.tariff.max_clients) {
        obj.count++;
      }
    },
    countDown(id) {
      const obj = this.form.data.find((item) => item.indexId == id);
      let summ = 0;
      this.form.data.forEach((item) => {
        summ = summ + item.count;
      });
      if (obj.count > 0 && summ > this.tariff.min_clients) {
        obj.count--;
      }
    },
    chooseActive(id) {
      this.form.data = this.form.data.map((item) => {
        item.indexId == id ? (item.active = true) : (item.active = false);
        return item;
      });
    },

    async __GET_TARIFF_BY_ID() {
      const [dataOrder, dataBooked] = await Promise.all([
        this.$store.dispatch("fetchTariff/getTariffById", this.$route.query.tariff_id),
        this.$store.dispatch("fetchOrders/getBookedOrders", {
          ...this.$route.query,
        }),
      ]);
      this.countBooked = dataBooked?.number_of_bookings;
      this.transformData(dataOrder?.tariff, dataBooked?.number_of_bookings);
    },
    transformData(data, booked) {
      this.tariff = data;

      this.form.tariff_id = data.id;
      this.form.data = data.prices.map((item, index) => {
        return {
          indexId: index + 1,
          name: item.name,
          count: index == 0 ? this.tariff.min_clients : 0,
          active: index == 0 ? true : false,
        };
      });
      this.booked = `${booked}/${this.tariff.max_clients}`;
    },
    async __POST_ORDER(data) {
      try {
        await this.$store.dispatch("fetchOrders/postOrders", data);
        this.notification("success", "success", "Успешно добавлен");
        this.$store.dispatch("getOrders");
        this.$router.go(-1);
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    value(val) {
      const tariff = this.service.tariffs.find((item) => item.id == val);
      this.transformData(tariff);
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
.order-client-card-tariff {
  display: flex;
  align-items: center;
  gap: 12px;
}
.order-client-card-tariff span {
  font-family: "TT Interfaces";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #020105;
}
.order-client-card-tariff p {
  font-family: "TT Interfaces";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #5d5d5f;
  padding: 8px 16px;
  background: #f5f5f7;
  border: 1px solid #ebebeb;
  border-radius: 500px;
  cursor: pointer;
}
.active_tab-tariff {
  background: #ebfbf3 !important;
  color: #309c74 !important;
  border: 1px solid #00cd69 !important;
}
.tariff_info h4 {
  font-family: "TT Interfaces";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #020105;
  margin-right: 20px;
}
.tariff_info span {
  font-family: "TT Interfaces";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #5d5d5f;
}
</style>
