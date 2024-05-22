<template>
	<div class="BellsTable">
		<div class="BellsTable__header">
			<span class="BellsTable__title">Расписание звонков</span>
			<ApEditMode v-model="editMode" />
		</div>

		<DataTable
			class="BellsTable__table"
			:value="bells"
			:loading="isLoadingBells"
		>
			<Column field="order" header="#" style="max-width: 50px; width: 50px" />

			<Column field="name" header="Промежуток">
				<template #body="{ data, field }">
					<BellsTableTimeEditor
						:value="data[field]"
						:editMode="editMode"
						@input="onInput(data, $event)"
					/>
				</template>
			</Column>
		</DataTable>

		<div v-if="editMode" class="BellsTable__footer">
			<Button
				label="Отменить изменения"
				severity="danger"
				style="color: #fff"
				@click="onCancel"
			/>
			<Button label="Сохранить" severity="success" @click="onSave" />
		</div>
	</div>
</template>

<script setup>
import BellsTableTimeEditor from '@components/admin/bells/BellsTableTimeEditor.vue'

import { ref, onMounted } from 'vue'
import { useLessonsStore } from '@/stores/lessons'
import ApEditMode from '@components/ui/ApEditMode.vue'
import Api from '@services/Api'

const lessonsStore = useLessonsStore()

const isLoadingBells = ref(false)
const bells = ref([])

const editMode = ref(false)

const onInput = (data, newValue) => {
	const newBell = Object.assign({}, data)
	newBell.name = newValue

	const neededIndex = bells.value.findIndex(bell => bell.id === data.id)
	bells.value[neededIndex] = newBell
}

const onCancel = () => {
	bells.value = lessonsStore.bells
}

const onSave = async () => {
	await Api.updateBells(bells.value)
	editMode.value = false
}

onMounted(async () => {
	isLoadingBells.value = true

	const data = await lessonsStore.fetchBells()
	bells.value = [...data]
	isLoadingBells.value = false
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.BellsTable {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: minmax(0px, 1fr);
	gap: 12px;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 37px;
	}

	&__title {
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 12px;
	}

	&__table {
		height: 100%;
		width: 100%;
	}

	.p-component-overlay {
		border-radius: $borderRadius;
	}

	&__footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
}
</style>
