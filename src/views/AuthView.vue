<template>
	<div class="AuthView">
		<form class="AuthForm">
			<div class="AuthForm__title">Успеваемость</div>

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

			<Button label="Войти" @click="onLoginClick" />
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuth } from '@stores/auth'

const authStore = useAuth()

const loginModel = ref('')
const passwordModel = ref('')

const onLoginClick = async () => {
	const success = await authStore.login(loginModel.value, passwordModel.value)
}
</script>

<style lang="scss">
@import '@styles/_variables.scss';

.AuthView {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.AuthForm {
	background-color: $shade900;
	padding: 22px;
	width: 400px;
	display: flex;
	flex-direction: column;
	gap: 16px;

	&__title {
		font-size: 1.2rem;
		font-weight: 500;
	}

	&__input-block {
		display: flex;
		flex-direction: column;
	}

	&__input-label {
		font-weight: 500;
		font-size: 0.9rem;
		margin-bottom: 5px;
	}
}
</style>
