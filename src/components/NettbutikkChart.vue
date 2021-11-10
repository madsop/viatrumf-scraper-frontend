<script lang="ts">
import { Line } from 'vue-chartjs'
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import moment from 'moment'

@Component({
  extends: Line
})
export default class NettbutikkChart extends Vue {
  @Prop() labels!: string[]
  @Prop() data!: string[]
  @Prop() innslag!: any[]
  @Prop() formatDate: any

  mounted() {
    this.doRender()
  }

  doRender() {
    const self = this as any
    self.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: 'Prisendringar',
            data: this.data,
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems: any) => {
              return self.formatTime(self.innslag[tooltipItems.index].timestamp) +": " + tooltipItems.yLabel
            }
          }
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
              }
          }]
        }
      }
    )
  }

  formatTime(timestamp: string): string {
    if (!timestamp) return ''
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, HH.mm')
  }

  @Watch('data')
  changeChart() {
    this.$data._chart.destroy()
    this.doRender()
  }
}
</script>