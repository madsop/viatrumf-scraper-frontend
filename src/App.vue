<template>
  <div id="app">
    <Nettbutikker />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Nettbutikker from '@/components/Nettbutikker.vue'
import moment from 'moment'

Vue.filter('formatTime', (timestamp: string) => {
  if (!timestamp) return
  return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, hh.mm')
})
Vue.filter('removeUnderscore', (value: string) => {
  if (!value) return
  return value.replace(/_/g, ' ')
})
Vue.filter('capitalizeFirst', (value: string) => {
  if (!value) return
  return value.charAt(0).toUpperCase() + value.slice(1)
})

@Component({
  components: {
    Nettbutikker
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
