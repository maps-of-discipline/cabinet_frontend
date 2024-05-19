<template>
	<div class="GradesTable__wrapper">
		<DataTable
			class="GradesTable"
			:class="{ editMode: disciplineStore.editMode }"
			ref="table"
			:value="grades"
			:loading="isLoadingTable"
			showGridlines
			scrollable
			scrollHeight="flex"
			stripedRows
			:rowClass="() => 'GradesTable__row'"
			:editMode="disciplineStore.editMode ? 'cell' : null"
			v-model:filters="filters"
			:globalFilterFields="['name']"
			@cell-edit-complete="onCellEditComplete"
			dataKey="id"
			@row-click="onRowClick"
		>
			<ColumnGroup type="header">
				<Row>
					<Column
						header="#"
						class="column-header--center"
						headerStyle="width: 45px"
						:colspan="1"
						frozen
					/>

					<Column
						headerClass="GradesTable__name-cell"
						style="min-width: 400px; max-width: 400px"
						:colspan="1"
						field="name"
						frozen
					>
						<template #header="{ column }">
							<GradeNameHeaderColumn v-model="filters['name'].value" />
						</template>
					</Column>

					<Column
						v-for="(col, index) of columns"
						style="min-width: 50px; width: 50px; max-width: 50px"
						headerClass="column-header-index"
						bodyClass="column-cell-index"
					>
						<template #header="{ column }">
							<span
								class="GradesTable__topic-header"
								v-tooltip.right="{
									value: col.name,
								}"
							>
								{{ col.name }}
							</span>
						</template>
					</Column>

					<Column style="width: 100%" />

					<Column
						class="column-header--center"
						style="min-width: 70px; width: 70px; max-width: 70px"
						headerClass="GradesTable__avg-cell"
						:colspan="1"
						alignFrozen="right"
						frozen
					>
						<template #header>
							<div class="column-header--pointer">Итого</div>
						</template>
					</Column>
				</Row>
			</ColumnGroup>

			<!-- # -->
			<Column
				header="#"
				headerClass="column-header-index"
				bodyClass="column-cell-index"
				headerStyle="width: 45px"
				:colspan="1"
				frozen
			>
				<template #body="{ data, index }">
					<span class="LessonsTable__index">
						{{ index + 1 }}
					</span>
				</template>
			</Column>

			<!-- ФИО -->
			<Column
				bodyClass="GradesTable__name-cell"
				field="name"
				style="min-width: 400px; max-width: 400px"
				frozen
			>
				<template #body="{ data, field }">
					<span>
						{{
							gradesStore.showFullname ? data[field] : getSurname(data[field])
						}}
					</span>
				</template>

				<template #filter="{ filterModel, filterCallback }">
					<InputText
						v-model="filterModel.value"
						type="text"
						@input="filterCallback()"
						class="p-column-filter"
						placeholder="Search by name"
					/>
				</template>
			</Column>

			<!-- Столбцы -->
			<Column
				v-for="(col, index) of columns"
				style="min-width: 50px; width: 50px; max-width: 50px"
				:field="`${col.id}`"
				headerClass="column-header-index"
				bodyClass="column-cell-index"
			>
				<template #body="{ data }">
					<span>{{ data.values[col.id] }}</span>
				</template>

				<template #editor="{ data }">
					<CellEditor
						v-model="data.values[col.id]"
						style="justify-content: center"
					/>
				</template>
			</Column>

			<!-- Пустой столбец -->
			<Column>
				<template #body="{ data, field }">
					<span> </span>
				</template>
			</Column>

			<!-- Итого-->
			<Column
				bodyClass="column-cell-center GradesTable__avg-cell"
				headerStyle="width: 45px"
				:colspan="1"
				alignFrozen="right"
				frozen
			>
				<template #body="{ data, index }">
					{{ getSummaryGrade(data.values) || '' }}
				</template>
			</Column>
		</DataTable>

		<SelectDisciplineStub
			v-if="showSelectDisciplineStub"
			class="GradesTable__stub"
		/>

		<NotExistGradeTableStub
			v-if="gradesStore.gradeTableIsNotExist"
			class="GradesTable__stub"
		/>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@stores/lessons'

import SelectDisciplineStub from '@components/layouts/SelectDisciplineStub.vue'
import GradeSelect from '@components/Grades/GradeSelect.vue'
import GradeTag from '@components/Grades/GradeTag.vue'
import NotExistGradeTableStub from '@components/Grades/NotExistGradeTableStub.vue'
import GradeNameHeaderColumn from '@components/Grades/columns/GradeNameHeaderColumn.vue'

import getSurname from '@services/helpers/getSurname'

import { FilterMatchMode } from 'primevue/api'

const gradesStore = useGradesStore()
const lessonsStore = useLessonsStore()
const disciplineStore = useDisciplineStore()

const columns = computed(() => {
	if (gradesStore.isHideEmptyCols) {
		const setOfExistsColumns = new Set()

		gradesStore.grades.forEach(row => {
			setOfExistsColumns.add(...Object.keys(row.values))
		})

		return gradesStore.filteredColumnsBySelectedType.filter(col => {
			return setOfExistsColumns.has(`${col.id}`)
		})
	} else {
		return gradesStore.filteredColumnsBySelectedType
	}
})
const showSelectDisciplineStub = computed(
	() => !disciplineStore.hasSelectedDiscipline
)

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	name: { value: '', matchMode: FilterMatchMode.STARTS_WITH },
})
const grades = computed(() => gradesStore.grades)
const isLoadingTable = computed(() => gradesStore.isLoading)

const onCellEditComplete = event => {
	let { newData, field } = event

	console.log(event)

	const grade = +newData.values[field]
	const colId = field
	const studentId = newData.id

	gradesStore.updateGrade(grade, colId, studentId)
}

const getSummaryGrade = values => {
	let sum = 0

	gradesStore.setColumnsIdsBySelectedType.forEach(colId => {
		if (values[colId]) sum += values[colId]
	})

	return sum
}

const onRowClick = e => console.log({ ...e.data })

watch(
	() => disciplineStore.selectedSemester,
	() => {
		gradesStore.fetchGrades()
	}
)

const aupCode = disciplineStore.selectedAup
const idDiscipline = disciplineStore.selectedDisciplineId

onMounted(async () => {
	if (aupCode && idDiscipline) {
		await lessonsStore.fetchLessons(aupCode, idDiscipline)
		await gradesStore.fetchGrades()
	}
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradesTable {
	background-color: $view-bg;
	border-radius: 8px;
	overflow: auto;

	$row-height: 60px;

	&__wrapper {
		position: relative;
		overflow: auto;
	}

	&__stub {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	&__topic-header {
		cursor: pointer;
		font-size: 0.9rem;
	}

	/* 	&__name-cell {
		box-shadow: 5px 1px 10px 0px rgba(0, 0, 0, 0.1);
	}

	&__avg-cell {
		box-shadow: -5px 1px 10px 0px rgba(0, 0, 0, 0.1);
	} */

	&__name-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	tr {
		height: $row-height;
	}

	&.editMode {
		.p-editable-column:not(.p-cell-editing) {
			cursor: pointer;
		}
	}
}
</style>
