<template>
	<div class="GroupsHeader">
		<div class="GroupsHeader__left">Академические группы</div>

		<div class="GroupsHeader__right">
			<InputText
				v-model="search"
				class="GroupsHeader__search"
				placeholder="Поиск"
			/>

			<Button
				class="UploadGroupsActivator"
				:loading="isLoadingUploadFile"
				label="Загрузить"
				icon="mdi mdi-upload"
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
const search = defineModel('search')

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

.GroupsHeader {
	padding: 0 16px;

	background-color: $view-bg;
	border-radius: $borderRadius;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__left {
		font-size: 1rem;
		font-weight: 600;
	}

	&__right,
	&__left {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	&__search {
		height: 37px;
	}
}

.UploadGroupsActivator {
	&__file-input {
		display: none;
	}
}
</style>
