import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import News from './views/News.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
	routes: [{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			guest: true
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		meta: {
			guest: true
		}
	},
	{
		path: '/',
		name: 'news',
		component: News,
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/:userId',
		name: 'profile',
		props: true,
		component: function () {
			return import('./views/Profile.vue')
		},
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/messages',
		name: 'messages',
		component: function () {
			return import('./views/Messages.vue')
		},
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/settings',
		name: 'settings',
		component: function () {
			return import('./views/Settings.vue')
		},
		meta: {
			requiersAuth: true
		}
	}
	],
	linkActiveClass: 'uk-active'
})

router.beforeEach(async (to, from, next) => {

	if (to.meta.requiersAuth) {
		if (!store.state.authState) {
			localStorage.clear();
			next({
				name: "login"
			});
		} else {
			next();
		}
	} else if (to.meta.guest) {
		if (store.state.authState) {
			next({
				name: 'news'
			})
		} else {
			next();
		}
	} else {
		next();
	}
})

export default router;
