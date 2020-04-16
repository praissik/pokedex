import Vue from 'vue';

// import parts of framework
import {
  Select,
  Option,
  Pagination
} from 'element-ui';

// register element-ui components
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Pagination.name, Pagination);