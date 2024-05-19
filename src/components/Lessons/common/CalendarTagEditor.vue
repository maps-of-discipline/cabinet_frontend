<template>
	<div class="CalendarTagEditor">
		<Button
			v-if="value || editMode"
			class="CalendarTagEditor__activator"
			:label="label"
			:icon="!value && 'mdi mdi-calendar-blank'"
			@click="togglePanel"
			:disabled="!editMode"
		/>

		<OverlayPanel ref="opRef">
			<Calendar
				selectionMode="single"
				inline
				:modelValue="valueObj"
				@update:modelValue="onInputDate"
			>
			</Calendar>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},

	value: {
		type: String,
		default: null,
	},
})

const emit = defineEmits(['input'])

const opRef = ref()

const togglePanel = event => opRef.value.toggle(event)

const label = computed(() => {
	return props.value
		? new Date(props.value).toLocaleDateString('ru-RU')
		: 'Указать'
})

const valueObj = computed(() => new Date(props.value))

const onInputDate = value => emit('input', value)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.CalendarTagEditor {
	&__activator {
		background: $shade800;
		height: 35px;
		border: none;

		&.p-disabled {
			opacity: 1;
		}
	}
}
</style>
