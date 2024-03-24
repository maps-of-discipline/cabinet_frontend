import type { Key } from '@models/Key'

import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', () => {
	const editMode = ref(false)
	function switchMode() {
		editMode.value = !editMode.value
	}

	const selectedSemester: Ref<number | null> = ref(null)
	function setSemester(semestr: string) {
		selectedSemester.value = +semestr
	}

	return { editMode, switchMode, selectedSemester, setSemester }
})
