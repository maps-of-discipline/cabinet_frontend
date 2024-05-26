import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { RolesEnum } from '@models/auth/RolesEnum'

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

	const status = computed(() =>
		Array.from(roles.value)
			.map(role => RolesEnum[role])
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
		name,
		status,
		fetchUser,
	}
})
