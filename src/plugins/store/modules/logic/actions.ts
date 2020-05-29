import { ActionTree } from 'vuex';
import ILogicStore from './logic-store';
import IRootState from '../../root-state';
import ISchoolClass from '@/abstract/school-class';
import IAbsence from '@/abstract/absence';

const actions: ActionTree<ILogicStore, IRootState> = {
  pushClass(context, schoolClass: ISchoolClass) {
    context.commit('PUSH_CLASS', schoolClass);
  },

  setClasses(context, schoolClasses: ISchoolClass[]) {
    context.commit('SET_CLASSES', schoolClasses);
  },

  selectStudent(context, student: string) {
    context.commit('SELECT_STUDENT', student);
  },

  selectClass(context, schoolClass: string) {
    context.commit('SELECT_CLASS', schoolClass);
  },

  pushAbsence(context, absence: { selectedClass: string; selectedStudent: string; absence: IAbsence }) {
    context.commit('PUSH_ABSENCE', absence);
  }
};

export default actions;
