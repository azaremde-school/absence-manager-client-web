<template>
  <div id="header">
    <v-app-bar
      class="header px-1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click="
          $store.dispatch('ui/showSidebar', !$store.getters['ui/sidebar'])
        "
      >
      </v-app-bar-nav-icon>
      <v-sheet color="transparent">
        <v-toolbar-title class="ml-0 px-4">
          <span class="hidden-sm-and-down">{{ $vuetify.lang.t('$vuetify.name') }}</span>
        </v-toolbar-title>
      </v-sheet>

      <v-tabs class="fill-height" v-model="tab" dark>
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          {{ $vuetify.lang.t('$vuetify.tabs[0]') }}
          <v-icon class="ml-2">mdi-account-box</v-icon>
        </v-tab>
        <v-tab>
          {{ $vuetify.lang.t('$vuetify.tabs[1]') }}
          <v-icon class="ml-2">mdi-calendar</v-icon>
        </v-tab>
        <v-tab @click="$store.dispatch('training/start')">
          {{ $vuetify.lang.t('$vuetify.tabs[2]') }}
          <v-icon class="ml-2">mdi-help-circle</v-icon>
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languages"
            :key="index"
            @click="$vuetify.lang.current = item.value"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        return this.$store.getters["ui/tab"];
      },
      set(value) {
        this.$store.dispatch("ui/setTab", value);
      }
    },
    languages: () => [
      {
        name: "Deutsch",
        value: "de"
      },
      {
        name: "English",
        value: "en"
      },
      {
        name: "Русский",
        value: "ru"
      }
    ]
  }
};
</script>

<style lang="sass">
.highlighted  
  box-shadow: 0 0 0 5000px rgba(0, 0, 0, .7) !important
  z-index: 9999 !important
  pointer-events: auto !important
  transition: all 0.5s ease !important

.v-tabs
  .v-slide-group__wrapper
    contain: none
    overflow: visible

.v-tabs-slider
  background-color: white !important
.v-tab--active
  color: white !important
  *
    color: white !important
</style>