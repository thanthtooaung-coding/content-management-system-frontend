<template>
  <div class="not-found-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>

    <!-- Main Content -->
    <div class="content-container">
      <div class="error-code">
        <div class="digit">4</div>
        <div class="digit-center">
          <div class="portal-container">
            <div class="portal"></div>
            <div class="portal-ring"></div>
          </div>
        </div>
        <div class="digit">4</div>
      </div>

      <h1 class="title">Page Not Found</h1>
      <p class="description">
        The page you're looking for has been moved, deleted, or possibly never existed.
      </p>

      <div class="actions">
        <button @click="goBack" class="btn btn-secondary">
          <ArrowLeft class="icon" />
          Go Back
        </button>
        <button @click="goHome" class="btn btn-primary">
          <Home class="icon" />
          Dashboard
        </button>
      </div>

      <!-- Suggested Links -->
      <div class="suggested-links">
        <h3>You might be looking for:</h3>
        <div class="links-grid">
          <router-link to="/admin/dashboard" class="link-card">
            <LayoutDashboard class="link-icon" />
            <span>Dashboard</span>
          </router-link>
          <router-link to="/admin/manage/admins" class="link-card">
            <UserCog class="link-icon" />
            <span>Admin Management</span>
          </router-link>
          <router-link to="/admin/manage/customers" class="link-card">
            <Users class="link-icon" />
            <span>Customers</span>
          </router-link>
          <router-link to="/admin/settings" class="link-card">
            <Settings class="link-icon" />
            <span>Settings</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Home, LayoutDashboard, UserCog, Users, Settings } from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/admin/dashboard')
}

onMounted(() => {
  // Animate particles
  const particles = document.querySelectorAll('.particle')
  particles.forEach((particle) => {
    const el = particle as HTMLElement
    const delay = Math.random() * 2
    const duration = 3 + Math.random() * 6

    el.style.setProperty('--delay', `${delay}s`)
    el.style.setProperty('--duration', `${duration}s`)
    el.style.setProperty('--x-end', `${-50 + Math.random() * 100}%`)
    el.style.setProperty('--y-end', `${-50 + Math.random() * 100}%`)
    el.style.setProperty('--rotation', `${Math.random() * 360}deg`)
    el.style.setProperty('--size', `${5 + Math.random() * 15}px`)
  })

  // Animate portal
  const portalAnimation = () => {
    const portal = document.querySelector('.portal') as HTMLElement
    if (portal) {
      portal.style.transform = `scale(${0.8 + Math.random() * 0.4})`
      setTimeout(portalAnimation, 1000 + Math.random() * 1000)
    }
  }

  portalAnimation()
})
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #0f0f17;
  color: #fff;
  padding: 2rem;
}

.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(135deg, rgba(128, 90, 213, 0.8), rgba(49, 46, 129, 0.3));
  border-radius: 50%;
  top: 50%;
  left: 50%;
  opacity: 0;
  animation: float var(--duration) ease-in-out var(--delay) infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translate(var(--x-end), var(--y-end)) rotate(var(--rotation));
    opacity: 0;
  }
}

.content-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.digit {
  font-size: 10rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #c084fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

.digit-center {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portal-container {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portal {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #c084fc 0%, #6366f1 50%, transparent 70%);
  border-radius: 50%;
  box-shadow: 0 0 30px #c084fc;
  transition: transform 1s ease-in-out;
}

.portal-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid rgba(195, 132, 252, 0.5);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #c084fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.description {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #c084fc, #6366f1);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.icon {
  width: 18px;
  height: 18px;
}

.suggested-links {
  margin-top: 2rem;
  width: 100%;
}

.suggested-links h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #94a3b8;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.link-icon {
  width: 20px;
  height: 20px;
  color: #c084fc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .digit {
    font-size: 6rem;
  }

  .digit-center {
    width: 80px;
    height: 80px;
  }

  .portal-container {
    width: 70px;
    height: 70px;
  }

  .portal {
    width: 50px;
    height: 50px;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
