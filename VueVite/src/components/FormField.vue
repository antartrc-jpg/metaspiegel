<template>
  <div class="form-field">
    <label :for="fieldId" class="field-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    
    <input
      v-if="type === 'text' || type === 'email' || type === 'number'"
      :id="fieldId"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="field-input"
    />
    
    <select
      v-else-if="type === 'select'"
      :id="fieldId"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :disabled="disabled"
      class="field-select"
    >
      <option value="">Please select...</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <textarea
      v-else-if="type === 'textarea'"
      :id="fieldId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows || 3"
      class="field-textarea"
    ></textarea>
    
    <div v-else-if="type === 'checkbox'" class="checkbox-group">
      <div
        v-for="option in options"
        :key="option.value"
        class="checkbox-item"
      >
        <input
          :id="`${fieldId}_${option.value}`"
          type="checkbox"
          :value="option.value"
          :checked="Array.isArray(modelValue) ? modelValue.includes(option.value) : false"
          @change="handleCheckboxChange($event, option.value)"
          :disabled="disabled"
          class="field-checkbox"
        />
        <label :for="`${fieldId}_${option.value}`" class="checkbox-label">
          {{ option.label }}
        </label>
      </div>
    </div>
    
    <div v-if="helpText" class="field-help">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  },
  helpText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const fieldId = computed(() => {
  return `field_${Math.random().toString(36).substr(2, 9)}`
})

function handleCheckboxChange(event, value) {
  let currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  
  if (event.target.checked) {
    if (!currentValue.includes(value)) {
      currentValue.push(value)
    }
  } else {
    currentValue = currentValue.filter(v => v !== value)
  }
  
  emit('update:modelValue', currentValue)
}
</script>
