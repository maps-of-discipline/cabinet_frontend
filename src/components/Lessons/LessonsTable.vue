<template>
	<div class="LessonsTableView">
		<!-- <HeaderTable :title="lessonsStore.title">
			<AddTask @add="onAddRow" />

			<div class="HeaderTable__editMode">
				<ViewSelect />
				<LoadViewSelect />
			</div>
		</HeaderTable> -->

		<div class="LessonsTable__wrapper">
			<DataTable
				class="LessonsTable"
				ref="table"
				v-model:expandedRowGroups="expandedRowGroups"
				:class="{ isEmpty, editMode: disciplineStore.editMode }"
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
				:editMode="disciplineStore.editMode ? 'cell' : null"
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
							header="Дата"
							class="column-header--center"
							headerStyle="width: 136px;"
							:colspan="1"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('date')"
						/>

						<Column
							header="Время"
							class="column-header--center"
							headerStyle="width: 140px;"
							:colspan="1"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('time')"
						/>

						<Column
							header="Вид"
							class="column-header--center"
							headerStyle="width: 120px"
							:colspan="1"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('control')"
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
							headerStyle="min-width: 500px"
							:colspan="1"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('chapter')"
						/>

						<Column
							header="Тема"
							headerStyle="min-width: 500px"
							:colspan="1"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('topic')"
						/>

						<Column
							header="Задание"
							:colspan="1"
							headerStyle="min-width: 200px"
							:hidden="!lessonsStore.selectedShowColFiltersSet.has('task')"
						/>

						<Column
							header="Загрузка задания"
							:colspan="1"
							headerStyle="width: 200px"
							:hidden="
								!lessonsStore.selectedShowColFiltersSet.has('completedTask')
							"
						/>

						<Column
							header="Срок выполнения"
							:colspan="1"
							headerStyle="width: 200px"
							:hidden="
								!lessonsStore.selectedShowColFiltersSet.has('dateFinish')
							"
						/>

						<Column :colspan="1" headerStyle="width: 75px" />
					</Row>
				</ColumnGroup>

				<!-- # -->
				<Column headerClass="column-header-index" bodyClass="column-cell-index">
					<template #body="{ data, index }">
						<span
							v-if="!lessonsStore.isLocalLesson(data.id)"
							class="LessonsTable__index"
						>
							{{ index + 1 }}
						</span>
						<CloudIconNotSaved v-else />
					</template>

					<template v-if="lessonsStore.loadViewMode" #footer>{{
						lessonsStore.rowsCount
					}}</template>
				</Column>

				<!-- Дата -->
				<Column
					v-if="!nestedViewMode"
					field="date"
					header="Дата"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('date')"
				>
					<template #body="{ data, field }">
						<CalendarTagEditor
							class="LessonsTable__date-editor"
							:value="data[field]"
							:editMode="disciplineStore.editMode"
							@input="onEditField(data, $event, field)"
						/>
					</template>
				</Column>

				<!-- Время -->
				<Column
					v-if="!nestedViewMode"
					field="spr_bells_id"
					header="Время"
					bodyClass="column-cell-center"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('time')"
				>
					<template #body="{ data, field }">
						<LessonTimeRangeEditor
							class="LessonsTable__timerange-editor"
							v-if="disciplineStore.editMode || data[field]"
							:value="data[field]"
							:bells="lessonsStore.bells"
							:editMode="disciplineStore.editMode"
							@change="onEditField(data, $event, field)"
						/>
					</template>
				</Column>

				<!-- Вид -->
				<Column
					headerClass="column-header-center"
					bodyClass="column-cell-center"
					field="id_type_control"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('control')"
				>
					<template #body="{ data, field }">
						<!-- <Tag v-if="data[field]" :value="ControlIdsEnum[data[field]]"></Tag> -->
						<LessonsLoadSelect
							:editMode="disciplineStore.editMode"
							:controlTypes="lessonsStore.controlTypesBySemester"
							:item="data"
							@change="onEditField(data, $event, field)"
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
								lessonsStore.getSumLoadByControlType(
									controlType.id_type_control
								)
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
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('chapter')"
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
				<Column
					field="topic"
					header="Тема"
					headerStyle="width: 50%"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('topic')"
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

				<!-- Задание -->
				<Column
					field="task_link"
					header="Задание"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('task')"
				>
					<template #body="{ data, field }">
						<AttachLinkButton
							v-if="data[field] || disciplineStore.editMode"
							:label="getAttachLabel(data)"
							@click="openAttachLink(data)"
						/>
					</template>
				</Column>

				<!-- Загрузка задания -->
				<Column
					field="completed_task_link"
					header="Загрузка задания"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('completedTask')"
				>
					<template #body="{ data, field }">
						<AttachLinkButton
							v-if="data[field] || disciplineStore.editMode"
							:label="getAttachLabel(data, true)"
							@click="openAttachLink(data, true)"
						/>
					</template>
				</Column>

				<Column
					field="date_task_finish"
					:hidden="!lessonsStore.selectedShowColFiltersSet.has('dateFinish')"
				>
					<template #body="{ data, field }">
						<CalendarTagEditor
							class="LessonsTable__date-editor"
							:value="data[field]"
							:editMode="disciplineStore.editMode"
							optionIncludeDay
							:includeSelectedDay="data['date_task_finish_include']"
							@input="onEditField(data, $event, field)"
							@changeIncludeDay="
								onEditField(data, $event, 'date_task_finish_include')
							"
						/>
					</template>
				</Column>

				<!-- Удаление -->
				<Column>
					<template #body="{ data, field }">
						<div v-if="disciplineStore.editMode">
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
			</DataTable>

			<SelectDisciplineStub
				v-if="!disciplineStore.hasSelectedDiscipline"
				class="LessonsTable__stub"
			/>

			<AttachLinkDialog
				v-model="attachDialogModel"
				:link="link"
				:linkName="linkName"
				@save="onSaveLink"
			/>
		</div>
	</div>
