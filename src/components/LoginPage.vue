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

        <div class="brand-content">
          <div class="logo-wrapper">
            <img
              src=""
              alt=""
              class="logo"
            />
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

        <!-- Back to Website Button — now at the bottom -->
        <div class="back-button-wrap">
          <router-link to="/" class="back-button">
            <ArrowLeft class="w-4 h-4" />
            Back to Website
          </router-link>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-right">
      <div class="login-content">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Sign in to access your admin dashboard</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <div class="input-icon">
              <User class="icon" />
            </div>
            <input
              v-model="loginForm.email"
              type="email"
              placeholder="Email"
              required
              autocomplete="username"
              class="input-field"
            />
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
              autocomplete="current-password"
              class="input-field"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
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
import { useRouter } from 'vue-router'
import {
  User, Lock, Eye, EyeOff, AlertCircle,
  Trophy, Globe, Users, ArrowLeft
} from 'lucide-vue-next'
import { readDatabase } from '../lib/jsonbin'

const router = useRouter()

const TOKEN_KEY = 'adminToken'
const AUTH_KEY  = 'adminAuth'

const isLoggingIn = ref(false)
const loginError  = ref('')
const showPassword = ref(false)

const loginForm = ref({ email: '', password: '' })

/* ----------------------- Helpers ----------------------- */
function generateToken() {
  return (
    'tok_' +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2)
  )
}

async function fetchAdmins() {
  const database = await readDatabase()
  if (database.admins.length > 0) return database.admins

  const email = import.meta.env.VITE_ADMIN_EMAIL || 'goabroad@gmail.com'
  const password = import.meta.env.VITE_ADMIN_PASSWORD || 'go!!!abroadadmissions'
  return [{ email, password, name: 'Admin' }]
}

/* ----------------------- Login ----------------------- */
const handleLogin = async () => {
  loginError.value = ''
  isLoggingIn.value = true

  try {
    const admins = await fetchAdmins()

    const email = loginForm.value.email.trim().toLowerCase()
    const password = loginForm.value.password

    const match = admins.find(
      (a) =>
        String(a.email || '').trim().toLowerCase() === email &&
        String(a.password || '') === password
    )

    if (!match) {
      loginError.value = 'Invalid email or password'
      return
    }

    const token = generateToken()
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        email: match.email,
        name: match.name || 'Admin',
        token,
        loginAt: Date.now()
      })
    )

    router.push('/dashboard')
  } catch (error) {
    console.error('[Login]', error)
    loginError.value =
      error.message?.includes('configured')
        ? error.message
        : 'Login failed. Please check your connection and try again.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
/* ==== LOGIN CONTAINER ==== */
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
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ==== LEFT SIDE ==== */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1b0733 0%, #2d0a4e 40%, #4c1d95 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.left-content {
  position: relative;
  z-index: 2;
  padding: 3rem 2.5rem;
  max-width: 520px;
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: #fff;
}

.shape-1 { width: 300px; height: 300px; top: -80px; right: -80px; animation: float 12s ease-in-out infinite; }
.shape-2 { width: 200px; height: 200px; bottom: -60px; left: -60px; animation: float 15s ease-in-out infinite reverse; }
.shape-3 { width: 120px; height: 120px; top: 40%; left: 10%; animation: float 10s ease-in-out infinite 2s; }
.shape-4 { width: 80px; height: 80px; bottom: 20%; right: 15%; animation: float 8s ease-in-out infinite 1s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-30px) rotate(10deg); }
}

.brand-content { text-align: left; margin-bottom: 2.5rem; }

.logo-wrapper {
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.logo {
  width: 100px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.brand-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.8s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.highlight { color: #facc15; position: relative; }

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #facc15, #f59e0b);
  border-radius: 2px;
  opacity: 0.5;
}

.brand-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  margin: 0 0 2rem;
  max-width: 400px;
  animation: fadeInUp 0.8s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  animation: fadeInUp 0.8s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.3s ease;
}

.feature-item:hover { transform: translateX(5px); }

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.feature-item:hover .feature-icon { transform: scale(1.1) rotate(-5deg); }

.feature-icon.purple { background: rgba(168, 85, 247, 0.25); color: #d8b4fe; }
.feature-icon.yellow { background: rgba(250, 204, 21, 0.2); color: #fde047; }

.stats {
  display: flex;
  gap: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.8s 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.stat-item { display: flex; flex-direction: column; gap: 0.25rem; }

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #facc15;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

/* ==== BACK TO WEBSITE (bottom) ==== */
.back-button-wrap {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.8s 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.55rem 1.1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.back-button:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateX(-3px);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(25px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ==== RIGHT SIDE ==== */
.login-right {
  flex: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
}

.login-content {
  width: 100%;
  max-width: 400px;
  animation: fadeInRight 0.8s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

.title {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 2rem;
}

.login-form { display: flex; flex-direction: column; gap: 1.25rem; }

.input-group { position: relative; display: flex; align-items: center; }

.input-icon {
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  pointer-events: none;
  transition: color 0.3s ease;
  z-index: 1;
}

.input-icon .icon { width: 18px; height: 18px; }

.input-field {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1f2937;
  background: #f9fafb;
  outline: none;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.input-field::placeholder { color: #9ca3af; }

.input-field:focus {
  border-color: #7c3aed;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
}

.input-group:focus-within .input-icon { color: #7c3aed; }

.password-toggle {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.08);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 500;
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}

.login-btn {
  position: relative;
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
}

.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 50%, #4c1d95 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45);
}

.login-btn:hover:not(:disabled)::before { opacity: 1; }

.login-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
}

.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.login-btn span { position: relative; z-index: 1; }

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
  text-align: center;
}

.login-footer p {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.login-footer p::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
}

/* ==== RESPONSIVE ==== */
@media (max-width: 900px) {
  .login-container { flex-direction: column; }

  .login-left { flex: 0 0 auto; padding: 2rem 1.5rem 2.5rem; }

  .left-content { padding: 1rem 0; max-width: 100%; }

  .brand-title { font-size: 1.6rem; }

  .brand-description { font-size: 0.9rem; }

  .stats { gap: 1.5rem; padding-top: 1.5rem; }

  .stat-number { font-size: 1.2rem; }

  .login-right {
    flex: 1;
    padding: 2rem 1.5rem 3rem;
    align-items: flex-start;
  }

  .back-button-wrap { margin-top: 1.5rem; padding-top: 1.5rem; }

  .logo { width: 75px; }
}

@media (max-width: 480px) {
  .login-left { padding: 1.5rem 1rem 2rem; }

  .brand-title { font-size: 1.35rem; }

  .features { gap: 0.6rem; }

  .feature-item { font-size: 0.82rem; }

  .feature-icon { width: 30px; height: 30px; border-radius: 8px; }

  .stats { gap: 1rem; }

  .stat-number { font-size: 1rem; }

  .stat-label { font-size: 0.65rem; }

  .login-right { padding: 1.5rem 1rem 2.5rem; }

  .title { font-size: 1.6rem; }

  .input-field {
    padding: 0.8rem 1rem 0.8rem 2.6rem;
    font-size: 0.9rem;
  }

  .back-button { font-size: 0.8rem; padding: 0.5rem 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .shape { animation: none !important; }
}
</style>