<template>
	<div class="LeftMenuDiscipline">1</div>
</template>

<script setup>
import { ref } from 'vue'

import { useUi } from '@stores/ui'

const uiStore = useUi()
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.LeftMenuDiscipline {
	width: 250px;
	padding: 16px;
	margin: 16px 0 16px 30px;
	border-radius: $borderRadius;
	background-color: $menu-bg;
	display: grid;
	grid-template-rows: 70px 1fr auto;
	grid-template-columns: 100%;
	transition: all 0.25s ease;
	position: relative;
}
</style>
