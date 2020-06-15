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

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icons', /^ion-/];

Vue.use(new VueSocketIO({
	// connection: '',
	connection: 'http://localhost:4000',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	},
}))

if (localStorage.token) {
	setAuthToken(localStorage.token)
} else {
	setAuthToken(null);
}

/** Axios Request Intercept */
HTTP.interceptors.request.use(
	function (config) {
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

/** Axios Response Intercept */
HTTP.interceptors.response.use(
	function (response) {
		return response;
	},
	function (err) {
		if (err.response.status === 401) {
			localStorage.removeItem('authToken');
			store.dispatch('toggleAuthState', false);
			router.push({
				name: 'Login'
			});
		}
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