<template>
  <div id="sidebar">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="sidebar"
      app
    >
      <div v-if="$store.getters['groups/noGroups']">
        <v-subheader>
          Die Liste Ihrer Gruppen ist leer.
        </v-subheader>
        <v-subheader>
          Um eine Gruppe zu erstellen, klicken Sie auf das Plus unten.
        </v-subheader>
      </div>

      <v-list dense>
        <v-list-group :ripple="false" v-for="(group, i) in $store.getters['groups/groups']" :key="i" @click="selectGroup(group._id)">
          <template v-slot:activator>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn text fab small class="mr-2 my-2" v-on="on" color="primary" @click.stop="editGroup(group._id)">
                  <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <span>Gruppe verwalten</span>
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
      <EditGroupDialog
        v-bind="{
          groupEditing,
          editingGroup
        }"
        v-on:changeGroupEditing="changeGroupEditing"
      />

    </v-navigation-drawer>
  </div>
</template>

<script>
// import AddGroupDialog from "@/components/sidebar/AddGroupDialog.vue";
// import EditGroupDialog from "@/components/sidebar/EditGroupDialog.vue";

export default {
  components: {
    AddGroupDialog: () => import("@/components/sidebar/AddGroupDialog.vue"),
    EditGroupDialog: () => import("@/components/sidebar/EditGroupDialog.vue")
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
    selectedMember: -1,
    groupEditing: false,
    editingGroup: -1
  }),

  methods: {
    selectGroup(_id) {
      this.$store.dispatch('groups/selectGroup', _id)

      this.selectedMember = -1;
      this.$store.dispatch('groups/selectMember', -1);
    },

    selectMember(_id, i) {
      this.$store.dispatch('groups/selectMember', _id);

      this.selectedMember = i;
    },

    editGroup(_id) {
      this.groupEditing = true;
      this.editingGroup = _id;
    },

    changeGroupEditing(value) {
      this.groupEditing = value;
    }
  }
};
</script>

<style>
</style>