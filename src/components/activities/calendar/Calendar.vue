<template>
  <div id="calendar" class="px-3">
    <v-row class="fill-height">
      <v-col>
        <v-card>
          <v-card-title class="primary">
            <v-row class="justify-start align-center">
              <v-btn fab small text dark @click="$refs.calendar.prev()" class="mr-2">
                <v-icon dark>mdi-chevron-left</v-icon>
              </v-btn>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn text dark width="150" v-on="on">{{ getDate() }}</v-btn>
                </template>
                <v-date-picker
                  :locale="$vuetify.lang.current"
                  v-model="date"
                  type="month"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >{{ $vuetify.lang.t(`$vuetify.cancel`) }}</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="save(date)"
                  >{{ $vuetify.lang.t(`$vuetify.ok`) }}</v-btn>
                </v-date-picker>
              </v-menu>

              <v-btn fab small text dark @click="$refs.calendar.next()" class="ml-2">
                <v-icon dark>mdi-chevron-right</v-icon>
              </v-btn>

              <!-- <v-btn text dark @click="type = 'month'" v-if="type !== 'month'">Zurück</v-btn> -->
            </v-row>
          </v-card-title>
          <v-sheet height="83vh">
            <!-- v-model="value"
              :events="$store.getters['calendar/events']"
              :event-color="getEventColor"
              :now="today"
            :type="type"-->
            <!-- @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
            @change="updateRange"-->
            <v-calendar
              v-model="value"
              :type="type"
              :now="today"
              :locale="$vuetify.lang.current"
              :events="getEvents"
              :event-color="getEventColor"
              :event-more-text="'{0} ' + $vuetify.lang.t('$vuetify.more')"
              ref="calendar"
              color="primary"
              @click:date="viewDay"
              weekdays="1, 2, 3, 4, 5, 6, 0"
            ></v-calendar>
          </v-sheet>
        </v-card>
        <!-- v-model="selectedOpen"
        :activator="selectedElement"-->
        <v-menu :close-on-content-click="false" offset-x>
          <!-- <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>-->
        </v-menu>

        <v-menu v-model="dayMenu" :position-x="x" :position-y="y" absolute offset-y>
          <v-list>
            <v-list-item @click="openAbsenceMenu()">
              <v-list-item-title>Abwesenheit eintragen</v-list-item-title>
            </v-list-item>
            <v-list-item @click="{}">
              <v-list-item-title>Tagesüberblick</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          :close-on-content-click="false"
          v-model="absenceMenu"
          :position-x="x"
          :position-y="y"
          absolute
        >
          <AbsenceWindow
            v-bind="{
              x,
              y,
              selectedDate,
              absenceMenu
            }"
            v-on:absence-window-close="absenceWindowClose()"
          />
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AbsenceWindow from './AbsenceWindow';

import getRanges from "@/util/get-ranges";
import { colors } from "@/util/colors";
import { reasons } from "@/util/reasons";

import ignoreMessage from "@/util/ignore-message";
import Vue from "vue";

Vue.config.warnHandler = ignoreMessage;

const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];

export default {
  components: {
    AbsenceWindow
  },

  data: () => ({
    type: "month",
    today: null,
    date: null,
    value: null,
    menu: false,
    dayMenu: false,
    absenceMenu: false,
    selectedElement: null,
    selectedOpen: false,
    selectedEvent: {
      start: "",
      end: "",
      name: "",
      color: ""
    }
  }),

  mounted() {
    this.value = new Date().toISOString();
  },

  computed: {
    getEvents() {
      var result = [];

      const member = this.$store.getters["groups/selectedMember"];

      if (!member) return result;

      const absences = member.absences;

      if (!absences || !absences.length) return result;

      absences.forEach(absence => {
        absence.items.forEach(item => {
          const excused = item.lessons
            .filter(_item => _item.excused)
            .map(_item => _item.n);
          const unexcused = item.lessons
            .filter(_item => !_item.excused)
            .map(_item => _item.n);

          const reason = item.reason;
          const reasonProperty = reasons[reason];
          const translatedReason = this.$vuetify.lang.t(
            `$vuetify.absences.${reasonProperty}`
          );

          getRanges(excused).forEach(range => {
            result.push({
              start: absence.date,
              end: absence.date,
              name: `${range}, ${translatedReason}, ${this.$vuetify.lang.t(
                "$vuetify.excused"
              )}`,
              color: colors[item.reason],
              sort: range.split('-')[0]
            });
          });

          getRanges(unexcused).forEach(range => {
            result.push({
              start: absence.date,
              end: absence.date,
              name: `${range}, ${translatedReason}, ${this.$vuetify.lang.t(
                "$vuetify.unexcused"
              )}`,
              color: colors[item.reason],
              sort: range.split('-')[0]
            });
          });

          result.sort((a, b) => {
            return a.sort - b.sort;
          });
        });
      });

      return result;
    }
  },

  methods: {
    openAbsenceMenu() {
      const instance = this;

      instance.dayMenu = false;

      setTimeout(() => {
        instance.absenceMenu = true;
      }, 10);
    },

    absenceWindowClose() {
      this.absenceMenu = false;
    },

    getEventColor(event) {
      return event.color;
    },

    viewDay(calendarEvent) {
      this.x = event.clientX;
      this.y = event.clientY;

      this.selectedDate = calendarEvent.date;

      this.dayMenu = true;
    },

    getDate() {
      if (this.value) {
        const date = new Date(this.value);
        const month = this.$vuetify.lang.t(
          `$vuetify.months[${date.getMonth()}]`
        );

        return `${month}, ${date.getUTCFullYear().toString()}`;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="sass">
.v-event
  width: 95% !important
  margin: auto !important
  margin-top: 4px !important
</style>