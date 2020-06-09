<template>
  <div>
    <v-content class="fill-height main-tabs">
      <v-tabs v-model="tab">
        <v-tab-item>
          <Calendar />
        </v-tab-item>
        <v-tab-item>
          <Overview />
        </v-tab-item>
        <v-tab-item>
          <Help />
        </v-tab-item>
      </v-tabs>
    </v-content>
  </div>
</template>

<script>
export default {
  computed: {
    tab: {
      get() {
        return this.$store.getters['ui/tab'];
      }
    }
  },
  components: {
    Overview: () => import('@/components/activities/overview/Overview.vue'),
    Calendar: () => import('@/components/activities/calendar/Calendar.vue'),
    Help: () => import('@/components/activities/help/Help.vue'),
  }
};
</script>

<style lang="sass">
.main-tabs .v-tabs-bar
  display: none !important
</style>