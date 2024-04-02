<template>
	<div
		class="CloudIconNotSaved"
		v-tooltip.right="{
			value:
				'Данные не сохранены. Отредактируйте строку, чтобы применить изменения.',
		}"
	>
		<i class="mdi mdi-cloud-alert" />
	</div>
</template>

<style lang="scss" scoped>
.CloudIconNotSaved {
	cursor: pointer;
}
</style>
