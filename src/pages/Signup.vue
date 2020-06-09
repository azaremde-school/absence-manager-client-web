<template>
  <div class="d-flex fill-height justify-center align-center">
    <v-card width="450" height="auto" class="mx-auto flex-grow-0">
      <v-card-title>Anmelden</v-card-title>
      <v-card-text>
        <v-form v-model="form.valid">
          <div class="d-flex">
            <v-text-field
              class="mr-2"
              v-model="form.firstName"
              prepend-icon="account_circle"
              autocomplete="off"
              :rules="rules.name"
              type="name"
              label="Vorname"
            ></v-text-field>
            <v-text-field
              class="ml-2"
              v-model="form.lastName"
              autocomplete="off"
              :rules="rules.name"
              type="name"
              label="Nachname"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            prepend-icon="mail"
            autocomplete="off"
            type="email"
            label="Email"
          ></v-text-field>
          <div class="d-flex">
            <v-text-field
              class="mr-2"
              v-model="form.password"
              prepend-icon="mdi-lock"
              label="Passwort"
              required
              :type="ui.showPassword ? 'text' : 'password'"
              :rules="rules.password"
              @click:append="ui.showPassword = !ui.showPassword "
            ></v-text-field>
            <v-text-field
              class="ml-2"
              v-model="confirmation"
              required
              :append-icon="ui.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="ui.showPassword ? 'text' : 'password'"
              :rules="rules.confirmPassword"
              @click:append="ui.showPassword = !ui.showPassword "
              label="Passwort bestätigen"
            ></v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="ui.loading" @click="submit()" color="primary">Anmelden</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="login()" text>Einloggen</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="ui.snackbar">
      {{ ui.message }}
      <v-btn color="primary" text @click="ui.snackbar = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { capitalize } from '@/util/string';

export default {
  computed: {
    rules() {
      return {
        email: [
          v => !!v || "E-mail ist erforderlich",
          v => v === 'admin' || /.+@.+\..+/.test(v) || 'E-mail muss gültig sein',
        ],
        name: [v => !!v || "Name ist erforderlich"],
        password: [
          v => !!v || "Passwort ist erforderlich",
          v => (v || "").length >= 4 || "Das Passwort ist zu kurz",
          v => (v || "").length <= 16 || "Das Passwort ist zu lang",
          v => (v || "").indexOf(" ") < 0 || "Leerzeichen sind nicht erlaubt"
        ],
        confirmPassword: [
          v =>
            (!!v && v) === this.form.password ||
            "Passwörter müssen übereinstimmen"
        ]
      };
    }
  },
  data: () => ({
    ui: {
      message: "",
      snackbar: false,
      loading: false,
      showPassword: false
    },
    form: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      valid: false
    },
    confirmation: ""
  }),

  methods: {
    submit() {
      if (!this.form.valid) {
        return;
      }

      const baseUrl = this.$store.getters["http/url"];

      this.ui.loading = true;

      this.form.firstName = capitalize(this.form.firstName);
      this.form.lastName = capitalize(this.form.lastName);

      this.axios
        .post(`${baseUrl}/account/signup`, {
          ...this.form
        })
        .then(result => {
          const success = result.data.result === "SUCCESS";

          this.ui.message = success
            ? "Ihr Konto wurde erfolgreich erstellt."
            : "Benutzer mit dieser Email ist bereits registriert.";
          this.ui.snackbar = true;
          this.ui.loading = false;
        });
    },

    login() {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>

<style>
</style>