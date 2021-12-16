<template>
  <div>
    <el-button type="primary" @click="showData()">展示</el-button>
    <div id="table-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          v-for="col in colsss"
          :key="col.id"
          :prop="col.filename"
          :label="col.title"
        >
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="选择需要展示的字段"
      :visible.sync="dialogFormVisible"
      width="40%"
      center
      top="15vh"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="item in cities"
          :label="item.filename"
          :key="item.id"
        >
          {{ item.title }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmShow" size="medium"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// const cityOptions = ['date', 'name', 'address'] //所有的数据
export default {
  name: "comTable",
  props: ["tableData", "cols", "cities", "cityOptions", "checkedCities"],
  data() {
    return {
      checkAll: true, //默认全选
      // checkedCities: ['date', 'name', 'address'], //默认全选所有的数据
      // cities: [
      //   {
      //     prop: 'date',
      //     label: '日期'
      //   },
      //   {
      //     prop: 'name',
      //     label: '姓名'
      //   },
      //   {
      //     prop: 'address',
      //     label: '地址'
      //   }
      // ], //对象数组全部的数据
      isIndeterminate: false, //默认全选
      dialogFormVisible: false,
      // cols: [
      //   {
      //     id: 1,
      //     prop: 'date',
      //     label: '日期'
      //   },
      //   {
      //     id: 2,
      //     prop: 'name',
      //     label: '姓名'
      //   },
      //   {
      //     id: 3,
      //     prop: 'address',
      //     label: '地址'
      //   }
      // ],
      tempCols: [] //临时的数据容器
    };
  },
  computed: {
    colsss: {
      get: function() {
        return this.cols;
      },
      set: function() {
        return this.tempCols;
      }
    }
  },
  // mounted() {
  //   this.getDataAll()
  // },
  methods: {
    //全选按钮
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cityOptions : [];
      this.isIndeterminate = false;
    },
    //单个选中
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    showData() {
      this.dialogFormVisible = true;
    },
    confirmShow() {
      this.tempCols = [];
      if (this.checkedCities.length < 1) {
        this.$message.warning("请至少选择一项数据");
        this.dialogFormVisible = true;
      } else {
        for (var i = 0; i < this.cities.length; i++) {
          for (var j = 0; j < this.checkedCities.length; j++) {
            if (this.cities[i].filename == this.checkedCities[j]) {
              this.tempCols.push(this.cities[i]);
            }
          }
        }
        // console.log(this.tempCols);
        // this.cols = this.tempCols
        this.dialogFormVisible = false;
      }
    }
    //获得表格所有字段数据
    // getDataAll() {
    //   this.tableDataName.forEach(item => {
    //     console.log(item.filename)
    //     this.filename.push(item.filename)
    //   })
    //   console.log(this.filename)
    // }
  }
};
</script>
