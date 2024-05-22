<template>
	<div class="BellsTableTimeEditor">
		<Button
			v-if="value"
			class="BellsTableTimeEditor__activator"
			:icon="!value ? 'mdi mdi-calendar-blank' : ''"
			:label="label"
			:disabled="!editMode"
			@click="togglePanel"
		/>

		<OverlayPanel ref="opRef">
			<div class="BellsTableTimeEditor__panel">
				<span>C:</span>

				<Calendar selectionMode="single" inline timeOnly v-model="startTime">
				</Calendar>

				<span>До:</span>

				<Calendar selectionMode="single" inline timeOnly v-model="finishTime">
				</Calendar>
			</div>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed, toRaw } from 'vue'

const props = defineProps({
	value: {
		type: String,
		default: null,
	},

	editMode: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits(['input'])

const opRef = ref()
const togglePanel = event => opRef.value.toggle(event)

const startTime = computed({
	get() {
		const start = props.value.split(' - ')[0]
		const [hours, minutes] = start.split(':')

		const date = new Date()
		date.setHours(+hours, +minutes, 0)

		return date
	},

	set(date) {
		const strStart =
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2)

		const strRes = strStart + ' - ' + props.value.split(' - ')[1]
		emit('input', strRes)
	},
})

const finishTime = computed({
	get() {
		const finish = props.value.split(' - ')[1]
		const [hours, minutes] = finish.split(':')

		const date = new Date()
		date.setHours(+hours, +minutes, 0)

		return date
	},

	set(date) {
		const strFinish =
			('0' + date.getHours()).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2)

		const strRes = props.value.split(' - ')[0] + ' - ' + strFinish
		emit('input', strRes)
	},
})

const label = computed(() => {
	return props.value ? props.value : 'Указать'
})

const onInputDate = value => emit('input', value)
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.BellsTableTimeEditor {
	&__panel {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	&__activator {
		background: $shade800;
		height: 35px;
		border: none;
		width: 150px;

		&.p-disabled {
			opacity: 1;
		}
	}
}
</style>
