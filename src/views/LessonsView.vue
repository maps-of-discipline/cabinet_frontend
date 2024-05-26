<template>
	<div class="Lessons" :class="{ isOpenLeftMenu }">
		<HeaderTable class="Lessons__header" :title="lessonsStore.title">
			<AddTask @add="onAddRow" />

			<div class="HeaderTable__editMode">
				<ViewSelect />
				<LoadViewSelect />
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

import ViewSelect from '@components/Lessons/ViewSelect.vue'
import LoadViewSelect from '@components/Lessons/LoadViewSelect.vue'
import AddTask from '@components/Lessons/AddTask.vue'

import { computed } from 'vue'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

@import '@styles/_variables.scss';

.Lessons {
	height: calc(100vh - 16px - 16px);

	gap: 12px;
	transition: 0.25s ease;

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
