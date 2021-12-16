import { Component, Vue } from "vue-property-decorator";
import * as Api from "@/api/services";
import {
  comselect,
  comtable,
  comOperation,
  comPaging
} from "@/components/index";
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  data: any = {
    loading: false,
    visible: false,
    // 表格数据
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "entrust_no",
        label: "委托编号"
      },
      {
        value: "name",
        label: "当事人名称"
      }
    ],
    dataType: [
      {
        label: "委托编号",
        prop: "entrust_no"
      },
      {
        label: "当事人名称",
        prop: "name"
      },
      {
        label: "查档地域",
        prop: "area"
      },
      {
        label: "查档类型",
        prop: "a_type"
      },
      {
        label: "执行进度",
        prop: "execution_progress"
      },
      {
        label: "创建人",
        prop: "create_name"
      },
      {
        label: "创建时间",
        prop: "create_time"
      }
    ]
  };
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    entrust_no: "",
    name: ""
  };
  navIndex: number = 0;
  created() {
    //
  }

  activated() {
    this.init();
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.getList(params);
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data;
    data.loading = true;
    Api.GetQueryQrchivesPagingData(params)
      .then((res: any) => {
        data.loading = false;
        data.list = res.data;
        data.list.forEach((item: any) => {
          item.create_time = item.create_time.substring(
            0,
            item.create_time.lastIndexOf(":")
          );
        });
        // 数据条数
        data.totalize = res.total;
      })
      .catch(() => {
        data.loading = false;
        this.$message.error("网络异常");
      });
  }
  //详情
  handleInfo(data: any) {
    let self: any = this;
    let entrust_no: any = data.entrust_no;
    self.$router.push({
      path: `/servicesAdmin/servicesInfo/${entrust_no}`
    });
  }
  //删除
  handleDelete(data: any) {
    let parmas: any = {
      type: 0,
      id: data.row.id
    };
    Api.DeleteService(parmas).then((res: any) => {
      if (res.state) {
        this.init();
      } else {
        this.$message.error(res.msg);
      }
    });
  }
  //搜索
  search(data: any) {
    let self: any = this;
    self.data.loading = true;
    self.options.page = 1;
    let params: any = Object.assign({}, self.options);
    data.forEach((item: any) => {
      let name: string = item.label;
      params[name] = item.value;
    });
    self.data.select = Object.assign({}, params);
    this.getList(params);
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this;
    self.data.select = {};
    this.init();
  }
  //添加编辑
  add() {
    //
  }
  //分页
  watchChange(index: number) {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    params.page = index;
    self.init();
  }
}
