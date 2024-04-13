import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

import Api from '@services/Api'
import { useRouter } from 'vue-router'
import { useUser } from './user'

export const useAuth = defineStore('auth', () => {
	const userStore = useUser()
	const router = useRouter()

	const tokens = ref({
		access: localStorage.getItem('access'),
		refresh: localStorage.getItem('refresh'),
		token: localStorage.getItem('token'),
	})

	const isAuth = ref(!!localStorage.getItem('access'))

	const decode = (token?: string) => {
		if (token) {
			return jwtDecode(token)
		} else if (tokens.value.access) {
			return jwtDecode(tokens.value.access)
		}

		return null
	}

	const setTokens = payload => {
		tokens.value = payload

		localStorage.setItem('access', payload.jwt)
		localStorage.setItem('refresh', payload.jwt_refresh)
		localStorage.setItem('token', payload.token)
	}

	const login = async (login, password) => {
		const resTokens = await Api.login({ login, password })
		if (!resTokens) return null
		setTokens(resTokens)

		await userStore.fetchUser()
		isAuth.value = true

		router.push({ name: 'home' })
	}

	const logout = () => {
		localStorage.removeItem('access')
		localStorage.removeItem('refresh')
		localStorage.removeItem('token')

		window.location.reload()
	}

	return {
		tokens,
		setTokens,
		isAuth,
		login,
		logout,
	}
})
