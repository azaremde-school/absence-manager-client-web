import { Vue, Component } from 'vue-property-decorator';
// import IStudent from '@/abstract/student';

import { VSubheader } from 'vuetify/lib';
// import ISchoolClass from '@/abstract/school-class';

@Component({
  components: {
    VSubheader,
  },
})
export default class AddClassDialogComponent extends Vue {
  dialog: boolean = false;

  name: string = '';
  className: string = '';
  students: any[] = [];

  addStudent(): void {
    const instance: AddClassDialogComponent = this;

    if (!instance.name) return;

    instance.students.unshift({
      name: instance.name
    })

    instance.name = '';
  }

  removeStudent(student: any): void {
    const instance: AddClassDialogComponent = this;

    instance.students.splice(instance.students.indexOf(student), 1);
  }

  save(): void {
    const instance: AddClassDialogComponent = this;

    instance.dialog = false;
    instance.className = '';
  }
}
