<template>
  <div>
    <v-app-bar app color="primary" dark dense flat>
      <div class="d-flex align-center nav-left">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <div class="nav-center">
        <v-btn :title="$t('navbar.export')" tile large icon>
          <v-icon v-text="icons.export"></v-icon>
        </v-btn>
        <v-btn :title="$t('navbar.share')" tile large icon>
          <v-icon v-text="icons.share"></v-icon>
        </v-btn>
        <v-switch
          :title="$t('navbar.access')"
          v-model="access"
          :label="accessDescription"
          color="secondary"
          dense
          hide-details
        ></v-switch>
      </div>
      <v-spacer></v-spacer>
      <v-switch
        :title="$t('navbar.theme')"
        v-model="theme"
        :prepend-icon="icons.theme"
        color="secondary"
        dense
        hide-details
        @change="themeChange()"
      ></v-switch>
      <v-divider vertical></v-divider>
      <div class="nav-right">
        <!-- <v-menu offset-y close-on-click close-on-content-click tile>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :title="$t('navbar.user')"
              v-bind="attrs"
              v-on="on"
              text
              tile
              class="user"
            >
              <v-avatar size="40">
                <v-icon dark>{{ icons.account }}</v-icon>
              </v-avatar>
              <strong>John Doe</strong>
              <v-icon v-text="icons.menuDown"></v-icon>
            </v-btn>
          </template>
          <v-card tile>
            <v-list outlined dense>
              <v-list-item
                v-for="(lang, index) in langs"
                :key="index"
                @click="setLang(index)"
              >
                <v-list-item-title>{{ lang.long }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>-->
        <v-btn text tile>
          <h3>{{ $t("navbar.login") }}</h3>
        </v-btn>
        <v-menu offset-y close-on-click close-on-content-click tile dense>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :title="$t('navbar.language')"
              v-bind="attrs"
              v-on="on"
              outlined
              depressed
              tile
              class="lang"
            >
              <v-icon v-text="icons.translate"></v-icon>
              {{ langs[langIndex].short }}
              <v-icon v-text="icons.menuDown"></v-icon>
            </v-btn>
          </template>
          <v-card tile>
            <v-list outlined dense>
              <v-list-item v-for="(lang, index) in langs" :key="index" @click="setLang(index)">
                <v-list-item-title>{{ lang.long }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <HelloWorld />
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue";
import {
  mdiTranslate,
  mdiAccountCircle,
  mdiMenuDown,
  mdiExport,
  mdiShare,
  mdiThemeLightDark
} from "@mdi/js";

@Component({
  components: {
    HelloWorld
  }
})
export default class Editor extends Vue {
  private icons: Record<string, string> = {
    translate: mdiTranslate,
    account: mdiAccountCircle,
    menuDown: mdiMenuDown,
    export: mdiExport,
    share: mdiShare,
    theme: mdiThemeLightDark
  };
  private langs: Array<Record<string, string>> = [
    { short: "EN", long: "English", value: "en" },
    { short: "RO", long: "Romanian", value: "ro" },
    { short: "RU", long: "Russian", value: "ru" }
  ];
  private langIndex = 0;
  private access = true;
  private theme = false;
  get accessDescription(): string {
    return this.access ? "public" : "private";
  }
  public themeChange(): void {
    this.$vuetify.theme.dark = this.theme;
  }
  public setLang(index: number): void {
    this.$i18n.locale = this.langs[index].value;
    this.langIndex = index;
  }
}
</script>
<style lang="scss">
.nav-left {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
}
.nav-center {
  display: inline-grid;
  grid-template-columns: auto auto auto 1fr 1fr;
  grid-column-gap: 5px;
  align-items: center;
}
.v-divider {
  margin-right: 20px;
}
.nav-right {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  justify-items: end;
  .user {
    max-width: 200px;
  }
  .lang {
    max-width: 100px;
  }
}
</style>
