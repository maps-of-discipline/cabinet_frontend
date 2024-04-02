<template>
	<div class="LessonsTableView">
		<LessonsTableHeader :title="lessonsStore.title" @add="onAddRow" />

		<DataTable
			class="LessonsTable"
			v-model:expandedRowGroups="expandedRowGroups"
			:class="{ isEmpty }"
			:value="lessons"
			:loading="lessonsStore.isLoadingLessons"
			stripedRows
			scrollable
			:rowGroupMode="nestedViewMode ? 'subheader' : null"
			:groupRowsBy="nestedViewMode ? 'chapter' : null"
			:expandableRowGroups="nestedViewMode"
			scrollHeight="flex"
			:rowClass="() => 'LessonsTable__row'"
			dataKey="id"
			:editMode="lessonsStore.editMode ? 'cell' : null"
			@cell-edit-complete="onCellEditComplete"
			@row-click="onRowClick"
		>
			<template v-if="nestedViewMode" #groupheader="slotProps">
				<div class="LessonsTable__subheader flex align-items-center gap-2">
					<span>{{ slotProps.data.chapter }}</span>
				</div>
			</template>

			<ColumnGroup type="header">
				<Row>
					<Column
						header="#"
						class="column-header--center"
						headerStyle="width: 45px"
						:colspan="1"
					/>

					<Column
						header="Вид"
						class="column-header--center"
						headerStyle="width: 120px"
						:colspan="1"
					/>

					<Column
						v-if="lessonsStore.loadViewMode"
						v-for="controlType in lessonsStore.controlTypesBySemester"
						:header="controlType.shortname.toUpperCase()"
						class="column-header--center"
						headerStyle="width: 50px"
						:colspan="1"
					/>

					<Column
						v-if="!nestedViewMode"
						field="chapter"
						header="Глава"
						:colspan="1"
					/>

					<Column header="Тема" :colspan="1" />

					<Column header="Задание" :colspan="1" headerStyle="width: 200px" />
					<Column
						header="Загрузка задания"
						:colspan="1"
						headerStyle="width: 200px"
					/>

					<Column :colspan="1" headerStyle="width: 75px" />
				</Row>
			</ColumnGroup>

			<!-- # -->
			<Column
				headerClass="column-header-index"
				bodyClass="column-cell-index"
				headerStyle="width: 45px"
			>
				<template #body="{ index }">
					{{ index + 1 }}
				</template>

				<template v-if="lessonsStore.loadViewMode" #footer>{{
					lessonsStore.rowsCount
				}}</template>
			</Column>

			<!-- Вид -->
			<Column
				headerClass="column-header_center"
				bodyClass="column-cell_center"
				field="id_type_control"
			>
				<template #body="{ data, field }">
					<!-- <Tag v-if="data[field]" :value="ControlIdsEnum[data[field]]"></Tag> -->
					<LessonsLoadSelect
						:editMode="lessonsStore.editMode"
						:controlTypes="lessonsStore.controlTypesBySemester"
						:item="data"
						@change="id => onChangeControlType(data, id)"
					/>
				</template>

				<template v-if="lessonsStore.loadViewMode" #footer>
					<div>Сумма:</div>
				</template>
			</Column>

			<Column
				v-if="lessonsStore.loadViewMode"
				v-for="controlType in lessonsStore.controlTypesBySemester"
				headerClass="column-header-index"
				bodyClass="column-cell-index"
				headerStyle="width: 65px"
			>
				<template #body="{ data, index }">
					<span v-if="data.id_type_control === controlType.id_type_control">
						2
					</span>
				</template>

				<template #footer>
					<div>
						{{
							lessonsStore.getSumLoadByControlType(controlType.id_type_control)
						}}
					</div>
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
			<Column field="task_link" header="Задание">
				<template #body="{ data, field }">
					<Button
						v-if="data[field] || lessonsStore.editMode"
						:label="getAttachLabel(data)"
						@click="openAttachLink(data)"
					/>
				</template>
			</Column>

			<!-- Загрузка задания -->
			<Column field="completed_task_link" header="Загрузка задания">
				<template #body="{ data, field }">
					<Button
						v-if="data[field] || lessonsStore.editMode"
						:label="getAttachLabel(data, true)"
						@click="openAttachLink(data, true)"
					/>
				</template>
			</Column>

			<!-- Удаление -->
			<Column>
				<template #body="{ data, field }">
					<div v-if="lessonsStore.editMode">
						<Button
							icon="mdi mdi-delete"
							severity="danger"
							text
							rounded
							@click="onDeleteRow(data.id)"
						/>
					</div>
				</template>
			</Column>

			<template #empty>
				<div v-if="!lessonsStore.isLoadingLessons">Записи отсутствуют.</div>
			</template>
		</DataTable>
		<AttachLinkDialog
			v-model="attachDialogModel"
			:link="link"
			:linkName="linkName"
			@save="onSaveLink"
		/>
	</div>
