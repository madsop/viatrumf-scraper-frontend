<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  props: ['labels', 'data'],
  mounted() {
    this.doRender();
  },
  methods: {
    doRender: function() {
      this.renderChart(
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
    labels: function() {
      this.$data._chart.destroy();
      this.doRender();
    }
  }
};
</script>