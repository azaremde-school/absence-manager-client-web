<template>
  <v-dialog v-model="dialog" width="500px">
    <v-card>
      <v-card-title>Einstellungen</v-card-title>

      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-shape</v-icon>Gestaltung
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>Option 2
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account</v-icon>Autor
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["settingsDialog"],
  computed: {
    dialog: {
      get() {
        return this.settingsDialog;
      },
      set(value) {
        this.$emit("changeDialogValue", value);
      }
    }
  }
};
</script>

<style>
</style>