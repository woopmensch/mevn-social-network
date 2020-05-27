import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [
		createPersistedState()
	],
	state: {
		authState: false,
		currentUser: {},
	},
	mutations: {
		ASSIGN_USER_DATA: (state, payload) => {
			Object.assign(state.currentUser, payload);
		},
		TOGGLE_AUTH_STATE: (state, payload) => {
			state.authState = payload;
		},
		RESET_STATE: state => {
			state.authState = false;
			state.currentUser = {};
		}
	},
	actions: {
		saveUserData: (context, payload) => {
			context.commit('ASSIGN_USER_DATA', payload);
		},
		toggleAuthState: (context, payload) => {
			context.commit('TOGGLE_AUTH_STATE', payload);
		}
	}
})
