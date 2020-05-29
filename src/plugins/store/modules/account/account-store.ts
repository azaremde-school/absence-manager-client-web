export default interface IAccountStore {
  _id: number;
  token: string;
  session: string;
  auth: boolean;
}