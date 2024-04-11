<template>
	<div class="AuthView">
		<div class="AuthBlock">
			<div class="AuthBlock__title">Успеваемость</div>

			<div class="AuthBlock__input-block">
				<div class="AuthBlock__input-label">Логин</div>
				<InputText
					v-model="loginModel"
					type="text"
					placeholder="Введите логин"
				/>
			</div>

			<div class="AuthBlock__input-block">
				<div class="AuthBlock__input-label">Пароль</div>
				<InputText
					v-model="passwordModel"
					type="password"
					placeholder="Введите пароль"
				/>
			</div>

			<Button label="Войти" @click="onLoginClick" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import { useUser } from '@stores/user'
import { useRouter } from 'vue-router'

const userStore = useUser()
const router = useRouter()

const loginModel = ref('')
const passwordModel = ref('')

const onLoginClick = async () => {
	const success = await userStore.login(loginModel.value, passwordModel.value)

	if (success) {
		router.push({
			path: '/',
		})
	}
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

.AuthBlock {
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
