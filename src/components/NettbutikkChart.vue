<script lang="ts">
import { Line } from 'vue-chartjs'
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'

@Component({
  extends: Line
})
export default class NettbutikkChart extends Vue {
  @Prop() labels!: string[]
  @Prop() data!: string[]

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
              return tooltipItems.yLabel
            }
          }
        }
      }
    )
  }

  @Watch('data')
  changeChart() {
    this.$data._chart.destroy()
    this.doRender()
  }
}
</script>
