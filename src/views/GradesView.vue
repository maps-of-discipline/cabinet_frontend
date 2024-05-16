<template>
	<div
		class="Grades"
		:class="{ isShowSettings: gradesStore.isShowSettings, isOpenLeftMenu }"
	>
		<HeaderTable class="Grades__header">
			<TypeGradeSelect />

			<GradeSettingsButton />
		</HeaderTable>

		<div class="Grades__body">
			<div class="Grades__left">
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
											`${discipline.id}` ===
											disciplineStore.selectedDisciplineId,
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
			</div>

			<GradesTable class="Grades__table" />

			<div class="Grades__right">
				<GradeSettings />
			</div>
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

	gap: 12px;
	transition: 0.25s ease;

	display: grid;
	grid-template-rows: 70px calc(100% - 70px - 12px);
	grid-template-columns: 1fr;

	&__header {
		grid-column: 1 / 2;
	}

	&__body {
		display: flex;
		transition: all 0.3s;
		height: 100%;
		align-items: stretch;
	}

	&__table {
		width: 100%;
	}

	&__left,
	&__right {
		width: 0px;
		height: 100%;
		transition: 0.25s ease;
		margin-left: 0px;
		margin-right: 0px;
		display: flex;
		align-items: stretch;
	}

	&.isShowSettings {
		.Grades {
			&__right {
				width: 300px;
				margin-left: 12px;
			}
		}
	}

	&.isOpenLeftMenu {
		.Grades {
			&__left {
				width: 300px;
				margin-right: 12px;
			}
		}
	}
}

.DisciplineSelectColumn {
	background-color: $shade900;
	border-radius: $borderRadius;
	padding: 16px;
	display: grid;
	grid-template-rows: auto 1fr;
	min-width: 300px;
	transition: 0.25s ease;

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
