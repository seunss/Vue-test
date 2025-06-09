<template>
  <button 
    :class="['welcome-button', variant, { disabled: disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Welcome'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.welcome-button {
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 12px 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.welcome-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.welcome-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.welcome-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.welcome-button.disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Primary variant */
.welcome-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.welcome-button.primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

/* Secondary variant */
.welcome-button.secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-color: transparent;
}

.welcome-button.secondary:hover {
  background: linear-gradient(135deg, #ee82e9 0%, #f3455a 100%);
}

/* Outline variant */
.welcome-button.outline {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}

.welcome-button.outline:hover {
  background: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .welcome-button {
    font-size: 14px;
    padding: 10px 24px;
    letter-spacing: 1.5px;
  }
}
</style> 