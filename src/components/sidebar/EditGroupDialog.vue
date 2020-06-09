<template>
  <v-dialog v-model="dialog" width="500px">
    <v-card>
      <v-card-title class="primary darken-1 white--text">{{ title }}</v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12" class="py-0">
            <form autocomplete="off" v-on:submit.prevent="addMember()">
              <v-text-field
                hide-details
                v-model="name"
                prepend-icon="mdi-account-circle"
                append-icon="mdi-plus"
                @click:append="addMember()"
                :placeholder="$vuetify.lang.t('$vuetify.addGroupDialog.newMember')"
              ></v-text-field>
            </form>
            <v-card-title
              class="mb-n3 pb-0"
            >{{ $vuetify.lang.t('$vuetify.addGroupDialog.addedMembers') }}</v-card-title>
            <v-subheader
              v-if="members.length === 0"
            >{{ $vuetify.lang.t('$vuetify.addGroupDialog.empty') }}</v-subheader>
            <v-list v-else class="my-scroll mt-2" max-height="300" style="overflow-y: auto;">
              <div v-for="(member, i) in members" :key="i">
                <v-list-item
                  v-if="!removedMembers.includes(member._id)"
                  @click="{}"
                  :ripple="false"
                >
                  <div class="d-flex flex-row justify-space-betweeen flex-grow-1">
                    <v-list-item-title>{{ member.name }}</v-list-item-title>
                    <v-btn @click="removeMember(member)" fab x-small text>
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-list-item>
              </div>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save()" color="primary">{{ $vuetify.lang.t('$vuetify.save') }}</v-btn>
        <v-btn text @click="close()">{{ $vuetify.lang.t('$vuetify.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["groupEditing", "editingGroup"],
  computed: {
    dialog: {
      get() {
        return this.groupEditing;
      },
      set(value) {
        this.$emit("changeGroupEditing", value);
      }
    },
    title() {
      const group = this.$store.getters["groups/groups"].find(
        g => g._id === this.editingGroup
      );

      return group?.name || "";
    },
    oldMembers() {
      const group = this.$store.getters["groups/groups"].find(
        g => g._id === this.editingGroup
      );

      return group ? group.members : [];
    },
    members() {
      const group = this.$store.getters["groups/groups"].find(
        g => g._id === this.editingGroup
      );

      return [
        ...this.newMembers,
        ...(group ? group.members.map(m => ({ name: m.name, _id: m._id })) : [])
      ];
    }
  },
  data: () => ({
    name: "",
    group: "",
    newMembers: [],
    removedMembers: []
  }),

  methods: {
    addMember() {
      if (!this.name) return;

      this.newMembers.unshift({
        name: this.name,
        _id: this.members.length
      });

      this.name = "";
    },

    removeMember(member) {
      this.removedMembers.push(member._id);

      const indexInNewMembers = this.newMembers.findIndex(
        m => m._id === member._id
      );

      if (indexInNewMembers !== -1) {
        this.newMembers.splice(indexInNewMembers, 1);
      }

      const indexInOldMembers = this.oldMembers.findIndex(
        m => m._id === member._id
      );

      if (indexInOldMembers !== -1) {
        this.oldMembers[indexInOldMembers].removed = true;
      }
    },

    close() {
      this.dialog = false;
      this.group = "";
      this.newMembers = [];
      this.removedMembers = [];
    },

    save() {
      this.dialog = false;

      this.$store.dispatch("groups/editGroup", {
        group: this.editingGroup,
        oldMembers: this.oldMembers,
        newMembers: this.newMembers
      });

      this.group = "";
      this.newMembers = [];
      this.removedMembers = [];
    }
  }
};
</script>

<style>
</style>