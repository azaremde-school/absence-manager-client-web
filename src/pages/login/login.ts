import { Vue, Component } from 'vue-property-decorator';
import ILogin from '@/abstract/login';

@Component({
  events: {
    'log-in__success': function(data: any) {
      const instance: LoginComponent = this as LoginComponent;

      instance.$store.dispatch('account/setId', data._id);
      instance.$store.dispatch('account/setToken', data.token);
      instance.$store.dispatch('account/setSession', data.session);

      instance.$store.dispatch('account/setAuthentication', true);

      instance.$router.replace({
        name: 'main'
      });
    }
  }
})
export default class LoginComponent extends Vue {
  login = false;
  snackbar = false;
  showPassword: boolean = false;

  user: ILogin = {
    email: '',
    password: '',
  };

  rules: object = {
    email: [(v: string) => !!v || 'E-mail ist erforderlich', (v: string) => /.+@.+\..+/.test(v) || 'E-mail muss gültig sein'],
    password: [(v: string) => !!v || 'Passwort ist erforderlich'],
  };

  submit(): void {
    const instance: LoginComponent = this;

    instance.$request.subscribe({
      event: 'log-in__request',
      data: instance.user,
    });
  }
}
