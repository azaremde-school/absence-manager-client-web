import { Vue, Component } from 'vue-property-decorator';

import { VCard } from 'vuetify/lib'
import { VCardTitle } from 'vuetify/lib'

@Component({
  components: {
    VCard,
    VCardTitle
  }
})
export default class OverviewComponent extends Vue {
  
}