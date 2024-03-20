<template>
	<DataTable
		class="LessonsTable"
		:value="lessons"
		:loading="isLoadingLessons"
		stripedRows
		:rowClass="() => 'LessonsTable__row'"
		dataKey="id"
		editMode="cell"
		@cell-edit-complete="onCellEditComplete"
	>
		<!-- 		editMode="cell" -->
		<!-- Нагрузка -->
		<Column
			headerClass="column-header_center"
			bodyClass="column-cell_center"
			field="id_type_control"
			header="Вид"
			headerStyle="width: 75px"
		>
			<template #body="{ data, field }">
				<Tag :value="ControlIdsEnum[data[field]]"></Tag>
			</template>
		</Column>

		<!-- Глава -->
		<Column field="chapter" header="Глава" headerStyle="width: 50%">
			<template #body="{ data, field }">
				<span>
					{{ data[field] }}
				</span>
			</template>
			<template #editor="{ data, field }">
				<CellEditor v-model="data[field]" />
			</template>
		</Column>

		<!-- Тема -->
		<Column field="topic" header="Тема" headerStyle="width: 50%">
			<template #body="{ data, field }">
				<span>
					{{ data[field] }}
				</span>
			</template>
			<template #editor="{ data, field }">
				<CellEditor v-model="data[field]" />
			</template>
		</Column>

		<!-- Задание -->
		<Column field="task_link" header="Задание" headerStyle="width: 50%">
			<template #body="{ data, field }">
				<span>
					{{ data[field] }}
				</span>
			</template>
			<template #editor="{ data, field }">
				<CellEditor v-model="data[field]" />
			</template>
		</Column>
	</DataTable>
</template>

<script setup>
import ControlIdsEnum from '@models/lessons/ControlIdsEnum'

import { ref } from 'vue'
import { useRoute } from 'vue-router'

import lessonsService from '@services/LessonsService'

/* 
    TODO Обновлять и lessons ref() тоже (либо ref вынести в сервис), 
    пока оставил так
*/
const onCellEditComplete = event => {
	let { data, field, newValue, newData } = event

	if (data[field] === newValue) return

	const newLesson = Object.assign({}, newData)
	const res = lessonsService.editLesson(newLesson.id, newLesson)

	if (res) {
		data[field] = newValue
	}
}

const lessons = ref([])
const isLoadingLessons = ref(false)

const route = useRoute()
const aupCode = route.query?.aup

if (aupCode) {
	isLoadingLessons.value = true

	lessonsService.fetchLessons(aupCode).then(data => {
		lessons.value = data
		isLoadingLessons.value = false
	})
}
</script>

<style lang="scss">
.LessonsTable {
	font-size: 14px;
	min-height: 100vh;

	$row-height: 60px;

	table {
		table-layout: fixed;
	}

	tr {
		height: $row-height;
	}

	.p-cell-editing {
		/* Непонятно почему, но это единственное решение, чтобы растянуть элемент внутри клетки */
		/* https://stackoverflow.com/questions/22220698/height-100-for-div-inside-div-with-display-table-cell#answer-32112698 */
		height: 1px;
		padding: 0;
	}

	&__chip {
		font-size: 14px;
	}
}

.column-header_center {
	.p-column-header-content {
		justify-content: center;
	}
}

.column-cell_center {
	text-align: center;
}
</style>
