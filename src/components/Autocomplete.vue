<template>
    <v-autocomplete
      v-bind="$props"
      prepend-inner-icon="mdi-magnify"
      :label="label"
    />
</template>

<script>
// Extended v-autcomplete which allows for infinite scrolling
import { VAutocomplete } from 'vuetify/lib'

export default {
  name: 'Autocomplete',
  extends: VAutocomplete,
  props: {
    appendIcon: { type: String, required: false, default: '' },
    hideDetails: { type: Boolean, required: false, default: true },
    label: { type: String, required: false, default: 'Search' }
  }
}
</script>
