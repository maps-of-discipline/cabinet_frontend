<template>
	<Stub class="NotExistGradeTableStub">
		<div>Данная таблица отсутствует</div>
		<Button
			class="NotExistGradeTableStub__create-button"
			label="Создать"
			@click="onClick"
		/>
	</Stub>
</template>

<script setup>
import { useGradesStore } from '@/stores/grades'

const gradesStore = useGradesStore()

const onClick = () => {
	gradesStore.createGradeTable()
}
</script>

<style lang="scss">
.NotExistGradeTableStub {
	&__create-button {
		margin-top: 8px;
	}
}
</style>
