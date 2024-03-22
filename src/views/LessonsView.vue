<template>
	<div class="Lessons">
		<LessonsTable />
	</div>
</template>

<script setup>
import LessonsTable from '@components/Lessons/LessonsTable.vue'
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.Lessons {
	width: 100%;
	height: 100%;
	/* background-color: $view-bg;
	border-radius: $border-radius-main; */
}
</style>
