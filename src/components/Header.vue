<template>
  <div class="header">
    <v-app-bar
      class="header px-1"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon
            v-on="on"
            @click="$store.dispatch('ui/showSidebar', !$store.getters['ui/sidebar'])"
          ></v-app-bar-nav-icon>
        </template>
        <span>Ihre Gruppen</span>
      </v-tooltip>

      <v-sheet color="transparent">
        <v-toolbar-title class="ml-0 px-4">
          <span class="hidden-sm-and-down">{{ $vuetify.lang.t('$vuetify.name') }}</span>
        </v-toolbar-title>
      </v-sheet>

      <v-tabs hide-slider class="fill-height" v-model="tab" dark>
        <v-tabs-slider></v-tabs-slider>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-tab v-on="on">
              {{ $vuetify.lang.t('$vuetify.tabs[0]') }}
              <v-icon class="ml-2">mdi-calendar</v-icon>
            </v-tab>
          </template>
          <span>Hier tragen Sie die Fehlzeiten ein</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-tab v-on="on">
              {{ $vuetify.lang.t('$vuetify.tabs[1]') }}
              <v-icon class="ml-2">mdi-account-box</v-icon>
            </v-tab>
          </template>
          <span>Gesammelte Daten</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-tab v-on="on">
              {{ $vuetify.lang.t('$vuetify.tabs[2]') }}
              <v-icon class="ml-2">mdi-help-circle</v-icon>
            </v-tab>
          </template>
          <span>Hier werden Ihre Fragen beantwortet</span>
        </v-tooltip>
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
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon @click="settingsDialog = true">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn @click="$store.dispatch('account/logOut')" icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <Settings
      v-bind="{
        settingsDialog
      }"
      v-on:changeDialogValue="settingsDialog = false"
    />
  </div>
</template>

<script>
export default {
  components: {
    Settings: () => import("@/components/Settings.vue")
  },
  data: () => ({
    settingsDialog: false
  }),
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
.header
  .v-tabs-slider
    background-color: white !important
  .v-tab--active
    color: white !important
    *
      color: white !important
</style>