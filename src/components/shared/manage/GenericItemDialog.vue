<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle
          class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          {{ isEditing ? `Edit ${config.entitySingle}` : `Create New ${config.entitySingle}` }}
        </DialogTitle>
        <DialogDescription>
          {{
            isEditing
              ? `Update ${config.entitySingle.toLowerCase()} information and settings.`
              : `Add a new ${config.entitySingle.toLowerCase()} to the system.`
          }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2">
          <div v-for="(column, index) in formColumns" :key="index" class="space-y-4">
            <div v-for="field in column" :key="field.key" class="space-y-2">
              <Label :for="field.key" class="text-sm font-medium">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
              </Label>
              <div v-if="field.type === 'text' || field.type === 'email'" class="relative">
                <component
                  :is="field.icon"
                  class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  :id="field.key"
                  v-model="localFormData[field.key]"
                  :type="field.type"
                  :placeholder="field.placeholder"
                  class="pl-10"
                  :required="field.required"
                />
              </div>
              <div v-else-if="field.type === 'password'" class="relative">
                <component
                  :is="field.icon"
                  class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  :id="field.key"
                  v-model="localFormData[field.key]"
                  type="password"
                  :placeholder="field.placeholder"
                  class="pl-10"
                  :required="field.required && !isEditing"
                />
              </div>
              <Select
                v-else-if="field.type === 'select'"
                v-model="localFormData[field.key]"
                :required="field.required"
              >
                <SelectTrigger>
                  <SelectValue :placeholder="field.placeholder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div v-else-if="field.type === 'textarea'" class="relative">
                <component
                  :is="field.icon"
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Textarea
                  :id="field.key"
                  v-model="localFormData[field.key]"
                  :placeholder="field.placeholder"
                  class="pl-10 min-h-[80px] resize-none"
                  :required="field.required"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" @click="$emit('close')"> Cancel </Button>
          <Button type="submit" :class="buttonGradient">
            <Save class="mr-2 h-4 w-4" />
            {{ isEditing ? `Update ${config.entitySingle}` : `Create ${config.entitySingle}` }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ManagementConfig } from '@/constant/managementConfig.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Save } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  isEditing: boolean
  config: ManagementConfig
  formData: Record<string, any>
  buttonGradient: string
}>()

const emit = defineEmits<{
  close: []
  submit: [data: Record<string, any>]
}>()

const localFormData = ref<Record<string, any>>({})

watch(
  () => props.formData,
  (newVal) => {
    const freshData = { ...newVal }

    if (props.isEditing) {
      props.config.formFields.forEach((field) => {
        const key = field.key
        if (field.type === 'select' && freshData[key] !== null && freshData[key] !== undefined) {
          freshData[key] = String(freshData[key])
        }
      })
    }

    localFormData.value = freshData
  },
  { deep: true, immediate: true },
)

const formColumns = computed(() => {
  const fields = props.config.formFields.filter(
    (field) => !props.isEditing || field.showOnEdit !== false,
  )
  const mid = Math.ceil(fields.length / 2)
  return [fields.slice(0, mid), fields.slice(mid)]
})

const handleSubmit = () => {
  emit('submit', localFormData.value)
}
</script>
