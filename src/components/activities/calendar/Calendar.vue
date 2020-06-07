<template>
  <div id="calendar" class="px-3">
    <v-row class="fill-height">
      <v-col>
        <v-card>
          <v-card-title class="primary">
            <v-row class="justify-start align-center">
              <v-btn fab small text dark @click="$refs.calendar.prev()">
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
                <v-date-picker v-model="date" type="month" locale="de-DE" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>

              <v-btn fab small text dark @click="$refs.calendar.next()">
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
              :noe="today"
              ref="calendar"
              color="primary"
              locale="de-DE"
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
        <!-- <v-menu v-model="dayMenu" :position-x="x" :position-y="y" absolute offset-y>
          <v-list>
            <v-list-item @click="openAbsenceMenu()">
              <v-list-item-title>Abwesenheit melden</v-list-item-title>
            </v-list-item>
            <v-list-item @click="{}">
              <v-list-item-title>Tagesüberblick</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>-->
        <!-- v-model="absenceMenu"
        :close-on-content-click="false"
        :position-x="x"
        :position-y="y"-->
        <v-menu absolute>
          <!-- <absence-window-component
            v-bind="{
            x,
            y,
            selectedDate
          }"
            v-on:absence-window-close="absenceWindowClose()"
          />-->
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ignoreMessage from '@/util/ignore-message';
import Vue from 'vue';

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

  methods: {
    getDate() {
      if (this.value) {
        const date = new Date(this.value);

        return `${
          months[date.getMonth()]
        }, ${
          date.getUTCFullYear().toString()
        }`;
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
</style>