<template>
  <form @submit.prevent="handleSubmit" class="space-y-10">
    <!-- Form Sections -->
    <div v-for="(section, sectionIndex) in formSections" :key="sectionIndex" class="space-y-6">
      <!-- Section Header -->
      <div v-if="section.title" class="relative">
        <div class="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 border border-primary/20">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <component :is="section.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-foreground flex items-center">
                {{ section.title }}
              </h3>
              <p v-if="section.description" class="text-sm text-muted-foreground mt-1 leading-relaxed">
                {{ section.description }}
              </p>
            </div>
            <div class="hidden sm:flex items-center space-x-1">
              <div class="h-2 w-2 bg-primary/40 rounded-full"></div>
              <div class="h-2 w-2 bg-primary/20 rounded-full"></div>
              <div class="h-2 w-2 bg-primary/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pl-4">
        <div
          v-for="field in section.fields"
          :key="field.key"
          :class="[
            'space-y-3',
            field.fullWidth ? 'md:col-span-2 lg:col-span-3' : '',
            field.halfWidth ? 'md:col-span-1' : ''
          ]"
        >
          <Label :for="field.key" class="text-sm font-medium text-foreground flex items-center space-x-2">
            <component :is="field.icon" class="h-4 w-4 text-muted-foreground" />
            <span>{{ field.label }}</span>
            <span v-if="field.required" class="text-destructive">*</span>
          </Label>

          <!-- Text/Email Input -->
          <div v-if="field.type === 'text' || field.type === 'email'" class="relative group">
            <Input
              :id="field.key"
              v-model="localFormData[field.key]"
              :type="field.type"
              :placeholder="field.placeholder"
              :required="field.required"
              class="h-12 bg-background border-input focus:border-primary focus:ring-primary/20 rounded-lg transition-all duration-200 group-hover:border-primary/50"
            />
          </div>

          <!-- Password Input -->
          <div v-else-if="field.type === 'password'" class="relative group">
            <Input
              :id="field.key"
              v-model="localFormData[field.key]"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="field.placeholder"
              :required="field.required && !isEditing"
              class="h-12 pr-12 bg-background border-input focus:border-primary focus:ring-primary/20 rounded-lg transition-all duration-200 group-hover:border-primary/50"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent"
            >
              <Eye v-if="!showPassword" class="h-4 w-4" />
              <EyeOff v-else class="h-4 w-4" />
            </button>
          </div>

          <!-- Select Input -->
          <Select
            v-else-if="field.type === 'select'"
            v-model="localFormData[field.key]"
            :required="field.required"
          >
            <SelectTrigger class="h-12 bg-background border-input focus:border-primary focus:ring-primary/20 rounded-lg">
              <SelectValue :placeholder="field.placeholder" />
            </SelectTrigger>
            <SelectContent class="bg-popover border-border">
              <SelectItem
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
                class="hover:bg-accent focus:bg-accent"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Textarea -->
          <div v-else-if="field.type === 'textarea'" class="relative group">
            <Textarea
              :id="field.key"
              v-model="localFormData[field.key]"
              :placeholder="field.placeholder"
              :required="field.required"
              class="min-h-[120px] bg-background border-input focus:border-primary focus:ring-primary/20 rounded-lg resize-none transition-all duration-200 group-hover:border-primary/50"
            />
          </div>

          <!-- Date Input -->
          <div v-else-if="field.type === 'date'" class="relative group">
            <Input
              :id="field.key"
              v-model="localFormData[field.key]"
              type="date"
              :required="field.required"
              class="h-12 bg-background border-input focus:border-primary focus:ring-primary/20 rounded-lg transition-all duration-200 group-hover:border-primary/50"
            />
          </div>

          <!-- Help Text -->
          <p v-if="field.helpText" class="text-xs text-muted-foreground leading-relaxed pl-6">
            {{ field.helpText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex items-center justify-between pt-8 border-t border-border">
      <Button
        type="button"
        variant="outline"
        @click="$router.back()"
        class="px-6 py-3 text-sm font-medium hover:bg-accent"
      >
        <X class="mr-2 h-4 w-4" />
        Cancel
      </Button>

      <div class="flex space-x-3">
        <Button
          v-if="isEditing"
          type="button"
          variant="outline"
          @click="resetForm"
          class="px-6 py-3 text-sm font-medium hover:bg-accent"
        >
          <RotateCcw class="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="px-8 py-3 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
        >
          <component :is="isSubmitting ? Loader2 : Save" :class="['mr-2 h-4 w-4', isSubmitting ? 'animate-spin' : '']" />
          {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Save, X, RotateCcw, Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  formData: Record<string, any>
  formSections: Array<{
    title?: string
    description?: string
    icon?: any
    fields: Array<{
      key: string
      label: string
      type: string
      icon: any
      placeholder?: string
      required?: boolean
      options?: Array<{ value: string; label: string }>
      fullWidth?: boolean
      halfWidth?: boolean
      helpText?: string
      showOnEdit?: boolean
    }>
  }>
  isEditing: boolean
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Record<string, any>]
}>()

const localFormData = ref<Record<string, any>>({})
const showPassword = ref(false)

watch(
  () => props.formData,
  (newVal) => {
    localFormData.value = { ...newVal }
  },
  { deep: true, immediate: true }
)

const resetForm = () => {
  localFormData.value = { ...props.formData }
}

const handleSubmit = () => {
  emit('submit', localFormData.value)
}
</script>
