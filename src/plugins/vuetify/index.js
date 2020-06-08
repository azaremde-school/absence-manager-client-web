import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './global.sass';

Vue.use(Vuetify);

import de from './translation/de';
import en from './translation/en';
import ru from './translation/ru';

export default new Vuetify({
  lang: {
    locales: {
      de,
      en,
      ru
    },
    current: 'de'
  }
});
