<template>
	<Stub class="DevelopingStub">
		<i class="DevelopingStub__icon mdi mdi-alert" />
		<div class="DevelopingStub__title">Страница в разработке</div>
	</Stub>
</template>

<script setup>
import Stub from '@components/layouts/Stub.vue'
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.DevelopingStub {
	&__icon {
		font-size: 3.5rem;
		color: var(--red-700);
	}

	&__title {
		margin-top: 8px;
		font-size: 1.25rem;
	}
}
</style>
