<template>
	<div class="LessonsTableView">
		<LessonsTableHeader :title="lessonsService.title" @add="onAddRow" />

		<!-- v-if="lessonsService.lessons.length || isLoadingLessons" -->
		<DataTable
			class="LessonsTable"
			v-model:expandedRowGroups="expandedRowGroups"
			:class="{ isEmpty }"
			:value="lessons"
			:loading="isLoadingLessons"
			stripedRows
			scrollable
			:rowGroupMode="nestedViewMode ? 'subheader' : null"
			:groupRowsBy="nestedViewMode ? 'chapter' : null"
			:expandableRowGroups="nestedViewMode"
			scrollHeight="flex"
			:rowClass="() => 'LessonsTable__row'"
			dataKey="id"
			:editMode="editMode ? 'cell' : null"
			@cell-edit-complete="onCellEditComplete"
			@row-click="onRowClick"
		>
			<template v-if="nestedViewMode" #groupheader="slotProps">
				<div class="LessonsTable__subheader flex align-items-center gap-2">
					<span>{{ slotProps.data.chapter }}</span>
				</div>
			</template>

			<Column v-if="nestedViewMode" field="chapter" header="chapter"></Column>

			<!-- № -->
			<Column
				headerClass="column-header-index"
				bodyClass="column-cell-index"
				header="№"
				headerStyle="width: 45px"
			>
				<template #body="{ index }">
					{{ index + 1 }}
				</template>
			</Column>

			<!-- Нагрузка -->
			<Column
				headerClass="column-header_center"
				bodyClass="column-cell_center"
				field="id_type_control"
				header="Вид"
				headerStyle="width: 110px"
			>
				<template #body="{ data, field }">
					<!-- <Tag v-if="data[field]" :value="ControlIdsEnum[data[field]]"></Tag> -->
					<LessonsLoadSelect
						:editMode="editMode"
						:controlTypes="controlTypes"
						:item="data"
						@change="id => onChangeControlType(data, id)"
					/>
				</template>
			</Column>

			<!-- Глава -->
			<Column
				v-if="!nestedViewMode"
				field="chapter"
				header="Глава"
				headerStyle="width: 50%"
			>
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

			<Column v-if="editMode" header="" headerStyle="width: 75px">
				<template #body="{ data, field }">
					<Button
						icon="mdi mdi-delete"
						severity="danger"
						text
						rounded
						@click="onDeleteRow(data.id)"
					/>
				</template>
			</Column>

			<template #empty>
				<div v-if="!isLoadingLessons">Записи отсутствуют.</div>
			</template>
		</DataTable>
		<!-- {{ lessons }} -->
	</div>
</template>

<script setup>
import Stub from '@components/layouts/Stub.vue'
import LessonsTableHeader from '@components/Lessons/LessonsTableHeader.vue'
import LessonsLoadSelect from '@components/Lessons/common/LessonsLoadSelect.vue'

import ControlIdsEnum from '@models/lessons/ControlIdsEnum'
import ViewModesEnum from '@models/lessons/ViewModesEnum'
import { useLessonsStore } from '@/stores/lessons'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import lessonsService from '@services/LessonsService'

const lessonsStore = useLessonsStore()

const editMode = computed(() => lessonsStore.editMode)
const nestedViewMode = computed(
	() => lessonsStore.viewMode === ViewModesEnum.Nested
)

const onCellEditComplete = event => {
	let { data, field, newValue, newData } = event

	if (data[field] === newValue) return

	const newLesson = Object.assign({}, newData)
	const res = lessonsService.editLesson(newLesson)

	if (res) {
		data[field] = newValue
	}
}

const onChangeControlType = (data, id) => {
	const newLesson = Object.assign({}, data)
	newLesson.id_type_control = id

	const res = lessonsService.editLesson(newLesson)

	if (res) {
		data.id_type_control = id
	}
}

const isLoadingLessons = ref(false)

const route = useRoute()
const aupCode = route.query?.aup
const idDiscipline = route.query?.id

const onAddRow = () =>
	lessonsService.createLocalLesson(lessonsStore.selectedSemester)
const onDeleteRow = id => lessonsService.deleteLesson(id)
const onRowClick = e => console.log({ ...e.data })

const expandedRowGroups = ref()

const lessons = computed(() =>
	lessonsService.lessons.items.filter(
		lesson => lesson.semester === lessonsStore.selectedSemester
	)
)

const isEmpty = computed(() => !lessons.value.length)

const controlTypes = computed(
	() => lessonsService.controlTypes.value[lessonsStore.selectedSemester]
)

if (aupCode && idDiscipline) {
	isLoadingLessons.value = true

	lessonsService.fetchLessons(aupCode, idDiscipline).then(data => {
		isLoadingLessons.value = false
		lessonsStore.setSemester(
			+Object.keys(lessonsService.controlTypes.value)?.[0]
		)
	})
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsTableView {
	height: 100%;
	display: grid;
	grid-template-rows: 70px calc(100vh - 70px - 12px - 16px - 16px);
	gap: 12px;

	&__empty {
		height: 100%;
		background-color: $view-bg;
		border-radius: $border-radius-main;
		display: grid;
		place-items: center;
		font-size: 1.2rem;
	}
}

.LessonsTable {
	font-size: 16px;
	border-radius: 8px;
	overflow: hidden;
	background-color: $view-bg;

	$row-height: 60px;

	&__subheader {
		padding: 0 25px;
		font-weight: bold;
		display: inline;
	}

	table {
		table-layout: fixed;
	}

	tr {
		height: $row-height;
	}

	.p-datatable-tbody td,
	th {
		padding: 0.5rem;
	}

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

	&.isEmpty {
		.p-datatable-wrapper {
			height: 100%;
		}

		.p-datatable-table {
			height: 100%;
		}

		.p-datatable-emptymessage {
			td {
				text-align: center;
				font-size: 1rem;
			}
		}
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
