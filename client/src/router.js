import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Settings from './views/Settings.vue';
import Messages from './views/Messages.vue';
import Profile from './views/Profile.vue';
import News from './views/News.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkActiveClass: 'nav__link--active',
	routes: [{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			guest: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			guest: true
		}
	},
	{
		path: '/',
		name: 'News',
		component: News,
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/messages',
		name: 'Messages',
		component: Messages,
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings,
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/:userId',
		name: 'Profile',
		props: true,
		component: Profile,
		meta: {
			requiersAuth: true
		}
	},
	]
})

router.beforeEach(async (to, from, next) => {

	if (to.meta.requiersAuth) {
		if (!store.state.authState) {
			localStorage.clear();
			next({
				name: "Login"
			});
		} else {
			next();
		}
	} else if (to.meta.guest) {
		if (store.state.authState) {
			next({
				name: 'News'
			})
		} else {
			next();
		}
	} else {
		next();
	}
})

export default router;
