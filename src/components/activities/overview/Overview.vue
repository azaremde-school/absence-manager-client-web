<template>
  <div>
    <v-card 
      v-if="
        !$store.getters['groups/noGroups']
        &&
        !$store.getters['groups/noGroupSelected']
        &&
        !$store.getters['groups/noMemberSelected']
      "
      class="mx-4"
      elevation="0"
    >
      <v-card-title>{{ name }}</v-card-title>
      <v-divider></v-divider>
      <div class="d-flex mb-5 py-5 my-row align-center">
        <v-card outlined class="mt-5 mr-2">
          <v-card-text>
            <h3 class="my-5">Fehlstunden: {{ lessonsAbsence }}</h3>
            <h3 class="my-5">davon entschuldigt: {{ lessonsExcused }}</h3>
            <h3 class="my-5">davon unentschuldigt: {{ lessonsUnexcused }}</h3>
          </v-card-text>
        </v-card>
        <v-card elevation="0" max-width="1000" class="py-5 flex-grow-1">
          <v-sparkline
            :value="lessonReasons"
            padding="24"
            label-size="5"
            radius="0"
            :gradient="['#1976D2']"
            type="bar"
            stroke-linecap="round"
          >
            <template v-slot:label="item">{{ getReason(item.index) }}, {{ item.value }}</template>
          </v-sparkline>
        </v-card>
      </div>
      <v-divider></v-divider>
      <div class="d-flex mb-5 py-5 my-row align-center">
        <v-card outlined class="mt-5 mr-2">
          <v-card-text>
            <h3 class="my-5">Fehltage: {{ daysAbsence }}</h3>
            <h3 class="my-5">davon entschuldigt: {{ daysExcused }}</h3>
            <h3 class="my-5">davon unentschuldigt: {{ daysUnexcused }}</h3>
          </v-card-text>
        </v-card>
        <v-card elevation="0" max-width="1000" class="py-5 flex-grow-1">
          <v-sparkline
            :value="dayReasons"
            padding="24"
            label-size="5"
            radius="0"
            :gradient="['#1976D2']"
            type="bar"
            stroke-linecap="round"
          >
            <template v-slot:label="item">{{ getReason(item.index) }}, {{ item.value }}</template>
          </v-sparkline>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reasons } from "@/util/reasons";

export default {
  computed: {
    name() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      return this.$store.getters["groups/selectedMember"].name;
    },

    lessonsAbsence() {
      return this.lessonsExcused + this.lessonsUnexcused || 0;
    },

    lessonsExcused() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var length = 0;

      for (var i = 0; i < member.absences.length; i++) {
        for (var j = 0; j < member.absences[i].items.length; j++) {
          const excused = member.absences[i].items[j].lessons.filter(
            n => n.excused
          );
          length += excused.length;
        }
      }

      return length;
    },

    lessonsUnexcused() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var length = 0;

      for (var i = 0; i < member.absences.length; i++) {
        for (var j = 0; j < member.absences[i].items.length; j++) {
          const unexcused = member.absences[i].items[j].lessons.filter(
            n => !n.excused
          );
          length += unexcused.length;
        }
      }

      return length;
    },

    daysAbsence() {
      return this.daysExcused + this.daysUnexcused || 0;
    },

    daysExcused() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var length = 0;

      for (var i = 0; i < member.absences.length; i++) {
        const count = member.absences[i].helpers.lessonsCount;
        for (var j = 0; j < member.absences[i].items.length; j++) {
          if (
            member.absences[i].items[j].lessons.length === count &&
            member.absences[i].items[j].lessons.findIndex(l => !l.excused) ===
              -1
          ) {
            length += 1;
          }
        }
      }

      return length;
    },

    daysUnexcused() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var length = 0;

      for (var i = 0; i < member.absences.length; i++) {
        const count = member.absences[i].helpers.lessonsCount;
        for (var j = 0; j < member.absences[i].items.length; j++) {
          if (
            member.absences[i].items[j].lessons.length === count &&
            member.absences[i].items[j].lessons.findIndex(l => l.excused) === -1
          ) {
            length += 1;
          }
        }
      }

      return length;
    },

    dayReasons() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var result = [];

      for (var i = 0; i < reasons.length; i++) {
        result[i] = 0;
      }

      const simplyfied = member.absences.map(a => a.helpers);

      for (var i = 0; i < member.absences.length; i++) {
        const count = member.absences[i].helpers.lessonsCount;
        for (var j = 0; j < member.absences[i].items.length; j++) {
          if (member.absences[i].items[j].lessons.length === count) {
            result[member.absences[i].items[j].reason] += 1;
          }
        }
      }

      return result;
    },

    lessonReasons() {
      const member = this.$store.getters["groups/selectedMember"];

      if (!member || member === -1) return;

      var result = [];

      for (var i = 0; i < reasons.length; i++) {
        result[i] = 0;
      }

      const simplyfied = member.absences.map(a => a.helpers);

      for (var i = 0; i < simplyfied.length; i++) {
        if (simplyfied[i].lessonsChecked.length) {
          const lessonsCount = simplyfied[i].lessonsChecked.reduce((a, b) =>
            Math.max(a, b)
          );

          const reasonsFound = simplyfied[i].reasonsChecked;

          if (!reasonsFound.length) {
            result[0] += lessonsCount + 1;
          } else {
            for (var j = 0; j < reasonsFound.length; j++) {
              result[reasonsFound[j]] += 1;
            }
          }
        }
      }

      return result;
    }
  },
  methods: {
    getReason(value) {
      value = parseInt(value);

      const key = reasons[value];

      return this.$vuetify.lang.t(`$vuetify.absences[${key}]`);
    }
  }
};
</script>

<style lang="sass">
.my-row
  max-width: 1000px
</style>