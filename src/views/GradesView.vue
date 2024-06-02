<template>
	<div
		class="Grades"
		:class="{ isShowSettings: gradesStore.isShowSettings, isOpenLeftMenu }"
	>
		<HeaderTable class="Grades__header">
			<template v-if="gradesStore.grades.length">
				<ApButton
					label="Скачать"
					icon="mdi mdi-download"
					:loading="isLoadingExcel"
					@click="onDownloadExcel"
				/>
				<GradeTypeSelect />
			</template>

			<template v-if="gradesStore.grades.length && userStore.isTeacher">
				<GradeFilterDropdown />
				<GradeSettingsButton />
			</template>
		</HeaderTable>

		<div class="Grades__body">
			<div class="Grades__left">
				<DisciplineSelectLeftMenu />
			</div>

			<GradesTable class="Grades__table" />

			<div class="Grades__right">
				<GradeSettings />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'

import GradesTable from '@components/Grades/GradesTable.vue'
import GradeTypeSelect from '@components/Grades/GradeTypeSelect.vue'
import GradeSettingsButton from '@components/Grades/GradeSettingsButton.vue'
import GradeFilterDropdown from '@components/Grades/GradeFilterDropdown.vue'
import GradeSettings from '@components/Grades/GradeSettings.vue'
import ApButton from '@components/ui/ApButton.vue'

import DisciplineSelectLeftMenu from '@components/layouts/DisciplineSelect/DisciplineSelectLeftMenu.vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@/stores/lessons'
import { useUser } from '@/stores/user'
import downloadAsFile from '@services/helpers/downloadAsFile'
import Api from '@services/Api'

const gradesStore = useGradesStore()
const disciplineStore = useDisciplineStore()
const userStore = useUser()

const isOpenLeftMenu = computed(() => disciplineStore.isOpenDisciplineColumn)

const isLoadingExcel = ref(false)
const onDownloadExcel = async () => {
	try {
		isLoadingExcel.value = true
		const data = await Api.downloadLessonsExcel(
			disciplineStore.selectedAupId,
			disciplineStore.selectedDisciplineId,
			disciplineStore.selectedGroup.title,
			disciplineStore.selectedSemester
		)

		downloadAsFile(data, `${disciplineStore.disciplineTitle}.xlsx`)
	} catch (e) {
		console.log(e)
	} finally {
		isLoadingExcel.value = false
	}
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.Grades {
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
</style>
