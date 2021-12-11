<template>
  <v-app-bar
    clipped-left
    fixed
    app
    dense
  >
    <img src="~static/logo.svg">
    <v-toolbar-title v-text="title" />
    <v-spacer />

    <v-chip
      id="pointsCount"
      outlined
      dark
      label
      small
      text-color="white"
    >
      <v-icon left>
        mdi-ray-vertex
      </v-icon>
      {{ gg }}
    </v-chip>
    <v-spacer />
    <div>
      <v-btn
        v-if="!$auth.loggedIn"
        type="submit"

        color="#5865F2"
        class="ma-2 white--text"
        @click="$auth.loginWith('discord')"
      >
        Login
        <v-icon
          right
          dark
        >
          mdi-discord
        </v-icon>
      </v-btn>
      <v-menu
        v-if="$auth.loggedIn"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template #activator="{ on }">
          <v-btn
            small
            icon
            v-on="on"
          >
            <!-- TODO: ADD color if no image or fix bg and image offset -->
            <v-avatar
              size="30"
            >
              <img
                :src="avatar"
                alt="John"
              >
              <!-- TODO: if user has no image create something with text -->
              <!-- <span class="white--text text-h5">dfgdg</span> -->
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ $auth.user.username }}</h3>
              <p class="text-caption mt-1">
                {{ $auth.user.discriminator }}
              </p>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
                @click="$auth.logout('discord')"
              >
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    title: 'PointCloud',
    gg: null,
    active: false
  }),
  computed: {
    pointCounts () {
      return this.$store.state.points.count
    },
    avatar () {
      return `https://cdn.discordapp.com/avatars/${this.$auth.user.id}/${this.$auth.user.avatar}.png`
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
