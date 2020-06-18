import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkActiveClass: 'nav__link--active',
	routes: [{
		path: '/login',
		name: 'Login',
		component: () => import('./views/Login'),
		meta: {
			guest: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('./views/Register'),
		meta: {
			guest: true
		}
	},
	{
		path: '/',
		name: 'News',
		component: () => import('./views/News'),
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/messages',
		name: 'Messages',
		component: () => import('./views/Messages'),
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/settings',
		name: 'Settings',
		component: () => import('./views/Settings'),
		meta: {
			requiersAuth: true
		}
	},
	{
		path: '/:userId',
		name: 'Profile',
		props: true,
		component: () => import('./views/Profile'),
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
