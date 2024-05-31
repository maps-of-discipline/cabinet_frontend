<template>
	<div class="LessonsLoadInfo" :class="{ hasOverLoad }">
		<ApButton
			class="LessonsLoadInfo__activator"
			icon="mdi mdi-information-outline"
			@click="visible = true"
			v-tooltip.bottom="{
				value: hasOverLoad
					? 'Превышено максимальное значение одной из нагрузок'
					: 'Доступные нагрузки',
				showDelay: 500,
			}"
		/>

		<Dialog
			class="LessonsLoadInfoDialog"
			v-model:visible="visible"
			header="Доступные нагрузки"
			:style="{ width: '25rem' }"
		>
			<div
				class="LessonsLoadInfoDialog__row"
				v-for="controlType in lessonsStore.controlTypes"
			>
				<div>
					<i
						class="LessonsLoadInfoDialog__warning mdi mdi-alert"
						v-if="percentControlTypesById[controlType.id_type_control] > 100"
						v-tooltip.bottom="{
							value: 'Превышено максимальное значение',
							showDelay: 500,
						}"
					/>
					<span>{{ controlType.name }}:</span>
				</div>

				<ProgressBar
					class="LessonsLoadInfoDialog__bar"
					:class="{
						isLow: percentControlTypesById[controlType.id_type_control] < 30,
					}"
					:value="percentControlTypesById[controlType.id_type_control]"
					:style="{
						'--color': colorById[controlType.id_type_control],
					}"
				>
					{{ sumControlTypesById?.[controlType.id_type_control] || 0 }} /
					{{ controlType.amount }} ч.
				</ProgressBar>
			</div>
		</Dialog>
	</div>
</template>

<script setup>
import ProgressBar from 'primevue/progressbar'
import ApButton from '@components/ui/ApButton.vue'

import colorById from '@services/helpers/colorById'
import { ref, computed } from 'vue'
import { useLessonsStore } from '@/stores/lessons'

const lessonsStore = useLessonsStore()

const visible = ref(false)

const getPercent = (value, max) => {
	return ((value || 0) / (max || 2)) * 100
}

const hasOverLoad = computed(() =>
	Object.values(percentControlTypesById.value).some(percent => percent > 100)
)

const percentControlTypesById = computed(() => {
	const percents = {}

	for (const id in sumControlTypesById.value) {
		console.log(lessonsStore.controlTypes, id)
		const ct = lessonsStore.controlTypes.find(ct => ct.id_type_control == +id)
		percents[id] = getPercent(sumControlTypesById.value[id], ct.amount)
	}

	return percents
})

const sumControlTypesById = computed(() => {
	const sumById = {}

	lessonsStore.lessons.forEach(lesson => {
		if (!lesson.id_type_control) return

		if (sumById[lesson.id_type_control]) sumById[lesson.id_type_control] += 2
		else sumById[lesson.id_type_control] = 2
	})

	return sumById
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LessonsLoadInfo {
	&__activator {
		border: 1px transparent;
		transition: outline 0.2s;
		outline: 4px solid transparent;
	}

	&.hasOverLoad {
		.LessonsLoadInfo {
			&__activator {
				color: #eab308;
				background-color: rgba(234, 179, 8, 0.16);

				&:hover,
				&:focus {
					border: none;
					outline: 4px solid rgb(234, 179, 8, 0.3);
				}
			}
		}
	}
}

.LessonsLoadInfoDialog {
	width: 300px !important;

	&__row {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		margin-bottom: 16px;

		&.isOver {
			border: 1px solid red;
		}
	}

	&__warning {
		cursor: pointer;
		color: #eab308;
		margin-right: 6px;
	}

	&__bar {
		height: 25px;

		.p-progressbar-value {
			background-color: var(--color);
		}

		.p-progressbar-label {
			color: #fff;
		}

		&.isLow {
			position: relative;

			.p-progressbar-value {
				overflow: initial;
			}

			.p-progressbar-label {
				text-wrap: nowrap;
				position: absolute;
				left: calc(100% + 8px);
			}
		}
	}

	.p-dialog-header,
	.p-dialog-content {
		background-color: $shade950;
		user-select: none;
	}
}
</style>
