<template>
  <div class="">
    <a-form-model
      :model="form"
      ref="ruleForm"
      :rules="rules"
      layout="vertical"
      :wrapper-col="wrapperCol"
    >
      <TitleBlock title="Xizmatlar">
        <div class="d-flex">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          >
            Отмена
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            type="primary"
            @click="onSubmit"
          >
            <span class="svg-icon"> </span>
            Добавить
          </a-button>
        </div>
      </TitleBlock>
      <div class="services-grid">
        <div class="container_xl app-container">
          <div class="card_block px-4 py-4">
            <a-form-model-item
              class="form-item mb-3"
              label="Xizmat nomi"
              prop="name"
              @blur="
                () => {
                  $refs.name.onFieldBlur();
                }
              "
            >
              <a-input />
            </a-form-model-item>
            <a-form-item class="form-item mb-3" label="Xizmat nomi">
              <a-input />
            </a-form-item>
          </div>
        </div>
        <div class="container_xl app-container">
          <div class="card_block service-table">
            <a-table :columns="columns" :pagination="false" :data-source="data">
              <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
              <span slot="time">
                <div class="d-flex">
                  <span class="time_picker">
                    <a-time-picker
                      :default-value="moment('12:08', 'HH:mm')"
                      format="HH:mm"
                      @change="onChange"
                    />-
                    <a-time-picker
                      :default-value="moment('12:08', 'HH:mm')"
                      format="HH:mm"
                      v-model="value"
                    />
                  </span>
                  <div class="outline-btn time-add-btn mx-3">
                    <span v-html="plusIcon"> </span>
                  </div>
                </div>
              </span>
              <span slot="id" slot-scope="text">
                <span
                  >Круглосутоно <a-checkbox class="mx-3" @change="onChange"> </a-checkbox
                ></span>
              </span>
            </a-table>
          </div>
        </div>
        <div class="container_xl app-container">
          <div class="card_block py-4">
            <span class="px-4"><FormTitle title="Narxni kiritish" /></span>
            <div class="grid-3 px-4">
              <a-form-item class="form-item mb-3" label="Xizmat nomi">
                <a-input />
              </a-form-item>
              <a-form-item class="form-item mb-3" label="Xizmat nomi">
                <a-input />
              </a-form-item>
              <a-form-item class="form-item mb-3" label="Xizmat nomi">
                <a-input />
              </a-form-item>
            </div>
            <div class="px-3 from_hr_top pt-3">
              <a-form-item class="form-item mb-3" label="Xizmat nomi">
                <a-input />
              </a-form-item>
              <div class="grid-3-with-2delete">
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <div class="d-flex align-items-center mt-3">
                  <div
                    class="outline-btn outline-light-blue-btn"
                    style="margin-right: 24px"
                  >
                    <span v-html="plusIcon"> </span>
                  </div>
                  <div class="variant-btn variant-btn-delete" v-html="xIcon"></div>
                </div>
              </div>
              <div class="grid-3-with-2delete">
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <div class="d-flex align-items-center mt-3">
                  <div
                    class="outline-btn outline-light-blue-btn"
                    style="margin-right: 24px"
                  >
                    <span v-html="plusIcon"> </span>
                  </div>
                  <div class="variant-btn variant-btn-delete" v-html="xIcon"></div>
                </div>
              </div>
              <div class="grid-3-with-2delete">
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <a-form-item class="form-item mb-3" label="Xizmat nomi">
                  <a-input />
                </a-form-item>
                <div class="d-flex align-items-center mt-3">
                  <div
                    class="outline-btn outline-light-blue-btn"
                    style="margin-right: 24px"
                  >
                    <span v-html="plusIcon"> </span>
                  </div>
                  <div class="variant-btn variant-btn-delete" v-html="xIcon"></div>
                </div>
              </div>
              <div class="create-inner-variant">
                <span v-html="plusIcon"> </span>
                Qo’shish
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import FormTitle from "../components/Form-title.vue";
import TitleBlock from "../components/Title-block.vue";
import moment from "moment";
const columns = [
  {
    title: "Kalendar",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
  },
  {
    title: "Times",
    dataIndex: "time",
    key: "time",
    className: "column-times",
    scopedSlots: { customRender: "time" },
  },
  {
    title: "Additional",
    className: "column-additional",
    key: "id",
    align: "left",
    scopedSlots: { customRender: "id" },
    width: "200px",
  },
];

const data = [
  {
    key: "1",
    name: "Понедельник",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "2",
    name: "Вторник",
    age: 5,
    address: "mavjud emas",
    tags: "mavjud",
  },
  {
    key: "3",
    name: "Среда",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "4",
    name: "Четверг",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "5",
    name: "Пятница",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "6",
    name: "Суббота",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
];
export default {
  name: "IndexPage",
  data() {
    return {
      top: 10,
      moment,
      form: {
        name: "",
      },
      bottom: 10,
      value: "",
      wrapperCol: { span: 14 },
      xIcon: require("../assets/svg/x.svg?raw"),
      plusIcon: require("../assets/svg/plus.svg?raw"),
      infoIcon: require("../assets/svg/info.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      data,
      columns,
      rules: {
        name: [
          { required: true, message: "Please input Activity name", trigger: "blur" },
          { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
        ],
        region: [
          { required: true, message: "Please select Activity zone", trigger: "change" },
        ],
        date1: [{ required: true, message: "Please pick a date", trigger: "change" }],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          { required: true, message: "Please input activity form", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onSubmit() {
      console.log(this.$refs);
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onChange(e) {
      let val = moment(e).format("hh:mm");
      console.log(val);
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
  },
  components: { TitleBlock, FormTitle },
};
</script>
<style lang="css">
.grid-3 {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, 1fr);
}
.grid-3-with-2delete {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 2fr 1fr auto;
}
</style>
