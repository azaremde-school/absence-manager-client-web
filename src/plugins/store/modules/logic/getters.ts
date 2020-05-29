import { GetterTree } from 'vuex';
import ILogicStore from './logic-store';
import IRootState from '../../root-state';

const getters: GetterTree<ILogicStore, IRootState> = {
  classes: state => state.classes,
  selectedStudent: state => state.selectedStudent,
  selectedClass: state => state.selectedClass,
}

export default getters;