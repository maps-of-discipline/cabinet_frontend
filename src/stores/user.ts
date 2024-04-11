import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import Api from '@services/Api'

export const useUser = defineStore('user', () => {
	const userData = ref(null)

	const isAuth = computed(() => userData.value !== null)

	const name = computed(
		() => userData.value.name + ' ' + userData.value.surname
	)

	const status = computed(() => userData.value.user_status)

	const setUserData = data => {
		userData.value = data
	}

	const login = async (login, password) => {
		const tokens = await Api.login({ login, password })
		if (!tokens) return null

		const data = await Api.getUser(tokens.token)
		if (!data) return null

		setUserData(data.user)

		return true
	}

	return {
		isAuth,
		userData,
		login,
		name,
		status,
	}
})
