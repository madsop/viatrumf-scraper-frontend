-<template>
    <div>
        <h1>Nettbutikker</h1>
        <select v-model="selected" v-on:change="selectionChanged">
            <option selected="selected">Velg nettbutikk</option>
            <option v-for="nettbutikk in nettbutikker" :key="nettbutikk.namn" v-bind:value="nettbutikk">
                {{ nettbutikk }} 
            </option>
        </select>
        <Nettbutikk :namn=selected :innslag=selectedNettbutikk />
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
        baseurl: 'http://localhost:8081',
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