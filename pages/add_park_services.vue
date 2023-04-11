<template>
  <div class="">
    <TitleBlock title="Xizmatlar">
      <div class="d-flex">
        <div class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3">
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
    <div class="services-grid">
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4">
          <a-form :model="form">
            <a-form-item class="form-item mb-3" label="Xizmat nomi">
              <a-input v="form.name" />
            </a-form-item>

            <a-form-item class="form-item mb-0" label="Xizmat bo’yicha kichik ma’lumot">
              <quill-editor class="product-editor mt-1" :options="editorOption" />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <a-form :model="form">
            <a-form-item class="form-item mb-0" label="Kafolatlarni kiritish">
              <quill-editor class="product-editor mt-1" :options="editorOption" />
            </a-form-item>
          </a-form>
          <div class="d-flex mt-3 justify-content-between">
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
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
            <div class="d-flex flex-column justify-content-between">
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
            </div>
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
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
            <div>
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
            </div>
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
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
            <div>
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
              <a-form-item class="form-item mb-3">
                <a-input v="form.name" />
              </a-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <div class="gruppa-card">
            <div class="gruppa-card-header d-flex justify-content-between">
              <div class="d-flex">
                <h5>Полёт в группе</h5>
                <span>(4-6 человек + пилот)</span>
              </div>
              <div class="column-btns">
                <span>
                  <span
                    class="action-btn"
                    @click="$router.push(`/catalog/edit_products/${text}`)"
                    v-html="editIcon"
                  >
                  </span>
                  <a-popconfirm
                    title="Are you sure delete this product?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deletePoduct(text)"
                    @cancel="cancel"
                  >
                    <span class="action-btn" v-html="deleteIcon"> </span>
                  </a-popconfirm>
                </span>
              </div>
            </div>
            <div class="gruppa-card-body">
              <span>Minimum: 1, Maximum: 8</span>
              <p>Доступно мест: <span>12</span></p>
            </div>
            <div class="gruppa-card-footer d-flex justify-content-between">
              <span><span v-html="infoIcon"></span> Информация</span>
              <h6>1 500 000 сум</h6>
            </div>
          </div>
          <div class="create-inner-variant">
            <span> </span>
            Qo’shish
          </div>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <FormTitle title="Qo’shimcha xizmlatlar narxlari" />
          <a-form :model="form">
            <div class="d-flex align-items-center">
              <div class="grid-2 mb-4 w-100">
                <a-form-item class="form-item mb-0" label="Qo’shimcha xizmatlar">
                  <a-input v="form.name" />
                </a-form-item>
                <a-form-item class="form-item mb-0" label="Xizmatlar narxi">
                  <a-input v="form.name" />
                </a-form-item>
              </div>
              <div class="variant-btn variant-btn-delete mx-2" v-html="xIcon"></div>
            </div>
            <div class="d-flex align-items-center">
              <div class="grid-2 mb-4 w-100">
                <a-form-item class="form-item mb-0" label="Qo’shimcha xizmatlar">
                  <a-input v="form.name" />
                </a-form-item>
                <a-form-item class="form-item mb-0" label="Xizmatlar narxi">
                  <a-input v="form.name" />
                </a-form-item>
              </div>
              <div class="variant-btn variant-btn-delete mx-2" v-html="xIcon"></div>
            </div>
            <div class="d-flex align-items-center">
              <div class="grid-2 mb-4 w-100">
                <a-form-item class="form-item mb-0" label="Qo’shimcha xizmatlar">
                  <a-input v="form.name" />
                </a-form-item>
                <a-form-item class="form-item mb-0" label="Xizmatlar narxi">
                  <a-input v="form.name" />
                </a-form-item>
              </div>
              <div class="variant-btn variant-btn-delete mx-2" v-html="xIcon"></div>
            </div>
          </a-form>
          <div class="create-inner-variant mt-0">
            <span v-html="plusIcon"> </span>
            Qo’shish
          </div>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <FormTitle title="Ko’p so’raladigan savollarga javob yozish" />
          <a-form :model="form">
            <div class="d-flex align-items-center">
              <a-form-item class="form-item w-100" label="Savol yozish">
                <a-input v="form.name" />
              </a-form-item>
              <div class="variant-btn variant-btn-delete mx-2" v-html="xIcon"></div>
            </div>
            <a-form-item class="form-item mb-0" label="Javob yozish">
              <quill-editor class="product-editor mt-1" :options="editorOption" />
            </a-form-item>
          </a-form>
          <div class="create-inner-variant">
            <span v-html="plusIcon"> </span>
            Qo’shish
          </div>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <FormTitle title="Варианты пакетов" />
          <a-form :model="form">
            <a-form-item class="form-item mb-0 mt-0">
              <quill-editor class="product-editor mt-0" :options="editorOption" />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="container_xl app-container">
        <div class="card_block px-4 py-4 mt-0">
          <FormTitle title="Варианты пакетов" />
          <a-form :model="form">
            <div class="grid-with-img">
              <div>
                <div class="grid-2">
                  <a-form-item class="form-item mb-3" label="Xizmat nomi">
                    <a-input v="form.name" />
                  </a-form-item>
                  <a-form-item class="form-item mb-3" label="Xizmat nomi">
                    <a-input v="form.name" />
                  </a-form-item>
                </div>
                <a-form-item class="form-item mb-0 mt-0">
                  <quill-editor class="product-editor mt-0" :options="editorOption" />
                </a-form-item>
              </div>
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
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </div>
          </a-form>
          <div class="create-inner-variant">
            <span v-html="plusIcon"> </span>
            Qo’shish
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBlock from "../components/Title-block.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import FormTitle from "../components/Form-title.vue";
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
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      xIcon: require("../assets/svg/x.svg?raw"),
      plusIcon: require("../assets/svg/plus.svg?raw"),
      infoIcon: require("../assets/svg/info.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
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
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
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
      console.log("submit!", this.form);
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
  components: { TitleBlock, FormTitle },
};
</script>
<style lang="css">
.services-grid {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
}
.grid-with-img {
  display: grid;
  grid-template-columns: auto 273px;
  grid-gap: 24px;
}
.grid-with-img .clearfix {
  height: 100%;
  display: flex;
  align-items: flex-end;
}
.grid-with-img .ant-upload-list-picture-card-container,
.grid-with-img .ant-upload-list-picture-card .ant-upload-list-item,
.grid-with-img .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 273px;
}
</style>
