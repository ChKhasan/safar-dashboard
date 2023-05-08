import Vue from "vue";
import {
  Button,
  Table,
  Upload,
  Checkbox,
  Switch,
  Modal,
  Popconfirm,
  Radio,
  Icon,
  Input,
  Spin,
  Pagination,
  Dropdown,
  Menu,
  Layout,
  Select,
  TimePicker,
  DatePicker,
  FormModel,
  notification,
  message,
  InputNumber,
  Skeleton,
  Empty,
  Alert,
} from "ant-design-vue";

Vue.prototype.$notification = notification;
Vue.prototype.$message = message;

Vue.use(Alert);
Vue.use(Empty);
Vue.use(DatePicker);
Vue.use(Skeleton);
Vue.use(TimePicker);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(FormModel);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Table);
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Modal);
Vue.use(Popconfirm);
Vue.use(Radio);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Spin);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(Menu);
