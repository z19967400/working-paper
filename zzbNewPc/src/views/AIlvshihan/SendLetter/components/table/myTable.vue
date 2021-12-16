<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="350">
      <el-table-column fixed prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="creditor_name" label="债权人名称" width="120">
      </el-table-column>
      <el-table-column prop="phone_number" label="公司电话" width="120">
      </el-table-column>
      <el-table-column prop="email" label="公司邮箱" width="120">
      </el-table-column>
      <el-table-column prop="audit_status" label="审核状态" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="选择" width="60">
        <template slot-scope="scope">
          <el-radio
            v-model="tableRadio"
            :label="scope.row.id"
            @change="sendMoid(tableRadio)"
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "myTable",
  props: ["tableData"],
  data() {
    return {
      tableRadio: ""
    };
  },
  mounted() {
    this.sendMoid();
  },
  methods: {
    sendMoid(tableRadio) {
      this.$emit("listenMoid", tableRadio);
    }
  }
};
</script>
