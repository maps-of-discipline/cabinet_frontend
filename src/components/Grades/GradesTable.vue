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
		dataKey="id"
	>
		<!-- # -->
		<Column
			header="#"
			headerClass="column-header-index"
			bodyClass="column-cell-index"
			headerStyle="width: 45px"
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
			headerStyle="min-width: 25px; width: 25px; max-width: 25px"
			headerClass="column-header-index"
			bodyClass="column-cell-index"
		>
			<template #body="{ data, field }">
				<span>
					{{ data.values[index] }}
				</span>
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

const gradesStore = useGradesStore()

const values = Array(20)

const grades = computed(() => Array(30).fill(gradesStore.grades[0]))
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradesTable {
	background-color: $view-bg;
	border-radius: 8px;
	overflow: hidden;

	.column-header--center {
		.p-column-header-content {
			justify-content: center;
		}
	}

	.column-cell-index {
		text-align: center;
	}
}
</style>
