import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action, State } from 'vuex-class'
import { IndexData } from '@/types/views/index.interface'
import * as Api from '@/api/index'
import { thousandBitSeparator } from '@/utils/common'
// import {  } from "@/components" // 组件

// 引入 ECharts 主模块
import echarts from 'echarts'
import { api } from '../../../../zzbPc/src/assets/js/api'
import { getUserLogs } from '@/api/monitor'

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
    chart4: null,
    chart5: null,
    workList: [],
    offerList: [],
    statistical: '',
    arrs: {
      ai_12: [],
      case_12: [],
      case_cost: [],
      ai_status: [],
      ai_task_status: []
    },
    dialogVisible: false,
    update_time: ''
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
    this.getData()
    this.getData2()
    this.getData3()
  }
  //获取统计数据
  getData() {
    Api.GetStatisticsAdminData().then((res: any) => {
      this.data.statistical = res.data
      this.data.update_time = res.data.update_time.replace('T', ' ')
      this.data.update_time = this.data.update_time.substring(
        0,
        this.data.update_time.lastIndexOf('.')
      )
    })
  }
  //获取待办工作
  getData2() {
    Api.GetPendingWork().then((res: any) => {
      let arr: any = []
      Object.keys(res.data).forEach((key: string) => {
        if (res.data[key] > 0) {
          let item: any = {
            name: key,
            val: res.data[key],
            url: this.getUser(key)
          }
          arr.push(item)
        }
      })
      this.data.workList = arr
    })
  }
  //获取统计数据图表部分
  getData3() {
    Api.GetStatisticsAdminChartsData().then((res: any) => {
      res.data.case_cost.forEach((item: any) => {
        item.number_1 = (item.number_1 / 10000).toFixed(2)
        item.number_2 = (item.number_2 / 10000).toFixed(2)
        item.number_3 = (item.number_3 / 10000).toFixed(2)
      })
      this.data.arrs = {
        ai_12: res.data.ai_12,
        case_12: res.data.case_12,
        case_cost: res.data.case_cost,
        ai_status: res.data.ai_status,
        ai_task_status: res.data.ai_task_status
      }
      this.initChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
      this.initChart5()
    })
  }
  //获取管理员需要审核的报价
  GetCaseQuotedPriceByAdmin() {
    Api.GetCaseQuotedPriceByAdmin().then((res: any) => {
      this.data.offerList = res.data
      this.data.dialogVisible = true
    })
  }
  //跳转报价
  tiaozhuan(number: any) {
    this.$router.push(`/LawyersHandleCases/caseInfo/${number}`)
  }
  //获取待办事项
  getText(name: string, val: number) {
    let text: string = ''
    switch (name) {
      case 'number_1':
        text = '有新的债权人待审核'
        break
      case 'number_2':
        text = '有新的律师认证待审核'
        break
      case 'number_3':
        text = '有新的试用申请待处理'
        break
      case 'number_4':
        text = '有新的AI律师函待审核'
        break
      case 'number_5':
        text = '有EMS律师函待寄送'
        break
      case 'number_6':
        text = '有新的律师办案待审核'
        break
      case 'number_7':
        text = '律师办案报价审核'
        break
      case 'number_8':
        text = '有新的律师查档待审核'
        break
      case 'number_9':
        text = '账单待确认'
        break
      case 'number_10':
        text = '有新的诉讼助资待审核'
        break
      case 'number_11':
        text = '有新的保全保险待审核'
        break
      default:
        break
    }
    return text
  }
  //获取待办事项跳转的路由
  getUser(name: string) {
    let url: string = ''
    switch (name) {
      case 'number_1':
        url = '/ordinary/creditor'
        break
      case 'number_2':
        url = '/lawyer/registeredLawyer'
        break
      case 'number_3':
        url = '/apply/applyList'
        break
      case 'number_4':
        url = '/LawyerLetter/entrustList'
        break
      case 'number_5':
        url = '/LawyerLetter/lawyerLetteList'
        break
      case 'number_6':
        url = '/LawyersHandleCases/caseAdmin'
        break
      case 'number_7':
        url = '律师办案报价审核'
        break
      case 'number_8':
        url = '/services/servicesAdmin'
        break
      case 'number_9':
        url = '/business/listbill'
        break
      case 'number_10':
        url = '/services/servicesAdmin2'
        break
      case 'number_11':
        url = '/services/servicesAdmin3'
        break
      default:
        break
    }
    return url
  }
  //跳转页面
  toUrl(url: string) {
    if (url != '律师办案报价审核') {
      this.$router.push(url)
    } else {
      this.GetCaseQuotedPriceByAdmin()
    }
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
          data: this.getAi12(),
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: '#606366',
                  fontSize: 12
                }
              }
            }
          }
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
          data: this.getAiStatus(),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              formatter: '{b}({d}%)',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
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
          left: '21%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '首次催收电话',
          left: '46%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件催款函',
          left: '74%',
          top: '10%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '10.5%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: 'EMS律师函',
          left: '35%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '58%',
          bottom: '50%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        },
        {
          text: '电子邮件律师函',
          left: '80.5%',
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
            {
              value: this.data.arrs.ai_task_status[0].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[0].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[0].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[0].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['50%', '30%'],
          data: [
            {
              value: this.data.arrs.ai_task_status[1].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[1].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[1].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[1].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['78%', '30%'],
          data: [
            {
              value: this.data.arrs.ai_task_status[2].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[2].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[2].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[2].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['15%', '65%'],
          name: '0000',
          data: [
            {
              value: this.data.arrs.ai_task_status[3].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[3].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[3].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[3].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['38%', '65%'],
          data: [
            {
              value: this.data.arrs.ai_task_status[4].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[4].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[4].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[4].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['62%', '65%'],
          data: [
            {
              value: this.data.arrs.ai_task_status[5].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[5].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[5].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[5].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        },
        {
          type: 'pie',
          radius: 50,
          center: ['85%', '65%'],
          data: [
            {
              value: this.data.arrs.ai_task_status[6].number_1,
              name: '待执行'
            },
            {
              value: this.data.arrs.ai_task_status[6].number_2,
              name: '执行中'
            },
            {
              value: this.data.arrs.ai_task_status[6].number_3,
              name: '成功'
            },
            {
              value: this.data.arrs.ai_task_status[6].number_4,
              name: '失败'
            }
          ],
          label: {
            normal: {
              formatter: '{b}{d}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12
              }
            }
          }
        }
      ]
    })
  }
  //过去十二个月律师办案委托数量统计
  initChart4() {
    let chartHtml: any = document.getElementById('chart4')
    this.data.chart4 = echarts.init(chartHtml)
    this.data.chart4.setOption({
      color: ['#3398DB'],
      title: {
        text: '律师办案委托数量统计（过去12个月）',
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
          data: this.getCase12(),
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: '#606366',
                  fontSize: 12
                }
              }
            }
          }
        }
      ],
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'mousemove'
      }
    })
  }
  //律师办案委托金额统计（过去12个月）
  initChart5() {
    let chartHtml: any = document.getElementById('chart5')
    this.data.chart5 = echarts.init(chartHtml)
    this.data.chart5.setOption({
      legend: {
        top: 20
      },
      tooltip: {},
      title: [
        {
          text: '律师办案委托金额统计（过去12个月）',
          left: '10px',
          top: '10px',
          textStyle: {
            fontSize: '14'
          }
        },
        {
          text: '万元',
          right: '5%',
          top: '5%',
          textStyle: {
            color: '#606366',
            fontSize: 12
          }
        }
      ],
      grid: {
        left: '60px',
        right: '60px',
        top: '80px',
        bottom: '30px',
        containLabel: true
      },
      dataset: {
        source: this.getCaseCost()
      },
      xAxis: {
        type: 'category',
        name: '日期',
        data: this.getAllData(),
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
  //获取Ai律师函统计
  getAi12() {
    let arr: any = []
    this.data.arrs.ai_12.forEach((item: any) => {
      arr.push(item.quantity)
    })
    return arr.reverse()
  }
  //获取Ai律师函执行统计
  getAiStatus() {
    let arr: any = []
    this.data.arrs.ai_status.forEach((item: any) => {
      let itt: any = {
        name: item.status_name,
        value: item.quantity
      }
      arr.push(itt)
    })
    return arr
  }
  //获取律师办案12个月数据
  getCase12() {
    let arr: any = []
    this.data.arrs.case_12.forEach((item: any) => {
      arr.push(item.quantity)
    })
    return arr.reverse()
  }
  //获取律师办案各费用
  getCaseCost() {
    let arr: any = [['product', '委托金额', '律师费', '平台管理费']]
    this.data.arrs.case_cost.forEach((item: any) => {
      let arr2: any = [
        item.time_str,
        item.number_1,
        item.number_2,
        item.number_3
      ]
      arr.push(arr2)
    })
    // eslint-disable-next-line no-console
    console.log(arr)

    return arr
  }
  //千位符
  Thousand(num: number | string) {
    let val: string = Number(num).toLocaleString()
    return val
  }
  Thousand2(num: number) {
    if (num != undefined) {
      return thousandBitSeparator(num)
    }
  }
}
