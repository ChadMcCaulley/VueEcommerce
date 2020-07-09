<template>
    <v-autocomplete
      :append-icon="appendIcon"
      :hide-details="hideDetails"
      :solo-inverted="soloInverted"
      :solo="solo"
      prepend-inner-icon="mdi-magnify"
      label="Search"
    />
</template>

<script>
import { VAutocomplete } from 'vuetify/lib'

export default {
  name: 'Autocomplete',
  extends: VAutocomplete,
  props: {
    appendIcon: { type: String, required: false, default: '' },
    hideDetails: { type: Boolean, required: false, default: true }
  }
}
</script>
