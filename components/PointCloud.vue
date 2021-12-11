<!-- Please remove this file from your project -->
<template>
  <client-only>
    <ThreejsComponent />
  </client-only>
</template>
<script>
export default {
  components: {
    ThreejsComponent: process.browser ? () => import('~/components/Three.vue') : null
  }
}
</script>
