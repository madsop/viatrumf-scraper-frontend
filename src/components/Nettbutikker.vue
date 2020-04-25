-<template>
  <div>    
    <h1>Historikk for nettbutikkar på Viatrumf</h1>
    <p>
      Usikker på om Viatrumf-bonusen på nettbutikken du vil handle hos har gått
      opp, ned eller er uendra? Sjekk ved å velje butikken i nedtrekkslista.
    </p>
    <vue-loading v-if="loading" type="spin" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    <select v-model="selected" v-on:change="selectionChanged">
      <option value="" selected disabled>Velg nettbutikk</option>
      <option
        v-for="nettbutikk in nettbutikker"
        :key="nettbutikk.namn"
        v-bind:value="nettbutikk"
      >
        {{ nettbutikk | removeUnderscore }}
      </option>
    </select>
    <Nettbutikk :namn="selected" :innslag="selectedNettbutikk" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import Nettbutikk from '@/components/Nettbutikk.vue'
import { VueLoading } from 'vue-loading-template'

@Component({
  components: {
    Nettbutikk,
    VueLoading
  }
})
export default class Nettbutikker extends Vue {
  private baseurl = 'https://viatrumf-scraper-bff-xgjgr2ubbq-ew.a.run.app'
  private nettbutikker = []
  private selected = ''
  private selectedNettbutikk = []
  private loading = true

  selectionChanged(): void {
    axios
      .get(this.baseurl + '/nettbutikkar/' + this.selected)
      .then(response => (this.selectedNettbutikk = response.data))
  }

  sort(a: string, b: string): number {
    if (!a) return 1
    if (!b) return 1
    return a.toLowerCase().localeCompare(b.toLowerCase())
  }

  mounted() {
    axios
      .get(this.baseurl + '/nettbutikkar')
      .then(response => response.data.sort(this.sort))
      .then(data => {
        this.nettbutikker = data
        this.loading = false
      });
  }
}
</script>
