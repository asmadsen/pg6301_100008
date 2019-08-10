export default [
	{
		exact: true,
		path: '/',
		component: () => import('./views/LandingPage')
	},
	{
		exact: true,
		path: '/login',
		component: () => import('./views/LoginPage')
	},
	{
		exact: true,
		path: '/signup',
		component: () => import('./views/SignUp')
	},
	{
		exact: true,
		path: '/profile',
		component: () => import('./views/UserProfile')
	},
	{
		exact: true,
		path: '/movies/:id',
		component: () => import('./views/Movie')
	}
]
