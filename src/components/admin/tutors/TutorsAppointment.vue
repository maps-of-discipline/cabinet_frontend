<template>
	<div class="TutorsAppointment">
		<div class="TutorsAppointment__header">
			<Dropdown
				class="TutorsForm__dep-select"
				panelClass="TutorsForm__dep-select-panel"
				v-model="selectedDepartment"
				:options="departments"
				:optionDisabled="isDisabledDepartmentOption"
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
	</div>

	<div class="TutorsForm__body">
		<div v-if="items.length" class="TutorsForm__table-wrapper">
			<div
				class="TutorsForm__table"
				v-for="(department, i) in items"
				:key="department.id_department"
			>
				<TutorsDepartmentTable
					:order="i + 1"
					:department="department"
					@addRow="onAddRow"
					@deleteRow="onDeleteRow"
					@editStudyGroups="onEditStudyGroups"
					@editTutor="onEditTutor"
				/>
			</div>
		</div>

		<div v-else-if="!faculty" class="TutorsForm__table-empty">
			Выберите факультет
		</div>

		<div v-else-if="!items.length" class="TutorsForm__table-empty">
			Добавьте кафедру
		</div>

		<div v-else class="TutorsForm__table-empty">Данные отстутствуют</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch, toRaw, toRefs, unref } from 'vue'
import _ from 'lodash'

import TutorsDepartmentTable from '@components/admin/tutors/TutorsDepartmentTable.vue'

const emit = defineEmits([
	'addDeparment',
	'addRow',
	'deleteRow',
	'editStudyGroups',
	'editTutor',
])

const props = defineProps({
	faculty: {
		type: Object,
		default: null,
	},

	itemsMap: {
		type: Object,
		default: () => ({}),
	},
})

const selectedDepartment = ref(null)

const items = computed(() => Object.values(props.itemsMap))

const departments = computed(() => props.faculty?.departments || [])

const isDisabledDepartmentOption = department => {
	return department.id_department in props.itemsMap
}

const onAddDepartment = () => {
	emit('addDeparment', selectedDepartment.value)

	selectedDepartment.value = null
}

const onAddRow = ({ departmentId }) => {
	emit('addRow', { departmentId })
}

const onDeleteRow = ({ departmentId, rowId }) => {
	emit('deleteRow', { departmentId, rowId })
}

const onEditStudyGroups = ({ departmentId, rowId, newGroups, newGroupId }) => {
	emit('editStudyGroups', { departmentId, rowId, newGroups, newGroupId })
}

const onEditTutor = ({ rowId, newTutor }) => {
	emit('editTutor', { rowId, newTutor })
}
</script>

<style lang="scss">
.TutorsAppointment {
	&__header {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 12px;
	}
}
</style>
