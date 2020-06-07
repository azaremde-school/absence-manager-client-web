<template>
  <div>
    <Header />
    <Sidebar />
    <Activities />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Activities from "@/components/activities/Activities.vue";

export default {
  name: "Main",

  components: {
    Header,
    Sidebar,
    Activities
  }
};
</script>
