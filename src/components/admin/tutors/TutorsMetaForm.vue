<template>
	<div class="TutorsMetaForm">
		<TutorsDateEditor />

		<InputNumber placeholder="Номер распоряжения" />

		<Dropdown
			:options="formsOfEducation"
			v-model="selectedFormOfEducation"
			placeholder="Форма обучения"
			optionLabel="form"
		/>

		<Dropdown
			:options="rangeYears"
			v-model="selectedRangeYears"
			placeholder="Форма обучения"
			optionLabel="label"
		/>

		<Dropdown
			:options="checks"
			v-model="selectedCheck"
			placeholder="Периодичность проверки"
			optionLabel="label"
		/>

		<InputNumber v-model="inDayModel" placeholder="В какой день?" />
		<InputNumber v-model="executorModel" placeholder="Исполнитель" />
		<InputNumber v-model="helperModel" placeholder="К кому обращаться?" />
		<InputNumber
			v-model="signerModel"
			placeholder="Лицо, утверждающее распоряжение"
		/>
	</div>
</template>

<script setup>
import TutorsDateEditor from '@components/admin/tutors/TutorsDateEditor.vue'

import { ref } from 'vue'

const selectedFormOfEducation = ref(null)
const formsOfEducation = ref([
	{
		id_form: 1,
		form: 'Очная',
	},
	{
		id_form: 2,
		form: 'Очно-заочная',
	},
	{
		id_form: 3,
		form: 'Заочная',
	},
])

const selectedRangeYears = ref(null)
const rangeYears = ref([
	{
		value: 2022,
		label: '2022/2023',
	},
	{
		value: 2023,
		label: '2023/2024',
	},
	{
		value: 2024,
		label: '2024/2025',
	},
	{
		value: 2025,
		label: '2025/2026',
	},
])

const selectedCheck = ref(null)
const checks = ref([
	{
		value: 1,
		label: 'Раз в месяц',
	},
	{
		value: 2,
		label: 'Раз в два месяца',
	},
	{
		value: 3,
		label: 'Раз в три месяца',
	},
])

const inDayModel = ref(null)

const executorModel = ref(null)

const helperModel = ref(null)
const signerModel = ref(null)
</script>

<style lang="scss">
.TutorsMetaForm {
	margin-top: 12px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 12px;
}
</style>
