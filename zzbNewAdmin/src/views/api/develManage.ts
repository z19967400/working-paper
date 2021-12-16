/* eslint-disable prettier/prettier */
import { Component, Vue } from "vue-property-decorator";
import { ApiData, ApiOptions } from "@/types/views/api.interface";
import * as Api from "@/api/api";
import { comselect, comOperation } from "@/components/index";
@Component({
  components: {
    comselect,
    comOperation
  }
})
export default class About extends Vue {
  //data
  data: ApiData["develManage"] = {
    list: [],
    loading: false,
    select: {},
    totalize: "",
    options: [
      {
        value: "project_name",
        label: "项目名称"
      },
      {
        value: "module_name",
        label: "模块名称"
      },
      {
        value: "version_number",
        label: "版本号"
      },
      {
        value: "priority",
        label: "优先级"
      },
      {
        value: "total_progress",
        label: "状态"
      }
    ]
  };
  height: number = 0;
  tabPosition: string = "left";
  options: ApiOptions["develManage"] = {
    project_name: "",
    module_name: "",
    version_number: "",
    priority: "",
    total_progress: ""
  };
  created() {
    //
  }

  activated() {
    let Wheight: number = document.body.offsetHeight;
    this.height = Wheight - 220;
    this.init();
  }

  mounted() {
    //
  }
  //初始化方法
  init() {
    let self: any = this;
    let params: ApiOptions["develManage"] =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.getList(params);
  }
  formatter(row: any) {
    return row.address;
  }
  //筛选查询
  search(data: any) {
    let self: any = this;
    let params: any = Object.assign({}, self.options);
    data.forEach((item: any) => {
      let name: string = item.label;
      params[name] = item.value;
    });
    self.data.select = params;
    this.getList(params);
  }
  //清空筛选
  clearSelection() {
    let self: any = this;
    self.data.select = {};
    this.init();
  }
  //获取列表
  getList(params: ApiOptions["develManage"]) {
    let self: any = this;
    self.data.loading = true;
    Api.getProgress(params).then((res: any) => {
      self.data.list = res.data;
      self.data.totalize = res.data.length;
      self.data.loading = false;
    });
  }
  //增加新任务
  adddevel() {
    this.$router.push({
      path: "/develManage/edit",
      query: { id: "0" }
    });
  }
  //管理
  handleEdit(row: any) {
    this.$router.push({
      path: "/develManage/edit",
      query: { id: row.id }
    });
  }
  //删除
  handleDelete(row: any) {
    let self: any = this;
    self.data.loading = true;
    Api.deleteProgress(row.id).then((res: any) => {
      if (res.data == 1) {
        self.$message.success("操作成功");
        self.init();
      } else {
        self.$message({
          message: "操作失败",
          type: "warning"
        });
      }
      self.data.loading = false;
    });
  }
  //合并表格
  handleSameMerge(
    row: any,
    column: any,
    rowIndex: number,
    columnIndex: number
  ) {
    if (columnIndex === 0) {
      if (rowIndex % 2 === 0) {
        return {
          rowspan: 2,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}
