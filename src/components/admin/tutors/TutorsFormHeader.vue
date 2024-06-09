<template>
	<div class="TutorsFormHeader">
		<div class="TutorsForm__input-block">
			<label for="tutorsDate">Факультет:</label>

			<Dropdown
				class="TutorsForm__faculty-select"
				placeholder="Выберите факультет"
				:modelValue="faculty"
				:options="faculties"
				optionLabel="name_faculty"
				@update:modelValue="onSelectFaculty"
			/>
		</div>

		<div class="TutorsForm__input-block">
			<label for="tutorsDate">Год обучения:</label>

			<Dropdown
				:modelValue="selectedYear"
				:options="years"
				placeholder="Выберите год"
				style="width: 170px"
				@update:modelValue="onSelectYear"
			/>
		</div>

		<div class="TutorsForm__input-block">
			<label for="tutorsDate">Форма обучения:</label>

			<Dropdown
				:modelValue="selectedEducationForm"
				placeholder="Выберите форму обучения"
				optionLabel="form"
				:options="educationForms"
				style="width: 170px"
				@update:modelValue="onSelectEducationForm"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

import Api from '@services/Api'

const emit = defineEmits(['selectFaculty', 'selectOrder'])
const props = defineProps({
	orders: {
		type: Array,
		default: () => [],
	},

	order: {
		type: Object,
		default: null,
	},

	faculty: {
		type: Object,
		default: null,
	},
})

/* Распоряжение */
const orders = ref([])

watch(
	() => props.order,
	order => {
		selectedYear.value = order?.meta?.year
		selectedEducationForm.value = order?.meta?.form_education
	}
)

const findOrderByValues = (year, educationFormId) => {
	return props.orders.find(order => {
		if (
			order.meta.year === year &&
			order.meta.form_education.id_form === educationFormId
		)
			return true
	})
}

/* Факультеты */
const faculties = ref([])
const isLoadingFaculties = ref(false)

const onSelectFaculty = async value => {
	emit('selectFaculty', value)
}

/* Год */
const years = computed(() => [
	...new Set(props.orders.map(order => order.meta.year)),
])
const selectedYear = ref(null)
const onSelectYear = year => {
	selectedYear.value = year
	selectedEducationForm.value = educationForms.value[0]

	emit(
		'selectOrder',
		findOrderByValues(year, selectedEducationForm.value.id_form)
	)
}

/* Форма обучения */
const educationForms = computed(() => {
	const forms = []
	const formsIdsSet = new Set()

	props.orders.forEach(order => {
		if (
			order.meta.year === selectedYear.value &&
			!formsIdsSet.has(order.meta.form_education.id_form)
		) {
			forms.push(order.meta.form_education)
			formsIdsSet.add(order.meta.form_education.id_form)
		}
	})

	return forms
})

const selectedEducationForm = ref(null)
const onSelectEducationForm = form => {
	selectedEducationForm.value = form
	emit('selectOrder', findOrderByValues(selectedYear.value, form.id_form))
}

onMounted(async () => {
	try {
		isLoadingFaculties.value = true
		faculties.value = await Api.getFaculties()
	} catch (e) {
		console.log(e)
	} finally {
		isLoadingFaculties.value = false
	}
})
</script>

<style lang="scss">
.TutorsFormHeader {
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-columns: minmax(100px, auto);
	grid-auto-flow: column;
	gap: 16px;
	margin-bottom: 12px;
}
</style>
