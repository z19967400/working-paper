import { Component, Vue, Watch } from 'vue-property-decorator'
import { LayoutData } from '@/types/views/layout.interface'
import { Action } from 'vuex-class'
import { Menu } from '@/components' // 组件
import { setCookie, getCookie } from '@/utils/common'
import * as Api from '@/api/layout'

@Component({
  components: {
    Menu
  }
})
export default class About extends Vue {
  //
  @Action
  LOGIN_OUT: any
  //路由监听
  @Watch('$route')
  onChangeValue(newVule: any, oldVule: any) {
    this.getBreadcrumb()
    //isTag是路由里定义的是否显示标签的函数，是个布尔值
    if (newVule.meta.isTag == false) {
      //为否就不添加到标签
      return false
    }
    //标签的对象格式
    let tag: any = {
      name: newVule.meta.title, //名称
      path: newVule.path, //路径
      type: 'info', //样式，此时为无色白底，请看样式表
      active: true, //是否当前页
      closable: true //是否可关闭，只有首页是无法关闭的
    }
    //判断此路由是否已经存在于标签
    let includes: any = this.data.tags.filter((item: any) => {
      return tag.name.includes(item.name)
    })
    //未存在则添加
    if (includes.length == 0) {
      if (this.data.tags.length != 0) {
        this.data.tags.forEach((item: any) => {
          item.active = false
        })
      }
      this.data.tags.push(tag)
      //已存在则选中
    } else {
      let width: number = this.data.tags.length * 135
      let headerTag: any = this.$refs.headerTag
      let headerTagWidth: number = headerTag.getBoundingClientRect().width
      this.data.tags.forEach((item: any, index: number) => {
        if (item.name == newVule.meta.title) {
          item.active = true
          if (index * 135 >= width) {
            this.left = (width - headerTagWidth) * -1
          }
          if (index * 135 < headerTagWidth - 135) {
            this.left = 0
          }
          if (index * 135 > headerTagWidth - 135) {
            this.left = (index * 135 - (headerTagWidth - 135)) * -1
          }
        } else {
          item.active = false
        }
      })
    }
    //本地会话备份，防止刷新丢失
    sessionStorage.setItem('tags', JSON.stringify(this.data.tags))
  }
  //头部标签页数据监听
  @Watch('data.tags')
  onChangeTags(newValue: any, oldValue: any) {
    let width: number = newValue.length * 135 + 1
    this.tagsWidth = width
    let tagsBox: any = this.$refs.tagsBox
    let headerTag: any = this.$refs.headerTag
    let headerTagWidth: number = headerTag.getBoundingClientRect().width
    this.headerTagWidth = headerTagWidth
    tagsBox.style.width = width + 'px'
    if (width > headerTagWidth) {
      this.left = (width - headerTagWidth) * -1
    } else {
      this.right = false
    }
  }
  @Watch('left')
  onChangLeft(newVal: number, oldVal: number) {
    if (newVal == this.headerTagWidth - this.tagsWidth) {
      // eslint-disable-next-line no-console
      this.right = false
    } else {
      this.right = true
    }
  }
  // data
  data: LayoutData = {
    pageName: 'layout',
    fullscreenLoading: false,
    tags: [
      {
        name: '首页',
        path: '/',
        type: 'info',
        active: true,
        closable: false
      }
    ]
  }
  left: number = 0
  right: boolean = false
  openType: boolean = false
  isMove: boolean = false
  downX: number = 0
  tagsWidth: number = 0
  headerTagWidth: number = 0
  breadList: any = []
  created() {
    let breadcrumb: any = getCookie('breadcrumb')
    // eslint-disable-next-line no-console
    // console.log(breadcrumb);
    // this.textAjax();
  }

  activated() {
    //
  }

  mounted() {
    let tags: string | null = sessionStorage.getItem('tags')
    if (tags != null) {
      this.data.tags = JSON.parse(tags)
    }
  }

