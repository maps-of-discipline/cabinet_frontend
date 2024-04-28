import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useUi = defineStore('ui', () => {
	const leftMenuMiniMode = ref(
		JSON.parse(localStorage.getItem('leftMenuMiniMode') || '')
	)

	const setLeftMenuMiniMode = value => {
		leftMenuMiniMode.value = value
		localStorage.setItem('leftMenuMiniMode', value)
	}

	return {
		leftMenuMiniMode,
		setLeftMenuMiniMode,
	}
})
