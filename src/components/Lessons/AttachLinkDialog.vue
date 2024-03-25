<template>
	<Dialog
		:visible="modelValue"
		modal
		:draggable="false"
		header="Прикрепить ссылку"
		:style="{ width: '20rem' }"
		@update:visible="onUpdateVisible"
		class="AttachLinkDialog"
	>
		<div class="AttachLinkDialog__block">
			<label for="username" class="AttachLinkDialog__label">Ссылка</label>
			<InputText v-model="linkModel" autocomplete="off" />
		</div>

		<div class="AttachLinkDialog__block">
			<label for="email" class="AttachLinkDialog__label">Название ссылки</label>
			<InputText v-model="linkNameModel" autocomplete="off" />
		</div>

		<div class="AttachLinkDialog__buttons">
			<Button
				type="button"
				label="Отменить"
				severity="secondary"
				@click="onUpdateVisible(false)"
			/>

			<Button type="button" label="Добавить" @click="onSave()" />
		</div>
	</Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue', 'save'])

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},

	link: {
		type: String,
		default: '',
	},

	linkName: {
		type: String,
		default: '',
	},
})

const linkModel = ref()
const linkNameModel = ref()

watch(
	() => props.modelValue,
	value => {
		if (value) {
			linkModel.value = props.link
			linkNameModel.value = props.linkName
		} else {
			linkModel.value = ''
			linkNameModel.value = ''
		}
	}
)

const onUpdateVisible = value => emit('update:modelValue', value)
const onSave = () => {
	emit('save', {
		link: linkModel.value,
		linkName: linkNameModel.value,
	})
}
</script>

<style lang="scss">
.AttachLinkDialog {
	&__block {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;
	}

	&__label {
		margin-bottom: 6px;
	}

	&__buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
}
</style>
