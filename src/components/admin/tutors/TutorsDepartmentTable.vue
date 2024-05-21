<template>
	<div class="TutorsDepartmentTable">
		<div class="TutorsDepartmentTable__title">
			<span>
				<span class="TutorsDepartmentTable__order">{{ order }}.</span>
				<span class="TutorsDepartmentTable__name">
					{{ department.name_department }}
				</span>
			</span>

			<Button
				v-if="editMode"
				class="TutorsDepartmentTable__add-row"
				label="Добавить строку"
				@click="onAddRow"
			/>
		</div>

		<DataTable
			class="TutorsDepartmentTable__table"
			:value="department.body"
			showGridlines
			@row-click="onRowClick"
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
						:options="studyGroupsOptions"
						placeholder="Выберите группы"
						@update:modelValue="onEditStudyGroups(data.id, $event)"
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
						:options="tutorsOptions"
						:modelValue="data[field]"
						placeholder="Выберите тьютора"
						@update:modelValue="onEditTutor(data.id, $event)"
						optionLabel="name"
					/>

					<span v-else>{{ data[field].name }}</span>
				</template>
			</Column>

			<Column header="Должность" headerStyle="width: 300px">
				<template #body="{ data, field }">
					<span>{{ data.tutor?.jobtitle }}</span>
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
import { ref } from 'vue'

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

	tutorsOptions: {
		type: Array,
		default: () => [],
	},

	studyGroupsOptions: {
		type: Array,
		default: () => [],
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

const onEditStudyGroups = (id, newGroups) => {
	emit('editStudyGroups', {
		departmentId: props.department.id_department,
		rowId: id,
		newGroups,
	})
}

const onEditTutor = (id, newTutor) => {
	emit('editTutor', {
		departmentId: props.department.id_department,
		rowId: id,
		newTutor,
	})
}

const onRowClick = e => console.log({ ...e.data })
</script>

<style lang="scss">
.TutorsDepartmentTable {
	&__title {
		font-weight: 600;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 37px;
	}

	&__order {
		display: inline-block;
		margin-right: 4px;
	}

	&__table {
		$row-height: 65px;

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
}
</style>
