<template>
	<div class="Stub">
		<slot />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.Stub {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: $view-bg;
	border-radius: $borderRadius;
}
</style>
