import { Vue, Component } from 'vue-property-decorator';


import { VBtn } from 'vuetify/lib';
import { VIcon } from 'vuetify/lib';



@Component({
  components: {
    VBtn,
    VIcon
  },
  computed: {
    classes: {
      get() {
        return this.$store.getters['logic/classes'];
      },
      set(value) {
        return;
      }
    },
    sidebar: {
      get() {
        return this.$store.getters['ui/sidebar'];
      },
      set(value: boolean) {
        this.$store.dispatch('ui/setSidebar', value);
      }
    }
  }
})
export default class SidebarComponent extends Vue {
  selectedStudent: number = -1;

  // selectStudent(student: IStudent, index: number) {
  //   const instance: SidebarComponent = this;

  //   instance.selectedStudent = index;

  //   instance.$store.dispatch('logic/selectStudent', student);
    
  //   var events: ICalendarEvent[] = [];

  //   for (var i = 0; i < student.absences.length; i++) {
  //     const absence: IAbsence = student.absences[i];

  //     for (var j = 0; j < absence.lessons.length; j++) {
  //       const lessons: ILessons = absence.lessons[j];

  //       events.push({
  //         start: absence.date,
  //         end: absence.date,
  //         name: getRanges(lessons.numbers) + ' Std., ' + convertReason(lessons.reason).name,
  //         color: convertReason(lessons.reason).color
  //       })
  //     }
  //   }

  //   instance.$store.dispatch('calendar/setEvents', events);
  // }
}