<template>
  <div>
    <h1>{{ namn | removeUnderscore }}</h1>
    <div v-if="innslag.length > 0">
      <hr />
      <a :href="'https://viatrumf.no/' + innslag[0].href">Til Viatrumf-sida</a>
      <LineChart :labels="labels" :data="datapunkter" />
    </div>
    <table>
      <tr v-for="enkeltinnslag in innslag" :key="enkeltinnslag.timestamp">
        <td>{{ formatTime(enkeltinnslag.timestamp) }}</td>
        <td>
          <strong>{{ enkeltinnslag.verdi }}</strong>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import LineChart from '@/components/NettbutikkChart.vue'
import INettbutikkInnslag from '@/model/INettbutikkInnslag'
import moment from 'moment'

@Component({
  components: {
    LineChart
  }
})
export default class Nettbutikk extends Vue {
  @Prop() namn!: string
  @Prop() innslag!: INettbutikkInnslag[]

  private trim(input: string): string {
    return input
      .replace(/%/g, '')
      .replace(/kr/g, '')
      .replace(' ', '')
      .replace(',', '.')
  }

  get labels(): string[] {
    const labels: string[] = []

    this.innslag.forEach((enkeltInnslag: INettbutikkInnslag) => {
      labels.push(enkeltInnslag.timestamp)
    })
    return labels
  }

  get datapunkter(): string[] {
    const datapunkter: string[] = []

    this.innslag.forEach((enkeltInnslag: INettbutikkInnslag) => {
      datapunkter.push(this.trim(enkeltInnslag.verdi))
    })
    return datapunkter
  }

  formatTime(timestamp: string): string {
    if (!timestamp) return ''
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, hh.mm')
  }
}
</script>

<style scoped>
td {
  width: 200px;
  padding: 0.5em 1em;
}
</style>
