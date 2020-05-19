import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions('ui', [
      'toggleSidebar'
    ])
  }
})
export default class HeaderComponent extends Vue {
  private toggleSidebar!: (arg?: any) => void;
}