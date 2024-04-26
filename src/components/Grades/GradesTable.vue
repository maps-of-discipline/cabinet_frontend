<template>
	<DataTable
		class="GradesTable"
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

				<Column header="Имя" frozen style="min-width: 450px" :colspan="1" />

				<Column
					v-for="(col, index) of topics"
					style="min-width: 50px; width: 50px; max-width: 50px"
					headerStyle="min-width: 25px; width: 25px; max-width: 25px"
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

		<Column header="Имя" field="name" frozen style="min-width: 450px">
			<template #body="{ data, field }">
				<span>
					{{ data[field] }}
				</span>
			</template>
		</Column>

		<Column
			v-for="(col, index) of topics"
			style="min-width: 50px; width: 50px; max-width: 50px"
			headerStyle="min-width: 25px; width: 25px; max-width: 25px"
			headerClass="column-header-index"
			bodyClass="column-cell-index"
		>
			<template #body="{ data, field }">
				<span>
					{{ data.values[index] }}
				</span>
			</template>

			<template #editor="{ data, field }">
				<GradeSelect v-model="data.values[index]" />
			</template>
		</Column>

		<Column style="width: 100%">
			<template #body="{ data, field }">
				<span> </span>
			</template>
		</Column>
	</DataTable>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'
import { useLessonsStore } from '@stores/lessons'

import GradeSelect from '@components/Grades/GradeSelect.vue'

const gradesStore = useGradesStore()
const lessonsStore = useLessonsStore()
const disciplineStore = useDisciplineStore()

const topics = computed(() => lessonsStore.filteredLessons)

const grades = computed(() => gradesStore.grades)
const isLoadingTable = computed(() => gradesStore.isLoading)

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

	&__topic-header {
		cursor: pointer;
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
