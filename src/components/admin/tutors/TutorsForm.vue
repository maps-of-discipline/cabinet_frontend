<template>
	<div class="TutorsForm">
		<div class="TutorsForm__title">Назначение тьюторов</div>

		<div class="TutorsForm__header-block">
			<div class="TutorsForm__input-block">
				<label for="tutorsDate">Факультет:</label>

				<Dropdown
					class="TutorsForm__faculty-select"
					:modelValue="selectedFaculty"
					:options="faculties"
					:optionDisabled="isDisabledDepartmentOption"
					:loading="isLoading"
					placeholder="Выберите факультет"
					optionLabel="name_faculty"
					@update:modelValue="onSelectFaculty"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="tutorsDate">Год обучения:</label>

				<Dropdown
					placeholder="Выберите год"
					:modelValue="selectedYear"
					:options="avaliableYears"
					:disabled="!selectedFaculty"
					style="width: 170px"
					@update:modelValue="onSelectYear"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="tutorsDate">Форма обучения:</label>

				<Dropdown
					placeholder="Выберите форму обучения"
					optionLabel="form"
					:modelValue="selectedFormOfEducation"
					:options="allFormsOfEducation"
					:disabled="!selectedFaculty"
					style="width: 170px"
					@update:modelValue="onSelectFormOfEducation"
				/>
			</div>

			<!-- <Button label="Создать распоряжение" /> -->

			<!-- <ApEditMode v-model="editMode" :disabled="!selectedFaculty" /> -->
		</div>

		<TutorsTabs :empty="!selectedFaculty">
			<TutorsTab title="Преамбула">
				<TutorsMetaForm
					v-model:formModel="formModel"
					:formsOfEducation="allFormsOfEducation"
				/>
			</TutorsTab>

			<TutorsTab title="Тьюторы">
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

					<div
						v-else-if="!departmentsItems.length && editMode"
						class="TutorsForm__table-empty"
					>
						Добавьте кафедру
					</div>

					<div v-else class="TutorsForm__table-empty">Данные отстутствуют</div>
				</div>
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
import TutorsDepartmentTable from '@components/admin/tutors/TutorsDepartmentTable.vue'
import TutorsMetaForm from '@components/admin/tutors/TutorsMetaForm.vue'
import TutorsTabs from '@components/admin/tutors/TutorsTabs.vue'
import TutorsTab from '@components/admin/tutors/TutorsTab.vue'
import Api from '@services/Api'

import { ref, computed, onMounted, watch, toRaw } from 'vue'

const isLoading = ref(false)
const isDownloadLoading = ref(false)
const isSaveLoading = ref(false)

const avaliableOrders = ref([])
const selectedOrder = ref(null)

const allFormsOfEducation = ref([])
const selectedFormOfEducation = ref(null)
const onSelectFormOfEducation = value => {
	selectedFormOfEducation.value = value
	onChangeOrder()
}

const emptyForm = {
	date: null,
	order: null,
	year: null,
	executor: null,
	signer: null,
}

const formModel = ref(emptyForm)

const onChangeOrder = () => {
	const foundOrder = avaliableOrders.value.find(
		order =>
			order.year === selectedYear.value &&
			order.form_education.id_form === selectedFormOfEducation.value.id_form
	)

	console.log('new selectedOrder')
	console.log(selectedOrder)

	if (foundOrder) {
		formModel.value = {
			date: new Date(foundOrder.date),
			order: foundOrder.num_order,
			year: foundOrder.year,
			signer: foundOrder.signer,
			executor: foundOrder.executor,
		}

		selectedOrder.value = foundOrder
	} else {
		formModel.value = emptyForm
	}
}

const faculties = ref([])
const selectedFaculty = ref(null)
const onSelectFaculty = async value => {
	try {
		selectedFaculty.value = value
		const orders = await Api.fetchTutorOrders({ id: 1 })
		avaliableOrders.value = orders
		selectedYear.value = avaliableYears.value?.[0]

		if (!selectedFormOfEducation.value)
			selectedFormOfEducation.value = allFormsOfEducation.value?.[0]
		onChangeOrder()
	} catch (e) {
		console.log(e)
	}
}

const avaliableYears = computed(() =>
	avaliableOrders.value.map(order => order.year)
)
const selectedYear = ref(null)
const onSelectYear = value => {
	selectedYear.value = value
	onChangeOrder()
}

const selectedDepartment = ref(null)
const departments = computed(() => selectedFaculty.value?.departments || [])

const editMode = ref(true)

const onSave = async () => {
	try {
		isSaveLoading.value = true
		await Api.editTutorOrder({
			id: selectedOrder.value.id,
			meta: formModel.value,
			body: [],
		})
	} catch (e) {
		console.log(e)
	} finally {
		isSaveLoading.value = false
	}
}

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
	try {
		isDownloadLoading.value = true
		await Api.downloadTutorOrder(Object.values(departmentsItemsMap.value))
	} catch (e) {
		console.log(e)
	} finally {
		isDownloadLoading.value = false
	}
}

onMounted(async () => {
	try {
		isLoading.value = true
		faculties.value = await Api.getFaculties()
		allFormsOfEducation.value = await Api.fetchFormOfEducations()
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
