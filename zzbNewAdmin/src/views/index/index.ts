import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action, State } from 'vuex-class'
import { IndexData } from '@/types/views/index.interface'
// import {  } from "@/components" // 组件

// 引入 ECharts 主模块
import echarts from 'echarts'

@Component({})
export default class About extends Vue {
  // Getter
  // @Getter index.author

  // Action
  @Action GET_DATA_ASYN: any

  // data
  data: any = {
    pageName: 'index',
    chart1: null,
    chart2: null,
    chart3: null,
    workList: 10
  }

  created() {
    //
  }

  activated() {
    //
  }
  mounted() {
    this.init()
  }

  // 初始化函数
  init() {
    this.initChart1()
    this.initChart2()
    this.initChart3()
  }
  //过去十二个月AI律师函委托数量统计
  initChart1() {
    let chartHtml: any = document.getElementById('chart1')
    this.data.chart1 = echarts.init(chartHtml)
    this.data.chart1.setOption({
      color: ['#3398DB'],
      title: {
        text: 'AI律师函委托数量统计（过去12个月）',
        left: '10px',
        top: '10px',
        textStyle: {
          fontSize: '14'
        }
      },
      grid: {
        left: '60px',
        right: '60px',
        top: '80px',
        bottom: '30px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: '日期',
        data: this.getAllData(),
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        name: '数量'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 800, 500, 400, 132, 250],
          type: 'bar'
        }
      ],
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'mousemove'
      }
    })
  }
  initChart2() {
    let chartHtml: any = document.getElementById('chart2')
    this.data.chart2 = echarts.init(chartHtml)
    this.data.chart2.setOption({
      title: {
        text: '执行结果统计',
        left: 'center',
        bottom: '20px'
      },
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '审核未通过' },
            { value: 735, name: '已撤销' },
            { value: 580, name: '已终止' },
            { value: 484, name: '已完成' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  initChart3() {
    let chartHtml: any = document.getElementById('chart3')
    this.data.chart3 = echarts.init(chartHtml)
    this.data.chart3.setOption({
      title: [
        {
          text: '首次催收短信',
          left: '20%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '首次催收电话',
          left: '45%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件催款函',
          left: '70%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '9.5%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: 'EMS律师函',
          left: '34%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '57%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '79.5%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '催收任务结果统计',
          left: 'center',
          bottom: '20px'
        }
      ],
      series: [
        {
          type: 'pie',
          radius: 50,
          center: ['25%', '30%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['50%', '30%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['75%', '30%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['15%', '65%'],
          name: '0000',
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['38%', '65%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['62%', '65%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        },
        {
          type: 'pie',
          radius: 50,
          center: ['85%', '65%'],
          data: [
            // 数据数组，name 为数据项名称，value 为数据项值
            { value: 235, name: '失败' },
            { value: 274, name: '成功' }
          ]
        }
      ]
    })
  }
  //获取过去十二个月份
  getAllData() {
    var dataArr: any = []
    var data: Date = new Date()
    var year: any = data.getFullYear()
    data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
    for (var i = 0; i < 12; i++) {
      data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
      var m: any = data.getMonth() + 1
      m = m < 10 ? '0' + m : m
      dataArr.push(data.getFullYear() + '-' + m)
    }
    return dataArr.reverse()
  }
  //千位符
  Thousand(num: number | string) {
    let val: string = Number(num).toLocaleString()
    return val
  }
}
