<template>
	<div class="AuthView">
		<div class="AuthView__dev-block"></div>

		<form class="AuthForm" @keydown.enter="onLogin">
			<InlineMessage
				v-if="showDevBlock"
				severity="warn"
				style="font-size: 0.9rem"
				class="AuthForm__dev-msg"
			>
				<span>Приложение находится в режиме разработки.</span>
				<span>
					Для доступа необходимо пройти модерацию. Telegram:
					<a
						class="AuthForm__contact-link"
						href="https://t.me/KirillovDP"
						target="_blank"
					>
						@KirillovDP
					</a>
				</span>
			</InlineMessage>

			<div class="AuthForm__logo-block" to="/">
				<img class="AuthForm__logo" src="@assets/logo.png" alt="" />
				<div class="AuthForm__logo-title">Успеваемость</div>
			</div>

			<div class="AuthForm__main">
				<div class="AuthForm__title">Вход</div>
				<div class="AuthForm__subtitle">
					Вход в личный кабинет происходит через единую учетную запись (ЕУЗ)
				</div>

				<div class="AuthForm__input-block">
					<div class="AuthForm__input-label">Логин</div>
					<InputText
						v-model="loginModel"
						id="inputLogin"
						type="text"
						placeholder="Введите логин"
					/>
				</div>

				<div class="AuthForm__input-block">
					<div class="AuthForm__input-label">Пароль</div>
					<InputText
						v-model="passwordModel"
						id="inputPassword"
						type="password"
						placeholder="Введите пароль"
					/>
				</div>

				<div class="AuthForm__checkbox-block">
					<Checkbox v-model="keepAuthModel" inputId="keep_auth" binary />

					<label for="keep_auth" style="user-select: none; cursor: pointer">
						Оставаться в системе
					</label>
				</div>
			</div>

			<Button
				class="AuthForm__submit"
				label="Вход"
				@click="onLogin"
				:loading="isLoadingSubmit"
			/>
		</form>

		<PwaBanner />
	</div>
</template>

<script setup>
import PwaBanner from '@components/layouts/PwaBanner.vue'

import { ref } from 'vue'

import app from '@/main.ts'

import { useAuth } from '@stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuth()
const router = useRouter()

const loginModel = ref('')
const passwordModel = ref('')
const isLoadingSubmit = ref(false)
const keepAuthModel = ref(true)
const showDevBlock = ref(false)

const onLogin = async () => {
	isLoadingSubmit.value = true

	authStore.setIsSession(!keepAuthModel.value)
	const res = await authStore.login(loginModel.value, passwordModel.value)

	if (res.data?.approved === false) {
		/* app.config.globalProperties.$toast.add({
			severity: 'warn',
			summary:
				'Система находится в разработке. Для получения доступа обратитесь к администратору',
			life: 4000,
		}) */

		showDevBlock.value = true
	} else if (res.error) {
		app.config.globalProperties.$toast.add({
			severity: 'error',
			summary: res.error,
			life: 2000,
		})
	} else {
		router.push({ name: 'lessons' })
	}

	isLoadingSubmit.value = false
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.AuthView {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 16px;
}

.AuthForm {
	background-color: $shade900;
	padding: 22px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 16px;
	border-radius: $borderRadius;
	min-height: 420px;

	&__contact-link {
		text-decoration: underline;
	}

	&__dev-msg {
		.p-inline-message-text {
			font-size: 1rem;
			display: flex;
			flex-direction: column;
			gap: 6px;
		}
	}

	&__main {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__logo-block {
		display: flex;
		align-items: center;
		position: relative;
	}

	&__logo {
		width: 36px;
		margin-right: 16px;
	}

	&__logo-title {
		font-size: 1.2rem;
		font-weight: 600;
	}

	&__title {
		font-size: 1rem;
		font-weight: 600;
	}

	&__subtitle {
		font-size: 0.8rem;
		font-weight: 500;
		color: $shade100;
		opacity: 0.7;
	}

	&__input-block {
		display: flex;
		flex-direction: column;
	}

	&__checkbox-block {
		display: flex;
		gap: 12px;
	}

	&__input-label {
		font-weight: 500;
		font-size: 0.9rem;
		margin-bottom: 5px;
	}

	&__submit {
		background-color: $blue000;
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 10px;
		height: 40px;
		border: none;
		display: flex;
		justify-content: center;

		&:hover {
			border: none;
		}

		&.p-button-loading {
			.p-button-label {
				display: none;
			}

			svg {
				width: 20px;
				height: 20px;
			}
		}
	}
}
</style>
