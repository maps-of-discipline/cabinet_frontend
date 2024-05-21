<template>
	<div class="TutorsDateEditor">
		<Button
			class="TutorsDateEditor__activator"
			:label="label"
			:icon="!date ? 'mdi mdi-calendar-blank' : ''"
			@click="togglePanel"
		/>

		<OverlayPanel ref="opRef">
			<Calendar
				selectionMode="single"
				inline
				dateFormat="dd.mm.yy"
				:modelValue="date"
				@update:modelValue="onInputDate"
			>
			</Calendar>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const date = ref(null)
const onInputDate = value => (date.value = value)

const opRef = ref()
const togglePanel = event => opRef.value.toggle(event)

const label = computed(() => {
	return date.value
		? new Date(date.value).toLocaleDateString('ru-RU')
		: 'Указать'
})
</script>

<style lang="scss">
.TutorsDateEditor {
	&__activator {
		width: 100%;
	}
}
</style>