</template>

<script setup>
import ViewModesEnum from '@models/lessons/ViewModesEnum'

import HeaderTable from '@components/layouts/HeaderTable/HeaderTable.vue'
import SelectDisciplineStub from '@components/layouts/SelectDisciplineStub.vue'

import ViewSelect from '@components/Lessons/ViewSelect.vue'
import LoadViewSelect from '@components/Lessons/LoadViewSelect.vue'
import AddTask from '@components/Lessons/AddTask.vue'
import AttachLinkDialog from '@components/Lessons/AttachLinkDialog.vue'
import LessonsLoadSelect from '@components/Lessons/common/LessonsLoadSelect.vue'
import CloudIconNotSaved from '@components/Lessons/common/CloudIconNotSaved.vue'
import AttachLinkButton from '@components/Lessons/common/AttachLinkButton.vue'
import LessonTimeRangeEditor from '@components/Lessons/LessonTimeRangeEditor.vue'
import CalendarTagEditor from '@components/Lessons/common/CalendarTagEditor.vue'

import { useLessonsStore } from '@/stores/lessons'
import { useDisciplineStore } from '@/stores/discipline'

import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const lessonsStore = useLessonsStore()
const disciplineStore = useDisciplineStore()

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

/* const onInputDate = (data, value) => {
	const newLesson = Object.assign({}, data)
	newLesson.date = value
	lessonsStore.editLesson(newLesson)
}

const onChangeLessonRange = (data, value) => {
	const newLesson = Object.assign({}, data)
	newLesson.lesson_order = value
	lessonsStore.editLesson(newLesson)
}

const onChangeControlType = (data, id) => {

}
 */
const onEditField = (data, value, field) => {
	console.log(value, field)
	const newLesson = Object.assign({}, data)
	newLesson[field] = value
	lessonsStore.editLesson(newLesson)
}

const table = ref()

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

	if (!disciplineStore.editMode) {
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

	return linkName || null
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

watch([disciplineStore.editMode, lessonsStore.loadViewMode, nestedViewMode], () => {
	setTimeout(() => {
		addColspanToHeader()
	}, 0)
}) */
/*  */

const aupCode = disciplineStore.selectedAup
const idDiscipline = disciplineStore.selectedDisciplineId

if (aupCode && idDiscipline) {
	lessonsStore.fetchLessons(aupCode, idDiscipline)
}

onMounted(() => {
	lessonsStore.fetchBells()
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsTableView {
	height: 100%;
	border-radius: $borderRadius;
	display: grid;
	grid-template-rows: 1fr;

	&__wrapper {
		position: relative;
		overflow: auto;
	}

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
	overflow: auto;
	background-color: $view-bg;
	border-radius: $borderRadius;
	height: 100%;

	$row-height: 60px;

	tr {
		height: $row-height;
	}

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

	&__subheader {
		padding: 0 25px;
		font-weight: bold;
		display: inline;
	}

	&__index {
		user-select: none;
	}

	&__chip {
		font-size: 14px;
	}

	&__timerange-editor {
		width: 120px;
	}

	&__date-editor {
		display: flex;
		justify-content: center;
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

	&.editMode {
		.p-editable-column:not(.p-cell-editing) {
			cursor: pointer;
		}
	}
}
</style>
