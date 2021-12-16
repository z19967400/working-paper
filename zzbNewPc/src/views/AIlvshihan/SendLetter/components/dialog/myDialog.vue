<template>
  <el-dialog :title="creditortitle" :visible.sync="dialogVisible" width="50%">
    <my-table :tableData="tableData"></my-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import myTable from "./components/table/myTable";
export default {
  name: "myTable",
  data() {
    return {
      tableData: []
    };
  },
  components: {
    "my-table": myTable
  },
  methods: {
    async getTableData() {
      const { data: res } = await this.$http.get(`Creditor/GetAll`);
      // eslint-disable-next-line no-console
      console.log(res);
    }
  },
  props: ["creditortitle", "dialogVisible"]
};
</script>
<style lang="less">
@import url("./mydialog.less");
</style>
