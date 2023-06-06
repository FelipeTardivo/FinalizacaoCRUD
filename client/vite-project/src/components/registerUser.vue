<template>
    <div>
        <h1>Cadastro Usuário</h1>
        <form @submit.prevent="registerUser"></form>
    </div>

    <div>
        <label>Nome: </label>
        <input type="text" v-model="nome">
    </div>

    <div>
        <label>Email: </label>
        <input type="email" v-model="email">
    </div>

    <div>
        <label>Senha: </label>
        <input type="password" v-model="senha">
    </div>

    <div>
        <br>
        <button type="submit">Registrar</button>
    </div>

    <p> {{ message }}</p>
</template>


<script>

export default {
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
            message: '',
        }
    },

    methods: {
        registerUser() {
            const data = {
                nome: this.nome,
                email: this.email,
                senha: this.senha
            }
            console.log(data);

            fetch("http://localhost:3000/api/registerUser", {
                method: "POST",
                headers: { 'Content-Type': 'aplication/json' },
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