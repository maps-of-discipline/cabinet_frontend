<template>
	<div class="DisciplineSelectControl">
		<ApButton icon="mdi mdi-chevron-left" @click="changeSemester(-1)" />

		<div
			v-tooltip.bottom="{
				value: 'Выбор семестра',
				showDelay: 500,
			}"
		>
			<Dropdown
				class="DisciplineSelectControl__select"
				panelClass="DisciplineSelectControl__select-panel"
				v-model="selectedSemestr"
				:options="semesters"
				:loading="lessonsStore.isLoadingControlTypes"
				:optionLabel="getLabel"
				placeholder="Семестр"
				emptyMessage="Выберите дисциплину"
			>
				<template #option="{ option }">
					<span v-if="isActiveSemester(option)">🔥</span>
					<span>{{ getLabel(option) }}</span>
				</template>
			</Dropdown>
		</div>

		<ApButton icon="mdi mdi-chevron-right" @click="changeSemester(1)" />
	</div>
</template>

<script setup>
import { computed } from 'vue'

import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import ApButton from '@components/ui/ApButton.vue'

import semesterNamesByNum from '@services/helpers/semesterNamesByNum'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const semesters = computed(() =>
	disciplineStore.semesters.sort((a, b) => a - b)
)

const changeSemester = step => {
	const currentIndex = semesters.value.findIndex(
		semester => semester === selectedSemestr.value
	)

	console.log(currentIndex, step)

	let newIndex = null
	if (currentIndex + step < 0) newIndex = semesters.value.length - 1
	else newIndex = Math.abs(currentIndex + step) % semesters.value.length

	const newSemester = semesters.value[newIndex]

	disciplineStore.setSelectedSemester(+newSemester)
}

const selectedSemestr = computed({
	get() {
		return `${disciplineStore.selectedSemester}`
	},

	set(val) {
		disciplineStore.setSelectedSemester(+val)
	},
})

const getLabel = value => {
	return semesterNamesByNum[+value]
}

const isActiveSemester = value => {
	return +value === 8
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectControl {
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	gap: 12px;

	&__select {
		width: 100%;
	}

	&__select {
		outline: $focusOutlineTransparent;
		border: none;
		transition: outline 0.2s, color 0.2s;
		color: $shade400;

		.p-dropdown-trigger {
			display: none;
		}

		.p-dropdown-label {
			text-align: center;
			padding: 8px 12px;
		}

		.p-button-label {
			transition-duration: 0s;
		}

		&:hover,
		&:focus,
		&.p-inputwrapper-focus {
			border: none;
			outline: $focusOutline;
			color: $shade000;
		}
	}

	&__select-panel {
		--p-anchor-gutter: 8px;

		.p-dropdown-item {
			justify-content: center;
		}
	}
}
</style>
