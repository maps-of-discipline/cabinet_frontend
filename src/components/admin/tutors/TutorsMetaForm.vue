<template>
	<div class="TutorsMetaForm">
		<div class="TutorsForm__input-row">
			<div class="TutorsForm__input-block">
				<label for="tutorsDate">Дата распоряжения:</label>
				<Calendar
					v-model="formModel.date"
					placeholder="Выберите дату"
					dateFormat="dd.mm.yy"
					inputId="tutorsDate"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="numOrder">Номер распоряжения:</label>
				<InputNumber
					v-model="formModel.order"
					placeholder="Укажите номер"
					inputId="numOrder"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="year">Год обучения:</label>

				<InputNumber
					v-model="formModel.year"
					placeholder="Укажите год обучения"
					:useGrouping="false"
					:min="2019"
					inputId="year"
					:max="new Date().getFullYear() + 1"
				/>
			</div>
		</div>

		<!-- <div class="TutorsForm__input-block">
			<label for="tutorsDate">Форма обучения:</label>
			<Dropdown
				:options="formsOfEducation"
				v-model="formModel.formEducation"
				placeholder="Укажите форму обучения"
				optionLabel="form"
			/>
		</div> -->

		<!-- <div class="TutorsForm__input-row">
			<div class="TutorsForm__input-block">
				<label for="tutorsDate">Периодичность провеки:</label>

				<Dropdown
					placeholder="Укажите периодичность проверки"
					optionLabel="label"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="tutorsDate">День проверки:</label>

				<InputNumber placeholder="Укажите день проверки" />
			</div>
		</div> -->

		<div class="TutorsForm__input-row">
			<div class="TutorsForm__input-block">
				<label for="executor">Исполнитель:</label>

				<InputText
					v-model="formModel.executor"
					id="executor"
					placeholder="Укажите исполнителя"
				/>
			</div>

			<div class="TutorsForm__input-block">
				<label for="signer">Лицо, утверждающее распоряжение:</label>

				<InputText
					v-model="formModel.signer"
					id="signer"
					placeholder="Лицо, утверждающее распоряжение"
				/>
			</div>
		</div>

		<!-- <div class="TutorsForm__input-block">
			<label for="tutorsDate">К кому обращаться:</label>

			<InputNumber placeholder="К кому обращаться?" />
		</div> -->
	</div>
</template>

<script setup>
const props = defineProps({
	formsOfEducation: {
		type: Object,
		default: () => [],
	},
})

const formModel = defineModel('formModel')

const rangeYears = [2021, 2022, 2023, 2024]
</script>

<style lang="scss">
.TutorsMetaForm {
	margin-top: 12px;
	display: grid;
	gap: 16px;
	padding: 0 30px;

	input {
		width: 100%;
	}
}
</style>
