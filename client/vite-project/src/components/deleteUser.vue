<template>
    <div>
        <h1>Deletar Usuários</h1>
        <form @submit.prevent="deleteUser">
            <div>
                <label>Email: </label>
                <input type="email" v-model="email">
            </div>
            <div>
                <label>Senha: </label>
                <input type="password" v-model="senha">
            </div>
            <br>
            <button type="submit">Deletar</button>
        </form>
        <p> {{ message }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            senha: '',
            message: '',
        }
    },
    methods: {
        deleteUser() {
            const data = {
                email: this.email,
                senha: this.senha
            }
            fetch("http://localhost:3000/api/deleteUser", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

                .then(async (res) => {
                    this.message = await res.text();
                })

                .catch(async (err) => {
                    this.message = await err.text();
                })
        }
    }
}
</script>
<style scoped></style>