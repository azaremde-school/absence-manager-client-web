<template>
  <div id="sidebar">
    <v-navigation-drawer v-model="sidebar" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <AddClassDialog />
    </v-navigation-drawer>
  </div>
</template>

<script>
import AddClassDialog from "@/components/sidebar/AddClassDialog.vue";

export default {
  components: {
    AddClassDialog
  },

  computed: {
    sidebar: {
      get() {
        return this.$store.getters['ui/sidebar'];
      },
      set(value) {
        this.$store.dispatch('ui/showSidebar', value);
      }
    }
  }
};
</script>

<style>
</style>