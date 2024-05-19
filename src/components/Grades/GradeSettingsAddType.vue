<template>
	<div class="GradeSettingsAddType">
		<div class="GradeSettingsAddType__label-block">
			<label class="GradeSettingsAddType__label" for="typeGrade">
				Добавить вид оценивания
			</label>

			<InputText
				v-model="nameModel"
				class="GradeSettingsAddType__input"
				inputId="typeGrade"
				placeholder="Название"
			/>
		</div>

		<!-- <div class="GradeSettingsAddType__label-block">
			<label class="GradeSettingsAddType__label" for="countCols">
				Количество столбцов ???
			</label>

			<InputText
				v-model="nameModel"
				class="GradeSettingsAddType__input"
				inputId="countCols"
				placeholder="Введите кол-во столбцов"
			/>
		</div> -->

		<Button label="Добавить" @click="onClickAddType" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const nameModel = ref('')

const onClickAddType = () => {
	gradesStore.createGradeType({
		name: nameModel.value,
	})

	nameModel.value = ''
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
		grid-template-columns: 1fr;
	}

	&__label {
		margin-bottom: 8px;
		display: inline-block;
	}
}
</style>
