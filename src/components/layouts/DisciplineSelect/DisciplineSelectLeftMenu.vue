<template>
	<Transition name="fade">
		<div v-if="isOpenLeftMenu" class="DisciplineSelectLeftMenu">
			<DisciplineSelectControl />

			<div class="DisciplineSelectLeftMenu__list-wrapper">
				<div class="DisciplineSelectLeftMenu__list">
					<div
						v-for="discipline in disciplines"
						class="DisciplineSelectLeftMenu__block"
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
</template>

<script setup>
import { computed } from 'vue'

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

.DisciplineSelectLeftMenu {
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
