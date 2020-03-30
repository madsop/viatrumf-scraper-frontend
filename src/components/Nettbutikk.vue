<template>
    <div>
        <h1>{{ namn |removeUnderscore }}</h1>
        <div v-if="innslag.length > 0">
            {{ innslag[0].kategori | capitalizeFirst }}
            <hr />
            <a  :href="'https://viatrumf.no/' + innslag[0].href">Til Viatrumf-sida</a>
        </div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

export default {
    extends: Vue,
    props: ['namn', 'innslag'],
}

Vue.filter('formatTime', function(timestamp: string) {
    if (!timestamp) return;
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, hh.mm'); 
})
Vue.filter('removeUnderscore', function(value: string) {
    if (!value) return;
    return value.replace(/_/g, ' ');
})
Vue.filter('capitalizeFirst', function(value: string) {
    if (!value) return;
    return value.charAt(0).toUpperCase() + value.slice(1);
})
</script>

<style scoped>
td {
    width: 200px;
    padding: 0.5em 1em;
}
</style>