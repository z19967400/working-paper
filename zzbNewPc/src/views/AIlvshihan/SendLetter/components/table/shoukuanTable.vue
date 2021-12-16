<template>
  <div>
    <el-table style="width: 100%" :data="shoukuanTableData" max-height="350">
      <el-table-column fixed prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="creditor_name" label="收款通道名称" width="120">
      </el-table-column>
      <el-table-column prop="contacts_name" label="联系人" width="120">
      </el-table-column>
      <el-table-column prop="contacts_phone" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="contacts_email" label="电子邮箱" width="120">
      </el-table-column>
      <el-table-column prop="bank_name" label="账户名称" width="120">
      </el-table-column>
      <el-table-column prop="bank_account" label="收款账号" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="收款银行" width="120">
      </el-table-column>
      <el-table-column
        prop="alipay_account "
        label="收款企业支付宝"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="back_remarks" label="收款备注" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="选择" width="60">
        <template slot-scope="scope">
          <el-radio
            v-model="tableRadio"
            :label="scope.row.id"
            @change="sendMoidss(tableRadio)"
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "shoukuanTable",
  data() {
    return {
      shoukuanTableData: [],
      tableRadio: ""
    };
  },
  mounted() {
    this.getshoukuanTableData();
    // this.sendMoidss()
  },
  methods: {
    async getshoukuanTableData() {
      const { data: res } = await this.$http.get(`MemberCollectMoney/GetAll`, {
        params: {}
      });
      // eslint-disable-next-line no-console
      console.log(res, 1231299);
      this.shoukuanTableData = res.data;
    },
    sendMoidss(tableRadio) {
      this.$emit("listensendMoidss", tableRadio);
    }
  }
};
</script>

<style lang="less"></style>
