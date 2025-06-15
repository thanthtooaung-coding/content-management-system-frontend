<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="border-b border-border bg-card shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="router.back()"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              <ArrowLeft class="h-4 w-4 mr-2" />
              Back
            </button>
            <div class="h-6 w-px bg-border"></div>
            <div>
              <h1 class="text-xl font-semibold text-foreground">{{ title }}</h1>
              <p class="text-sm text-muted-foreground/80">{{ subtitle }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3"></div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-8 border-b border-border">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-white/10 rounded-lg border border-white/20">
              <component :is="icon" class="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">{{ formTitle }}</h2>
              <p class="text-base text-white/70 mt-1">{{ formDescription }}</p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, type LucideIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  title: string
  subtitle: string
  formTitle: string
  formDescription: string
  icon: LucideIcon
}>()
</script>
