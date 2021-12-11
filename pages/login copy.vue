<template>
  <v-container class="d-flex align-center">
    <v-card
      class="mx-auto "
      max-width="344"
      title
    >
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>and start adding data</v-card-subtitle>
      <!-- <div class="title">
        <h1>Login</h1>
      </div> -->
      <v-card-text>
        <form @submit.prevent="discordLogin">
          <v-btn
            type="submit"
            color="blue-grey"
            class="ma-2 white--text"
          >
            Discord
            <v-icon
              right
              dark
            >
              mdi-discord
            </v-icon>
          </v-btn>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
        >
          Y?
        </v-btn>
        <v-btn
          text
          color="warning"
          to="/"
        >
          close
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
        >
          <v-card-text class="pb-11">
            <p>
              We cant detect game by the data you send. You will be asked to set your game
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn
              text
              color="teal accent-4"
              @click="reveal = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    reveal: false
  }),
  mounted () {
    // TODO: Send this to backend
    // console.log(this.$auth)
    // if (this.$route.query.code) {
    //   this.$router.push('/')
    //   this.$auth.$storage.setUniversal('dc', this.$route.query.code)
    //   this.$auth.$storage.setUniversal('ds', this.$route.query.state)
    // }
  },
  methods: {
    async discordLogin () {
      try {
        const response = await this.$auth.loginWith('discord')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.title
    position: absolute
    margin-top: -48px
    *
        float: left
    h1
        font-size: 1.5em
    img
        margin-top:0em
.v-card--reveal
  bottom: 0
  opacity: 1 !important
  position: absolute
  width: 100%

.container
    position: absolute
    top: -48px
    left: 0
    width: 100%
    height: 100vh
    background: #393939de
    z-index: 99
</style>
