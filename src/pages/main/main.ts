import { Vue, Component } from 'vue-property-decorator';
import HeaderComponent from '@/components/header/header.component.vue';
import SidebarComponent from '@/components/sidebar/sidebar.component.vue';
import CalendarComponent from '@/components/calendar/calendar.component.vue';
import OverviewComponent from '@/components/overview/overview.component.vue';
import AddClassDialogComponent from '@/components/add-class-dialog/add-class-dialog.component.vue';


@Component({
  computed: {
    tab: {
      get() {
        this.$store.getters['ui/tab'];
      },
      set(value) {
        
      }
    }
  },
  components: {
    HeaderComponent,
    SidebarComponent,
    CalendarComponent,
    OverviewComponent,
    AddClassDialogComponent
  }
})
export default class ComponentTemplate extends Vue {
  
}