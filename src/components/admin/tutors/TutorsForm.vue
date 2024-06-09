<template>
	<div class="TutorsForm">
		<div class="TutorsForm__title">Назначение тьюторов</div>

		<TutorsFormHeader
			:orders="orders"
			:order="selectedOrder"
			:faculty="selectedFaculty"
			@selectOrder="onSelectOrder"
			@selectFaculty="onSelectFaculty"
		/>

		<TutorsTabs>
			<TutorsTab title="Преамбула">
				<TutorsMetaForm v-model:formModel="formModel" />
			</TutorsTab>

			<TutorsTab title="Тьюторы">
				<TutorsAppointment
					:faculty="selectedFaculty"
					:itemsMap="localDepartmentsItemsMap"
					@addDeparment="onAddDepartment"
					@addRow="onAddRow"
					@deleteRow="onDeleteRow"
					@editStudyGroups="onEditStudyGroups"
					@editTutor="onEditTutor"
				/>
			</TutorsTab>

			<TutorsTab title="Debug">
				{{ selectedOrder }}
			</TutorsTab>
		</TutorsTabs>

		<div class="TutorsForm__footer">
			<Button
				label="Скачать"
				:disabled="!selectedOrder"
				:loading="isDownloadLoading"
				icon="mdi mdi-download"
				@click="onClickDownload"
			/>

			<Button
				label="Сохранить"
				:loading="isSaveLoading"
				:disabled="!selectedOrder"
				@click="onSave"
			/>
		</div>
	</div>
</template>

<script setup>
import TutorsAppointment from '@components/admin/tutors/TutorsAppointment.vue'
import TutorsMetaForm from '@components/admin/tutors/TutorsMetaForm.vue'
import TutorsTabs from '@components/admin/tutors/TutorsTabs.vue'
import TutorsTab from '@components/admin/tutors/TutorsTab.vue'
import TutorsFormHeader from '@components/admin/tutors/TutorsFormHeader.vue'
import Api from '@services/Api'
import _ from 'lodash'

import { ref, computed, onMounted, watch, toRaw } from 'vue'

/* Распоряжение */
const orders = ref([])
const selectedOrder = ref(null)
const onSelectOrder = order => {
	selectedOrder.value = order
	initFormModel(order)
	localDepartmentsItemsMap.value = order.body
	/* initItems(order.body) */
}

const localDepartmentsItemsMap = ref({})
const localDepartmentsItems = computed(() =>
	Object.values(localDepartmentsItemsMap.value)
)

const initItems = rawItems => {
	const mapRows = _.groupBy(rawItems, 'department_id')

	const mapDepartments = {}
	for (const departmentId in mapRows) {
		mapDepartments[departmentId] = {
			name_department: mapRows[departmentId][0]?.department?.name_department,
			id_department: departmentId,
			rows: [...mapRows[departmentId].map(i => ({ ...i, study_groups: [] }))],
		}
	}

	console.log(mapDepartments)
	localDepartmentsItemsMap.value = mapDepartments
}

/*         "id_department": "0",
        "rows": [
            {
                "tutors_order_id": 1,
                "tutor": {
                    "name": "Архипов Максим Викторович",
                    "id": 109,
                    "id_department": 6,
                    "lk_id": 112276,
                    "post": null
                },
                "tutor_id": 109,
                "id": 4,
                "id_department": 0,
                "department": null
            }
        ] */

/* {
    "name_department":"Кафедра \"СМАРТ-технологии\"",
    "id_department":6,
    "faculty_id":1,
    "rows":[{"id":1717890628239,"study_groups":[],"tutor":""}]
} */

const onAddDepartment = department => {
	if (department.id_department in localDepartmentsItemsMap.value) return

	localDepartmentsItemsMap.value[department.id_department] = {
		...department,
		rows: [
			{
				id: Date.now(),
				study_groups: [],
				tutor: '',
			},
		],
	}
}

const onAddRow = ({ departmentId }) => {
	localDepartmentsItemsMap.value[departmentId].rows.push({
		id: Date.now(),
		study_groups: [],
		tutor: '',
	})
}

