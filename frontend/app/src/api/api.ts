
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
})

/* =========================
   REQUEST INTERCEPTOR
   ========================= */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore()

    if (auth.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
    }

    return config
  }
)

/* =========================
   RESPONSE INTERCEPTOR
   ========================= */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const auth = useAuthStore()
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      auth.refreshToken &&
      originalRequest
    ) {
      try {
        const res = await axios.post<{ access: string }>(
          'http://127.0.0.1:8000/auth/refresh/',
          {
            refresh: auth.refreshToken
          }
        )

        auth.accessToken = res.data.access

        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            `Bearer ${res.data.access}`
        }

        return api(originalRequest)
      } catch (err) {
        auth.clearTokens()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api