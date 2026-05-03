<script setup lang="ts">
    import { ref } from 'vue'
    import  api from '@/api/api.ts'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'

    const username = ref('')
    const password = ref('')
    const auth = useAuthStore()
    const router = useRouter()

    const handleLogin = async () => {
        if (!username.value || !password.value) {
            console.log('Campos vazios')
            return
        }

        try {
            const res = await api.post('/auth/login/', {
                username: username.value,
                password: password.value
            })
            // salva tokens
            auth.setTokens(res.data.access, res.data.refresh)
            router.push('/home')

        } catch (error) {
            console.error('Erro no login:', error)
        }
    }

</script>
<template>
    <div class="flex flex-col items-center gap-4   py-25">
        <h1 class="text-8xl font-bold">Login</h1>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
                <input class="w-lg p-2 border-b border-white focus:outline-none focus:ring-none focus:border-b-2 focus:border-b-blue-200" type="text" v-model="username" required placeholder="username" autocomplete="current-username"/>
                <input class="w-lg p-2 border-b border-white focus:outline-none focus:ring-none focus:border-b-2 focus:border-b-blue-200" type="password" v-model="password" required placeholder="password" autocomplete="current-password"/>
            </div>
            <button class="text-2xl font-bold w-lg h-10 bg-white text-black hover:cursor-pointer hover:bg-blue-200 hover:text-3xl transition:all duration-100" type="submit">Login</button>
        </form>
    </div>
</template>
