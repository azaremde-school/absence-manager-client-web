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
export default {
  computed: {
    rules: () => ({
      email: [
        v => !!v || "E-mail ist erforderlich",
        v => /.+@.+\..+/.test(v) || "E-mail muss gültig sein"
      ],
      password: [
        v => !!v || "Passwort ist erforderlich",
        v => (v || "").length >= 4 || "Das Passwort ist zu kurz",
        v => (v || "").length <= 16 || "Das Passwort ist zu lang",
        v => (v || "").indexOf(" ") < 0 || "Leerzeichen sind nicht erlaubt"
      ]
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
      email: "eugen@mail.com",
      password: "eugen",
      valid: false
    }
  }),

  methods: {
    submit() {
      if (!this.form.valid) {
        return;
      }

      const baseUrl = this.$store.getters["http/url"];

      this.ui.loading = true;

      this.axios
        .post(`${baseUrl}/account/login`, {
          ...this.form
        })
        .then(async result => {
          const success = result.data.result === "SUCCESS";

          if (success) {
            const { token } = result.data;

            this.$store.dispatch("account/setToken", token);
          } else {
            this.ui.snackbar = true;
          }

          this.ui.loading = false;
        });
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