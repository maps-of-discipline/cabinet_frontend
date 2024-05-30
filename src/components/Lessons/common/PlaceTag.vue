<template>
	<div class="PlaceTag">
		<Button
			class="PlaceTag__activator"
			:label="_label"
			:style="{ backgroundColor }"
			@click="togglePanel"
		/>

		<OverlayPanel ref="opRef" @hide="onHidePanel">
			<div class="PlaceTag__panel">
				<div class="PlaceTag__input-block">
					<label for="selectedPlaceType"> Место: </label>

					<Dropdown
						v-model="selectedPlaceType"
						:options="placeTypeOptions"
						optionLabel="fullname"
						inputId="selectedPlaceType"
						:highlightOnSelect="false"
						placeholder="Укажите место"
						class="PlaceTag__select-place-dropdown"
					>
						<template #value="{ value }">
							<span>
								{{ value?.name }}
							</span>
						</template>
					</Dropdown>
				</div>

				<div class="PlaceTag__input-block">
					<label for="placeLabel">
						{{ selectedPlaceIsOnline ? 'Ссылка' : 'Аудитория' }}:
					</label>

					<InputText
						class="PlaceTag__input"
						inputId="placeLabel"
						:useGrouping="false"
						:placeholder="
							selectedPlaceIsOnline ? 'Введите ссылку' : 'Введите аудиторию'
						"
						v-model="placeModel"
					/>
				</div>
			</div>
		</OverlayPanel>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['input'])

const props = defineProps({
	label: {
		type: String,
		default: '',
	},
})

/* other */
const _label = computed(() => props.label || 'NoPlace')

const backgroundColor = computed(
	() => selectedPlaceType.value?.color || '#363636'
)

/* inputs */
const placeModel = ref('')
const selectedPlaceType = ref(null)
const placeTypeOptions = ref([
	{
		name: 'W',
		fullname: 'Webinar',
		type: 'online',
		color: 'red',
	},
	{
		name: 'Пр',
		fullname: 'Прянишникова',
		type: 'audience',
		color: 'blue',
	},
	{
		name: 'Бс',
		fullname: 'Большая Семёновская',
		type: 'audience',
		color: 'green',
	},
	{
		name: 'ав',
		fullname: 'Автозаводская',
		type: 'audience',
		color: 'yellow',
	},
])

const selectedPlaceIsOnline = computed(
	() => selectedPlaceType.value?.type == 'online'
)

/* panel */
const opRef = ref()
const togglePanel = event => opRef.value?.toggle(event)

const onHidePanel = () => {
	console.log({
		place: placeModel.value,
		type: selectedPlaceType.value,
	})
	emit('input', {})
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.PlaceTag {
	&__activator {
		height: 35px;
		border: none;
		outline: none;

		&.p-disabled {
			opacity: 1;
		}
	}

	&__panel {
		padding-top: 18px;
		display: grid;
		grid-template-columns: 70px 1fr;
		gap: 12px;
		max-width: 280px;
	}

	&__input {
		width: 100%;
	}

	&__input-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	&__select-place-dropdown {
		height: 35px;
		width: 100%;
	}

	&__place-link-input {
		width: 100%;
	}
}
</style>
