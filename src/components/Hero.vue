<template>
  <div class="hero-container">
    <div class="hero-content">
      <HeroImage
        src="https://cdn.builder.io/api/v1/image/assets/9f776758dbb64bf5937363c1aa26f49c/f5f486a35a80c0e8aea6037c50a5571ee46cf816?placeholderIfAbsent=true"
        alt="Josh Accessories Hero Background"
        :show-overlay="true"
        overlay-color="rgba(0, 0, 0, 0.3)"
        :overlay-opacity="0.3"
        height="588px"
        border-radius="7px"
        @load="handleImageLoad"
        @error="handleImageError"
      >
        <div class="hero-text-container">
          <div class="hero-title">JOSH ACCESSORIES</div>
          <WelcomeButton 
            text="Welcome to Our Store" 
            variant="primary"
            @click="handleWelcomeClick"
            class="hero-welcome-button"
          />
        </div>
      </HeroImage>
    </div>
  </div>
</template>

<script setup>
import WelcomeButton from './WelcomeButton.vue'
import HeroImage from './HeroImage.vue'

const handleWelcomeClick = () => {
  console.log('Welcome button clicked!')
  // Add your welcome button logic here
}

const handleImageLoad = () => {
  console.log('Hero image loaded successfully!')
}

const handleImageError = () => {
  console.error('Failed to load hero image')
}
</script>

<style scoped>
.hero-container {
  font-family:
    Poppins,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 600;
}

.hero-content {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 588px;
  width: 100%;
  padding: 237px 80px;
  align-items: end;
  justify-content: center;
}

.hero-text-container {
  position: relative;
  display: flex;
  margin-bottom: -46px;
  width: 573px;
  max-width: 100%;
  flex-direction: column;
  align-items: end;
  justify-content: start;
  z-index: 3;
}

.hero-title {
  color: #fff;
  font-size: 34px;
  letter-spacing: 7.14px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-welcome-button {
  margin-top: 20px;
  align-self: stretch;
}

@media (max-width: 991px) {
  .hero-content {
    max-width: 100%;
    padding: 100px 20px;
  }

  .hero-text-container {
    margin-bottom: 10px;
  }

  .hero-title {
    max-width: 100%;
    font-size: 28px;
  }
}
</style>
