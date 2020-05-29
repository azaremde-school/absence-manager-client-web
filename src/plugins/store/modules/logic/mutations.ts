import { MutationTree } from 'vuex';
import ILogicStore from './logic-store';
import ISchoolClass from '@/abstract/school-class';
import IAbsence from '@/abstract/absence';
import IStudent from '@/abstract/student';

const mutations: MutationTree<ILogicStore> = {
  PUSH_CLASS(state, schoolClass: ISchoolClass) {
    state.classes.push(schoolClass);
  },

  SET_CLASSES(state, schoolClasses: ISchoolClass[]) {
    state.classes = schoolClasses;
  },

  SELECT_STUDENT(state, student: IStudent | null) {
    state.selectedStudent = student;
  },

  SELECT_CLASS(state, schoolClass: ISchoolClass | null) {
    state.selectedClass = schoolClass;
  },

  PUSH_ABSENCE(state, absence: { selectedClass: string; selectedStudent: string; absence: IAbsence }) {
    var schoolClass: ISchoolClass | undefined = state.classes.find(_class => _class.name === absence.selectedClass);

    console.log(absence.selectedClass, schoolClass);

    if (schoolClass) {
      var student: IStudent | undefined = schoolClass.students.find(_student => _student.name === absence.selectedStudent);

      if (student) {
        student.absences.push(absence.absence);
      }
    }
  }
};

export default mutations;
