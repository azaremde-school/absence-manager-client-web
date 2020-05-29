import { Vue, Component } from 'vue-property-decorator';
import CalendarComponent from '@/components/calendar/calendar.component.vue';
import OverviewComponent from '@/components/overview/overview.component.vue';


@Component({
  components: {
    CalendarComponent,
    OverviewComponent
  }
})
export default class ActivitiesComponent extends Vue {
  
}