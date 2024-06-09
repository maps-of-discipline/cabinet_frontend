<template>
	<div class="GradesTable__wrapper">
		<DataTable
			class="GradesTable"
			:class="{ editMode: disciplineStore.editMode }"
			v-model:filters="filters"
			:value="grades"
			:loading="isLoadingTable"
			showGridlines
			scrollable
			scrollHeight="flex"
			stripedRows
			dataKey="id"
			:rowClass="() => 'GradesTable__row'"
			:virtualScrollerOptions="{ itemSize: 44 }"
			:editMode="disciplineStore.editMode ? 'cell' : null"
			:globalFilterFields="['name']"
			@cell-edit-complete="onCellEditComplete"
			@row-click="onRowClick"
		>
			<ColumnGroup type="header">
				<Row>
					<!-- № -->
					<Column
						header="#"
						class="column-header--center"
						headerStyle="width: 45px"
						:colspan="1"
						rowspan="3"
						frozen
					>
						<template #header="{ column }"></template>
					</Column>

					<!-- ФИО -->
					<Column
						headerClass="GradesTable__name-cell"
						style="min-width: 400px; max-width: 400px"
						:colspan="1"
						rowspan="3"
						field="name"
						frozen
					>
						<template #header="{ column }">
							<GradeNameHeaderColumn v-model="filters['name'].value" />
						</template>
					</Column>

					<!-- Заголовок вида оценивания -->
					<Column
						v-for="(gradeType, index) of visibleGradeTypes"
						:colspan="
							gradesStore.isAllGradeType
								? getCountColsByGradeTypeId(gradeType.id) + 1
								: getCountColsByGradeTypeId(gradeType.id) + 2
						"
						:hidden="getCountColsByGradeTypeId(gradeType.id) === 0"
						:style="{ backgroundColor: gradeType.color }"
						rowspan="1"
					>
						<template #header="{ column }">{{ gradeType.name }}</template>
					</Column>
				</Row>

				<!-- Названия столбцов-->
				<Row>
					<template v-for="(gradeType, index) of visibleGradeTypes">
						<Column
							v-for="(col, index) of gradesStore.filteredColumnsByGradeTypeId?.[
								gradeType.id
							] || []"
							headerClass="column-header-index GradesTable__topic-header-cell"
							bodyClass="column-cell-index"
							:class="{ isNear: isNearGradeColumn(gradeType, col) }"
							style="min-width: 75px"
							:hidden="checkNeedHideCol(col)"
							:key="col.id"
						>
							<template #header="{ column }">
								<div
									class="GradesTable__topic-header"
									v-tooltip.top="{
										value:
											col.grade_type.type == 'tasks'
												? col.topic.task_link_name
												: formatDateSimple(col.topic.date, true),
									}"
								>
									<span>
										{{
											col.grade_type.type == 'tasks'
												? index + 1
												: formatDateSimple(col.topic.date)
										}}
									</span>
								</div>
							</template>
						</Column>

						<Column style="width: 100%" v-if="!gradesStore.isAllGradeType" />

						<Column
							class="column-header--center"
							style="min-width: 70px; width: 70px; max-width: 70px"
							headerClass="GradesTable__avg-cell"
							:style="{
								backgroundColor: gradeType.color,
								borderWidth: '0px 0px 1px 1px',
							}"
							:colspan="1"
							rowspan="2"
							:hidden="getCountColsByGradeTypeId(gradeType.id) === 0"
						>
							<template #header>
								<div class="column-header--pointer">Итого</div>
							</template>
						</Column>
					</template>

					<Column style="width: 100%" v-if="gradesStore.isAllGradeType" />
				</Row>

				<!-- Баллы за каждое задание -->
				<Row>
					<template v-for="(gradeType, index) of visibleGradeTypes">
						<Column
							v-for="(col, index) of gradesStore.filteredColumnsByGradeTypeId?.[
								gradeType.id
							] || []"
							headerClass="column-header-index GradesTable__topic-header-cell"
							bodyClass="column-cell-index"
							:class="{ isNear: isNearGradeColumn(gradeType, col) }"
							style="min-width: 75px"
							:hidden="checkNeedHideCol(col)"
							:key="col.id"
						>
							<template #header="{ column }">
								<div
									class="GradesTable__topic-header"
									v-tooltip.top="{
										value: `${gradeType.max_grade} баллов`,
									}"
								>
									<span> {{ gradeType.max_grade }} б. </span>
								</div>
							</template>
						</Column>

						<Column style="width: 100%" v-if="!gradesStore.isAllGradeType" />
					</template>

					<Column style="width: 100%" v-if="gradesStore.isAllGradeType" />
				</Row>

				<!-- <GradeColumnFilters
									v-if="disciplineStore.editMode"
									:column="col"
								/> -->
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
			<template v-for="(gradeType, index) of visibleGradeTypes">
				<Column
					v-for="(col, index) of gradesStore.filteredColumnsByGradeTypeId?.[
						gradeType.id
					] || []"
					:field="`${col.id}`"
					headerClass="column-header-index"
					bodyClass="column-cell-index"
					:class="{ isNear: isNearGradeColumn(gradeType, col) }"
					:hidden="
						checkNeedHideCol(col) ||
						getCountColsByGradeTypeId(gradeType.id) === 0
					"
					:key="col.id"
				>
					<template #body="{ data }">
						<span>
							{{ data.values[col.id] === 0 ? '' : data.values[col.id] }}
						</span>
					</template>

					<template #editor="{ data }">
						<GradeEditor
							:min="gradeType.min_grade"
							:max="gradeType.max_grade"
							v-model="data.values[col.id]"
							style="justify-content: center"
						/>
					</template>
				</Column>

				<Column v-if="!gradesStore.isAllGradeType">
					<template #body="{ data, field }">
						<span> </span>
					</template>
				</Column>

				<Column
					bodyClass="column-cell-center GradesTable__avg-cell"
					headerStyle="width: 45px"
					:colspan="1"
					alignFrozen="right"
					:hidden="getCountColsByGradeTypeId(gradeType.id) === 0"
					:style="{ backgroundColor: gradeType.color }"
				>
					<!-- frozen -->
					<template #body="{ data, index }">
						{{ getSummaryGrade(gradeType, data.values) || '' }}
					</template>
				</Column>
			</template>

			<Column v-if="gradesStore.isAllGradeType">
				<template #body="{ data, field }">
					<span> </span>
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
import GradeEditor from '@components/Grades/GradeEditor.vue'
import GradeColumnFilters from '@components/Grades/GradeColumnFilters.vue'

