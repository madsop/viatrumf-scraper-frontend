<template>
    <div>
        <h1>{{ namn |removeUnderscore }}</h1>
        <div v-if="innslag.length > 0">
            {{ innslag[0].kategori | capitalizeFirst }}
            <hr />
            <a  :href="'https://viatrumf.no/' + innslag[0].href">Til Viatrumf-sida</a>
        </div>
        <LineChart v-bind:labels="['January', 'February', 'March', 'April', 'May', 'June', 'July']" />
        <table>
        <div v-for="enkeltinnslag in innslag" :key="enkeltinnslag.timestamp">
                <tr>
                    <td>{{ enkeltinnslag.timestamp | formatTime }}</td>
                    <td><strong>{{enkeltinnslag.verdi }}</strong></td>
                </tr>
        </div>
        </table>
    </div>
</template>

<script lang="ts">

import LineChart from '@/components/NettbutikkChart.vue';


export default {
    components: {
        LineChart
    },
    props: ['namn', 'innslag'],
}

</script>

<style scoped>
td {
    width: 200px;
    padding: 0.5em 1em;
}
</style>