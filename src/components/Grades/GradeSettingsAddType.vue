<template>
	<div class="GradeSettingsAddType">
		<div class="GradeSettingsAddType__label-block">
			<label class="GradeSettingsAddType__label" for="gradeType">
				Добавить вид оценивания
			</label>

			<InputText
				v-model="nameModel"
				class="GradeSettingsAddType__input"
				inputId="gradeType"
				placeholder="Введите название"
			/>
		</div>

		<div class="GradeSettingsAddType__label-block">
			<label class="GradeSettingsAddType__label">
				<span>Основа оценивания</span>

				<ApHint
					hint='Основа оценивания позволяет сгенерировать таблицу на основе данных модуля "Задания"'
				/>
			</label>

			<Dropdown
				class="GradeSettingsAddType__base-select"
				panelClass="GradeSettingsAddType__base-select-panel"
				v-model="baseModel"
				:options="baseOptions"
				optionLabel="name"
				placeholder="Выберите основу оценивания"
			/>
		</div>

		<Button
			:disabled="isDisabled"
			:loading="isLoading"
			label="Добавить"
			@click="onClickAddType"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const nameModel = ref('')

const baseModel = ref('')
const baseOptions = ref([
	{
		name: 'Посещение',
		type: 'attendance',
	},
	{
		name: 'Задания',
		type: 'tasks',
	},
])

const isLoading = ref(false)
const isDisabled = computed(() => !baseModel.value || !nameModel.value)

const onClickAddType = async () => {
	try {
		isLoading.value = true
		await gradesStore.createGradeType({
			name: nameModel.value,
			type: baseModel.value.type,
		})

		nameModel.value = ''
		baseModel.value = ''
	} catch (e) {
		console.log(e)
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettingsAddType {
	background-color: $shade950;
	border-radius: $borderRadius;
	padding: 16px;
	display: grid;
	gap: 12px;
	margin-top: 12px;

	&__label-block {
		display: grid;
		grid-template-columns: minmax(0px, 1fr);
	}

	&__label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
		font-size: 0.9rem;
	}

	&__base-select {
		width: 100%;
	}

	&__base-select-panel {
		.p-multiselect-header {
			display: none;
		}
	}
}
</style>
