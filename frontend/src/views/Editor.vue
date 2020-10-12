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
        <v-menu
          offset-y
          close-on-click
          close-on-content-click
          tile
          dense
          allow-overflow=""
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined depressed tile>
              <v-text-field
                flat
                full-width
                hide-details
                v-model="schemas[schemaIndex].name"
              >
                <template slot="append">
                  <v-icon
                    v-text="!saved ? icons.save : icons.check"
                    @click="saved = !saved"
                    :title="!saved ? $t('navbar.save') : $t('navbar.saved')"
                  ></v-icon>
                </template>
              </v-text-field>
              <v-icon
                v-text="icons.menuDown"
                v-bind="attrs"
                v-on="on"
                :title="$t('navbar.schemas')"
              ></v-icon>
            </v-btn>
          </template>
          <v-card tile>
            <v-list outlined dense>
              <v-list-item
                v-for="(schema, index) in schemas"
                :key="index"
                @click="setSchema(index)"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title v-html="schema.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="schema.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon
                      v-text="icons.pencil"
                      :title="$t('navbar.edit')"
                    ></v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn :title="$t('navbar.export')" tile large icon>
          <v-icon v-text="icons.export"></v-icon>
        </v-btn>
        <v-btn :title="$t('navbar.share')" tile large icon>
          <v-icon v-text="icons.share"></v-icon>
        </v-btn>
        <v-switch
          :title="$t('navbar.access')"
          v-model="schemas[schemaIndex].public"
          :label="accessDescription"
          color="secondary"
          dense
          hide-details
        ></v-switch>
      </div>
      <v-spacer></v-spacer>
      <v-switch
        :title="$t('navbar.theme')"
        v-model="darkTheme"
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
              <v-list-item
                v-for="(lang, index) in langs"
                :key="index"
                @click="setLang(index)"
              >
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
  mdiThemeLightDark,
  mdiContentSaveOutline,
  mdiContentSaveAlertOutline,
  mdiCheck,
  mdiPencil,
  mdiDelete
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
    theme: mdiThemeLightDark,
    save: mdiContentSaveOutline,
    saveAlert: mdiContentSaveAlertOutline,
    check: mdiCheck,
    pencil: mdiPencil,
    remove: mdiDelete
  };
  private langs: Array<Record<string, string>> = [
    { short: "EN", long: "English", value: "en" },
    { short: "RO", long: "Romanian", value: "ro" },
    { short: "RU", long: "Russian", value: "ru" }
  ];
  private schemas: Array<Record<string, string | boolean>> = [
    {
      name: "First Schema",
      description: "This is just a test schema created for test",
      public: true
    },
    {
      name: "Second Schema",
      description: "This is just a test schema",
      public: false
    }
  ];
  private schemaIndex = 0;
  private saved = false;
  private langIndex = 0;
  private darkTheme = false;
  get accessDescription(): string | unknown {
    return this.schemas[this.schemaIndex].public
      ? this.$t("navbar.access.public")
      : this.$t("navbar.access.private");
  }
  public themeChange(): void {
    this.$vuetify.theme.dark = this.darkTheme;
  }
  public setLang(index: number): void {
    this.$i18n.locale = this.langs[index].value;
    this.langIndex = index;
  }
  public setSchema(index: number): void {
    this.schemaIndex = index;
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
  grid-template-columns: auto auto auto 1fr;
  grid-column-gap: 5px;
  align-items: center;

  .v-text-field {
    margin-right: 5px;

    .v-input__control > .v-input__slot:before,
    .v-input__control > .v-input__slot:after {
      content: none !important;
    }
  }
}

.v-menu__content {
  max-width: 0 !important;
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
