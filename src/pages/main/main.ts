import { Vue, Component } from 'vue-property-decorator';
import HeaderComponent from '@/components/header/header.component.vue';
import SidebarComponent from '@/components/sidebar/sidebar.component.vue';
import CalendarComponent from '@/components/calendar/calendar.component.vue';
import OverviewComponent from '@/components/overview/overview.component.vue';


@Component({
  components: {
    HeaderComponent,
    SidebarComponent,
    CalendarComponent,
    OverviewComponent
  }
})
export default class ComponentTemplate extends Vue {
  
}