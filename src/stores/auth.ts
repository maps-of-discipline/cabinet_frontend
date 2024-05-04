import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

import Api from '@services/Api'

import { useUser } from './user'
import { HttpStatusCode } from 'axios'

export const useAuth = defineStore('auth', () => {
	const userStore = useUser()

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

	const login = async (login: string, password: string) => {
		const res = await Api.login({ login, password })

		if (res.error) return { error: res.error }

		setTokens(res.data)

		await userStore.fetchUser()
		isAuth.value = true

		return true
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