import formatDateSimple from '@services/helpers/formatDateSimple'
import getSurname from '@services/helpers/getSurname'
import moment from 'moment'

import { FilterMatchMode } from 'primevue/api'

const gradesStore = useGradesStore()
const lessonsStore = useLessonsStore()
const disciplineStore = useDisciplineStore()

const nearestDateColumn = computed(() => {
	const map = {}

	visibleGradeTypes.value.forEach(gradeType => {
		const cols = gradesStore.filteredColumnsByGradeTypeId?.[gradeType.id]
		if (!cols?.length) return

		let minDiffCol = Infinity
		let nearCol = null
		const now = new Date()

		cols.forEach(col => {
			const colDate = new Date(col.topic.date)
			const diff = now - colDate

			if (diff >= 0 && diff < minDiffCol) {
				minDiffCol = minDiffCol
				nearCol = col
			}
		})

		map[gradeType.id] = nearCol
	})

	return map
})

const isNearGradeColumn = (gradeType, col) => {
	return col.id == nearestDateColumn.value[gradeType.id]?.id
}

const checkNeedHideCol = col => {
	if (col.hidden) return true
	if (gradesStore.isHideEmptyCols) return !existColIdsSet.value.has(col.id)
	if (gradesStore.isRecentCols) return true

	return false
}

const getCountColsByGradeTypeId = id => {
	return Object.keys(gradesStore.filteredColumnsByGradeTypeId?.[id] || {})
		?.length
}

const visibleGradeTypes = computed(() =>
	gradesStore.gradeTypes.filter(gt => {
		if (
			(gt.id === gradesStore.selectedGradeType.id ||
				gradesStore.isAllGradeType) &&
			!gt.archived
		)
			return true
	})
)

const existColIdsSet = computed(() => {
	const setOfExistsColumns = new Set()

	gradesStore.grades.forEach(row => {
		for (const colId in row.values) {
			if (Number.isInteger(row.values[colId])) setOfExistsColumns.add(+colId)
		}
	})

	return setOfExistsColumns
})

const columns = computed(() => {
	return gradesStore.filteredColumnsBySelectedType
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

	const grade = newData.values[field]
	const colId = field
	const studentId = newData.id

	gradesStore.updateGrade(grade, colId, studentId)
}

const getSummaryGrade = (gradeType, values) => {
	let sum = 0

	gradesStore.setColumnsIdsBySelectedType.forEach(colId => {
		if (
			gradesStore.columnsById[colId].grade_type.id == gradeType.id &&
			values[colId] &&
			!gradesStore.columnsById[colId]?.hidden
		)
			sum += values[colId]
	})

	return sum.toFixed(2)
}

const onRowClick = e => console.log({ ...e.data })

watch(
	() => [
		disciplineStore.selectedAupId,
		disciplineStore.selectedDisciplineId,
		disciplineStore.selectedGroup,
	],
	() => {
		gradesStore.fetchGrades()
	}
)

onMounted(() => {
	gradesStore.fetchGrades()
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradesTable {
	background-color: $view-bg;
	border-radius: 8px;
	overflow: auto;

	$row-height: 40px;

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

	&__topic-header-cell {
		padding: 0;

		.p-column-header-content {
			height: 100%;
		}
	}

	&__topic-header {
		cursor: pointer;
		font-size: 0.9rem;
		white-space: nowrap;
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
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

	.isNear {
		background: rgba(64, 197, 197, 0.1);
	}

	.hiddenForStudents {
		color: $shade400;
	}
}
</style>