  // 初始化函数
  init() {
    //
  }
  handleCommand(command: string | number | object) {
    if (command == 'logout') {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.logout()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
  //测试
  textAjax() {
    let pamras: any = {
      admin_email: '123456@qq.com',
      admin_name: '21332',
      admin_phone_number: '18897924015',
      authorization_file:
        'https://file.debteehelper.com/Authorization/20210428/u=3363295869,2467511306&fm=26&gp=0_20210428112548169.jpg',
      creditor_name: '123',
      id_number: '213321',
      license_img_url:
        'https://file.debteehelper.com/Img/20210428/b0930b45-a974-45c4-b4cf-fe283aeeef18.jpg',
      license_no: '123',
      sms_code: '5834'
    }
    Api.textAjax(pamras).then((res: any) => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
  }
  //登出
  logout() {
    let data = {
      Routers: [],
      rouls: []
    }
    this.LOGIN_OUT()
    this.$store.dispatch('UPDATE_LAYOUY_STATE', data)
    location.reload()
  }
  //导航栏标签删除
  handleClose(tag: any) {
    //获取当前删除的标签在数组中的下标
    let index: number = this.data.tags
      .map((item: any) => item.name)
      .indexOf(tag.name)
    //从数组中删除该标签
    this.data.tags.splice(this.data.tags.indexOf(tag), 1)
    //更新本地会话存储
    sessionStorage.setItem('tags', JSON.stringify(this.data.tags))
    //定义要回跳的页面路由，此时为该标签的上一个标签
    let history: any = this.data.tags[index - 1]
    //点击的是当前页的标签才会跳转，不是则不跳转
    if (tag.active == true) {
      this.$router.push({
        path: history.path
      })
    }
  }
  //导航栏标签点击
  handleClick(tag: any) {
    if (this.isMove) {
      return false
    }
    this.$router.push({
      path: tag.path
    })
  }
  openWacth(val: boolean) {
    this.openType = val
  }
  //导航栏至最右侧
  tagRight() {
    let tagsBox: any = this.$refs.tagsBox
    let headerTag: any = this.$refs.headerTag
    let headerTagWidth: number = headerTag.getBoundingClientRect().width
    let tagsWidth: number = tagsBox.getBoundingClientRect().width
    this.left = (tagsWidth - headerTagWidth) * -1
    this.right = false
  }

  // tab按住事件
  down(e: any) {
    this.downX = e.pageX
    this.isMove = true
  }
  //Tab拖动事件
  move(e: any) {
    return false
    // eslint-disable-next-line no-unreachable
    let tagsBox: any = this.$refs.tagsBox
    let headerTag: any = this.$refs.headerTag
    let headerTagWidth: number = headerTag.getBoundingClientRect().width
    let tagsWidth: number = tagsBox.getBoundingClientRect().width
    let maxX = (tagsWidth - headerTagWidth) * -1
    if (this.isMove) {
      let moveX = e.pageX - this.downX
      if (moveX + this.left <= maxX && moveX < 0) {
        return false
      }
      if (moveX + this.left >= 0 && moveX > 0) {
        return false
      }
      this.left = moveX
    }
  }
  isHome(route: any) {
    return route.name === 'index'
  }
  getBreadcrumb() {
    let matched: any = this.$route.matched.filter((item: any) => {
      return item.meta.isBread
    })
    //如果不是首页
    if (!this.isHome(matched[0])) {
      matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
    }
    if (this.breadList.length != 0) {
      let actMeta: any = matched[matched.length - 1].meta //当前路由meta
      let hisMeta: any = this.breadList[this.breadList.length - 1].meta //已存的面包屑最后一级meta
      if (
        actMeta.index == hisMeta.index &&
        hisMeta.title != actMeta.title &&
        actMeta.title != this.breadList[1].meta.title
      ) {
        this.breadList.push(matched[matched.length - 1])
        return false
      }
      this.breadList = matched
      return false
    }
    this.breadList = matched
  }
}
