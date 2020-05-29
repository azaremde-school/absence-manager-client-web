import { Vue, Component } from 'vue-property-decorator';
import ISignup from '@/abstract/signup';


@Component({
  events: {
    'sign-up__success': function(data: undefined) {
      const instance: SignupComponent = <SignupComponent> this;

      instance.loading = false;
    }
  }
})
export default class SignupComponent extends Vue {
  login = false;
  snackbar = false;
  showPassword: boolean = false;

  user: ISignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  confirmation: string = '';

  loading: boolean = false;

  rules: object = {
    email: [(v: string) => !!v || 'E-mail ist erforderlich', (v: string) => /.+@.+\..+/.test(v) || 'E-mail muss gültig sein'],
    name: [(v: string) => !!v || 'Name ist erforderlich'],
    password: [(v: string) => !!v || 'Passwort ist erforderlich', (v: string) => (v || '').length <= 16 || 'Das Passwort ist zu lang', (v: string) => (v || '').indexOf(' ') < 0 || 'Leerzeichen sind nicht erlaubt'],
    confirmPassword: [
      (v: string) => (v || '').length <= 16 || 'Das Passwort ist zu lang',
      (v: string) => (v || '').indexOf(' ') < 0 || 'Leerzeichen sind nicht erlaubt',
      (v: string) => (!!v && v) === this.user?.password || 'Passwörter müssen übereinstimmen',
    ],
  };

  submit(): void {
    const instance: SignupComponent = this as SignupComponent;
    
    const validation: boolean = (<any>this.$refs.signUp).validate();

    if (!validation) { return; }

    instance.loading = true;

    instance.$request.subscribe({
      event: 'sign-up__request',
      data: instance.user
    });
  }
}