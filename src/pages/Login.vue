<template>
  <div class="d-flex fill-height justify-center align-center">
    <v-card width="400" height="auto" class="mx-auto flex-grow-0">
      <v-card-title>Einloggen</v-card-title>
      <v-card-text>
        <v-form v-model="form.valid">
          <v-text-field
            :rules="rules.email"
            v-model="form.email"
            autocomplete="off"
            type="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            :rules="rules.password"
            v-model="form.password"
            autocomplete="off"
            type="password"
            label="Passwort"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="ui.loading" @click="submit()" color="primary">Einloggen</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="signup()" text>Anmelden</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="ui.snackbar">
      Falsche Kombination Email/Passwort
      <v-btn color="primary" text @click="ui.snackbar = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { email, password } from "@/static/rules";

export default {
  computed: {
    rules: () => ({
      email,
      password
    })
  },
  data: () => ({
    ui: {
      message: "",
      snackbar: false,
      loading: false,
      showPassword: false
    },
    form: {
      email: "",
      password: "",
      valid: false
    }
  }),

  methods: {
    async submit() {
      if (!this.form.valid) {
        return;
      }

      const baseUrl = this.$store.getters["http/url"];

      this.ui.loading = true;

      const { data } = await this.axios.post(`${baseUrl}/account/login`, {
        ...this.form
      });

      if (data.result === "SUCCESS") {
        const { token } = data;
        localStorage.setItem('token', token);        

        /**
         * We prevent the router from checking
         * whether the client is authorized.
         */
        this.$store.dispatch('account/setStopChecking', true);

        this.$router.push({
          name: 'Main'
        })

        /**
         * And again let it check the authorization.
         */
        this.$store.dispatch('account/setStopChecking', false);
      } else {
        this.ui.snackbar = true;
      }

      this.loading = false;
    },

    signup() {
      this.$router.push({
        name: "Signup"
      });
    }
  }
};
</script>

<style>
</style>