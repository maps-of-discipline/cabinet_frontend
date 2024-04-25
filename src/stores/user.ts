import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { RolesEnum } from '@models/auth/RolesEnum'

import Api from '@services/Api'
import { useAuth } from './auth'

export const useUser = defineStore('user', () => {
	const authStore = useAuth()

	const userData: Ref<any> = ref(null)

	const isAuth = computed(() => userData.value !== null)

	const name = computed(
		() => userData.value?.name + ' ' + userData.value?.surname
	)

	const status = computed(() => RolesEnum[userData.value?.user_status])

	const fetchUser = async () => {
		if (!authStore.tokens.token) return null
		const { user } = await Api.getUser(authStore.tokens.token)
		if (!user) return null

		userData.value = user
	}

	return {
		isAuth,
		userData,
		name,
		status,
		fetchUser,
	}
})
