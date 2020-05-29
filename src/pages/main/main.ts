import { Vue, Component } from 'vue-property-decorator';
import HeaderComponent from '@/components/header/header.component.vue';
import AddClassDialogComponent from '@/components/add-class-dialog/add-class-dialog.component.vue';
import ActivitiesComponent from '@/components/activities/activities.component.vue';
import SidebarComponent from '@/components/sidebar/sidebar.component.vue';
import ISchoolClass from '@/abstract/school-class';


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
    SidebarComponent,
    HeaderComponent,
    AddClassDialogComponent,
    ActivitiesComponent
  },
  events: {
    ['get-classes__response']: function(classes: ISchoolClass[]) {
      const instance: MainComponent = this as MainComponent;

      instance.$store.dispatch('logic/setClasses', classes);
    }
  }
})
export default class MainComponent extends Vue {
  mounted() {
    const instance: MainComponent = this;

    instance.$request.subscribe({
      event: 'get-classes__request'
    })
  }
}