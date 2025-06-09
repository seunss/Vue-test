<template>
  <header class="header" :class="{ 'scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link to="/" class="logo-link" @click="closeMobileMenu">
          <img v-if="logo" :src="logo" :alt="brandName" class="logo-image" />
          <span v-else class="logo-text">{{ brandName }}</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li v-for="item in navigationItems" :key="item.name" class="nav-item">
            <router-link 
              :to="item.path" 
              class="nav-link"
              :class="{ 'active': isActiveRoute(item.path) }"
              @click="handleNavClick(item)"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Search -->
        <div v-if="showSearch" class="search-container" :class="{ 'active': isSearchOpen }">
          <button 
            class="search-toggle"
            @click="toggleSearch"
            :aria-label="isSearchOpen ? 'Close search' : 'Open search'"
          >
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <input 
            v-if="isSearchOpen"
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
            @keyup.enter="handleSearch"
            @blur="handleSearchBlur"
          />
        </div>

        <!-- Cart -->
        <button v-if="showCart" class="cart-button" @click="handleCartClick" :aria-label="`Cart with ${cartCount} items`">
          <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="isMobileMenuOpen" class="mobile-nav" aria-label="Mobile navigation">
      <ul class="mobile-nav-list">
        <li v-for="item in navigationItems" :key="item.name" class="mobile-nav-item">
          <router-link 
            :to="item.path" 
            class="mobile-nav-link"
            :class="{ 'active': isActiveRoute(item.path) }"
            @click="handleMobileNavClick(item)"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Props
const props = defineProps({
  brandName: {
    type: String,
    default: 'JOSH ACCESSORIES'
  },
  logo: {
    type: String,
    default: ''
  },
  navigationItems: {
    type: Array,
    default: () => [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ]
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showCart: {
    type: Boolean,
    default: true
  },
  cartCount: {
    type: Number,
    default: 0
  },
  sticky: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['search', 'cart-click', 'nav-click'])

// Router
const route = useRoute()
const router = useRouter()

// Reactive state
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

// Computed
const isActiveRoute = computed(() => (path) => {
  return route.path === path
})

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when mobile menu is open
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchOpen.value = false
  }, 200)
}

const handleCartClick = () => {
  emit('cart-click')
}

const handleNavClick = (item) => {
  emit('nav-click', item)
  closeMobileMenu()
}

const handleMobileNavClick = (item) => {
  emit('nav-click', item)
  closeMobileMenu()
}

// Lifecycle
onMounted(() => {
  if (props.sticky) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (props.sticky) {
    window.removeEventListener('scroll', handleScroll)
  }
  document.body.style.overflow = ''
})

// Watch for route changes to close mobile menu
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo Section */
.logo-section {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-text {
  font-family: Poppins, sans-serif;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 2px;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #667eea;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #667eea;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Search */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.search-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.search-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.search-input {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  min-width: 200px;
  font-size: 14px;
}

/* Cart */
.cart-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.cart-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.cart-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #f5576c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: #333;
  transition: all 0.3s ease;
}

.mobile-menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-item {
  margin-bottom: 16px;
}

.mobile-nav-link {
  display: block;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 18px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #667eea;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .desktop-nav {
    display: block;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .mobile-nav {
    display: none;
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .header-container {
    padding: 0 16px;
    height: 60px;
  }

  .logo-text {
    font-size: 16px;
  }

  .search-input {
    min-width: 150px;
    right: 35px;
  }
}
</style> 