<template>
  <div class="">
    <TitleBlock title="Услуги " :breadbrumb="['Главный']" lastLink="Услуги">
      <div class="d-flex justify-content-between btn_group">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="
            $route.hash == '#total_info' || $route.hash == '' ? 'primary' : 'default'
          "
          @click="$router.push({ hash: 'total_info' })"
        >
          Общие данные
        </a-button>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#sessions_tariffs' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'sessions_tariffs' })"
        >
          Сеансы и тарифы
        </a-button>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#faq' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'faq' })"
        >
          FAQ
        </a-button>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          :type="$route.hash == '#reviews' ? 'primary' : 'default'"
          @click="$router.push({ hash: 'reviews' })"
        >
          Отзывы
        </a-button>
      </div>
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.push('/')"
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
    <a-form-model
      :model="form"
      ref="ruleForm"
      :rules="rules"
      layout="vertical"
      :wrapper-col="wrapperCol"
    >
      <div class="services-grid pb-5 mt-5">
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '' || $route.hash == '#total_info'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.name = item.index"
                :class="{ 'avtive-formTab': formTab.name == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.name == item.index"
          >
            <a-form-model-item class="form-item mb-3" label="Xizmat nomi">
              <a-input v-model="form.name[item.index]" placeholder="Group name" />
            </a-form-model-item>

            <a-form-model-item
              class="form-item mb-0"
              label="Xizmat bo’yicha kichik ma’lumot"
            >
              <quill-editor
                v-model="form.desc[item.index]"
                class="product-editor mt-1"
                :options="editorOption"
                placeholder="Group name"
              />
            </a-form-model-item>
            <div class="service-upload-container">
              <a-form-model-item class="form-item mb-3 mt-3" label="Banner">
                <div class="service-upload">
                  <a-upload
                    action="https://api.safarpark.uz/api/files/upload"
                    list-type="picture-card"
                    :file-list="fileBanner"
                    @preview="handlePreview"
                    @change="($event) => handleChangeServiceUpload($event, 'banner')"
                  >
                    <div v-if="fileBanner.length < 1">
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
              </a-form-model-item>
              <a-form-model-item class="form-item mb-3 mt-3" label="Image">
                <div class="service-upload">
                  <a-upload
                    action="https://api.safarpark.uz/api/files/upload"
                    list-type="picture-card"
                    :file-list="fileForCard"
                    @preview="handlePreview"
                    @change="($event) => handleChangeServiceUpload($event, 'for_card')"
                  >
                    <div v-if="fileForCard.length < 1">
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
              </a-form-model-item>
            </div>
          </div>
        </div>
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '' || $route.hash == '#total_info'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.guarantee = item.index"
                :class="{ 'avtive-formTab': formTab.guarantee == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block border-left-radius px-4 py-4 mt-0"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.guarantee == item.index"
          >
            <a-form-model-item class="form-item mb-0" label="Kafolatlarni kiritish">
              <quill-editor
                v-model="form.guarantee[item.index]"
                class="product-editor mt-1"
                :options="editorOption"
              />
            </a-form-model-item>
            <div class="mt-3 statistic-grid">
              <div v-for="statistic in form.statistics" class="d-flex">
                <div class="clearfix">
                  <a-upload
                    action="https://api.safarpark.uz/api/files/upload"
                    list-type="picture-card"
                    :file-list="statistic.statisticFile"
                    @preview="handlePreview"
                    @change="($event) => handleChangeStatistic($event, statistic.indexId)"
                  >
                    <div v-if="statistic.statisticFile.length < 1">
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
                <div class="d-flex flex-column justify-content-between w-100">
                  <a-form-model-item class="form-item mb-3">
                    <a-input
                      v-model="statistic.name[item.index]"
                      placeholder="Statistika soni"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="form-item mb-3">
                    <a-input
                      v-model="statistic.number[item.index]"
                      placeholder="Statistika nomi"
                    />
                  </a-form-model-item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container_xl app-container" v-if="$route.hash == '#sessions_tariffs'">
          <div class="card_block px-4 py-4 mt-0">
            <div class="tariff-card-grid">
              <TariffCard
                v-for="tariff in form.tariffs"
                :tariff="tariff"
                :reloadTariff="reloadTariff"
                :key="tariff.id"
              />
            </div>
            <div class="create-inner-variant" @click="addGroup">
              <span> </span>
              Qo’shish
            </div>
          </div>
        </div>
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '#sessions_tariffs'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.sub_service = item.index"
                :class="{ 'avtive-formTab': formTab.sub_service == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 mt-0 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.sub_service == item.index"
          >
            <FormTitle title="Qo’shimcha xizmlatlar narxlari" />
            <div
              class="d-flex align-items-center"
              v-for="service in form.additional_services"
              :key="service.indexId"
            >
              <div class="grid-2 mb-4 w-100">
                <a-form-model-item class="form-item mb-0" label="Qo’shimcha xizmatlar">
                  <a-input
                    v-model="service.name[item.index]"
                    placeholder="Service name"
                  />
                </a-form-model-item>
                <a-form-model-item class="form-item mb-0" label="Xizmatlar narxi">
                  <a-input
                    :max-length="8"
                    v-model="service.price"
                    placeholder="Service price"
                  />
                </a-form-model-item>
              </div>
              <div
                class="variant-btn variant-btn-delete mt-3 mx-2"
                v-html="xIcon"
                @click="deleteServices(service.indexId)"
              ></div>
            </div>
            <div class="create-inner-variant mt-0" @click="addServices">
              <span v-html="plusIcon"> </span>
              Qo’shish
            </div>
          </div>
        </div>
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '#faq'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.faq = item.index"
                :class="{ 'avtive-formTab': formTab.faq == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 mt-0 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.faq == item.index"
          >
            <FormTitle title="Ko’p so’raladigan savollarga javob yozish" />
            <div v-for="faq in form.faqs" :key="faq.indexId" class="faqs-grid">
              <div class="d-flex align-items-center">
                <a-form-model-item class="form-item w-100" label="Savol yozish">
                  <a-input v-model="faq.question[item.index]" placeholder="Question" />
                </a-form-model-item>
                <div
                  @click="deleteFaqs(faq.indexId)"
                  class="variant-btn variant-btn-delete mt-3 mx-2"
                  v-html="xIcon"
                ></div>
              </div>
              <a-form-model-item class="form-item mb-0" label="Javob yozish">
                <quill-editor
                  class="product-editor mt-1"
                  :options="editorOption"
                  v-model="faq.answer[item.index]"
                />
              </a-form-model-item>
            </div>
            <div class="create-inner-variant" @click="addFaqs">
              <span v-html="plusIcon"> </span>
              Qo’shish
            </div>
          </div>
        </div>
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '' || $route.hash == '#total_info'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.package = item.index"
                :class="{ 'avtive-formTab': formTab.package == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 mt-0 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.package == item.index"
          >
            <FormTitle title="Варианты пакетов" />
            <span
              class="faqs-grid position-relative"
              v-for="option in form.package_options"
              :key="option.indexId"
            >
              <div
                @click="deletePackageOption(option.indexId)"
                class="variant-btn variant-btn-delete mt-3"
                style="position: absolute; right: 5px; top: -10px; z-index: 9"
                v-html="xIcon"
              ></div>
              <a-form-model-item class="form-item mb-0 mt-0">
                <quill-editor
                  class="product-editor mt-0 padding-editor"
                  :options="editorOption"
                  v-model="option.desc[item.index]"
                />
              </a-form-model-item>
            </span>
            <div class="create-inner-variant" @click="addPackageOption">
              <span v-html="plusIcon"> </span>
              Qo’shish
            </div>
          </div>
        </div>
        <div
          class="container_xl app-container d-flex flex-column"
          v-if="$route.hash == '#reviews'"
        >
          <div class="form_tab">
            <div>
              <span
                v-for="(item, index) in formTabData"
                :key="index"
                @click="formTab.feedback = item.index"
                :class="{ 'avtive-formTab': formTab.feedback == item.index }"
              >
                {{ item.label }}
              </span>
            </div>
          </div>
          <div
            class="card_block px-4 py-4 mt-0 border-left-radius"
            v-for="(item, index) in formTabData"
            :key="index"
            v-if="formTab.feedback == item.index"
          >
            <div class="d-flex justify-content-between">
              <FormTitle title="Komentariya" />
            </div>
            <div
              class="grid-with-img faqs-grid"
              v-for="(feedback, i) in form.feedbacks"
              :key="feedback.indexId"
            >
              <div>
                <div class="grid-with-btn">
                  <a-form-model-item class="form-item mb-3" label="Foydalanuvchi">
                    <a-input v-model="feedback.name[item.index]" placeholder="User" />
                  </a-form-model-item>
                  <!-- <a-form-model-item class="form-item mb-3" label="Brend">
                    <a-input
                      v-model="feedback.feedback[item.index]"
                      placeholder="Brand"
                    />
                  </a-form-model-item> -->
                  <div class="d-flex align-items-center">
                    <div
                      @click="deleteFeedbacks(feedback.indexId)"
                      class="variant-btn variant-btn-delete mt-3"
                      v-html="xIcon"
                    ></div>
                  </div>
                </div>
                <a-form-model-item class="form-item mb-0 mt-0" label="Matni">
                  <a-input
                    type="textarea"
                    v-model="feedback.feedback[item.index]"
                    rows="6"
                    placeholder="Xabar yozing"
                  />
                </a-form-model-item>
              </div>
              <div class="clearfix">
                <a-upload
                  action="https://api.safarpark.uz/api/files/upload"
                  list-type="picture-card"
                  :file-list="feedback.feedbacksFile"
                  @preview="handlePreview"
                  @change="($event) => handleChangeComment($event, feedback.indexId)"
                >
                  <div v-if="feedback.feedbacksFile.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </div>
            <div class="create-inner-variant" @click="addFeedbacks">
              <span v-html="plusIcon"> </span>
              Qo’shish
            </div>
          </div>
        </div>
        <div class="container_xl d-flex justify-content-end">
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            type="danger"
            @click="deleteService"
          >
            Delete service
          </a-button>
        </div>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import TitleBlock from "../../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import FormTitle from "../../components/Form-title.vue";
