<template>
  <v-card elevation="0" max-height="90vh" class="scroll my-scroll mx-4 mt-4">
  <v-expansion-panels>
    <v-expansion-panel @click="click">
      <v-expansion-panel-header>Wie kann ich eine Klasse erstellen?</v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Menu</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Plus</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Daten eintragen</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card outlined class="mb-12">
                  <v-card-title>Klicken Sie auf das Menü.</v-card-title>
                  <v-card-text>
                    <img src="@/assets/steps/1/1.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 2">Weiter</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card outlined class="mb-12">
                  <v-card-title>Klicken Sie auf das Plus.</v-card-title>
                  <v-card-text>
                    <img src="@/assets/steps/1/2.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 3">Weiter</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card outlined class="mb-12">
                  <v-card-title>Tragen Sie die Daten ein und Klicken Sie auf "Speichern".</v-card-title>
                  <v-card-text>
                    <img class="img" src="@/assets/steps/1/3.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 1">Weiter</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel @click="click">
      <v-expansion-panel-header>Wie kann ich die Fehlzeiten eintragen?</v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Kalendar</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Eine Person auswählen</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Das Fenster "Abwesenheit"</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 4" step="4">Daten eintragen</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card outlined class="mb-12">
                  <v-card-title>Klicken Sie auf den Tab "Kalendar"</v-card-title>
                  <v-card-text>
                    <img src="@/assets/steps/2/1.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 2">Weiter</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card outlined class="mb-12">
                  <v-card-title>Wählen Sie eine Person aus.</v-card-title>
                  <v-card-text>
                    <img src="@/assets/steps/2/2.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 3">Weiter</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card outlined class="mb-12">
                  <v-card-title>Klicken Sie auf den gewünschten Tag im Kalendar (rechts) und dann "Abwesenheit eintragen".</v-card-title>
                  <v-card-text>
                    <img class="img" src="@/assets/steps/2/3.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 4">Weiter</v-btn>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card outlined class="mb-12">
                  <v-card-title>Tragen Sie die Daten ein und Klicken Sie auf "Speichern".</v-card-title>
                  <v-card-text>
                    <img class="img" src="@/assets/steps/2/4.gif" />
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="e1 = 1">Weiter</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel @click="click">
      <v-expansion-panel-header>Wo finde ich die von mir erstellten Klassen / Gruppen?</v-expansion-panel-header>
      <v-expansion-panel-content>        
        <v-card outlined class="mb-12">
          <v-card-title>In der Sidebar befinden sich alle von Ihnen erstellten Klassen und Gruppen.</v-card-title>
          <v-card-text>
            <img src="@/assets/steps/2/2.gif" />
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      e1: 1
    };
  },
  methods: {
    click() {
      this.e1 = 1;
    }
  }
};
</script>

<style lang="sass">
.v-stepper
  box-shadow: none !important
.scroll
  overflow-y: auto
.img
  max-height: 400px
</style>