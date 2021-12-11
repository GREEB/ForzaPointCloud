<template>
  <div class="text-center">
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="32"
      />
      <h4 class="pa-5">
        Loggin you in
      </h4>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: true
  })
}
</script>
