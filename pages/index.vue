<template>
  <div class="ThreeContainer">
    <PointCloud />
  </div>
</template>
<script>
export default {
  auth: false,
  mounted () {
    console.log(this.$auth.loggedIn)
  }
}
</script>
