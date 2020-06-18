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
		isLoading: false
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
		},
		SET_LOADING: (state, payload) => {
			state.isLoading = payload
		}
	},
	actions: {
		saveUserData: ({ commit }, payload) => {
			commit('ASSIGN_USER_DATA', payload);
		},
		toggleAuthState: ({ commit }, payload) => {
			commit('TOGGLE_AUTH_STATE', payload);
		},
		setLoading: ({ commit }, payload) => {
			commit('SET_LOADING', payload)
		}
	}
})