const onDeleteRow = ({ departmentId, rowId }) => {
	const neededDepartment = localDepartmentsItemsMap.value[departmentId]

	const neededRowIndex = neededDepartment.rows.findIndex(
		row => rowId === row.id
	)

	if (neededDepartment.rows.length === 1) {
		delete localDepartmentsItemsMap.value[departmentId]
	} else {
		neededDepartment.rows.splice(neededRowIndex, 1)
	}
}

const onEditStudyGroups = ({ departmentId, rowId, newGroups, newGroupId }) => {
	const neededDepartment = localDepartmentsItemsMap.value[departmentId]

	const neededRowIndex = neededDepartment.rows.findIndex(
		row => rowId === row.id
	)

	if (newGroupId) {
		const neededDeleteGroupBodyIndex = neededDepartment.rows.findIndex(row => {
			const mappedGroupIds = row.study_groups.map(s => s.id)
			return mappedGroupIds.includes(newGroupId)
		})

		if (neededDeleteGroupBodyIndex >= 0) {
			neededDepartment.rows[neededDeleteGroupBodyIndex].study_groups =
				neededDepartment.rows[neededDeleteGroupBodyIndex].study_groups.filter(
					group => group.id !== newGroupId
				)
		}
	}

	neededDepartment.rows[neededRowIndex].study_groups = newGroups
}

const onEditTutor = ({ rowId, newTutor }) => {
	const neededDepartment =
		localDepartmentsItemsMap.value[newTutor.id_department]

	const neededRowIndex = neededDepartment.rows.findIndex(
		row => rowId === row.id
	)

	neededDepartment.rows[neededRowIndex].tutor = newTutor
}

/* Факультет */
const selectedFaculty = ref(null)

const onSelectFaculty = async value => {
	try {
		selectedFaculty.value = value
		orders.value = await Api.fetchTutorOrders({ id: 1 })
		onSelectOrder(orders.value[0])
	} catch (e) {
		console.log(e)
	}
}

/* Преамбула */
const emptyForm = {
	date: null,
	order: null,
	year: null,
	executor: null,
	signer: null,
}

const formModel = ref(emptyForm)
const initFormModel = order => {
	if (!order) formModel.value = emptyForm
	else
		formModel.value = {
			date: new Date(order.meta.date),
			order: order.meta.num_order,
			year: order.meta.year,
			signer: order.meta.signer,
			executor: order.meta.executor,
		}
}

/* Сохранить */
const isSaveLoading = ref(false)
const onSave = async () => {
	try {
		isSaveLoading.value = true
		const editedOrder = await Api.editTutorOrder({
			id: selectedOrder.value.meta.id,
			meta: formModel.value,
			body: localDepartmentsItems.value,
		})

		console.log(editedOrder)
	} catch (e) {
		console.log(e)
	} finally {
		isSaveLoading.value = false
	}
}

/* Скачать DOCX */
const isDownloadLoading = ref(false)
const onClickDownload = async () => {
	/* 	try {
		isDownloadLoading.value = true
		await Api.downloadTutorOrder(Object.values(departmentsItemsMap.value))
	} catch (e) {
		console.log(e)
	} finally {
		isDownloadLoading.value = false
	} */
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.TutorsForm {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;

	&__title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 12px;
	}

	&__input-row {
		display: grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		gap: 12px;
	}

	&__input-block {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 6px;
	}

	&__header-block {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-columns: minmax(100px, auto);
		grid-auto-flow: column;
		gap: 16px;
		margin-bottom: 12px;
	}

	&__body {
		height: 100%;
		width: 100%;
	}

	&__table-wrapper {
		margin-bottom: 12px;
		min-height: calc(300px - 37px - 12px);
	}

	&__table {
		margin-bottom: 24px;
	}

	&__table-empty {
		margin-bottom: 12px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
	}

	&__footer {
		margin-top: 12px;
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}

	&__dep-select {
		justify-content: space-between;
	}

	&__dep-select .p-dropdown-label,
	&__dep-select-option {
		max-width: 700px;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
