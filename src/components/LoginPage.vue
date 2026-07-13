<template>
  <div class="login-container">
    <!-- Left Side - Branding/Content -->
    <div class="login-left">
      <div class="left-content">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>

        <!-- Back to Website Button -->
        <router-link to="/" class="back-button">
          <ArrowLeft class="w-4 h-4" />
          Back to Website
        </router-link>

        <div class="brand-content">
          <!-- Logo -->
          <div class="logo-wrapper">
            <img 
              src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
              alt="GoAbroad Admissions Logo" 
              class="logo"
            >
          </div>
          <h2 class="brand-title">
            GoAbroad <span class="highlight">Admissions</span>
          </h2>
          
          <p class="brand-description">
            Empowering students to achieve their dreams of studying abroad through expert guidance and comprehensive support.
          </p>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon purple">
                <Trophy class="w-4 h-4" />
              </div>
              <span>Scholarship Guidance</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon yellow">
                <Globe class="w-4 h-4" />
              </div>
              <span>Worldwide Universities</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon purple">
                <Users class="w-4 h-4" />
              </div>
              <span>Expert Consultants</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Scholarships</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Countries</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Students</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-right">
      <div class="login-content">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Sign in to access your admin dashboard</p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- ✅ CORRECT: uses email field -->
          <div class="input-group">
            <div class="input-icon">
              <User class="icon" />
            </div>
            <input 
              v-model="loginForm.email" 
              type="email" 
              placeholder="Email"
              required
              class="input-field"
            >
          </div>

          <div class="input-group">
            <div class="input-icon">
              <Lock class="icon" />
            </div>
            <input 
              v-model="loginForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Password"
              required
              class="input-field"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="password-toggle"
            >
              <Eye v-if="showPassword" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>

          <div v-if="loginError" class="error-message">
            <AlertCircle class="w-4 h-4" />
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            :disabled="isLoggingIn"
            class="login-btn"
          >
            <span v-if="!isLoggingIn">Sign In</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>Secure Admin Access</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { User, Lock, Eye, EyeOff, AlertCircle, Trophy, Globe, Users, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const isLoggingIn = ref(false)
const loginError = ref('')
const showPassword = ref(false)

// ✅ CORRECT: uses 'email', not 'username'
const loginForm = ref({ email: '', password: '' })

const API_URL = 'https://newbackend-u9k9.vercel.app/api'

const handleLogin = async () => {
  loginError.value = ''
  isLoggingIn.value = true
  
  try {
    // ✅ CORRECT: sends 'email' and 'password'
    const response = await axios.post(`${API_URL}/admin/login`, {
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    
    if (response.data.success) {
      const token = response.data.token
      localStorage.setItem('adminToken', token)
      router.push('/dashboard')
    } else {
      loginError.value = response.data.message || 'Invalid credentials'
    }
  } catch (error) { 
    loginError.value = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
/* ==== ALL YOUR EXISTING STYLES GO HERE (keep the same) ==== */
/* I'm keeping them minimal for brevity; you can paste your full styles */
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
/* ... include all your styles from the previous version ... */
/* For completeness, use the styles you already have – they are perfect */
</style><template>
  <div class="login-container">
    <!-- Left Side - Branding/Content -->
    <div class="login-left">
      <div class="left-content">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>

        <!-- Back to Website Button -->
        <router-link to="/" class="back-button">
          <ArrowLeft class="w-4 h-4" />
          Back to Website
        </router-link>

        <div class="brand-content">
          <!-- Logo -->
          <div class="logo-wrapper">
            <img 
              src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
              alt="GoAbroad Admissions Logo" 
              class="logo"
            >
          </div>
          <h2 class="brand-title">
            GoAbroad <span class="highlight">Admissions</span>
          </h2>
          
          <p class="brand-description">
            Empowering students to achieve their dreams of studying abroad through expert guidance and comprehensive support.
          </p>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon purple">
                <Trophy class="w-4 h-4" />
              </div>
              <span>Scholarship Guidance</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon yellow">
                <Globe class="w-4 h-4" />
              </div>
              <span>Worldwide Universities</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon purple">
                <Users class="w-4 h-4" />
              </div>
              <span>Expert Consultants</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Scholarships</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Countries</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Students</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-right">
      <div class="login-content">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Sign in to access your admin dashboard</p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- ✅ CORRECT: uses email field -->
          <div class="input-group">
            <div class="input-icon">
              <User class="icon" />
            </div>
            <input 
              v-model="loginForm.email" 
              type="email" 
              placeholder="Email"
              required
              class="input-field"
            >
          </div>

          <div class="input-group">
            <div class="input-icon">
              <Lock class="icon" />
            </div>
            <input 
              v-model="loginForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Password"
              required
              class="input-field"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="password-toggle"
            >
              <Eye v-if="showPassword" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>

          <div v-if="loginError" class="error-message">
            <AlertCircle class="w-4 h-4" />
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            :disabled="isLoggingIn"
            class="login-btn"
          >
            <span v-if="!isLoggingIn">Sign In</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>Secure Admin Access</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { User, Lock, Eye, EyeOff, AlertCircle, Trophy, Globe, Users, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const isLoggingIn = ref(false)
const loginError = ref('')
const showPassword = ref(false)

// ✅ CORRECT: uses 'email', not 'username'
const loginForm = ref({ email: '', password: '' })

const API_URL = 'https://newbackend-u9k9.vercel.app/api'

const handleLogin = async () => {
  loginError.value = ''
  isLoggingIn.value = true
  
  try {
    // ✅ CORRECT: sends 'email' and 'password'
    const response = await axios.post(`${API_URL}/admin/login`, {
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    
    if (response.data.success) {
      const token = response.data.token
      localStorage.setItem('adminToken', token)
      router.push('/dashboard')
    } else {
      loginError.value = response.data.message || 'Invalid credentials'
    }
  } catch (error) { 
    loginError.value = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
/* ==== ALL YOUR EXISTING STYLES GO HERE (keep the same) ==== */
/* I'm keeping them minimal for brevity; you can paste your full styles */
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
/* ... include all your styles from the previous version ... */
/* For completeness, use the styles you already have – they are perfect */
</style><template>
  <div class="login-container">
    <!-- Left Side - Branding/Content -->
    <div class="login-left">
      <div class="left-content">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>

        <!-- Back to Website Button -->
        <router-link to="/" class="back-button">
          <ArrowLeft class="w-4 h-4" />
          Back to Website
        </router-link>

        <div class="brand-content">
          <!-- Logo -->
          <div class="logo-wrapper">
            <img 
              src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
              alt="GoAbroad Admissions Logo" 
              class="logo"
            >
          </div>
          <h2 class="brand-title">
            GoAbroad <span class="highlight">Admissions</span>
          </h2>
          
          <p class="brand-description">
            Empowering students to achieve their dreams of studying abroad through expert guidance and comprehensive support.
          </p>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon purple">
                <Trophy class="w-4 h-4" />
              </div>
              <span>Scholarship Guidance</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon yellow">
                <Globe class="w-4 h-4" />
              </div>
              <span>Worldwide Universities</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon purple">
                <Users class="w-4 h-4" />
              </div>
              <span>Expert Consultants</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Scholarships</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Countries</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">00+</span>
            <span class="stat-label">Students</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-right">
      <div class="login-content">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Sign in to access your admin dashboard</p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- ✅ CORRECT: uses email field -->
          <div class="input-group">
            <div class="input-icon">
              <User class="icon" />
            </div>
            <input 
              v-model="loginForm.email" 
              type="email" 
              placeholder="Email"
              required
              class="input-field"
            >
          </div>

          <div class="input-group">
            <div class="input-icon">
              <Lock class="icon" />
            </div>
            <input 
              v-model="loginForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Password"
              required
              class="input-field"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="password-toggle"
            >
              <Eye v-if="showPassword" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>

          <div v-if="loginError" class="error-message">
            <AlertCircle class="w-4 h-4" />
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            :disabled="isLoggingIn"
            class="login-btn"
          >
            <span v-if="!isLoggingIn">Sign In</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>

        <div class="login-footer">
          <p>Secure Admin Access</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { User, Lock, Eye, EyeOff, AlertCircle, Trophy, Globe, Users, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const isLoggingIn = ref(false)
const loginError = ref('')
const showPassword = ref(false)

// ✅ CORRECT: uses 'email', not 'username'
const loginForm = ref({ email: '', password: '' })

const API_URL = 'https://newbackend-u9k9.vercel.app/api'

const handleLogin = async () => {
  loginError.value = ''
  isLoggingIn.value = true
  
  try {
    // ✅ CORRECT: sends 'email' and 'password'
    const response = await axios.post(`${API_URL}/admin/login`, {
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    
    if (response.data.success) {
      const token = response.data.token
      localStorage.setItem('adminToken', token)
      router.push('/dashboard')
    } else {
      loginError.value = response.data.message || 'Invalid credentials'
    }
  } catch (error) { 
    loginError.value = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
/* ==== ALL YOUR EXISTING STYLES GO HERE (keep the same) ==== */
/* I'm keeping them minimal for brevity; you can paste your full styles */
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
/* ... include all your styles from the previous version ... */
/* For completeness, use the styles you already have – they are perfect */
</style>