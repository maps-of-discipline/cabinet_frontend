import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { RolesEnum, RolesNamesEnum } from '@models/auth/RolesEnum'

import Api from '@services/Api'
import { useAuth } from './auth'
import { jwtDecode } from 'jwt-decode'

export const useUser = defineStore('user', () => {
	const authStore = useAuth()

	const userData: Ref<any> = ref(null)

	const isAuth = computed(() => userData.value !== null)

	const name = computed(
		() => userData.value?.name + ' ' + userData.value?.surname
	)

	const roles = computed(() => {
		return new Set(
			jwtDecode(authStore.tokens.access)?.roles?.map(role => role.name) || []
		)
	})

	const hasRole = role => {
		return roles.value.has(role) || roles.value.has(RolesEnum.Admin)
	}

	const isAdmin = computed(() => roles.value.has(RolesEnum.Admin))
	const isStudent = computed(
		() => roles.value.has(RolesEnum.Student) || isAdmin.value
	)
	const isTeacher = computed(
		() => roles.value.has(RolesEnum.Teacher) || isAdmin.value
	)

	const status = computed(() =>
		Array.from(roles.value)
			.map(role => RolesNamesEnum[role])
			.join(', ')
	)

	const fetchUser = async () => {
		if (!authStore.tokens.token) return null
		const { user } = await Api.getUser(authStore.tokens.token)
		if (!user) return null

		userData.value = user
	}

	return {
		isAuth,
		userData,
		roles,
		hasRole,
		name,
		status,
		fetchUser,

		isAdmin,
		isStudent,
		isTeacher,
	}
})
