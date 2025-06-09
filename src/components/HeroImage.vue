<template>
  <div class="hero-image-container" :class="{ 'has-overlay': showOverlay }">
    <img
      :src="src"
      :alt="alt"
      :class="['hero-image', objectFit]"
      @load="handleImageLoad"
      @error="handleImageError"
    />
    <div 
      v-if="showOverlay" 
      class="hero-overlay"
      :style="{ backgroundColor: overlayColor, opacity: overlayOpacity }"
    ></div>
    <div v-if="$slots.default" class="hero-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Hero image'
  },
  objectFit: {
    type: String,
    default: 'cover',
    validator: (value) => ['cover', 'contain', 'fill', 'scale-down', 'none'].includes(value)
  },
  showOverlay: {
    type: Boolean,
    default: false
  },
  overlayColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.4)'
  },
  overlayOpacity: {
    type: Number,
    default: 0.4,
    validator: (value) => value >= 0 && value <= 1
  },
  height: {
    type: String,
    default: '588px'
  },
  borderRadius: {
    type: String,
    default: '7px'
  }
})

const emit = defineEmits(['load', 'error'])

const isLoaded = ref(false)
const hasError = ref(false)

const handleImageLoad = (event) => {
  isLoaded.value = true
  hasError.value = false
  emit('load', event)
}

const handleImageError = (event) => {
  hasError.value = true
  isLoaded.value = false
  emit('error', event)
}
</script>

<style scoped>
.hero-image-container {
  position: relative;
  width: 100%;
  border-radius: v-bind(borderRadius);
  overflow: hidden;
  min-height: v-bind(height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-position: center;
  transition: transform 0.3s ease;
}

.hero-image.cover {
  object-fit: cover;
}

.hero-image.contain {
  object-fit: contain;
}

.hero-image.fill {
  object-fit: fill;
}

.hero-image.scale-down {
  object-fit: scale-down;
}

.hero-image.none {
  object-fit: none;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.hero-image-container:hover .hero-image {
  transform: scale(1.05);
}

.hero-image-container:hover .hero-overlay {
  opacity: 0.6;
}

/* Loading and error states */
.hero-image-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1;
}

.hero-image-container:has(.hero-image[src]) .hero-image-container::before {
  display: none;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 768px) {
  .hero-image-container {
    min-height: 300px;
  }
  
  .hero-image-container:hover .hero-image {
    transform: none;
  }
}
</style> 