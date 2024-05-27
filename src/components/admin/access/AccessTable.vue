<template>
	<div class="AccessTable">
		<div class="AccessTable__header">
			<span class="AccessTable__title">Доступ к системе</span>
			<ApEditMode v-model="editMode" />
		</div>

		<InputText
			v-model="filters['global'].value"
			class="AccessTable__search"
			placeholder="Поиск"
		/>

		<DataTable
			class="AccessTable__table"
			:value="users"
			:loading="isLoading"
			scrollable
			v-model:filters="filters"
			ref="table"
			:globalFilterFields="['name']"
			dataKey="id_user"
		>
			<Column header="#" style="max-width: 50px; width: 50px">
				<template #body="{ index }">
					<span class="LessonsTable__index">
						{{ index + 1 }}
					</span>
				</template>
			</Column>

			<Column
				field="name"
				header="ФИО"
				style="max-width: 350px; width: 350px"
			></Column>

			<Column
				field="approved_lk"
				header="Доступ"
				headerClass="column-header-center"
				bodyClass="column-cell-center"
			>
				<template #body="{ data, field }">
					<Checkbox
						:modelValue="data[field]"
						@update:modelValue="onEditAccess(data, $event)"
						:binary="true"
						:readonly="!editMode"
					/>
				</template>
			</Column>

			<Column
				field="request_approve_date"
				header="Дата обращения"
				style="max-width: 200px; width: 200px"
				headerClass="column-header-center"
				bodyClass="column-cell-center"
			>
				<template #body="{ data, field }">
					<span>{{ getDateFormatted(data[field]) }}</span>
				</template>
			</Column>

			<Column
				field="roles"
				header="Роли"
				style="max-width: 200px; width: 200px"
				headerClass="column-header-center"
				bodyClass="column-cell-center"
			>
				<template #body="{ data, field }">
					<span>{{ data[field].map(role => role.name_role).join(', ') }}</span>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup>
import ApEditMode from '@components/ui/ApEditMode.vue'

import moment from 'moment'
import 'moment/dist/locale/ru'

import { onMounted, ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api'

import { useToast } from 'primevue/usetoast'
import Api from '@services/Api'

const toast = useToast()

const isLoading = ref(false)
const editMode = ref(false)

const filters = ref({
	global: { value: '', matchMode: FilterMatchMode.CONTAINS },
})

const getDateFormatted = date => {
	if (!date) return ''
	date = new Date(date)

	const localeMoment = moment(date).subtract(3, 'hours').locale('ru')

	return localeMoment.calendar()
}

const users = ref([])

const onEditAccess = async (data, value) => {
	try {
		await Api.updateApproveUser(data.id_user, value)

		const neededIndex = users.value.findIndex(
			user => data.id_user === user.id_user
		)

		users.value[neededIndex] = {
			...users.value[neededIndex],
			approved_lk: value,
		}

		toast.add({
			severity: 'success',
			summary: 'Доступ для пользователя успешно изменен',
			life: 1000,
		})
	} catch (e) {
		console.log(e)
	}
}

onMounted(async () => {
	try {
		isLoading.value = true
		const data = await Api.getLkUsers()
		users.value = data
	} catch (e) {
		console.log(e)
	} finally {
		isLoading.value = false
	}
})
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.AccessTable {
	background-color: $view-bg;
	border-radius: 8px;
	padding: 16px;
	display: grid;

	min-height: 500px;
	max-height: 60vh;
	grid-template-rows: auto 37px 1fr;
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
		overflow: auto;
		width: 100%;
	}

	.p-component-overlay {
		border-radius: $borderRadius;
	}
}
</style>
