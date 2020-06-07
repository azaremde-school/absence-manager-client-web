<template>
  <div id="header">
    <v-app-bar
      class="header px-1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="$store.dispatch('ui/showSidebar', !$store.getters['ui/sidebar'])"></v-app-bar-nav-icon>
      <v-sheet color="transparent">
        <v-toolbar-title class="ml-0 px-4">
          <span class="hidden-sm-and-down">Abwesenheitsmanager</span>
        </v-toolbar-title>
      </v-sheet>

      <v-tabs hide-slider class="fill-height" v-model="tab" dark>
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          Home
          <v-icon class="ml-2">mdi-home</v-icon>
        </v-tab>
        <v-tab>
          Überblick
          <v-icon class="ml-2">mdi-account-box</v-icon>
        </v-tab>
        <v-tab>
          Kalendar
          <v-icon class="ml-2">mdi-calendar</v-icon>
        </v-tab>
        <v-tab>
          Hilfe
          <v-icon class="ml-2">mdi-help-circle</v-icon>
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn @click="$store.dispatch('account/logOut')" icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {  
  computed: {
    tab: {
      get() {
        return this.$store.getters['ui/tab'];
      },
      set(value) {
        this.$store.dispatch('ui/setTab', value);
      }
    }
  },
};
</script>

<style>
</style>