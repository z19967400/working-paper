<template>
  <div class="inandout">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize" @add="add"></comOperation>
    <comtable
      class="right-table"
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :info="true"
      :edit="false"
      @Delete="handleDelete"
      @Info="handleInfo"
    ></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
    <!--收支详情弹框 -->
    <el-dialog title="收支详情" :visible.sync="dialogVisible">
      <el-descriptions>
        <el-descriptions-item
          v-for="(item, index) in payStatus == 'Pay_Status_1' &&
          payType != 'Pay_Manner_0'
            ? info
            : edit"
          :key="index"
          :span="item.span || 1"
          :label="item.label"
          labelClassName="descriptions-label"
          contentClassName="descriptions-value"
        >
          <span
            style="color:rgb(240, 71, 97);font-size:12px;"
            v-show="item.prop === 'bill_remarks' && item.edit"
          >
            此备注将显示在账单中
          </span>
          <!-- 下拉选择 -->
          <el-select
            v-if="item.type === 'select' && item.edit"
            v-model="item.value"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="(item2, index2) in item.prop === 'currency_id'
                ? currency
                : item.prop === 'pay_status'
                ? pay_types
                : pay_methods"
              :key="index2"
              :label="item2.name"
              :value="item2.type"
            ></el-option>
          </el-select>
          <!-- 文本输入框 -->

          <el-input
            v-model="item.value"
            size="small"
            :style="{ width: item.prop === 'paid_amount' ? '85%' : '200px' }"
            v-else-if="item.type === 'input' && item.edit"
          ></el-input>
          <!-- 多行文本输入框 -->
          <el-input
            v-else-if="item.type === 'textarea' && item.edit"
            type="textarea"
            :rows="6"
            style="width:680px;"
            placeholder="请输入备注"
            v-model="item.value"
          >
          </el-input>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            v-model="item.value"
            type="datetime"
            style="width:180px"
            v-else-if="item.type === 'picker' && item.edit"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- 普通文本 -->
          <span v-else>
            <el-link
              v-if="item.prop === 'bill_number' || item.prop === 'create_name'"
              type="primary"
              :disabled="item.value === '未生成'"
              @click="tiaozhuan(item.prop, item.value)"
              >{{ item.value }}</el-link
            >
            <span v-else>{{ item.value }}</span>
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editOrder">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./inandout.ts"></script>

<style lang="scss">
@import './inandout.scss';
</style>
