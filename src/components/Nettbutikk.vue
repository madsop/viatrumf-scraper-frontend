<template>
    <div>
        <h1>Nettbutikk</h1>
        {{ namn }}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Nettbutikk extends Vue {
  @Prop() private namn!: string;

  public setNamn(namn: string) {
      this.namn = namn;
  }
}
</script>