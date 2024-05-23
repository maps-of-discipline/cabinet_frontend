<template>
	<div class="TutorsDepartmentTable">
		<div class="TutorsDepartmentTable__header">
			<span class="TutorsDepartmentTable__titlet">
				<span class="TutorsDepartmentTable__order">{{ order }}.</span>
				<span class="TutorsDepartmentTable__name">
					{{ department.name_department }}
				</span>
			</span>

			<Button
				v-if="editMode"
				class="TutorsDepartmentTable__add-row"
				label="Добавить строку"
				icon="mdi mdi-plus"
				@click="onAddRow"
			/>
		</div>

		<DataTable
			class="TutorsDepartmentTable__table"
			:value="department.rows"
			showGridlines
		>
			<Column
				field="study_groups"
				header="Учебные группы"
				style="max-width: 200px; width: 200px"
			>
				<template #body="{ data, field }">
					<MultiSelect
						v-if="editMode"
						class="TutorsDepartmentTable__groups-select"
						panelClass="TutorsDepartmentTable__groups-select-panel"
						:modelValue="data.study_groups"
						:options="getStudyGroupsOptions(data.study_groups)"
						placeholder="Выберите группы"
						optionGroupLabel="label"
						optionGroupChildren="items"
						dataKey="id"
						@update:modelValue="
							onEditStudyGroups(data.id, $event, data.study_groups)
						"
						optionLabel="title"
					/>

					<span v-else>{{ data[field]?.map(s => s.title)?.join(', ') }}</span>
				</template>
			</Column>
			<Column field="tutor" header="ФИО" style="max-width: 300px; width: 300px">
				<template #body="{ data, field }">
					<Dropdown
						v-if="editMode"
						class="TutorsDepartmentTable__tutor-select"
						panelClass="TutorsDepartmentTable__tutor-select-panel"
						:options="sortedTutorOptions"
						:modelValue="data[field]"
						:loading="isLoadingTutors"
						dataKey="id"
						placeholder="Выберите тьютора"
						@update:modelValue="onEditTutor(data.id, $event)"
						@before-show="fetchTutors"
						:optionDisabled="checkIsSelectedTutor"
						optionLabel="fio"
						filter
						filterPlaceholder="Поиск по ФИО"
					>
						<template #value="{ value }">
							<span v-if="value?.fio" style="color: #fff">
								{{ value?.fio }}
							</span>
							<span v-else>Выберите тьютора</span>
						</template>
					</Dropdown>

					<span v-else>{{ data[field].fio }}</span>
				</template>
			</Column>

			<Column header="Должность" headerStyle="width: 300px">
				<template #body="{ data, field }">
					<span>{{ data.tutor?.post }}</span>
				</template>
			</Column>

			<Column v-if="editMode" headerStyle="width: 50px">
				<template #body="{ data, field }">
					<Button
						v-if="editMode"
						icon="mdi mdi-delete"
						@click="onClickDeleteRow(data.id)"
					/>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup>
import Api from '@services/Api'
import { computed, ref } from 'vue'

const emit = defineEmits([
	'addRow',
	'deleteRow',
	'editStudyGroups',
	'editTutor',
])

const props = defineProps({
	order: {
		type: Number,
		required: true,
	},

	department: {
		type: Object,
		required: true,
	},

	editMode: {
		type: Boolean,
		default: false,
	},
})

const onAddRow = () =>
	emit('addRow', { departmentId: props.department.id_department })

const onClickDeleteRow = id =>
	emit('deleteRow', {
		departmentId: props.department.id_department,
		rowId: id,
	})

const onEditStudyGroups = (id, newGroups, oldGroups) => {
	let newGroupId = null

	const mapNewGroups = newGroups.map(g => g.id)
	const mapOldGroups = oldGroups.map(g => g.id)

	newGroupId = mapNewGroups.filter(x => !mapOldGroups.includes(x))[0]

	emit('editStudyGroups', {
		departmentId: props.department.id_department,
		rowId: id,
		newGroups,
		newGroupId: selectedGroupIds.value.has(newGroupId) ? newGroupId : null,
	})
}

const onEditTutor = (id, newTutor) => {
	emit('editTutor', {
		departmentId: props.department.id_department,
		rowId: id,
		newTutor,
	})
}

const selectedTutorsIds = computed(
	() => new Set([...props.department.rows.map(row => row.tutor?.id)])
)

const selectedGroupIds = computed(() => {
	const rows = props.department.rows

	const selectedGroups = new Set()
	rows.forEach(row => {
		row.study_groups.forEach(group => selectedGroups.add(group.id))
	})

	return selectedGroups
})

const checkIsSelectedTutor = tutor => selectedTutorsIds.value.has(tutor.id)
const checkIsSelectedGroup = (group, exclude) => {
	if (exclude) {
		return selectedGroupIds.value.has(group.id) && !exclude.has(group.id)
	} else {
		return selectedGroupIds.value.has(group.id)
	}
}

const onRowClick = e => console.log({ ...e.data })

const isLoadingTutors = ref(false)
const tutorOptions = ref([])
const sortedTutorOptions = computed(() => [
	...tutorOptions.value.sort((a, b) => {
		if (!checkIsSelectedTutor(a) && checkIsSelectedTutor(b)) return -1
	}),
])

const studyGroupsOptions = ref([
	{
		id: 1,
		title: '201-321',
	},
	{
		id: 2,
		title: '201-322',
	},
	{
		id: 3,
		title: '201-323',
	},
	{
		id: 4,
		title: '201-324',
	},
	{
		id: 5,
		title: '201-325',
	},
	{
		id: 6,
		title: '201-326',
	},
	{
		id: 7,
		title: '201-327',
	},
	{
		id: 8,
		title: '201-328',
	},
	{
		id: 9,
		title: '201-329',
	},
	{
		id: 10,
		title: '201-3210',
	},
])

const getStudyGroupsOptions = selectedItemGroups => {
	const selectedItemGroupsIds = new Set([...selectedItemGroups.map(s => s.id)])

	const res = [
		{
			label: 'Свободные',
			items: studyGroupsOptions.value.filter(
				s => !checkIsSelectedGroup(s, selectedItemGroupsIds)
			),
		},
		{
			label: 'Назначенные',
			items: studyGroupsOptions.value.filter(
				s => checkIsSelectedGroup(s) && !selectedItemGroupsIds.has(s.id)
			),
		},
	]

	return res
}

const fetchTutors = async () => {
	if (tutorOptions.value.length > 0) return

	isLoadingTutors.value = true

	const staff = await Api.getStaff(props.department.name_department)
	staff.sort((a, b) => a.fio.localeCompare(b.fio))
	tutorOptions.value = staff
	isLoadingTutors.value = false
}
</script>

<style lang="scss">
.TutorsDepartmentTable {
	&__header {
		font-weight: 600;
		margin-bottom: 12px;
		display: grid;
		grid-template-columns: 1fr minmax(200px, auto);
		gap: 8px;
		align-items: center;
		justify-content: space-between;
		height: 37px;
	}

	&__title {
		display: flex;
		gap: 12px;
	}

	&__order {
		margin-right: 4px;
	}

	&__table {
		$row-height: 50px;

		tr {
			height: $row-height;
		}
	}

	&__tutor-select,
	&__groups-select {
		width: 100%;
		height: 37px;
	}

	&__groups-select-panel {
		.p-multiselect-header {
			display: none;
		}
	}

	&__tutor-select-panel {
		.p-dropdown-header {
			padding-bottom: 8px;
		}

		.p-dropdown-items-wrapper {
			padding-top: 0px !important;
		}
	}
}
</style>
