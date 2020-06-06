<template>
  <div>
    <div v-if="loaded">
      <a :href="'https://viatrumf.no' + innslag[0].href" target="_blank"><h1>{{ namn | removeUnderscore }}</h1></a>
      <hr />
      <LineChart :labels="labels" :data="datapunkter" />
    </div>
    <select id="datapunkter" v-if="loaded" :key="innslag">
      <option v-for="enkeltinnslag in reversedInnslag" :key="enkeltinnslag.timestamp" v-bind:value="enkeltinnslag">
        {{ formatTime(enkeltinnslag.timestamp) }}: {{ enkeltinnslag.verdi }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import LineChart from '@/components/NettbutikkChart.vue'
import INettbutikkInnslag from '@/model/INettbutikkInnslag'
import moment from 'moment'
import 'moment/locale/nn'

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

  get loaded(): boolean {
    return this.innslag.length > 0;
  }

  get labels(): string[] {
    const labels: string[] = []

    this.innslag.forEach((enkeltInnslag: INettbutikkInnslag) => {
      labels.push(this.formatTimeForGraph(enkeltInnslag.timestamp))
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

  get reversedInnslag(): INettbutikkInnslag[] {
  return this.innslag.map((item,idx) => this.innslag[this.innslag.length-1-idx])
  }

  formatTime(timestamp: string): string {
    if (!timestamp) return ''
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, HH.mm')
  }

  formatTimeForGraph(timestamp: string): string {
    if (!timestamp) return ''
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM')

  }

}
</script>

<style scoped>
td {
  width: 200px;
  padding: 0;
  margin: 0.1em 1em;
}

select#datapunkter {
  margin-top: 2em;
}

a {
  color: #385898;
}

</style>
