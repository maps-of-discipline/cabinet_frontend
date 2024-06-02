<template>
	<div class="TutorsTab">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="scss">
@import '@styles/_variables.scss';

.TutorsTab {
	height: 100%;
	overflow: auto;
	padding-right: 12px;
}
</style>