</template>

<script setup>
import LessonsTableHeader from '@components/Lessons/LessonsTableHeader.vue'
import AttachLinkDialog from '@components/Lessons/AttachLinkDialog.vue'
import LessonsLoadSelect from '@components/Lessons/common/LessonsLoadSelect.vue'

import ViewModesEnum from '@models/lessons/ViewModesEnum'
import { useLessonsStore } from '@/stores/lessons'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const lessonsStore = useLessonsStore()

const nestedViewMode = computed(
	() => lessonsStore.viewMode === ViewModesEnum.Nested
)

const onCellEditComplete = event => {
	let { data, field, newValue, newData } = event

	if (data[field] === newValue) return

	const newLesson = Object.assign({}, newData)
	const res = lessonsStore.editLesson(newLesson)

	if (res) {
		data[field] = newValue
	}
}

const onChangeControlType = (data, id) => {
	const newLesson = Object.assign({}, data)
	newLesson.id_type_control = id
	lessonsStore.editLesson(newLesson)
}

const route = useRoute()
const aupCode = route.query?.aup
const idDiscipline = route.query?.id

const onAddRow = () => lessonsStore.createLocalLesson()
const onDeleteRow = id => lessonsStore.deleteLesson(id)
const onRowClick = e => console.log({ ...e.data })

const expandedRowGroups = ref()

const lessons = computed(() => lessonsStore.filteredLessons)
const isEmpty = computed(() => lessonsStore.rowsCount === 0)

const attachDialogModel = ref(false)
const linkLessonId = ref()
const link = ref('')
const linkName = ref('')
const isCompletedEditMode = ref(false)

const openAttachLink = (row, completed = false) => {
	isCompletedEditMode.value = completed

	const strLink = completed ? row.completed_task_link : row.task_link
	const strLinkName = completed
		? row.completed_task_link_name
		: row.task_link_name

	if (!lessonsStore.editMode) {
		return window.open(strLink, '_blank')
	}

	linkLessonId.value = row.id
	link.value = strLink
	linkName.value = strLinkName
	attachDialogModel.value = true
}

const getAttachLabel = (row, completed = false) => {
	const linkName = completed
		? row['completed_task_link_name']
		: row['task_link_name']

	if (linkName) return linkName

	return 'Прикрепить'
}

const onSaveLink = payload => {
	let newLesson = null

	if (isCompletedEditMode.value) {
		newLesson = {
			...lessons.value.filter(lesson => lesson.id === linkLessonId.value)?.[0],
			completed_task_link: payload.link,
			completed_task_link_name: payload.linkName,
		}
	} else {
		newLesson = {
			...lessons.value.filter(lesson => lesson.id === linkLessonId.value)?.[0],
			task_link: payload.link,
			task_link_name: payload.linkName,
		}
	}

	const res = lessonsStore.editLesson(newLesson).then(() => {
		attachDialogModel.value = false
	})
}

/* FIX PRIMEVUE BUG
   https://github.com/primefaces/primevue/issues/3685
*/
/* const addColspanToHeader = () => {
	const groupHeaders = document.querySelectorAll(
		'table tbody .p-rowgroup-header td'
	)

	for (let item of groupHeaders) {
		const newColspan = parseInt(item.colSpan) + 1
		item.colSpan = newColspan
	}
}

watch([lessonsStore.editMode, lessonsStore.loadViewMode, nestedViewMode], () => {
	setTimeout(() => {
		addColspanToHeader()
	}, 0)
}) */
/*  */

if (aupCode && idDiscipline) {
	lessonsStore.fetchLessons(aupCode, idDiscipline)
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
		border-radius: $borderRadius;
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

	.column-header {
		&--center {
			.p-column-header-content {
				justify-content: center;
			}
		}
	}

	table {
		table-layout: fixed;
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
