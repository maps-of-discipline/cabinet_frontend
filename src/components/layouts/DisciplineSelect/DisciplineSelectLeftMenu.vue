<template>
	<Transition name="fade">
		<div v-if="isOpenLeftMenu" class="DisciplineSelectLeftMenu">
			<div class="DisciplineSelectLeftMenu__header">
				<template v-if="userStore.isAdmin">
					<Button
						class="DisciplineSelectLeftMenu__aup-select"
						:label="disciplineStore.aupTitle || 'Выбор направления'"
						v-tooltip.bottom="{
							value:
								'Выбор дисциплины. Интерфейс для разработки и выбора любого направления и дисциплины',
							showDelay: 500,
						}"
						@click="openPopup"
					/>

					<GroupSelect />
				</template>

				<DisciplineSelectControl v-if="!isLoading" />
			</div>

			<div v-if="!isLoading" class="DisciplineSelectLeftMenu__inner">
				<div class="DisciplineSelectLeftMenu__list-wrapper">
					<div class="DisciplineSelectLeftMenu__list">
						<div
							v-for="discipline in disciplines"
							class="DisciplineSelectLeftMenu__block"
							:class="{
								isActive: discipline.id == disciplineStore.selectedDisciplineId,
							}"
							:style="{
								backgroundColor: discipline.color,
								color: determinateTextColor(discipline.color) ? '#333' : '#fff',
								'--shade-color': shadeColor(discipline.color, -35),
							}"
							@click="onSelectDiscipline(discipline)"
						>
							<span>
								{{ discipline.name }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<Stub v-else>
				<ApLoadingSpinner />
			</Stub>

			<DisciplineSelectDialog />
		</div>
	</Transition>
</template>

<script setup>
import { computed, watch } from 'vue'

import DisciplineSelectControl from '@components/layouts/DisciplineSelect/DisciplineSelectControl.vue'
import Stub from '@components/layouts/Stub.vue'
import ApLoadingSpinner from '@components/ui/ApLoadingSpinner.vue'
import DisciplineSelectDialog from '@components/layouts/DisciplineSelect/DisciplineSelectDialog.vue'
import GroupSelect from '@components/layouts/HeaderTable/GroupSelect.vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'

import determinateTextColor from '@services/helpers/determinateTextColor'
import shadeColor from '@services/helpers/shadeColor'
import { useUser } from '@stores/user'

const gradesStore = useGradesStore()
const disciplineStore = useDisciplineStore()
const userStore = useUser()

const isLoading = computed(() => disciplineStore.isLoadingDisciplineLeftMenu)

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)
const disciplines = computed(() =>
	disciplineStore.disciplinesBySemester.sort((a, b) =>
		a.name.localeCompare(b.name)
	)
)

const onSelectDiscipline = discipline => {
	disciplineStore.setSelectedDiscipline(discipline)
	disciplineStore.setSelectedDisciplineId(discipline.id)
}

const openPopup = () => disciplineStore.setDirectionDialogModel(true)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.DisciplineSelectLeftMenu {
	min-width: 300px;
	background-color: $shade900;
	border-radius: $borderRadius;
	padding: 16px;
	height: 100%;
	display: grid;
	grid-template-rows: auto minmax(0px, 1fr);

	&__header {
		display: grid;
		gap: 12px;
	}

	&__inner {
		display: grid;
		grid-template-rows: auto minmax(0px, 1fr);
		width: 100%;
		height: 100%;
		transition: 0.25s ease;
	}

	&__aup-select {
		width: 100%;
		background-color: $shade950;
		height: 37px;
		max-width: 300px;

		.p-button-label {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		outline: $focusOutlineTransparent;
		border: none;
		transition: outline 0.2s;

		&:hover,
		&:focus {
			border: none;
			outline: $focusOutline;
		}
	}

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
		min-height: 70px;
		display: flex;
		font-size: 0.9rem;
		padding: 8px;
		justify-content: center;
		align-items: center;
		text-align: center;
		user-select: none;
		font-weight: 500;
		border: 5px solid transparent;
		transition: border 0.25s ease;

		&.isActive {
			border: 5px solid var(--shade-color);
		}
	}
}
</style>
