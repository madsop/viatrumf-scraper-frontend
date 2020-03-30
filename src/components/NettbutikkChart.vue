<script lang="ts">
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ['labels', 'data'],
  mounted() {
    (this as any).doRender();
  },
  methods: {
    doRender: function() {
      const self = (this as any);
      self.renderChart({
          labels: self.labels,
          datasets: [{
            label: "Prisendringar",
            data: self.data,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
          }],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            callbacks: {
            label: ((tooltipItems: any) => {
              return tooltipItems.yLabel;
            })
          }
          },
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