import status from "../../mixins/status";
import TariffCard from "../../components/cards/tariffCard.vue";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: "IndexPage",
  head: {
    title: "Услуги",
  },
  mixins: [status],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      service: [],
      xIcon: require("../../assets/svg/x.svg?raw"),
      plusIcon: require("../../assets/svg/plus.svg?raw"),
      infoIcon: require("../../assets/svg/info.svg?raw"),
      formTab: {
        name: "ru",
        guarantee: "ru",
        sub_service: "ru",
        faq: "ru",
        package: "ru",
        feedback: "ru",
      },
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
      fileBanner: [],
      fileForCard: [],
      form: {
        name: {
          ru: "",
          uz: "",
        },
        desc: {
          ru: "",
          uz: "",
        },
        guarantee: {
          ru: "",
          uz: "",
        },
        banner: null,
        for_card: null,
        statistics: [
          {
            indexId: 1,
            name: {
              ru: "",
              uz: "",
            },
            number: {
              ru: "",
              uz: "",
            },
            img: "",
            statisticFile: [],
          },
          {
            indexId: 2,
            name: {
              ru: "",
              uz: "",
            },
            number: {
              ru: "",
              uz: "",
            },
            img: "",
            statisticFile: [],
          },
          {
            indexId: 3,
            name: {
              ru: "",
              uz: "",
            },
            number: {
              ru: "",
              uz: "",
            },
            img: "",
            statisticFile: [],
          },
        ],
        additional_services: [
          {
            indexId: 1,
            name: {
              ru: "",
              uz: "",
            },
            price: 0,
          },
        ],
        faqs: [
          {
            indexId: 1,
            question: {
              ru: "",
              uz: "",
            },
            answer: {
              ru: "",
              uz: "",
            },
          },
        ],
        package_options: [
          {
            indexId: 1,
            desc: {
              ru: "",
              uz: "",
            },
          },
        ],
        feedbacks: [
          {
            indexId: 1,
            name: {
              ru: "",
              uz: "",
            },
            feedback: {
              ru: "",
              uz: "",
            },
            logo: "",
            feedbacksFile: [],
          },
        ],
      },
      rules: {
        feedbacks: [
          {
            name: {
              ru: [
                {
                  required: true,
                  message: "Please input Activity name",
                  trigger: "change",
                },
              ],
            },
          },
        ],
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
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      const data = {
        ...this.form,
        statistics: this.form.statistics
          .filter((elem) => elem.name.ru || elem.number.ru)
          .map((item) => {
            const { statisticFile, indexId, ...rest } = item;
            return rest;
          }),
        feedbacks: this.form.feedbacks.map((item) => {
          const { feedbacksFile, indexId, ...rest } = item;
          return rest;
        }),
      };
      const {
        lg_banner,
        sm_banner,
        md_banner,
        lg_for_card,
        md_for_card,
        sm_for_card,
        created_at,
        id,
        updated_at,
        slug,
        for_search,
        ...dataRest
      } = data;

      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.__EDIT_SERVICES(dataRest);
        } else {
          return false;
        }
      });
    },
    async __EDIT_SERVICES(data) {
      try {
        await this.$store.dispatch("fetchServices/editServices", {
          id: this.$route.params.index,
          data: data,
        });
        this.notification("success", "success", "Услуга успешно добавлен");
        this.$router.push("/");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    deleteService() {
      this.__DELETE_SERVICES(this.$route.params.index);
    },
    async __DELETE_SERVICES(id) {
      try {
        await this.$store.dispatch("fetchServices/deleteServices", id);
        this.$router.push("/");
        this.notification("success", "success", "Услуга был успешно удален");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_SERVICES_BY_ID() {
      const data = await this.$store.dispatch(
        "fetchServices/getServicesById",
        this.$route.params.index
      );
      this.form = {
        ...data?.service,
        statistics: data?.service.statistics.map((item, index) => {
          return {
            ...item,
            indexId: item.id,
            img: item?.sm_img ? item?.sm_img : "",
            statisticFile: item?.sm_img
              ? [
                  {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    oldImg: true,
                    url: item?.sm_img,
                  },
                ]
              : [],
          };
        }),
        additional_services: data?.service.additional_services.map((item, index) => {
          return {
            ...item,
            indexId: item.id,
          };
        }),
        faqs: data?.service.faqs.map((item, index) => {
          return {
            ...item,
            indexId: item.id,
          };
        }),
        package_options: data?.service.package_options.map((item, index) => {
          return {
            ...item,
            indexId: item.id,
          };
        }),
        feedbacks: data?.service.feedbacks.map((item, index) => {
          return {
            ...item,
            indexId: item.id,
            logo: item.sm_logo,
            feedbacksFile: item?.sm_logo
              ? [
                  {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    oldImg: true,
                    url: item?.sm_logo,
                  },
                ]
              : [],
          };
        }),
      };
      this.fileForCard = this.form.for_card
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              oldImg: true,
              url: this.form.sm_for_card,
            },
          ]
        : [];
      this.fileBanner = this.form.banner
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              oldImg: true,
              url: this.form.sm_banner,
            },
          ]
        : [];
      const statLength = this.form.statistics.length;
      for (var i = 0; i < 3 - statLength; i++) {
        this.form.statistics.push({
          indexId: this.form.statistics.length + i + 1,
          id: 0,
          name: {
            ru: "",
            uz: "",
          },
          number: {
            ru: "",
            uz: "",
          },
          img: "",
          statisticFile: [],
        });
      }
    },
    deleteFaqs(indexId) {
      if (this.form.faqs.length > 1)
        this.form.faqs = this.form.faqs.filter((item) => item.indexId != indexId);
    },
    deleteFeedbacks(indexId) {
      if (this.form.feedbacks.length > 1)
        this.form.feedbacks = this.form.feedbacks.filter(
          (item) => item.indexId != indexId
        );
    },
    deleteServices(indexId) {
      if (this.form.additional_services.length > 1)
        this.form.additional_services = this.form.additional_services.filter(
          (item) => item.indexId != indexId
        );
    },
    deletePackageOption(indexId) {
      if (this.form.package_options.length > 1)
        this.form.package_options = this.form.package_options.filter(
          (item) => item.indexId != indexId
        );
    },
    addPackageOption() {
      this.form.package_options.push({
        desc: {
          ru: "",
          uz: "",
        },
        id: 0,
        indexId: Math.max(...this.form.package_options.map((o) => o.indexId)) + 1,
      });
    },
    addFaqs() {
      this.form.faqs.push({
        question: {
          ru: "",
          uz: "",
        },
        answer: {
          ru: "",
          uz: "",
        },
        id: 0,
        indexId: Math.max(...this.form.faqs.map((o) => o.indexId)) + 1,
      });
    },
    addFeedbacks() {
      this.form.feedbacks.push({
        name: {
          ru: "",
          uz: "",
        },
        feedback: {
          ru: "",
          uz: "",
        },
        logo: "",
        feedbacksFile: [],
        id: 0,
        indexId: Math.max(...this.form.feedbacks.map((o) => o.indexId)) + 1,
      });
    },
    addServices() {
      this.form.additional_services.push({
        name: {
          ru: "",
          uz: "",
        },
        price: 0,
        id: 0,
        indexId: Math.max(...this.form.additional_services.map((o) => o.indexId)) + 1,
      });
    },
    addGroup() {
      this.$router.push(`/add_tariff/${this.$route.params.index}`);
      localStorage.setItem(
        "serive_params",
        JSON.stringify({
          name: this.$route.name,
          params: this.$route.params,
          hash: this.$route.hash,
        })
      );
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
    handleChangeComment({ fileList }, id) {
      const feed = this.form.feedbacks.find((item) => item.indexId == id);
      feed.feedbacksFile = fileList;
      if (fileList[0]?.response?.path) {
        feed.logo = fileList[0]?.response?.path;
      } else if (fileList.length == 0) {
        feed.logo = "";
      }
    },
    handleChangeStatistic({ fileList }, id) {
      const stat = this.form.statistics.find((item) => item.indexId == id);
      stat.statisticFile = fileList;
      if (fileList[0]?.response?.path) stat.img = fileList[0]?.response?.path;
    },
    handleChangeServiceUpload({ fileList }, name) {
      name == "banner" ? (this.fileBanner = fileList) : (this.fileForCard = fileList);
      if (fileList[0]?.response?.path) {
        this.form[name] = fileList[0]?.response?.path;
      } else if (fileList.length == 0) {
        this.form[name] = null;
      }
    },
    reloadTariff() {
      this.__GET_SERVICES_BY_ID();
    },
  },
  async mounted() {
    await this.__GET_SERVICES_BY_ID();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  components: { TitleBlock, FormTitle, TariffCard },
};
</script>
<style lang="css">
@import "../../assets/css/pages/services.css";
@import "../../assets/css/pages/tariff.css";
</style>
