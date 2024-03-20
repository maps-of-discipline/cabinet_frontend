<template>
	<div class="DevelopingStub">
		<i class="DevelopingStub__icon mdi mdi-alert" />
		<div class="DevelopingStub__title">Страница в разработке</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.DevelopingStub {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: $view-bg;
	border-radius: $border-radius-main;

	&__icon {
		font-size: 2.5rem;
		color: var(--red-700);
	}

	&__title {
		margin-bottom: 16px;
	}
}
</style>
