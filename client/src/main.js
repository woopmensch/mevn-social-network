import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import './registerServiceWorker';
import setAuthToken from './utils/authToken';
import {
	HTTP
} from './services/api';

import dayjs from 'dayjs';
Vue.prototype.$parsedDate = function (d) {
	if (dayjs(d).year < dayjs().year) {
		return dayjs(d).format("DD.MMM.YYYY");
	} else {
		return dayjs(d).format("DD MMM [at] HH:mm");
	}
}

Vue.use(new VueSocketIO({
	// connection: 'http://localhost:4000',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	},
}))


Vue.config.productionTip = false;

if (localStorage.token) {
	setAuthToken(localStorage.token)
} else {
	setAuthToken(null);
}


HTTP.interceptors.request.use(
	function (config) {
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

new Vue({
	router,
	store,
	render: function (h) {
		return h(App)
	}
}).$mount('#app')