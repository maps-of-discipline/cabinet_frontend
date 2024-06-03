<template>
	<div class="GradeNameHeaderColumn">
		<span>ФИО</span>

		<div class="GradeNameHeaderColumn__right">
			<InputText
				v-focustrap
				class="GradeNameHeaderColumn__name-search"
				placeholder="Поиск по ФИО"
				type="text"
				v-model="searchNameModel"
			/>

			<!-- <Button
				class="GradeNameHeaderColumn__name-switcher"
				:class="{ isActive: gradesStore.showFullname }"
				icon="mdi mdi-format-size"
				aria-label="Отображать только фамилию"
				@click="onClick"
				v-tooltip.right="{
					value: 'Отображать ФИО полностью',
					showDelay: 500,
				}"
			/> -->
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useGradesStore } from '@/stores/grades'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
})

const gradesStore = useGradesStore()

const onClick = () => {
	gradesStore.setShowFullname(!gradesStore.showFullname)
}

const searchNameModel = computed({
	get() {
		return props.modelValue
	},

	set(val) {
		emit('update:modelValue', val)
	},
})
</script>

<style lang="scss">
@import '@styles/variables.scss';

.GradeNameHeaderColumn {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__name-search {
		height: 2rem;
	}

	&__name-switcher {
		margin-left: 12px;
		background-color: $shade1000;
		width: 2rem;
		height: 2rem;
		border: none !important;
		outline: $focusOutlineTransparent;

		&.isActive {
			outline: $focusOutline;
		}

		.p-button-icon {
			transition: all 0.35s ease;
		}
	}
}
</style>
