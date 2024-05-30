<template>
	<div class="CalendarTagEditor">
		<Button
			v-if="value || editMode"
			class="CalendarTagEditor__activator"
			:class="{ isEmpty: !value }"
			:label="label"
			:icon="!value ? 'mdi mdi-calendar-blank' : ''"
			@click="togglePanel"
			:disabled="!editMode"
		/>

		<OverlayPanel ref="opRef">
			<div v-if="optionIncludeDay" class="CalendarTagEditor__with-select-day">
				<Checkbox
					v-model="includeSelectedDayModel"
					binary
					inputId="with-select-day"
					:disabled="!value"
				/>

				<label for="'with-select-day" class="ml-2">
					Включая выбранную дату
				</label>
			</div>

			<Calendar
				selectionMode="single"
				inline
				dateFormat="dd.mm.yy"
				:modelValue="valueObj"
				@update:modelValue="onInputDate"
			>
			</Calendar>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed, toRaw } from 'vue'

const props = defineProps({
	editMode: {
		type: Boolean,
		default: false,
	},

	value: {
		type: String,
		default: null,
	},

	optionIncludeDay: {
		type: Boolean,
		default: false,
	},

	includeSelectedDay: {
		type: Boolean,
		default: null,
	},
})

const emit = defineEmits(['input', 'changeIncludeDay'])

const opRef = ref()

const togglePanel = event => opRef.value.toggle(event)

const label = computed(() => {
	return props.value
		? new Date(props.value).toLocaleDateString('ru-RU')
		: 'Указать'
})

const valueObj = computed(() =>
	props.value ? new Date(props.value) : new Date()
)

const onInputDate = value => emit('input', value)

const includeSelectedDayModel = computed({
	get() {
		return toRaw(props.includeSelectedDay)
	},

	set(value) {
		emit('changeIncludeDay', value)
	},
})
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

		&.isEmpty {
			color: $shade400;
		}
	}

	&__with-select-day {
		margin: 12px 0 0 0;
		display: flex;
		gap: 12px;
	}
}
</style>
