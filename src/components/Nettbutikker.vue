-<template>
    <div>
        <h1>Historikk for nettbutikkar på Viatrumf</h1>
        <p>Usikker på om Viatrumf-bonusen på nettbutikken du vil handle hos har gått opp, ned eller er uendra? Sjekk ved å velje butikken i nedtrekkslista.</p> 
        <select v-model="selected" v-on:change="selectionChanged">
            <option default selected="selected">Velg nettbutikk</option>
            <option v-for="nettbutikk in nettbutikker" :key="nettbutikk.namn" v-bind:value="nettbutikk">
                {{ nettbutikk | removeUnderscore }} 
            </option>
        </select>
        <Nettbutikk :namn=selected :innslag=selectedNettbutikk />
       <!-- <ul v-for="nettbutikk in nettbutikker" :key="nettbutikk.namn" v-bind:value="nettbutikk">
            <li>{{ nettbutikk }}</li>
        </ul> -->
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import Nettbutikk from '@/components/Nettbutikk.vue';

export default Vue.extend({
    components: {
        Nettbutikk,
    },
    data: () => ({
        baseurl: 'https://viatrumf-scraper-bff-xgjgr2ubbq-ew.a.run.app',
        nettbutikker: [] as Nettbutikk[],
        selected: '',
        selectedNettbutikk: [],
    }),
    methods: {
        selectionChanged() {
            const self = this;
            axios.get(self.baseurl + '/nettbutikkar/' + self.selected)
        .then((response) => response.data)
        .then((data) => self.selectedNettbutikk = data);
        },
    },
    mounted() {
        const self = this;
        axios.get(self.baseurl + '/nettbutikkar')
        .then((response) => response.data)
        .then((data) => self.nettbutikker = data);
    }
});
</script>

<style scoped>
ul, li {
    margin: 0;
    padding: 0;
}
</style>