<template>
	<Tag v-if="value" class="GradeTag" :class="gradeClass" :value="value"></Tag>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	value: {
		type: Number,
	},
})

const gradeClass = computed(() => {
	const value = props.value

	if (value < 2.5) return 'two'
	if (value < 3.5) return 'three'
	if (value < 4.5) return 'four'
	if (value <= 5) return 'five'
})
</script>

<style lang="scss">
.GradeTag {
	font-size: 0.9rem;
	color: #222;
	font-weight: 600;
	border-radius: 4px;
	user-select: none;

	&.two {
		background-color: #f87171;
	}
	&.three {
		background-color: #fdba74;
	}
	&.four {
		background-color: #79a979;
	}
	&.five {
		background-color: #53a653;
	}
}
</style>
