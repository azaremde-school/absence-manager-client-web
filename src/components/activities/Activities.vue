<template>
  <div>
    <v-content class="fill-height main-tabs">
      <v-tabs v-model="tab">
        <v-tab-item>
          <Overview />
        </v-tab-item>
        <v-tab-item>
          <Calendar />
        </v-tab-item>
        <v-tab-item>
          <Help />
        </v-tab-item>
      </v-tabs>
    </v-content>
  </div>
</template>

<script>
import Overview from "@/components/activities/overview/Overview.vue";
import Calendar from "@/components/activities/calendar/Calendar.vue";
import Help from "@/components/activities/help/Help.vue";

export default {
  computed: {
    tab: {
      get() {
        return this.$store.getters['ui/tab'];
      }
    }
  },
  components: {
    Overview,
    Calendar,
    Help
  }
};
</script>

<style lang="sass">
.main-tabs .v-tabs-bar
  display: none !important
</style>