<template>
  <v-card>
    <v-card-title
      class="pb-0"
    >{{ $store.getters['groups/selectedMember'].name }}, {{ humanizeDate(selectedDate) }}</v-card-title>
    <v-divider class="mt-2"></v-divider>
    <v-card-text class="pa-0">
      <v-sheet color="white" width="650" class="pa-4">
        <v-text-field
          hide-details
          label="Anzahl der Stunden"
          type="number"
          v-model.number="lessonsCount"
          outlined
          dense
        ></v-text-field>
        <v-row class="mx-0 mt-2 align-center">
          <v-col class="pa-0" cols="4">
            <v-checkbox
              hide-details
              class="mt-0"
              :indeterminate="indeterminate"
              v-model="allLessons"
              label="Alles auswählen"
            ></v-checkbox>
          </v-col>
          <v-sheet width="200px">
            <v-select
              hide-details
              width="100"
              :items="textReasons"
              v-model="allReasons"
              label="Grund"
              dense
              solo
            ></v-select>
          </v-sheet>
          <v-col class="pa-0 pl-4 d-flex flex-column align-start" cols="4">
            <v-switch
              class="mt-0"
              label="Alles attestiert"
              :indeterminate="indeterminate"
              v-model="allExcused"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
        <v-divider class="mt-2"></v-divider>
        <div class="my-scroll scroll-container">
          <v-row
            v-for="(lesson, i) in parseInt(lessonsCount)"
            :key="i"
            class="mx-0 mt-2 align-center"
            :class="{ 'mr-n2': lessonsCount > 6 }"
          >
            <v-col class="pa-0" cols="4">
              <v-checkbox
                dense
                hide-details
                class="mt-0"
                v-model="lessonsChecked"
                :value="i"
                :label="`${i + 1}. Stunde`"
              ></v-checkbox>
            </v-col>
            <v-sheet width="200px">
              <v-select
                hide-details
                width="100"
                :disabled="!lessonsChecked.includes(i)"
                :items="textReasons"
                v-model="reasonsChecked[i]"
                label="Grund"
                dense
                solo
              ></v-select>
            </v-sheet>
            <v-col class="pa-0 pl-4 d-flex flex-column align-start" cols="4">
              <v-switch
                class="mt-0"
                hide-details
                v-model="excusedChecked"
                :disabled="!lessonsChecked.includes(i)"
                :value="i"
                :label="`${excusedChecked.includes(i) ? 'Attestiert' : 'Unattestiert'}`"
              ></v-switch>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-card-text>
    <v-divider class="mt-2"></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="save" text color="primary">Speichern</v-btn>
      <v-btn text>Abbrechen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import humanizeDate from '@/util/humanize-date';
import { reasons } from "@/util/reasons";
import { normalizeArray } from "@/util/objects";
import extractTranslationList from "@/util/extract-translation-list";
import absenceWindowToAbsence from "@/util/absence-window-to-absence";

function convertReasons1(_reasons, $vuetify) {
  var result = [];

  const reasonsList = extractTranslationList(
    $vuetify,
    "$vuetify.absences",
    reasons
  );

  for (var i = 0; i < _reasons.length; i++) {
    result.push(reasonsList.indexOf(_reasons[i]));
  }

  return result;
}

function convertReasons2(_reasons, $vuetify) {
  var result = [];

  const reasonsList = extractTranslationList(
    $vuetify,
    "$vuetify.absences",
    reasons
  );

  for (var i = 0; i < _reasons.length; i++) {
    result.push(reasonsList[_reasons[i]]);
  }

  return result;
}

export default {
  props: {
    selectedDate: null,
    absenceMenu: false
  },

  computed: {
    textReasons() {
      var result = [];

      for (var i = 0; i < reasons.length; i++) {
        result.push(this.$vuetify.lang.t(`$vuetify.absences.${reasons[i]}`));
      }

      return result;
    },

    indeterminate() {
      return (
        this.lessonsChecked.length < this.lessonsCount &&
        this.lessonsChecked.length !== 0
      );
    },
    allLessons: {
      get() {
        return this.lessonsChecked.length === this.lessonsCount;
      },
      set(value) {
        this.lessonsChecked = [];

        if (value) {
          for (var i = 0; i < this.lessonsCount; i++) {
            this.lessonsChecked.push(i);
          }
        }

        return true;
      }
    },
    allReasons: {
      get() {
        const allMatch =
          this.reasonsChecked.length === this.lessonsCount &&
          !this.reasonsChecked.find(el => this.reasonsChecked[0] !== el);
        return allMatch ? this.reasonsChecked[0] : null;
      },
      set(value) {
        this.reasonsChecked = [];
        for (var i = 0; i < this.lessonsCount; i++) {
          this.reasonsChecked.push(value);
        }
      }
    },
    allExcused: {
      get() {
        return this.excusedChecked.length === this.lessonsCount;
      },
      set(value) {
        this.excusedChecked = [];
        if (value) {
          for (var i = 0; i < this.lessonsCount; i++) {
            this.excusedChecked.push(i);
          }
        }

        return true;
      }
    }
  },

  data: () => ({
    lessonsChecked: [],
    excusedChecked: [],
    reasonsChecked: [],
    lessonsCount: 6,
    reasons: [0, 1, 2, 3, 4]
  }),

  watch: {
    absenceMenu() {
      this.fill();
    }
  },

  mounted() {
    this.fill();
  },

  methods: {
    humanizeDate,

    fill() {
      const member = this.$store.getters['groups/selectedMember'];

      const absence = member.absences.find(_absence => _absence.date === this.selectedDate);

      if (!absence) {
        this.lessonsChecked = [];
        this.excusedChecked = [];
        this.reasonsChecked = [];
        this.lessonsCount = 6;
        return;
      };

      const helpers = absence.helpers;

      if (!helpers) {
        this.lessonsChecked = [];
        this.excusedChecked = [];
        this.reasonsChecked = [];
        this.lessonsCount = 6;
        return;
      };

      const convertedReasons = convertReasons2(helpers.reasonsChecked, this.$vuetify);

      this.lessonsChecked = helpers.lessonsChecked;
      this.excusedChecked = helpers.excusedChecked;
      this.reasonsChecked = convertedReasons;
      this.lessonsCount = helpers.lessonsCount;
    },

    save() {
      const absence = absenceWindowToAbsence(
        this.lessonsChecked,
        this.reasonsChecked,
        this.excusedChecked,
        this.selectedDate,
        this.$vuetify
      );

      const groupId = this.$store.getters["groups/selectedGroup"]._id;
      const memberId = this.$store.getters["groups/selectedMember"]._id;
      
      const convertedReasons = convertReasons1(this.reasonsChecked, this.$vuetify);

      this.$store.dispatch("groups/addAbsence", {
        groupPrediction: group => group._id === groupId,
        memberPrediction: member => member._id === memberId,
        absence: {
          ...absence,
          helpers: {
            lessonsChecked: this.lessonsChecked,
            reasonsChecked: convertedReasons,
            excusedChecked: this.excusedChecked,
            lessonsCount: this.lessonsCount
          }
        }
      });

      this.$emit('absence-window-close');
    }
  }
};
</script>

<style lang="sass" scoped>
.scroll-container
  height: 285px
  overflow-y: auto
  overflow-x: hidden
</style>
