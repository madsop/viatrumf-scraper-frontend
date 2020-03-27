<template>
    <div>
        {{ namn }}
        <table>
        <div v-for="enkeltinnslag in innslag" :key="enkeltinnslag.timestamp">
                <tr>
                    <td>{{ enkeltinnslag.timestamp | formatTime }}:</td>
                    <td><strong>{{enkeltinnslag.verdi }}</strong></td>
                    <td>({{ enkeltinnslag.kategori }})</td>
                </tr>
        </div>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class Nettbutikk extends Vue {
  @Prop() private namn!: string;
  @Prop() private innslag!: [];

  public setNamn(namn: string) {
      this.namn = namn;
  }

  public setInnslag(innslag: []) {
      this.innslag = innslag;
  }
}
Vue.filter('formatTime', function(timestamp: string) {
    moment.locale
    if (!timestamp) return;
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('LLL'); 
})
</script>