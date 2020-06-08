<template>
  <div>
    <v-btn bottom color="primary" fab fixed left @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title class="primary darken-1 white--text">
          {{ $vuetify.lang.t('$vuetify.addGroupDialog.title') }}
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12" class="py-0">
              <v-text-field
                type="tel"
                v-model="group"
                prepend-icon="folder"
                :placeholder="$vuetify.lang.t('$vuetify.addGroupDialog.name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <form v-on:submit.prevent="addMember()">
                <v-text-field
                  hide-details
                  v-model="name"
                  prepend-icon="mdi-account-circle"
                  append-icon="mdi-plus"
                  @click:append="addMember()"
                  :placeholder="$vuetify.lang.t('$vuetify.addGroupDialog.newMember')"
                ></v-text-field>
              </form>
              <v-card-title class="mb-n3 pb-0">
                {{ $vuetify.lang.t('$vuetify.addGroupDialog.addedMembers') }}
              </v-card-title>
              <v-subheader v-if="members.length === 0">                
                {{ $vuetify.lang.t('$vuetify.addGroupDialog.empty') }}
              </v-subheader>
              <v-list v-else class="my-scroll mt-2" max-height="300" style="overflow-y: auto;">
                <v-list-item
                  v-for="(student, i) in members"
                  :key="i"
                  :ripple="false"
                  class="pr-2"
                  @click="{}"
                >
                  <div class="d-flex flex-row justify-space-betweeen flex-grow-1">
                    <v-list-item-title>{{ student.name }}</v-list-item-title>
                    <v-btn @click="removeMember(student)" fab x-small text>
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
        <v-alert
          border="left"
          dense
          colored-border
          type="info"
          elevation="2"
          class="mx-8"
        >        
          {{ $vuetify.lang.t('$vuetify.addGroupDialog.info') }}
        </v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="save()" color="primary">
            {{ $vuetify.lang.t('$vuetify.save') }}
          </v-btn>
          <v-btn text @click="dialog = false">
            {{ $vuetify.lang.t('$vuetify.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    name: "",
    group: "",
    members: []
  }),

  methods: {
    addMember() {
      if (!this.name) return;

      this.members.unshift({
        _id: this.members.length,
        name: this.name,
        absences: []
      });

      this.name = "";
    },

    removeMember(member) {
      const index = this.members.findIndex(
        _student => _student.name === member.name
      );

      this.members.splice(index, 1);
    },

    save() {
      const group = {
        _id: this.$store.getters['groups/groups'].length,
        name: this.group,
        members: [...this.members]
      }

      this.$store.dispatch('groups/addGroup', group);

      const url = this.$store.getters['http/url'];
      const token = this.$store.getters['account/token'];

      axios.post(`${url}/logic/add_group`, {
        group
      }, {
        headers: {
          token
        }
      }).then(response => {
        console.log(response);
      });

      this.members = [];
      this.name = '';
      this.group = '';
      this.dialog = false;
    }
  }
};
</script>

<style lang="sass">
</style>