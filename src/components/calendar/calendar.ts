import { Vue, Component } from 'vue-property-decorator';
import ICalendarEvent from '@/abstract/calendar-event';
import ignoreAnnoyingVueWarn from '@/helpers/ignore-annoying-vue-warn';
import AbsenceWindowComponent from '@/components/absence-window/absence-window.component.vue';


const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

Vue.config.warnHandler = ignoreAnnoyingVueWarn;

@Component({
  components: {
    AbsenceWindowComponent
  },
})
export default class CalendarComponent extends Vue {
  type: 'month' | 'week' | 'day' = 'month';

  today: string | null = null;
  date: string | null = null;
  value: string | null = null;

  menu: boolean = false;

  dayMenu: boolean = false;
  absenceMenu: boolean = false;

  selectedElement: null = null;
  selectedOpen: boolean = false;
  selectedEvent: ICalendarEvent = {
    start: '',
    end: '',
    name: '',
    color: '',
  };

  headers: string[] = ['lessons'];

  items = [
    {
      lessons: 1,
    },
    {
      lessons: 2,
    },
    {
      lessons: 3,
    },
  ];

  // test(): void {
  //   console.log(this.lessonsChecked);
  // }

  mounted(): void {
    const instance: CalendarComponent = this;

    instance.value = new Date().toISOString();
  }

  getDate(): string {
    const instance: CalendarComponent = this;

    if (!!instance.value) {
      const date = new Date(instance.value);

      return `${months[date.getMonth()]}, ${date.getUTCFullYear().toString()}`;
    } else {
      return '';
    }
  }

  getEventColor(event: ICalendarEvent): string {
    return event.color;
  }

  showEvent(events: { nativeEvent: any; event: any }): void {
    const instance: CalendarComponent = this;

    const open = () => {
      instance.selectedEvent = events.event;
      instance.selectedElement = events.nativeEvent.target;
      setTimeout(() => (instance.selectedOpen = true), 10);
    };
    if (instance.selectedOpen) {
      instance.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }
    events.nativeEvent.stopPropagation();
  }

  x: number = 0;
  y: number = 0;

  selectedDate: string | null = null;

  viewDay(calendarEvent: any): void {
    const instance: CalendarComponent = this;

    if (!instance.$store.getters['logic/selectedStudent']) return;

    instance.dayMenu = false;
    instance.absenceMenu = false;

    instance.x = (event as any).clientX;
    instance.y = (event as any).clientY;

    setTimeout(() => {
      instance.dayMenu = true;
    }, 10);
  }

  openAbsenceMenu(): void {
    const instance: CalendarComponent = this;

    instance.dayMenu = false;

    setTimeout(() => {
      instance.absenceMenu = true;
    }, 10);
  }

  absenceWindowClose(): void {
    const instance: CalendarComponent = this;

    instance.dayMenu = false;
    instance.absenceMenu = false;
  }

  updateRange(): void {}
}
