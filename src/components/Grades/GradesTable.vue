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
			dataKey="id"
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
						header="Имя"
						frozen
						style="min-width: 450px; max-width: 450px"
						:colspan="1"
					/>

					<Column
						v-for="(col, index) of topics"
						style="min-width: 50px; width: 50px; max-width: 50px"
						headerClass="column-header-index"
						bodyClass="column-cell-index"
					>
						<template #header="{ column }">
							<span
								class="GradesTable__topic-header"
								v-tooltip.right="{
									value: col.topic,
								}"
							>
								{{ index + 1 }}
							</span>
						</template>
					</Column>

					<Column style="width: 100%" />

					<Column
						class="column-header--center"
						style="min-width: 50px; width: 50px; max-width: 50px"
						headerClass="GradesTable__avg-cell"
						:colspan="1"
						alignFrozen="right"
						frozen
					>
						<template #header>
							<div
								class="column-header--pointer"
								v-tooltip.bottom="{ value: 'Средний балл' }"
							>
								СБ
							</div>
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

			<!-- Имя -->
			<Column
				bodyClass="GradesTable__name-cell"
				header="Имя"
				field="name"
				frozen
				style="min-width: 450px; max-width: 450px"
			>
				<template #body="{ data, field }">
					<span>
						{{ data[field] }}
					</span>
				</template>
			</Column>

			<!-- Топики -->
			<Column
				v-for="(col, index) of topics"
				style="min-width: 50px; width: 50px; max-width: 50px"
				headerClass="column-header-index"
				bodyClass="column-cell-index"
			>
				<template #body="{ data }">
					<span>
						<GradeTag v-if="data.values[col.id]" :value="data.values[col.id]" />
					</span>
				</template>

				<template #editor="{ data, field }">
					<GradeSelect
						:value="data.values[col.id]"
						@input="onInputGrade($event, col, data)"
					/>
				</template>
			</Column>

			<!-- Пустой столбец -->
			<Column style="width: 100%">
				<template #body="{ data, field }">
					<span> </span>
				</template>
			</Column>

			<!-- Средний балл -->
			<Column
				bodyClass="column-cell-center GradesTable__avg-cell"
				headerStyle="width: 45px"
				:colspan="1"
				alignFrozen="right"
				frozen
			>
				<template #body="{ data, index }">
					<GradeTag :value="getAvgGrade(data.values)" />
				</template>
			</Column>
		</DataTable>

		<SelectDisciplineStub
			v-if="showSelectDisciplineStub"
			class="GradesTable__stub"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@stores/lessons'

import SelectDisciplineStub from '@components/layouts/SelectDisciplineStub.vue'
import GradeSelect from '@components/Grades/GradeSelect.vue'
import GradeTag from '@components/Grades/GradeTag.vue'

const gradesStore = useGradesStore()
const lessonsStore = useLessonsStore()
const disciplineStore = useDisciplineStore()

const topics = computed(() => lessonsStore.filteredLessons)
const showSelectDisciplineStub = computed(
	() => !disciplineStore.hasSelectedDiscipline
)

const grades = computed(() => gradesStore.grades)
const isLoadingTable = computed(() => gradesStore.isLoading)

const onInputGrade = (value, topic, row) => {
	const grade = value
	const topicId = topic.id
	const studentId = row.id

	gradesStore.updateGrade(grade, topicId, studentId)
}

const getAvgGrade = values => {
	const valuesArr = Object.values(values)

	const value =
		valuesArr.reduce((sum, current) => {
			return sum + current
		}, 0) / valuesArr.length

	const roundedValue = Math.ceil(value * 100) / 100

	return roundedValue
}

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
	overflow: hidden;

	$row-height: 60px;

	&__wrapper {
		position: relative;
	}

	&__stub {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	&__topic-header {
		cursor: pointer;
	}

	&__name-cell {
		box-shadow: 5px 1px 10px 0px rgba(0, 0, 0, 0.1);
	}

	&__avg-cell {
		box-shadow: -5px 1px 10px 0px rgba(0, 0, 0, 0.1);
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
