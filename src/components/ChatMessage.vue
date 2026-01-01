<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isOwn: {
    type: Boolean,
    default: false
  }
})

const formattedTime = computed(() => {
  if (!props.message.createdAt) return ''

  const date = props.message.createdAt.toDate
    ? props.message.createdAt.toDate()
    : new Date(props.message.createdAt)

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const avatarColor = computed(() => {
  // Generate consistent color based on username
  const colors = [
    'linear-gradient(135deg, #00fff7, #0099ff)',
    'linear-gradient(135deg, #ff0080, #ff6b35)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #39ff14, #00d4aa)'
  ]

  let hash = 0
  for (let i = 0; i < props.message.username.length; i++) {
    hash = props.message.username.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
})
</script>

<template>
  <div
    class="chat-message"
    :class="{ 'chat-message--own': isOwn }"
  >
    <div
      v-if="!isOwn"
      class="chat-message__avatar"
      :style="{ background: avatarColor }"
    >
      {{ message.username.charAt(0).toUpperCase() }}
    </div>

    <div class="chat-message__content">
      <div class="chat-message__header">
        <span class="chat-message__username">{{ message.username }}</span>
        <span class="chat-message__time">{{ formattedTime }}</span>
      </div>
      <div class="chat-message__bubble">
        <p class="chat-message__text">{{ message.text }}</p>
      </div>
    </div>

    <div
      v-if="isOwn"
      class="chat-message__avatar"
      :style="{ background: avatarColor }"
    >
      {{ message.username.charAt(0).toUpperCase() }}
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  gap: 0.75rem;
  animation: fadeInMessage 0.3s ease;
}

.chat-message--own {
  flex-direction: row-reverse;
}

.chat-message__avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  flex-shrink: 0;
}

.chat-message__content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.chat-message--own .chat-message__content {
  align-items: flex-end;
}

.chat-message__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  padding: 0 0.5rem;
}

.chat-message--own .chat-message__header {
  flex-direction: row-reverse;
}

.chat-message__username {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.chat-message__time {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  opacity: 0.6;
}

.chat-message__bubble {
  padding: 0.75rem 1rem;
  background: var(--void-lighter);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  border-top-left-radius: 4px;
}

.chat-message--own .chat-message__bubble {
  background: linear-gradient(135deg, rgba(0, 255, 247, 0.15), rgba(139, 92, 246, 0.15));
  border-color: rgba(0, 255, 247, 0.3);
  border-radius: 16px;
  border-top-right-radius: 4px;
}

.chat-message__text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-primary);
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
}

@keyframes fadeInMessage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .chat-message__content {
    max-width: 85%;
  }

  .chat-message__avatar {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
}
</style>
