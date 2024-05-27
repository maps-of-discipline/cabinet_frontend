import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import EmptyLayout from '@layouts/EmptyLayout.vue'
import { useAuth } from '@stores/auth'
import { useUser } from '@stores/user'
import { useDisciplineStore } from '@stores/discipline'
import { RolesEnum } from '@models/auth/RolesEnum'

const routes = [
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/AuthView.vue'),
		meta: {
			title: 'Вход · Успеваемость',
			layout: EmptyLayout,
		},
	},
	{
		path: '/grades',
		name: 'grades',
		component: () => import('../views/GradesView.vue'),
		meta: {
			title: 'Успеваемость · Успеваемость',
			layout: MainLayout,
			useBubbleBg: true,
		},
	},
	{
		path: '/lessons',
		name: 'lessons',
		component: () => import('../views/LessonsView.vue'),
		meta: {
			title: 'Темы занятий · Успеваемость',
			layout: MainLayout,
			useBubbleBg: true,
		},
	},
	{
		path: '/report',
		name: 'report',
		component: () => import('../views/ReportView.vue'),
		meta: {
			layout: MainLayout,
			title: 'Отчеты · Успеваемость',
			useBubbleBg: true,
			access: [RolesEnum.Tutor],
		},
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('../views/ProfileView.vue'),
		meta: {
			title: 'Профиль · Успеваемость',
			layout: MainLayout,
			access: ['*'],
		},
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/admin/AdminView.vue'),
		meta: {
			title: 'Панель администратора · Успеваемость',
			layout: MainLayout,
			useBubbleBg: true,
			access: [RolesEnum.Admin],
		},
		children: [
			{
				path: 'groups',
				component: () => import('../views/admin/groups/GroupsView.vue'),

				meta: {
					title: 'Группы · Успеваемость',
					useBubbleBg: false,
				},
			},
			{
				path: 'tutors',
				component: () => import('../views/admin/tutors/TutorsView.vue'),

				meta: {
					title: 'Тьюторы · Успеваемость',
					useBubbleBg: false,
				},
			},
			{
				path: 'bells',
				component: () => import('../views/admin/bells/BellsView.vue'),

				meta: {
					title: 'Звонки · Успеваемость',
					useBubbleBg: false,
				},
			},
			{
				path: 'access',
				component: () => import('../views/admin/access/AccessView.vue'),

				meta: {
					title: 'Доступ к системе · Успеваемость',
					useBubbleBg: false,
				},
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notfound',
		component: () => import('../views/NotFoundView.vue'),
		meta: {
			title: '404 · Успеваемость',
			layout: MainLayout,
		},
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
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

	if (authStore.isAuth && to.name === 'auth') return { name: 'grades' }
	if (!authStore.isAuth && to.name !== 'auth') return { name: 'auth' }
})

router.beforeEach((to, from) => {
	if (to.path === '/') return { name: 'grades' }
})

router.beforeEach((to, from) => {
	const userStore = useUser()

	if (
		to.meta?.access &&
		!to.meta.access.some(
			access =>
				userStore.roles.has(access) || userStore.roles.has(RolesEnum.Admin)
		)
	) {
		return { path: '/404' }
	}
})

router.beforeEach(async to => {
	if (to.query.aup && to.query.id) {
		const disciplineStore = useDisciplineStore()

		disciplineStore.setSelectedAup(to.query.aup as string)
		disciplineStore.setSelectedDisciplineId(to.query.id as string)

		return { name: to.name }

		/* TODO Проверить существование такой дисциплины и аупа, а также доступ к ней */
	}
})

export default router
