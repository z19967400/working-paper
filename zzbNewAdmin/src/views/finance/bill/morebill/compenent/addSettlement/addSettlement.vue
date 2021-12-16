<template>
  <div class="addSettlement">
    <div class="scroll">
      <div
        v-show="billType == 'Bill_Type_0' && data.ai_pay.length > 0"
        class="table-cell"
      >
        <span>AI律师函服务</span>
        <el-table
          :max-height="300"
          ref="multipleTable"
          @selection-change="handleSelectionChange1"
          :data="data.ai_pay"
          border
        >
          <el-table-column prop="pay_number" label="支付编号" width="150">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="120">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="create_name" label="创建人" width="120">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150">
          </el-table-column>
          <el-table-column prop="total_amount" label="单价"> </el-table-column>
          <el-table-column prop="paid_amount" label="应付金额">
          </el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            type="selection"
            width="55"
          ></el-table-column>
        </el-table>
      </div>
      <!-- v-show="data.fixed_service_fee.length > 0" -->
      <div class="table-cell">
        <span>律师办案服务_固定</span>
        <el-table
          :max-height="300"
          ref="multipleTable1"
          @selection-change="handleSelectionChange2"
          :data="data.fixed_service_fee"
          border
        >
          <el-table-column prop="id" label="请款ID" width="80">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="150">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="debtor_name" label="债务人" width="250">
          </el-table-column>
          <el-table-column prop="lawyer_name" label="办案律师" width="100">
          </el-table-column>
          <el-table-column
            prop="entrusted_matters"
            label="办案事项"
            width="400"
          >
          </el-table-column>
          <el-table-column
            prop="fixed_service_fee"
            label="固定服务费"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="new_management_rate"
            label="平台管理费率"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="management_fee"
            label="平台管理费额"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1'"
            prop="lawyer_fee"
            label="应付律师费"
            width="120"
          ></el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            type="selection"
            width="55"
          ></el-table-column>
        </el-table>
      </div>
      <!-- v-show="data.float_service_fee.length > 0" -->
      <div class="table-cell">
        <span>律师办案服务_风险</span>
        <el-table
          :max-height="300"
          ref="multipleTable2"
          @selection-change="handleSelectionChange3"
          :data="data.float_service_fee"
          border
        >
          <el-table-column prop="id" label="请款ID" width="80">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="150">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="debtor_name" label="债务人" width="250">
          </el-table-column>
          <el-table-column prop="lawyer_name" label="办案律师" width="100">
          </el-table-column>
          <el-table-column
            prop="entrusted_matters"
            label="办案事项"
            width="400"
          >
          </el-table-column>
          <el-table-column prop="collection_amount" label="回款金额">
          </el-table-column>
          <el-table-column
            prop="float_service_rate"
            label="风险服务费率"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="float_service_fee"
            label="风险服务费"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="new_management_rate"
            label="平台管理费率"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="management_fee"
            label="平台管理费额"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1'"
            prop="lawyer_fee"
            label="应付律师费"
            width="120"
          ></el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            type="selection"
            width="55"
          ></el-table-column>
        </el-table>
      </div>
      <div>
        <el-form
          size="small"
          label-width="80px"
          v-model="data.form.settlement_record"
        >
          <el-form-item label="结算金额">
            <el-input
              style="width:120px;"
              v-model="data.form.settlement_record.settlement_amount"
            ></el-input>
            <span> 元/人民币</span>
          </el-form-item>
          <el-form-item label="结算方式">
            <el-select v-model="data.form.settlement_record.settlement_method">
              <el-option label="微信线上" value="微信线上"></el-option>
              <el-option label="微信线下" value="微信线下"></el-option>
              <el-option label="支付宝线上" value="支付宝线上"></el-option>
              <el-option label="支付宝线下" value="支付宝线下"></el-option>
              <el-option label="银行转账" value="银行转账"></el-option>
              <el-option label="现金" value="现金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="组合" value="组合"></el-option>
              <el-option label="其他" value="其他"></el-option>
              <el-option label="赠送" value="赠送"></el-option>
              <el-option label="免费-非诉" value="免费-非诉"></el-option>
              <el-option label="免费-诉讼" value="免费-诉讼"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算时间">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="data.form.settlement_record.settlement_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="流水号">
            <el-input
              v-model="data.form.settlement_record.serial_number"
            ></el-input>
          </el-form-item>
          <el-form-item label="后台备注">
            <el-input
              type="textarea"
              :rows="6"
              v-model="data.form.settlement_record.back_remarks"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer-btn">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="quxiao">取消</el-button>
    </div>
  </div>
</template>
<style lang="scss">
@import './addSettlement.scss';
</style>
<script lang="ts" src="./addSettlement.ts"></script>
