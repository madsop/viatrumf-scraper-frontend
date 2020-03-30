<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels: Array
  },
  data: function () {
    return {
      datasets: [
        {
          label: "Data 1",
          data: [2, 10, 5, 9, 0, 6, 20],
          backgroundColor: "transparent",
          borderColor: "rgba(1, 116, 188, 0.50)",
          pointBackgroundColor: "rgba(171, 71, 188, 1)"
        }
      ],
    
    };
  },
  methods: {
    addPoint(label, data) {
      this.labels.push(label);
      this.datasets.data.push(data);
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.datasets,
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Prisendringar"
        }
      }
    );
  }
};
</script>