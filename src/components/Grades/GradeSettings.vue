<template>
	<Transition name="fade">
		<div class="GradeSettings" v-if="gradesStore.isShowSettings">
			<div></div>
		</div>
	</Transition>
</template>

<script setup>
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.GradeSettings {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	margin-left: 12px;
	overflow: auto;
}
</style>
