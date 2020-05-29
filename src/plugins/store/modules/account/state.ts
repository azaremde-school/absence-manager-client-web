import IAccountStore from './account-store';

const state: IAccountStore = {
  _id: parseInt(localStorage.getItem('_id') || '-1'),
  token: localStorage.getItem('token') || '',
  session: localStorage.getItem('session') || '',
  auth: false
}

export default state;