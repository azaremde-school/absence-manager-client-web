<template>
  <div>
    <Header />
    <Sidebar />
    <Activities />
  </div>
</template>

<script>
import axios from 'axios';

import Header from "@/components/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Activities from "@/components/activities/Activities.vue";

export default {
  name: "Main",

  mounted() {
    const url = this.$store.getters["http/url"];
    const token = this.$store.getters["account/token"];

    axios
      .get(
        `${url}/logic/get_groups`,
        {
          headers: {
            token
          }
        }
      )
      .then(response => {
        const groups = response.data;

        for (var i = 0; i < groups.length; i++) {
          this.$store.dispatch('groups/addGroup', groups[i]);
        }
      });
  },

  components: {
    Header,
    Sidebar,
    Activities
  }
};
</script>
