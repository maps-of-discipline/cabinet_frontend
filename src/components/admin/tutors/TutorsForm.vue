<template>
	<div class="TutorsForm">
		<div class="TutorsForm__title">Утверждение тьюторов</div>

		<div class="TutorsForm__header-block">
			<Dropdown
				class="TutorsForm__faculty-select"
				v-model="selectedFaculty"
				:options="faculties"
				:optionDisabled="isDisabledDepartmentOption"
				:loading="isLoading"
				placeholder="Выберите факультет"
				optionLabel="name_faculty"
			/>

			<Button
				label="Скачать"
				:disabled="!selectedFaculty || !departmentsItems.length"
				icon="mdi mdi-download"
				@click="onClickDownload"
			/>

			<ApEditMode v-model="editMode" :disabled="!selectedFaculty" />
		</div>

		<div v-if="editMode" class="TutorsForm__header-block">
			<Dropdown
				class="TutorsForm__dep-select"
				panelClass="TutorsForm__dep-select-panel"
				v-model="selectedDepartment"
				:options="departments"
				:optionDisabled="isDisabledDepartmentOption"
				:loading="isLoading"
				placeholder="Выберите кафедру"
				optionLabel="name_department"
			>
				<template #option="{ option }">
					<span
						class="TutorsForm__dep-select-option"
						v-tooltip.bottom="{
							value: option.name_department,
							showDelay: 500,
						}"
					>
						{{ option.name_department }}
					</span>
				</template>
			</Dropdown>

			<Button
				label="Добавить кафедру"
				icon="mdi mdi-plus"
				:disabled="!selectedDepartment"
				@click="onAddDepartment"
			/>
		</div>

		<div class="TutorsForm__body">
			<div v-if="departmentsItems.length" class="TutorsForm__table-wrapper">
				<div
					class="TutorsForm__table"
					v-for="(department, i) in departmentsItems"
				>
					<TutorsDepartmentTable
						:order="i + 1"
						:department="department"
						:editMode="editMode"
						@addRow="onAddRow"
						@deleteRow="onDeleteRow"
						@editStudyGroups="onEditStudyGroups"
						@editTutor="onEditTutor"
					/>
				</div>
			</div>

			<div v-else-if="!selectedFaculty" class="TutorsForm__table-empty">
				Выберите факультет
			</div>

			<div v-else-if="!selectedFaculty" class="TutorsForm__table-empty">
				Выберите факультет
			</div>

			<div
				v-else-if="!departmentsItems.length && editMode"
				class="TutorsForm__table-empty"
			>
				Добавьте кафедру
			</div>

			<div v-else class="TutorsForm__table-empty">Данные отстутствуют</div>

			<TutorsMetaForm v-if="selectedFaculty" />
		</div>

		<!-- <div class="TutorsForm__footer">
			<Button v-if="editMode" label="Скачать" @click="onClickDownload" />
		</div> -->
	</div>
</template>

<script setup>
import TutorsDepartmentTable from '@components/admin/tutors/TutorsDepartmentTable.vue'
import TutorsMetaForm from '@components/admin/tutors/TutorsMetaForm.vue'
import Api from '@services/Api'

import { ref, computed, onMounted, watch, toRaw } from 'vue'

const isLoading = ref(false)
const faculties = ref([])
const selectedFaculty = ref(null)

const selectedDepartment = ref(null)
const departments = computed(() => selectedFaculty.value.departments)

const meta = ref({
	date: '',
})

const editMode = ref(false)

const departmentsItemsMap = ref({})
const departmentsItems = computed(() =>
	Object.values(departmentsItemsMap.value)
)

const isDisabledDepartmentOption = department => {
	return department.id_department in departmentsItemsMap.value
}

const onAddDepartment = () => {
	const departmentId = selectedDepartment.value.id_department

	if (departmentId in departmentsItemsMap.value) return

	departmentsItemsMap.value[departmentId] = {
		...selectedDepartment.value,
		rows: [
			{
				id: Date.now(),
				study_groups: [],
				tutor: '',
				tutor_jobtitle: '',
			},
		],
	}

	selectedDepartment.value = null
}

const onAddRow = ({ departmentId }) => {
	departmentsItemsMap.value[departmentId].rows.push({
		id: Date.now(),
		study_groups: [],
		tutor: '',
		tutor_jobtitle: '',
	})
}

const onDeleteRow = ({ departmentId, rowId }) => {
	const neededDepartment = departmentsItemsMap.value[departmentId]

	const neededRowIndex = neededDepartment.rows.findIndex(
		row => rowId === row.id
	)

	if (neededDepartment.rows.length === 1) {
		delete departmentsItemsMap.value[departmentId]
	} else {
		neededDepartment.rows.splice(neededRowIndex, 1)
	}
}

const onEditStudyGroups = ({ departmentId, rowId, newGroups, newGroupId }) => {
	const neededDepartment = departmentsItemsMap.value[departmentId]

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

const onEditTutor = ({ departmentId, rowId, newTutor }) => {
	const neededDepartment = departmentsItemsMap.value[departmentId]

	const neededRowIndex = neededDepartment.rows.findIndex(
		row => rowId === row.id
	)

	neededDepartment.rows[neededRowIndex].tutor = newTutor
}

const onClickDownload = async () => {
	await Api.downloadTutorOrder(Object.values(departmentsItemsMap.value))
}

onMounted(async () => {
	try {
		isLoading.value = true
		faculties.value = await Api.getFaculties()
		isLoading.value = false
	} catch (e) {
		console.log(e)
	}
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.TutorsForm {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	min-width: 1000px;

	&__title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 12px;
	}

	&__header-block {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-columns: minmax(100px, auto);
		grid-template-rows: 37px;
		grid-auto-flow: column;
		gap: 8px;
		margin-bottom: 12px;
	}

	&__body {
		margin-top: 12px;
		max-height: 60vh;
		overflow: auto;
		padding: 16px 16px 16px;
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
		min-height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
	}

	&__footer {
		margin-top: 12px;
		display: flex;
		justify-content: flex-end;
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
