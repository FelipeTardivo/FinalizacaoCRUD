<template>
    <div>
        <h1>Atualizar Usuário</h1>
        <form @submit.prevent="updateUser">
            <div>
                <label>Email: </label>
                <input type="email" v-model="email" />
            </div>
            <div>
                <label>Nome: </label>
                <input type="text" v-model="name" />
            </div>
            <div>
                <label>Senha: </label>
                <input type="password" v-model="password" />
            </div>
            <br>
            <button type="submit">Atualizar</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'updateUser',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            message: '',
        }
    },
    methods: {
        updateUser() {
            const data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            console.log(data);
            fetch('http://localhost:3000/api/updateUser', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(async (res) => {
                    this.message = await res.text();
                })

                .catch(async (error) => {
                    this.message = error.message;
                })
        }
    },
}
</script>

<style scoped></style>