<template>
  <div id="sidebar">
    <v-navigation-drawer v-model="sidebar" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-group :ripple="false" v-for="(group, i) in $store.getters['groups/groups']" :key="i" @click="selectGroup(group._id)">
          <template v-slot:activator>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text fab small class="mr-2 my-2" v-on="on" color="primary" @click.stop="{}">
                  <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <span>Klasse verwalten</span>
            </v-tooltip>
            <v-list-item-content>
              <v-list-item-title>{{ group.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            class="pl-8"
            v-for="(member, j) in group.members"
            :key="j"
            :class="{ 'v-list-item--active': selectedMember === j }"
            @click="selectMember(member._id, j)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ member.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <AddGroupDialog />
    </v-navigation-drawer>
  </div>
</template>

<script>
import AddGroupDialog from "@/components/sidebar/AddGroupDialog.vue";

export default {
  components: {
    AddGroupDialog
  },

  computed: {
    sidebar: {
      get() {
        return this.$store.getters["ui/sidebar"];
      },
      set(value) {
        this.$store.dispatch("ui/showSidebar", value);
      }
    }
  },

  data: () => ({
    selectedGroup: -1,
    selectedMember: -1
  }),

  methods: {
    selectGroup(_id) {
      this.$store.dispatch('groups/selectGroup', _id)

      this.selectedMember = -1;
    },

    selectMember(_id, i) {
      this.$store.dispatch('groups/selectMember', _id);

      this.selectedMember = i;
    }
  }
};
</script>

<style>
</style>