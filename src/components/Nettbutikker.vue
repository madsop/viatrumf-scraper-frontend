-<template>
    <div>
        <h1>Nettbutikker</h1>
        <section v-for="nettbutikk in nettbutikker" :key="nettbutikk.namn">
            <Nettbutikk :namn=nettbutikk.namn />
        </section>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Nettbutikk from '@/components/Nettbutikk.vue';

export default Vue.extend({
    components: {
        Nettbutikk,
    },
    data: () => ({
        nettbutikker: [] as Nettbutikk[],
    }),
    methods: {
        addNettbutikk(nettbutikk: Nettbutikk) {
            this.nettbutikker.push(nettbutikk);
        }
    },
    mounted() {
        const nettbutikk1 = new Nettbutikk();
        nettbutikk1.setNamn('Hotels.com');
        this.addNettbutikk(nettbutikk1);
    }
});
</script>