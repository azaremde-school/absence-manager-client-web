<template>
  <div>
    <v-btn bottom color="primary" fab fixed left @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title class="primary darken-1 white--text">Klasse erstellen</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12" class="py-0">
              <v-text-field type="tel" v-model="className" prepend-icon="folder" placeholder="Name"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <form v-on:submit.prevent="addStudent()">
                <v-text-field
                  hide-details
                  v-model="name"
                  prepend-icon="mdi-account-circle"
                  append-icon="mdi-plus"
                  @click:append="addStudent()"
                  placeholder="Neuer Schüler"
                ></v-text-field>
              </form>
              <v-card-title class="mb-n3 pb-0">Hinzugefügte Schüler</v-card-title>
              <v-subheader v-if="students.length === 0">Die List ist leer.</v-subheader>
              <v-list v-else class="students-list mt-2" max-height="300" style="overflow-y: auto;">
                <v-list-item
                  v-for="(student, i) in students"
                  :key="i"
                  :ripple="false"
                  class="pr-2"
                  @click="{}"
                >
                  <div class="d-flex flex-row justify-space-betweeen flex-grow-1">
                    <v-list-item-title>{{ student.name }}</v-list-item-title>
                    <v-btn @click="removeStudent(student)" fab x-small text>
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
        >Weitere Schüler können auch nachher hinzugefügt werden.</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="save()" color="primary">Speichern</v-btn>
          <v-btn text @click="dialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    name: "",
    className: "",
    students: []
  }),

  methods: {
    addStudent() {
      this.students.push({
        name: this.name
      });

      this.name = "";
    },

    removeStudent(student) {
      const index = this.students.findIndex(
        _student => _student.name === student.name
      );

      this.students.splice(index, 1);
    }
  }
};
</script>

<style lang="sass">
.students-list    
  &::-webkit-scrollbar
    width: 10px
  &::-webkit-scrollbar-track
    background: #f1f1f1
  &::-webkit-scrollbar-thumb
    background: #acacac    
  &::-webkit-scrollbar-thumb:hover
    background: #969696
</style>