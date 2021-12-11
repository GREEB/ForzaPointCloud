<template>
  <v-footer
    app
  >
    <v-spacer />

    <a href="">Github</a>
    <v-spacer />
    <span> {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    gg: null,
    active: false
  }),
  computed: {
    pointCounts () {
      return this.$store.state.points.count
    }
  },
  watch: {
    pointCounts (count) {
      this.gg = count
      // Our fancy notification (2).
      // console.log(`We have ${count} fruits now, yay!`)
    }
  }

}
</script>
