import { Vue, Component } from 'vue-property-decorator';
import IStudent from '@/abstract/student';
import ISchoolClass from '@/abstract/school-class';

@Component
export default class AddClassDialogComponent extends Vue {
  dialog: boolean = false;

  name: string = '';
  className: string = '';
  students: IStudent[] = [];

  addStudent(): void {
    const instance: AddClassDialogComponent = this;

    if (!instance.name) return;

    instance.students.unshift({
      name: instance.name,
      absences: []
    })

    instance.name = '';
  }

  removeStudent(student: any): void {
    const instance: AddClassDialogComponent = this;

    instance.students.splice(instance.students.indexOf(student), 1);
  }

  save(): void {
    const instance: AddClassDialogComponent = this;

    instance.$request.subscribe({
      event: 'add-class__request',
      data: {
        name: instance.className,
        students: instance.students
      }
    });

    instance.$store.dispatch('logic/pushClass', {
      name: instance.className,
      students: instance.students
    });

    instance.dialog = false;
    instance.className = '';
  }
}
