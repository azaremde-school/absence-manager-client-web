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
  // students: IStudent[] = [];

  addStudent(): void {
    const instance: AddClassDialogComponent = this;

    if (!instance.name) return;

    instance.name = '';
  }

  // removeStudent(student: IStudent): void {
  //   const instance: AddClassDialogComponent = this;

  //   instance.students.splice(instance.students.indexOf(student), 1);
  // }

  save(): void {
    const instance: AddClassDialogComponent = this;

    instance.dialog = false;

    // const schoolClass: ISchoolClass = {
    //   name: instance.className,
    //   students: [...instance.students],
    // };

    // instance.$store.dispatch('logic/pushClass', schoolClass);

    // const db = instance.$store.getters['db/accessor'];

    // db.get('classes').then((result: PouchDB.Core.Response | null) => {
    //   if (result) {
    //     db.put({
    //       _id: 'classes',
    //       _rev: (result as any)._rev,
    //       elements: [
    //         ...(result as any).elements,
    //         schoolClass
    //       ]
    //     })
    //   }
    // }, (error: PouchDB.Core.Error | null) => {
    //   if (error && error.status === 404) {
    //     db.put({
    //       _id: 'classes',
    //       elements: [
    //         schoolClass
    //       ]
    //     }, (error: PouchDB.Core.Error | null, result: PouchDB.Core.Response | null) => {
    //       if (error) {
    //         console.log(error);
    //       } else if (result) {
    //         console.log(result);
    //       }
    //     })
    //   }
    // });

    // instance.students = [];
    instance.className = '';
  }
}
