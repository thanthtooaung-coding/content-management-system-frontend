<template>
  <div class="flex flex-col h-full">
    <!-- Header Section with Gradient Background -->
    <GenericManagementHeaderSection
      :config="props.config"
      :item-count="filteredItems.length"
      :header-gradient="headerGradient"
    />

    <!-- Action Bar -->
    <GenericManagementActionBar
      :config="props.config"
      v-model:search-query="searchQuery"
      v-model:filter-value="filterValue"
      v-model:view-mode="viewMode"
      @create-item="openCreateDialog"
      :button-gradient="buttonGradient"
    />

    <!-- Content Area - Full width and height -->
    <div class="flex-1 px-6 pb-6 min-h-0 w-full">
      <!-- Grid View -->
      <GenericItemGrid
        v-if="viewMode === 'grid'"
        :items="filteredItems"
        :config="props.config"
        @edit-item="editItem"
        @view-item="viewItem"
        @delete-item="deleteItem"
        @clear-filters="clearFilters"
        :search-query="searchQuery"
        :filter-value="filterValue"
      />
      <!-- List View -->
      <GenericItemList
        v-else-if="viewMode === 'list'"
        :items="filteredItems"
        :config="props.config"
        @edit-item="editItem"
        @view-item="viewItem"
        @delete-item="deleteItem"
        @clear-filters="clearFilters"
        :search-query="searchQuery"
        :filter-value="filterValue"
      />
      <!-- Table View -->
      <GenericItemTable
        v-else-if="viewMode === 'table'"
        :items="filteredItems"
        :config="props.config"
        @edit-item="editItem"
        @view-item="viewItem"
        @delete-item="deleteItem"
        @clear-filters="clearFilters"
        :search-query="searchQuery"
        :filter-value="filterValue"
      />
    </div>

    <!-- Create/Edit Dialog -->
    <GenericItemDialog
      :is-open="isDialogOpen"
      :is-editing="isEditing"
      :config="props.config"
      :form-data="formData"
      :button-gradient="buttonGradient"
      @close="closeDialog"
      @submit="submitForm"
    />

    <!-- View Details Dialog -->
    <GenericViewDetailsDialog
      :is-open="isViewDialogOpen"
      :item="selectedItem"
      :config="props.config"
      @close="isViewDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { ManagementConfig } from '@/constant/managementConfig.ts'
import GenericManagementHeaderSection from '@/components/shared/manage/GenericManagementHeaderSection.vue'
import GenericManagementActionBar from '@/components/shared/manage/GenericManagementActionBar.vue'
import GenericItemGrid from '@/components/shared/manage/GenericItemGrid.vue'
import GenericItemList from '@/components/shared/manage/GenericItemList.vue'
import GenericItemTable from '@/components/shared/manage/GenericItemTable.vue'
import GenericItemDialog from '@/components/shared/manage/GenericItemDialog.vue'
import GenericViewDetailsDialog from '@/components/shared/manage/GenericViewDetailsDialog.vue'

const props = defineProps<{
  config: ManagementConfig
  items: any[]
  onItemCreate?: (item: any) => void
  onItemUpdate?: (item: any) => void
  onItemDelete?: (item: any) => void
}>()

const emit = defineEmits<{
  'item-create': [item: any]
  'item-update': [item: any]
  'item-delete': [item: any]
}>()

const searchQuery = ref('')
const filterValue = ref<string | null>('all')
const viewMode = ref<'grid' | 'list' | 'table'>('list')
const isDialogOpen = ref(false)
const isViewDialogOpen = ref(false)
const isEditing = ref(false)
const selectedItem = ref<any>(null)

const formData = reactive<Record<string, any>>({})

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    const matchesFilter =
      filterValue.value === 'all' ||
      !!(props.config.filterField && item[props.config.filterField] == filterValue.value)

    if (!matchesFilter) {
      return false
    }

    const query = searchQuery.value.toLowerCase()
    if (!query) {
      return true
    }

    const nameKey = props.config.nameField
    const emailKey = props.config.emailField
    const usernameKey = props.config.usernameField

    return !!(
      (nameKey &&
        String(item[nameKey] || '')
          .toLowerCase()
          .includes(query)) ||
      (emailKey &&
        String(item[emailKey] || '')
          .toLowerCase()
          .includes(query)) ||
      (usernameKey &&
        String(item[usernameKey] || '')
          .toLowerCase()
          .includes(query))
    )
  })
})

const headerGradient = computed(
  () =>
    props.config.headerGradient || 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
)

const buttonGradient = computed(
  () =>
    props.config.buttonGradient ||
    'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
)

const getDisplayName = (item: any): string => {
  if (!item) return 'Unknown'

  const nameKey = props.config.nameField
  if (nameKey && item[nameKey]) {
    return item[nameKey]
  }

  const usernameKey = props.config.usernameField
  if (usernameKey && item[usernameKey]) {
    return item[usernameKey]
  }

  return 'Unknown'
}

const clearFilters = () => {
  searchQuery.value = ''
  filterValue.value = 'all'
}

const openCreateDialog = () => {
  isEditing.value = false
  resetForm()
  isDialogOpen.value = true
}

const editItem = (item: any) => {
  isEditing.value = true
  selectedItem.value = item

  props.config.formFields.forEach((field) => {
    formData[field.key] = item[field.key] || ''
  })

  isDialogOpen.value = true
}

const viewItem = (item: any) => {
  selectedItem.value = item
  isViewDialogOpen.value = true
}

const deleteItem = (item: any) => {
  const name = getDisplayName(item)
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    emit('item-delete', item)
  }
}

const closeDialog = () => {
  isDialogOpen.value = false
  resetForm()
}

const resetForm = () => {
  props.config.formFields.forEach((field) => {
    formData[field.key] = ''
  })
  selectedItem.value = null
}

const submitForm = (itemData: Record<string, any>) => {
  if (isEditing.value && selectedItem.value) {
    const updatedItem = {
      ...selectedItem.value,
      ...itemData,
      updated_at: new Date().toISOString(),
    }
    emit('item-update', updatedItem)
  } else {
    const newItem = {
      ...itemData,
      [props.config.idField]: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    emit('item-create', newItem)
  }

  closeDialog()
}

watch(
  () => props.config.formFields,
  (fields) => {
    fields.forEach((field) => {
      if (!(field.key in formData)) {
        formData[field.key] = ''
      }
    })
  },
  { immediate: true },
)
</script>
