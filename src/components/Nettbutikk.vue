<template>
  <div>
    <div v-if="loaded">
      <a :href="'https://trumfnetthandel.no' + innslag[0].href" target="_blank"><h1>{{ namn | removeUnderscore }}</h1></a>
      <hr />
      <LineChart :labels="labels" :data="datapunkter" :innslag="innslag" />
    </div>
    <select id="datapunkter" v-if="loaded" :key="innslag.namn+innslag.timestamp">
      <option v-for="enkeltinnslag in reversedInnslag" :key="enkeltinnslag.timestamp" v-bind:value="enkeltinnslag">
        {{ formatTime(enkeltinnslag.timestamp) }}: {{ enkeltinnslag.verdi }}
      </option>
    </select>
    <div v-if="utdatert()" id="utdatert">
      Obs: Siste innslag er ikkje frå i dag. Det kan tyde at nettbutikken ikkje lenger er på Viatrumf.
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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
    return Array(this.innslag.length).fill('')
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

  utdatert(): boolean {
    const sisteInnslag = this.innslag[this.innslag.length-1]
    if (sisteInnslag === undefined) {
      return false
    }
    const somDato = moment(sisteInnslag.timestamp, 'YYYYMMDDTHHmmssZ')
    return somDato.isBefore(moment().subtract(1, 'day').startOf('day'))  
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

#utdatert {
  margin-top: 1.5em;
  color: red;
}

</style>
