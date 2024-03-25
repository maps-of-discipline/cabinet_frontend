import type { Key } from '@models/Key'
import ViewModesEnum from '@models/lessons/ViewModesEnum'

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

	const viewMode: Ref<ViewModesEnum> = ref(ViewModesEnum.Simple)
	const setViewMode = (mode: ViewModesEnum) => {
		viewMode.value = mode
	}

	const loadViewMode = ref(false)
	function switchLoadViewMode() {
		loadViewMode.value = !loadViewMode.value
	}

	return {
		editMode,
		switchMode,
		selectedSemester,
		setSemester,
		viewMode,
		setViewMode,
		loadViewMode,
		switchLoadViewMode,
	}
})
