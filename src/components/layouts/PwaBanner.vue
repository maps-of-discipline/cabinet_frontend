<template>
	<div class="PwaBanner" v-if="isVisible">
		<div class="PwaBanner__icon">✨</div>

		<div class="PwaBanner__content">
			<div class="PwaBanner__title">Успеваемость</div>
			<div class="PwaBanner__subtitle">
				Приложение доступно теперь для установки!
			</div>
		</div>

		<div class="PwaBanner__buttons">
			<Button
				class="PwaBanner__button PwaBanner__button--outlined"
				label="Не сейчас"
				@click="closeBanner"
			/>
			<Button
				class="PwaBanner__button PwaBanner__button--active"
				label="Установить"
				@click="onInstallPwa"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const deferredPrompt = ref(null)

const isVisible = ref(window.matchMedia('(display-mode: standalone)').matches)
const closeBanner = () => (isVisible.value = false)

window.addEventListener('beforeinstallprompt', e => {
	e.preventDefault()

	isVisible.value = true
	deferredPrompt.value = e
})

const onInstallPwa = async () => {
	closeBanner()
	deferredPrompt.value?.prompt()
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.PwaBanner {
	position: fixed;
	top: 12px;
	left: 50%;
	transform: translateX(-50%);
	background-color: $shade950;
	padding: 12px 24px;

	user-select: none;
	border-radius: $borderRadius;
	width: 50vw;

	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	gap: 12px;

	&__content {
		font-weight: 400;
	}

	&__title {
		font-weight: 500;
		margin-bottom: 2px;
	}

	&__subtitle {
		color: $shade200;
		font-size: 0.9rem;
	}

	&__buttons {
		display: flex;
		gap: 8px;
	}

	&__button {
		font-size: 0.9rem;
		background-color: $shade1050;
		outline: $focusOutlineTransparent;
		border: none;
		transition: outline 0.2s, color 0.2s, background-color 0.2s;

		&--outlined {
			background-color: transparent;
			opacity: 0.7;
		}

		&--active:hover,
		&--active:focus {
			border: none;
			outline: $focusOutline;
			color: $shade000;
		}
	}
}
</style>
