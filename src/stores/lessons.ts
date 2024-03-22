import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', () => {
	const editMode = ref(false)
	function switchMode() {
		editMode.value = !editMode.value
	}

	return { editMode, switchMode }
})
