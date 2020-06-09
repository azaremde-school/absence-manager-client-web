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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      const url = vm.$store.getters["http/url"];
      const token = localStorage.getItem('token');

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

          if (groups.length) {
            vm.$store.dispatch('groups/reset');
    
            for (var i = 0; i < groups.length; i++) {
              vm.$store.dispatch('groups/addGroup', groups[i]);
            }
          }
        });
    })
  },

  components: {
    Header,
    Sidebar,
    Activities
  }
};
</script>
