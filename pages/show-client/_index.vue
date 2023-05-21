<template lang="html">
  <div class="posts">
    <TitleBlock
      title="Информация о клиенте"
      :breadbrumb="['Клиенты']"
      lastLink="Информация о клиенте"
    >
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.go(-1)"
        >
        Назад
        </div>
      </div>
    </TitleBlock>
    <a-form-model :model="form" ref="ruleForm" :rules="rules" layout="vertical">
      <div class="pb-5 pt-5">
        <div class="container_xl app-container d-flex flex-column">
          <div class="">
            <div>
              <div class="card_block main-table px-4 py-4">
                <FormTitle title="Информация о клиенте" />
                <div class="order-grid-2">
                  <a-form-model-item class="form-item mb-0" label="Имя">
                    <a-input placeholder="Имя..." v-model="client.name" disabled />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-0" label="Адрес">
                    <a-input placeholder="Адрес" v-model="client.address" disabled />
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
                      v-model="client.phone_number"
                      label-position="top"
                    />
                  </a-form-model-item>

                  <a-form-model-item class="form-item mb-3" label="Email">
                    <a-input
                      style="text-transform: capitalize"
                      placeholder="Email"
                      v-model="client.email"
                      disabled
                    />
                  </a-form-model-item>
                </div>
              </div>

              <div class="mt-5">
                <FormTitle title="История" />
              </div>
              <div class="order-bilets">
                <!-- <BiletCard
                  v-for="orderIn in order.orders"
                  :key="orderIn.id"
                  :orderIn="orderIn"
                  :isPaid="order.is_paid"
                /> -->
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
import authAccess from "../../mixins/authAccess";

import BiletCard from "../../components/cards/biletCard.vue";
import moment from "moment";

export default {
  mixins: [status, authAccess],
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

      client: {},
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
    this.__GET_CLIENTS_BY_ID();
  },
  methods: {
    moment,
    onSubmit() {
      this.__EDIT_CATEGORIES({ status: this.statusValue });
    },

    async __GET_CLIENTS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchClients/getClientsById",
          this.$route.params.index
        );
        this.visible = true;
        
        this.client = data?.client;
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
