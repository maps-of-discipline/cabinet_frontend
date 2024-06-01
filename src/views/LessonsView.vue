<template>
	<div class="Lessons" :class="{ isOpenLeftMenu }">
		<HeaderTable class="Lessons__header">
			<AddTask @add="onAddRow" />

			<div
				v-if="lessonsStore.filteredLessons.length"
				class="HeaderTable__editMode"
			>
				<!-- <ApButton label="Скачать" icon="mdi mdi-download" /> -->
				<ViewSelect />
				<LoadViewSelect />
				<LessonsFilterDropdown />
				<LessonsLoadInfo />
			</div>
		</HeaderTable>

		<div class="Lessons__body">
			<div class="Lessons__left">
				<DisciplineSelectLeftMenu />
			</div>

			<LessonsTable class="Lessons__table" />
		</div>
	</div>
</template>

<script setup>
import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'
import LessonsTable from '@components/Lessons/LessonsTable.vue'
import DisciplineSelectLeftMenu from '@components/layouts/DisciplineSelect/DisciplineSelectLeftMenu.vue'

import ApButton from '@components/ui/ApButton.vue'
import ViewSelect from '@components/Lessons/ViewSelect.vue'
import LoadViewSelect from '@components/Lessons/LoadViewSelect.vue'
import AddTask from '@components/Lessons/AddTask.vue'
import LessonsFilterDropdown from '@components/Lessons/LessonsFilterDropdown.vue'
import LessonsLoadInfo from '@components/Lessons/LessonsLoadInfo.vue'

import { computed, nextTick } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)

const onAddRow = async () => {
	lessonsStore.createLocalLesson()

	await nextTick()
	const scrollTableEl = document.querySelector('.p-datatable-wrapper')

	scrollTableEl.scrollTo({
		top: scrollTableEl.scrollHeight,
		behavior: 'smooth',
	})
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.Lessons {
	height: calc(100vh - 16px - 16px);

	gap: 12px;

	display: grid;
	grid-template-rows: 70px calc(100% - 70px - 12px);
	grid-template-columns: minmax(0px, 1fr);

	&__header {
		grid-column: 1 / 2;
	}

	&__body {
		display: flex;
		transition: all 0.3s;
		overflow: auto;
		height: 100%;
		align-items: stretch;
	}

	&__table {
		width: 100%;
	}

	&__left {
		width: 0px;
		height: 100%;
		transition: 0.25s ease;
		margin-left: 0px;
		margin-right: 0px;
		display: flex;
		align-items: stretch;
	}

	&.isOpenLeftMenu {
		.Lessons {
			&__left {
				width: 300px;
				margin-right: 12px;
			}
		}
	}
}
</style>
