<template>
	<div class="HeaderAdmin">
		<div class="HeaderAdmin__left">Академические группы</div>

		<div class="HeaderAdmin__right">
			<Button
				class="UploadGroupsActivator"
				:loading="isLoadingUploadFile"
				label="Загрузить"
				@click="onClick"
			/>

			<input
				ref="fileInput"
				class="UploadGroupsActivator__file-input"
				type="file"
				:accept="accessTypes.join(', ')"
				@input="onInputFileInput"
			/>

			<!-- 
			<Dialog
				v-model:visible="uploadGroupsDialogModel"
				contentClass="UploadGroupsDialog"
				:draggable="false"
				modal
				header="Загрузка учебных групп"
				:style="{ width: '35rem' }"
			></Dialog> -->
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Api from '@services/Api'

/* const uploadGroupsDialogModel = ref(false)

const onClick = () => {
	uploadGroupsDialogModel.value = true
} */

const isLoadingUploadFile = ref(false)
const accessTypes = ['.xlsx', '.xls']

const fileInput = ref(null)
const onClick = e => {
	fileInput.value.click()
}

const onInputFileInput = async e => {
	isLoadingUploadFile.value = true

	const selectedFile = e.target.files[0]

	const formData = new FormData()

	formData.append('file', selectedFile)

	const { success, data } = await Api.uploadGroups(formData)

	console.log(data)

	isLoadingUploadFile.value = false
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.HeaderAdmin {
	padding: 0 16px;

	background-color: $view-bg;
	border-radius: $borderRadius;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__right,
	&__left {
		display: flex;
		gap: 12px;
		align-items: center;
	}
}

.UploadGroupsActivator {
	&__file-input {
		display: none;
	}
}
</style>
