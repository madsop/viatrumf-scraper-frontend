<template>
    <div>
        <h1>{{ namn |removeUnderscore }}</h1>
        <div v-if="innslag.length > 0">
            {{ innslag[0].kategori | capitalizeFirst }}
            <hr />
            <a  :href="'https://viatrumf.no/' + innslag[0].href">Til Viatrumf-sida</a>
            <LineChart 
                :labels=this.labels
                :data=this.data
            />
        </div>
        <table>
            <tr v-for="enkeltinnslag in innslag" :key="enkeltinnslag.timestamp">
                <td>{{ enkeltinnslag.timestamp | formatTime }}</td>
                <td><strong>{{enkeltinnslag.verdi }}</strong></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">

import LineChart from '@/components/NettbutikkChart.vue';
import { Vue} from 'vue-property-decorator'; 

export default {
    extends: Vue,
    components: {
        LineChart
    },
    props: ['namn', 'innslag'],
    methods: {
        trim(input: string): string {
            return input.replace(/%/g, '').replace(/kr/g, '',).replace(' ', '').replace(',', '.');
        }
    },
    computed: {
        labels(): string[] {
            const label = [] as string[];
            (this as any).innslag.forEach((e: any) => {
                label.push(e.timestamp);
            });
            return label;
        },
        data(): string[] {
            const datapunkt = [] as string[];
            const self = (this as any);
            self.innslag.forEach((e: any) => {
                datapunkt.push(self.trim((e.verdi as string)));
            });
            return datapunkt;
        }
    },
}

</script>

<style scoped>
td {
    width: 200px;
    padding: 0.5em 1em;
}
</style>