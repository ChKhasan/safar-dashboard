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
        <div class="container_xl app-container mt-4 d-flex flex-column">
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab = item.index"
                :class="{ 'avtive-formTab': formTab == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab == item.index"
          >
            <div class="grid-2">
              <a-form-model-item
                class="form-item mb-3 required"
                label="Xizmat nomi"
                :prop="`name.ru`"
              >
                <a-input v-model="form.name[item.index]" placeholder="Group name" />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3 required" label="Tarif text">
                <a-input v-model="form.desc[item.index]" placeholder="Group name" />
              </a-form-model-item>
            </div>
            <a-form-model-item class="form-item mb-3" label="Sub title (tight title)">
              <a-input placeholder="Group name" v-model="form.subtitle[item.index]" />
            </a-form-model-item>
          </div>
        </div>
        <div class="container_xl app-container">
          <a-range-picker :show-time="{ format: 'HH:mm' }" mode="time">
            <template slot="renderExtraFooter"> extra footer </template>
          </a-range-picker>
          <div class="card_block mt-4 service-table px-4 py-3">
            {{ form.schedule }}
            <a-table :columns="columns" :pagination="false" :data-source="data">
              <span slot="customTitle"><a-icon type="smile-o" /> Name</span>a
              <span slot="time" slot-scope="text">
                <div class="d-flex flex-wrap">
                  <span
                    class="time_picker"
                    style="margin-right: 16px"
                    v-if="form.schedule[text - 1] !== null"
                    v-for="(timePicker, ind) in form.schedule[text - 1]"
                  >
                    <a-time-picker
                      style="margin-right: 6px"
                      :default-value="
                        moment(timePicker.start ? timePicker.start : '00:00', 'HH:mm')
                      "
                      format="HH:mm"
                      :disabled="form.schedule[text - 1] == null"
                      :class="{ disabledTime: form.schedule[text - 1] == null }"
                      @change="($event) => onChangeTime($event, text - 1, 'start', ind)"
                    />
                    <a-time-picker
                      :default-value="
                        moment(timePicker.end ? timePicker.end : '00:00', 'HH:mm')
                      "
                      format="HH:mm"
                      :class="{ disabledTime: form.schedule[text - 1] == null }"
                      :disabled="form.schedule[text - 1] == null"
                      @change="($event) => onChangeTime($event, text - 1, 'end', ind)"
                    />
                  </span>
                  <span
                    v-if="form.schedule[text - 1] == null"
                    class="time_picker"
                    style="margin-right: 16px"
                  >
                    <a-time-picker
                      style="margin-right: 6px"
                      :default-value="moment('00:00', 'HH:mm')"
                      format="HH:mm"
                      :disabled="form.schedule[text - 1] == null"
                      :class="{ disabledTime: form.schedule[text - 1] == null }"
                    />
                    <a-time-picker
                      :default-value="moment('00:00', 'HH:mm')"
                      format="HH:mm"
                      :class="{ disabledTime: form.schedule[text - 1] == null }"
                      :disabled="form.schedule[text - 1] == null"
                    />
                  </span>
                  <div class="outline-btn time-add-btn" @click="addTimePicker(text - 1)">
                    <span v-html="plusIcon"> </span>
                  </div>
                </div>
              </span>
              <span slot="id" slot-scope="text">
                <span
                  >Круглосутоно
                  <a-checkbox
                    class="mx-3"
                    @change="($event) => onChangeDay($event, text.id - 1)"
                  >
                  </a-checkbox
                ></span>
              </span>
            </a-table>
          </div>
        </div>
        <div class="container_xl app-container mt-4 d-flex flex-column">
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab = item.index"
                :class="{ 'avtive-formTab': formTab == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block py-4 border-left-radius"
            v-for="(item, index2) in formTabData"
            :key="index2"
            v-if="formTab == item.index"
          >
            <span class="px-4"><FormTitle title="Narxni kiritish" /></span>
            <div class="grid-3 px-4">
              <a-form-model-item class="form-item mb-3" label="Turi">
                <a-select :default-value="services[0]" v-model="form.type">
                  <a-select-option v-for="(service, index) in services" :key="service">
                    {{ service }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Minimal mijoz">
                <a-input v-model="form.min_clients" />
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3" label="Maximal mijoz">
                <a-input v-model="form.max_clients" />
              </a-form-model-item>
            </div>
            <div class="px-4 from_hr_top pt-3">
              <a-form-model-item class="form-item mb-3" v-if="form.type == 'tariff'">
                <a-input
                  v-model="form.tab_start_text[item.index]"
                  placeholder="Введите параметр (текст)"
                />
              </a-form-model-item>
              <div
                v-for="(price, index) in form.prices"
                :key="price.id"
                v-if="form.type !== 'multi'"
              >
                <a-form-model-item class="form-item mb-3" v-if="form.type == 'multi'">
                  <a-input v-model="price.name" placeholder="Введите параметр (текст)" />
                </a-form-model-item>
                <div class="grid-3-with-2delete">
                  <a-form-model-item class="form-item mb-3">
                    <a-input
                      v-model="price.name"
                      placeholder="Введите параметр (текст)"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3">
                    <a-input v-model="price.prices[0].name" placeholder="Введите сумму" />
                  </a-form-model-item>

                  <div class="d-flex align-items-center mb-2">
                    <div
                      class="variant-btn variant-btn-delete"
                      v-html="xIcon"
                      @click="deletePrices(price.id)"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                v-for="(price2, index) in form.prices"
                :key="price2.id"
                v-if="form.type == 'multi'"
              >
                <div class="grid-2-with-2delete">
                  <a-form-model-item class="form-item mb-3">
                    <a-input
                      v-model="price2.name"
                      placeholder="Введите параметр (текст)"
                    />
                  </a-form-model-item>
                  <div
                    class="variant-btn variant-btn-delete"
                    v-html="xIcon"
                    @click="deletePrices(price2.id)"
                  ></div>
                </div>
                <div
                  class="grid-2-with mb-3"
                  v-for="(pr, index1) in price2.prices"
                  :key="pr.id"
                >
                  <span class="index-block">{{ index1 + 1 }}</span>
                  <a-form-model-item class="form-item mb-0">
                    <a-input v-model="pr.name" placeholder="Введите сумму" />
                  </a-form-model-item>
                  <div class="d-flex align-items-center mb-2">
                    <div
                      class="outline-btn outline-light-blue-btn"
                      style="margin-right: 16px"
                      @click="addPrice(price2.id)"
                    >
                      <span class="d-flex" v-html="plusIcon"> </span>
                    </div>
                    <div
                      class="variant-btn variant-btn-delete"
                      v-html="xIcon"
                      @click="deletePrice(price2.id, pr.id)"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="create-inner-variant" @click="addPrices">
                <span v-html="plusIcon"> </span>
                Qo’shish
              </div>
            </div>
          </div>
        </div>

        <div class="container_xl app-container d-flex flex-column">
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab = item.index"
                :class="{ 'avtive-formTab': formTab == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block border-left-radius px-4 py-4 mt-0"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab == item.index"
          >
            <a-form-model-item class="form-item mb-0" label="Kafolatlarni kiritish">
              <quill-editor class="product-editor mt-1" :options="editorOption" />
            </a-form-model-item>
            <div class="mt-3 statistic-grid">
              <div v-for="statistic in [1, 2, 3]" class="d-flex">
                <div class="clearfix">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
                  >
                    <div v-if="fileList.length < 1">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </div>
                <div class="d-flex flex-column justify-content-between">
                  <a-form-model-item class="form-item mb-3">
                    <a-input />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3">
                    <a-input />
                  </a-form-model-item>
                </div>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import moment from "moment";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const columns = [
  {
    title: "Kalendar",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    width: "200px",
    fixed: "left",
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
    fixed: "right",
  },
];

const data = [
  {
    key: "1",
    name: "Понедельник",
    time: 1,
    id: 1,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "2",
    name: "Вторник",
    time: 2,
    id: 2,
    address: "mavjud emas",
    tags: "mavjud",
  },
  {
    key: "3",
    name: "Среда",
    time: 3,
    id: 3,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "4",
    name: "Четверг",
    time: 4,
    id: 4,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "5",
    name: "Пятница",
    time: 5,
    id: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "6",
    name: "Суббота",
    time: 6,
    id: 6,
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
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
      previewVisible: false,
      previewImage: "",
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],

            ["image"],
            ["code-block"],
          ],
        },
      },
      services: ["tariff", "by_count", "multi"],
      count: 0,
      form: {
        name: {
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
        schedule: [
          [
            {
              start: "11:11",
              end: "22:22",
            },
          ],
          [
            {
              start: "",
              end: "",
            },
          ],
          [
            {
              start: "",
              end: "",
            },
          ],
          [
            {
              start: "",
              end: "",
            },
          ],
          [
            {
              start: "",
              end: "",
            },
          ],
          [
            {
              start: "",
              end: "",
            },
          ],
        ],
        type: "tariff",
        min_clients: null,
        max_clients: null,
        tab_start_text: {
          ru: "",
          uz: "",
        },
        prices: [
          {
            id: 999,
            name: "",
            prices: [
              {
                id: 99,
                name: "",
              },
            ],
          },
        ],
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
      formTab: "ru",
      formTabData: [
        {
          label: "Русский",
          index: "ru",
        },
        {
          label: "O'zbek",
          index: "uz",
        },
      ],
      columns,
      rules: {
        name: {
          ru: [
            { required: true, message: "Please input Activity name", trigger: "change" },
          ],
        },
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
    onChangeDay(e, index) {
      console.log(`checked = ${e.target.checked}`);
      if (e.target.checked) {
        this.form.schedule[index] = null;
      } else {
        this.form.schedule[index] = [
          {
            start: "",
            end: "",
          },
        ];
      }
      this.form.schedule = [...this.form.schedule];
      // this.count ++
      // this.data = this.data
      // console.log(this.count);
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onSubmit() {
      const data = {
        ...this.form,
        tab_start_text: this.form.type != "tariff" ? null : this.form.tab_start_text,
        prices: this.form.prices.map((item) => {
          return {
            name: item.name,
            prices: item.prices.map((pr) => pr.name),
          };
        }),
        schedule: this.form.schedule.map((item) => {
          if (item) {
            return item.map((time) => {
              if (time.start && time.end) {
                return `${time.start}-${time.end}`;
              } else {
                return "";
              }
            });
          } else {
            return null;
          }
        }),
      };
      console.log(data);

      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addTimePicker(id) {
      this.form.schedule[id].push({
        start: "00:00",
        end: "00:00",
      });
    },
    addPrice(id) {
      const price = this.form.prices.find((item) => item.id == id);
      price.prices.push({
        name: "",
        id: Math.max(...price.prices.map((o) => o.id)) + 1,
      });
    },
    addPrices() {
      this.form.prices.push({
        name: "",
        prices: [
          {
            id: 99,
            name: "",
          },
        ],
        id: Math.max(...this.form.prices.map((o) => o.id)) + 1,
      });
    },
    deletePrice(parentId, id) {
      const parent = this.form.prices.find((item) => item.id == parentId);
      if (parent.prices.length > 1)
        parent.prices = parent.prices.filter((item) => item.id != id);
    },
    deletePrices(id) {
      if (this.form.prices.length > 1)
        this.form.prices = this.form.prices.filter((item) => item.id != id);
    },
    onChangeTime(e, index, name, ind) {
      let val = moment(e).format("hh:mm");
      console.log(val);
      this.form.schedule[index][ind][name] = val;
      console.log(this.form.schedule);
      console.log(index);
      // console.log(this.form.schedule[index][0]);
      // console.log(this.form.schedule[index][0][name]);
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
  watch: {
    "form.type"() {
      this.form.prices = [
        {
          id: 999,
          name: "",
          prices: [
            {
              id: 99,
              name: "",
            },
          ],
        },
      ];
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
.grid-2-with-2delete {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr auto !important;
}
.grid-2-with {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: auto 1fr auto !important;
}
.index-block {
  width: 42px;
  height: 100%;
  background: #fff;
  border: 1px solid #e4e6ef;
  border-radius: 6.175px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.statistic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
}
</style>
