import { Vue, Component } from 'vue-property-decorator';
import IStudent from '@/abstract/student';
import ICalendarEvent from '@/abstract/calendar-event';
import IAbsence from '@/abstract/absence';
import ILessons from '@/abstract/lessons';
import getRanges from '@/helpers/get-ranges';
import convertReason from '@/helpers/convert-reason';


@Component({
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

  selectClass(index: number) {
    const instance: SidebarComponent = this;
    const selectedClass: string = instance.$store.getters['logic/classes'][index];
    instance.$store.dispatch('logic/selectClass', selectedClass);
  }

  selectStudent(student: IStudent, index: number) {
    const instance: SidebarComponent = this;

    instance.selectedStudent = index;

    instance.$store.dispatch('logic/selectStudent', student);
    
    var events: ICalendarEvent[] = [];

    console.log(student);

    for (var i = 0; i < student.absences.length; i++) {
      const absence: IAbsence = student.absences[i];

      events.push({
        start: absence.date,
        end: absence.date,
        name: `${getRanges(absence.lessons.numbers)} Std., ${convertReason(absence.lessons.reason).name} - ${absence.lessons.excused ? 'Attestiert' : 'Unattestiert'}`,
        color: convertReason(absence.lessons.reason).color
      })

      // for (var j = 0; j < absence.lessons.length; j++) {
      //   const lessons: ILessons = absence.lessons[j];

      //   events.push({
      //     start: absence.date,
      //     end: absence.date,
      //     name: getRanges(lessons.numbers) + ' Std., ' + convertReason(lessons.reason).name,
      //     color: convertReason(lessons.reason).color
      //   });
      // }
    }

    instance.$store.dispatch('calendar/setEvents', events);
  }
}