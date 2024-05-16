<template>
	<div
		class="Grades"
		:class="{ isShowSettings: gradesStore.isShowSettings, isOpenLeftMenu }"
	>
		<HeaderTable class="Grades__header">
			<TypeGradeSelect />

			<GradeSettingsButton />
		</HeaderTable>

		<Transition name="fade">
			<div v-if="isOpenLeftMenu" class="DisciplineSelectColumn">
				<DisciplineSelectControl />

				<div class="DisciplineSelectColumn__list-wrapper">
					<div class="DisciplineSelectColumn__list">
						<div
							v-for="discipline in disciplines"
							class="DisciplineSelectColumn__block"
							:class="{
								isActive:
									`${discipline.id}` === disciplineStore.selectedDisciplineId,
							}"
							:style="{
								backgroundColor: discipline.color,
								'--shade-color': shadeColor(discipline.color, -35),
							}"
							@click="onSelectDiscipline(discipline)"
						>
							{{ discipline.name }}
						</div>
					</div>
				</div>
			</div>
		</Transition>

		<div class="Grades__body">
			<GradesTable />

			<GradeSettings />
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import GradesTable from '@components/Grades/GradesTable.vue'
import TypeGradeSelect from '@components/Grades/TypeGradeSelect.vue'
import GradeSettingsButton from '@components/Grades/GradeSettingsButton.vue'
import GradeSettings from '@components/Grades/GradeSettings.vue'

import DisciplineSelectControl from '@components/layouts/DisciplineSelect/DisciplineSelectControl.vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import shadeColor from '@services/helpers/shadeColor'

const gradesStore = useGradesStore()
const disciplineStore = useDisciplineStore()
const lessonsStore = useLessonsStore()

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)
const disciplines = computed(() => disciplineStore.disciplinesBySemester)

const onSelectDiscipline = discipline => {
	disciplineStore.setSelectedDisciplineId(discipline.id)

	lessonsStore.fetchLessons(
		disciplineStore.selectedAup,
		disciplineStore.selectedDisciplineId
	)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.Grades {
	height: calc(100vh - 16px - 16px);
	display: grid;
	grid-template-rows: 70px calc(100% - 70px - 12px);
	grid-template-columns: 0px 1fr;
	grid-template-areas:
		'header header'
		'left right';
	gap: 12px;
	transition: 0.25s ease;

	&.isOpenLeftMenu {
		grid-template-columns: 300px 1fr;
	}

	&__header {
		grid-area: header;
	}

	&__body {
		display: grid;
		grid-template-columns: 1fr 0px;
		grid-template-rows: 100%;
		transition: all 0.3s;
		height: 100%;
		grid-area: right;
	}

	&.isShowSettings {
		.Grades {
			&__body {
				grid-template-columns: 1fr 300px;
			}
		}
	}
}

.DisciplineSelectColumn {
	background-color: $shade900;
	grid-area: left;
	border-radius: $borderRadius;
	width: 100%;
	padding: 16px;
	display: grid;
	grid-template-rows: auto 1fr;

	&__semester {
		text-align: center;
	}

	&__list-wrapper {
		overflow: auto;
		padding-right: 8px;
		margin-top: 12px;
	}

	&__list {
		display: grid;
		gap: 12px;
		overflow: auto;
	}

	&__block {
		cursor: pointer;
		border-radius: $borderRadius;
		height: 100px;
		display: flex;
		font-size: 0.9rem;
		padding: 8px;
		justify-content: center;
		align-items: center;
		text-align: center;
		user-select: none;

		&.isActive {
			box-shadow: 0px 0px 0px 5px var(--shade-color) inset;
		}
	}
}
</style>
