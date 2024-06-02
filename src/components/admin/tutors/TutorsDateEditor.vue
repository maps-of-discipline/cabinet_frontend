<template>
	<div class="TutorsForm__input-block">
		<label for="tutorsDate">Дата распоряжения:</label>
		<Calendar
			:modelValue="date"
			@update:modelValue="onInputDate"
			placeholder="Выберите дату"
			dateFormat="dd.mm.yy"
			inputId="tutorsDate"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const date = ref(null)
const onInputDate = value => (date.value = value)
</script>

<style lang="scss">
.TutorsDateEditor {
	&__activator {
		width: 100%;
	}
}
</style>
