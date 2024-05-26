import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

import Api from '@services/Api'

import { useUser } from './user'
import { HttpStatusCode } from 'axios'

const getTokensFromStorage = () => {
	return {
		access:
			localStorage.getItem('access') || sessionStorage.getItem('access') || '',
		refresh:
			localStorage.getItem('refresh') ||
			sessionStorage.getItem('refresh') ||
			'',
		token:
			localStorage.getItem('token') || sessionStorage.getItem('token') || '',
	}
}

const setTokensToStorage = (tokens, isSession: boolean) => {
	const storageObj = isSession ? sessionStorage : localStorage

	storageObj.setItem('access', tokens.access)
	storageObj.setItem('refresh', tokens.refresh)
	storageObj.setItem('token', tokens.token)
}

const removeTokensFromStorage = () => {
	localStorage.removeItem('access')
	localStorage.removeItem('refresh')
	localStorage.removeItem('token')
	sessionStorage.removeItem('access')
	sessionStorage.removeItem('refresh')
	sessionStorage.removeItem('token')
}

interface ITokens {
	access: string
	refresh: string
	token: string
}

export const useAuth = defineStore('auth', () => {
	const userStore = useUser()

	const tokens: Ref<ITokens> = ref(getTokensFromStorage())

	const isAuth = ref(!!getTokensFromStorage().access)

	const isSession = ref(false)
	const setIsSession = value => (isSession.value = value)

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

		setTokensToStorage(payload, isSession.value)
	}

	const login = async (login: string, password: string) => {
		const res = await Api.login({ username: login, password })

		if (res.error) return { error: res.error }
		if (!res.data?.approved) return res

		setTokens(res.data)

		await userStore.fetchUser()
		isAuth.value = true

		return res
	}

	const logout = () => {
		removeTokensFromStorage()

		window.location.reload()
	}

	return {
		tokens,
		setTokens,
		isAuth,
		login,
		logout,
		isSession,
		setIsSession,
	}
})
