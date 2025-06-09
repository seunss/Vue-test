<script setup>
import HeaderComposition from "./components/HeaderComposition.vue";
// import HeaderOptions from "./components/HeaderOptions.vue"; // Alternative Options API version

const handleSearch = (query) => {
  console.log('Search query:', query);
  // Implement search functionality
};

const handleCartClick = () => {
  console.log('Cart clicked');
  // Implement cart functionality
};

const handleNavClick = (item) => {
  console.log('Navigation clicked:', item);
  // Implement navigation functionality
};
</script>

<template>
  <div id="app">
    <!-- Using Composition API Header -->
    <HeaderComposition 
      :cart-count="3"
      @search="handleSearch"
      @cart-click="handleCartClick"
      @nav-click="handleNavClick"
    />
    
    <!-- Uncomment to use Options API Header instead -->
    <!-- <HeaderOptions 
      :cart-count="3"
      @search="handleSearch"
      @cart-click="handleCartClick"
      @nav-click="handleNavClick"
    /> -->
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}

.main-content {
  padding-top: 70px; /* Account for fixed header height */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
}

@media (max-width: 767px) {
  .main-content {
    padding-top: 60px; /* Account for smaller mobile header */
    min-height: calc(100vh - 60px);
  }
}
</style>
