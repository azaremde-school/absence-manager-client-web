import ISchoolClass from '@/abstract/school-class';
import IStudent from '@/abstract/student';

export default interface ILogicStore {
  classes: ISchoolClass[];
  selectedStudent: IStudent | null;
  selectedClass: ISchoolClass | null;
}