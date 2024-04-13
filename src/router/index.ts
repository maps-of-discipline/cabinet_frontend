import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@layouts/MainLayout.vue'
import EmptyLayout from '@layouts/EmptyLayout.vue'
import { useAuth } from '@stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				title: 'Кабинет преподавателя',
				layout: MainLayout,
			},
		},
		{
			path: '/grades',
			name: 'grades',
			component: () => import('../views/GradesView.vue'),
			meta: {
				title: 'Успеваемость | Кабинет преподавателя',
				layout: MainLayout,
			},
		},
		{
			path: '/lessons',
			name: 'lessons',
			component: () => import('../views/LessonsView.vue'),
			meta: {
				title: 'Темы занятий | Кабинет преподавателя',
				layout: MainLayout,
			},
		},
		{
			path: '/faq',
			name: 'faq',
			component: () => import('../views/FaqView.vue'),
			meta: {
				layout: MainLayout,
				title: 'FAQ | Кабинет преподавателя',
			},
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('../views/AuthView.vue'),
			meta: {
				title: 'Вход',
				layout: EmptyLayout,
			},
		},
	],
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.title)

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.metaTags)

	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.metaTags)

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title as string
	} else if (previousNearestWithMeta) {
		document.title = previousNearestWithMeta.meta.title as string
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
		el => el.parentNode?.removeChild(el)
	)

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next()

	// Turn the meta tag definitions into actual elements in the head.
	const metaTags = nearestWithMeta.meta.metaTags as Array<string>

	metaTags
		.map(tagDef => {
			const tag = document.createElement('meta')

			Object.keys(tagDef).forEach(key => {
				tag.setAttribute(key, tagDef[key])
			})

			// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '')

			return tag
		})
		// Add the meta tags to the document head.
		.forEach(tag => document.head.appendChild(tag))

	next()
})

router.beforeEach(async (to, from) => {
	const authStore = useAuth()

	if (authStore.isAuth && to.name === 'auth') return { name: 'home' }
	if (!authStore.isAuth && to.name !== 'auth') return { name: 'auth' }
})

export default router
