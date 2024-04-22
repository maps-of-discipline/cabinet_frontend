<template>
	<DataTable
		class="GradesTable"
		ref="table"
		:value="grades"
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
				/>

				<Column header="Имя" frozen style="min-width: 450px" :colspan="1" />

				<Column
					v-for="(col, index) of values"
					style="min-width: 50px; width: 50px; max-width: 50px"
					:header="1"
					headerStyle="min-width: 25px; width: 25px; max-width: 25px"
					headerClass="column-header-index"
					bodyClass="column-cell-index"
				/>

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
			v-for="(col, index) of values"
			style="min-width: 50px; width: 50px; max-width: 50px"
			header="1"
			headerStyle="min-width: 25px; width: 25px; max-width: 25px"
			headerClass="column-header-index"
			bodyClass="column-cell-index"
		>
			<template #header="{ column }">
				<span>1</span>
			</template>

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
import { ref, computed } from 'vue'

import { useGradesStore } from '@/stores/grades'
import { useDisciplineStore } from '@/stores/discipline'

import GradeSelect from '@components/Grades/GradeSelect.vue'

const gradesStore = useGradesStore()
const disciplineStore = useDisciplineStore()

const values = Array(20)

const grades = computed(() => Array(30).fill(gradesStore.grades[0]))
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradesTable {
	background-color: $view-bg;
	border-radius: 8px;
	overflow: hidden;

	$row-height: 60px;

	.column-header--center {
		.p-column-header-content {
			justify-content: center;
		}
	}

	.column-header {
		&--center {
			.p-column-header-content {
				justify-content: center;
			}
		}
	}

	tr {
		height: $row-height;
	}

	/* .p-datatable-tbody td,
	th {
		padding: 0.5rem;
	} */

	.p-rowgroup-header {
		padding: 0;

		/* td {
			display: flex;
			align-items: center;
			gap: 12px;
		} */
	}

	.p-cell-editing {
		/* Непонятно почему, но это единственное решение, чтобы растянуть элемент внутри клетки */
		/* https://stackoverflow.com/questions/22220698/height-100-for-div-inside-div-with-display-table-cell#answer-32112698 */
		height: 1px;
		padding: 0 !important;
	}

	.column-header-index,
	.column-cell-index {
		padding: 0;
		text-align: center;
	}

	.column-header-index {
		.p-column-header-content {
			justify-content: center;
		}
	}

	&.editMode {
		.p-editable-column:not(.p-cell-editing) {
			cursor: pointer;
		}
	}
}
</style>
