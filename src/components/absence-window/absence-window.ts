import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
// import getRanges from '@/helpers/get-ranges';
// import { reasonToNumber } from '@/helpers/convert-reason';

@Component({  
  computed: {
    indeterminate: {
      get() {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        return instance.lessonsChecked.length < parsedLessonsCount && instance.lessonsChecked.length !== 0;
      },
    },
    allLessons: {
      get() {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        return instance.lessonsChecked.length === parsedLessonsCount;
      },
      set(value: boolean) {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;
        
        instance.lessonsChecked = [];

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        if (value) {
          for (var i = 0; i < parsedLessonsCount; i++) {
            instance.lessonsChecked.push(i);
          }
        }

        return true;
      },
    },
    allReasons: {
      get() {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        const allMatch = instance.reasonsChecked.length === parsedLessonsCount && !instance.reasonsChecked.find(el => instance.reasonsChecked[0] !== el);

        return allMatch ? instance.reasonsChecked[0] : null;
      },
      set(value) {        
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        instance.reasonsChecked = [];
        for (var i = 0; i < parsedLessonsCount; i++) {
          instance.reasonsChecked.push(value);
        }
      }
    },
    allExcused: {
      get() {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        return instance.excusedChecked.length === parsedLessonsCount;
      },
      set(value: boolean) {
        const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;
        
        instance.excusedChecked = [];

        const parsedLessonsCount: number = parseInt(instance.lessonsCount);

        if (value) {
          for (var i = 0; i < parsedLessonsCount; i++) {
            instance.excusedChecked.push(i);
          }
        }

        return true;
      },
    },
  }
})
export default class AbsenceWindowComponent extends Vue {
  lessonsChecked: number[] = [];
  excusedChecked: number[] = [];
  reasonsChecked: (string | undefined)[] = [];

  lessonsCount: string = '6';

  reasons: string[] = [
    'Krankheit',
    'Ausflug',
    'Arztbesuch',
    'Familiäre Gründe',
    'Sonstiges'
  ]

  @Watch('lessonsChecked')
  onChange(newArr: any, oldArr: any) {
    const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

    const change: number = oldArr.find((value: number) => !newArr.includes(value));

    if (change || change === 0) {      
      instance.reasonsChecked[change] = undefined;
    }
  }

  save(): void {
    const instance: AbsenceWindowComponent = <AbsenceWindowComponent>this;

    const lessons = [...instance.lessonsChecked];
    const reasons = [...instance.reasonsChecked];
    const excused = [...instance.excusedChecked];

    var pairs = [];
    var parsed: any[] = [];

    for (var i = 0; i < reasons.length; i++) {
      if (lessons.includes(i)) {
        pairs.push({
          lesson: i + 1,
          reason: reasons[i],
          excused: excused.includes(i)
        })
      }
    }

    for (var i = 0; i < pairs.length; i++) {
      const date: string = instance.selectedDate;
      const reason: string = pairs[i].reason || '';
      const excused: boolean = pairs[i].excused;
      const lessons: number[] = pairs.filter(pair => pair.reason === reason && pair.excused === excused).map(el => el.lesson);

      // if (!parsed.find(el => el.lessons.reason === reasonToNumber(reason) && el.lessons.excused === excused)) {
      //   parsed.push({
      //     date,
      //     lessons: {
      //       numbers: lessons,
      //       reason: reasonToNumber(reason),
      //       excused
      //     }
      //   });
      // }
    }

    const selectedStudent: string = instance.$store.getters['logic/selectedStudent'].name;

    if (selectedStudent) {
      for (var i = 0; i < parsed.length; i++) {
        instance.$store.dispatch('logic/pushAbsence', { selectedStudent, absence: parsed[i] });
      }
    }

    
    instance.$emit('absence-window-close');
  }

  @Prop()
  x!: number;

  @Prop()
  y!: number;

  @Prop()
  selectedDate!: string;
}