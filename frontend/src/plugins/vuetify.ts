import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: "mdiSvg",
		values: {
			translate: "mdiGoogleTranslate"
		}
	},
	theme: {
		dark: false,
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: "#546E7A",
				secondary: "#E1F5FE",
				accent: "#82B1FF",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FFC107"
			},
			dark: {
				primary: "#212121",
				secondary: "#1976d2",
				accent: "#82B1FF",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FFC107"
			}
		}
	}
});
