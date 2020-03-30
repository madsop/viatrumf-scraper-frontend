<script lang="ts">
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ['labels', 'data'],
  mounted() {
    this.doRender();
  },
  methods: {
    doRender: function() {
      (this as any).renderChart(
        {
          labels: this.labels,
          datasets: [
        {
          label: "Prisendringar",
          data: this.data,
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "rgba(171, 71, 188, 1)"
        }
      ],
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      );
    },
  },
  watch: {
    data: function() {
      const self = (this as any);
      self.$data._chart.destroy();
      self.doRender();
    }
  }
};
</script>