<template>
  <div class="billList">
    <div v-show="billType == 'Bill_Type_0'" class="table-cell">
      <span>AI律师函服务</span>
      <div class="time">
        <div v-if="data.settingType">
          <span style="color:#303033;font-size:14px;">设置结算周期：</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="small"
          >
          </el-date-picker>
          <el-button
            class="btn"
            style="margin-left:20px;"
            size="small"
            @click="query"
            type="primary"
            >保存</el-button
          >
          <el-button
            class="btn"
            style="margin-left:20px;"
            size="small"
            @click="data.settingType = false"
            >取消</el-button
          >
        </div>
        <div v-else>
          <span
            v-show="data.settingTime"
            style="font-size:14px;color:#303033;margin-right:20px;"
            >结算周期：{{ data.settingTime }}</span
          >
          <el-button @click="data.settingType = true" type="text"
            >设置结算周期</el-button
          >
        </div>
      </div>
      <el-table :max-height="500" :data="ai_pay" border>
        <el-table-column prop="pay_number" label="支付编号" width="180">
        </el-table-column>
        <el-table-column prop="debtor_number" label="委托编号" width="150">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="250">
        </el-table-column>
        <el-table-column prop="create_name" label="创建人"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ timeStr(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit_price" label="单价">
          <template slot-scope="scope">
            <span>{{ qianweifu(scope.row.unit_price) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="委托数/撤销数">
          <template slot-scope="scope">
            <span>{{ scope.row.e_total }} / {{ scope.row.cancel_total }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paid_amount" label="应付金额">
          <template slot-scope="scope">
            <span>{{ qianweifu(scope.row.paid_amount) }}</span>
          </template>
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
        <el-table-column prop="settlement_status" label="结算状态">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              @click="delected(1, scope.row.id)"
              style="color:#f04761;"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-cell">
      <span>律师办案服务_固定</span>
      <el-table :max-height="500" :data="tableData1" border>
        <el-table-column prop="id" label="请款ID" width="80"> </el-table-column>
        <el-table-column prop="debtor_number" label="委托编号" width="150">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="250">
        </el-table-column>
        <el-table-column prop="debtor_name" label="债务人" width="250">
        </el-table-column>
        <el-table-column prop="lawyer_name" label="办案律师" width="150">
        </el-table-column>
        <el-table-column prop="entrusted_matters" label="办案事项" width="400">
        </el-table-column>
        <el-table-column
          prop="fixed_service_fee"
          label="固定服务费"
          width="150"
        >
        </el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
          prop="new_management_rate"
          label="平台管理费率(%)"
          width="150"
        ></el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
          prop="management_fee"
          label="平台管理费额"
          width="180"
        ></el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1'"
          prop="lawyer_fee"
          label="应付律师费"
          width="150"
        ></el-table-column>
        <el-table-column prop="bill_remarks" label="账单备注" width="150">
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
        <el-table-column prop="settlement_status" label="结算状态" width="150">
          <template slot-scope="scope">
            {{
              jeisuan(
                scope.row.settlement_number_1 ||
                  scope.row.settlement_number_2 ||
                  scope.row.settlement_number_3
              )
            }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              :disabled="
                jeisuan(
                  scope.row.settlement_number_1 ||
                    scope.row.settlement_number_2 ||
                    scope.row.settlement_number_3
                ) === '已结算'
              "
              @click="delected(2, scope.row.id)"
              style="color:#f04761;"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-cell">
      <span>律师办案服务_风险</span>
      <el-table :max-height="500" :data="tableData2" border>
        <el-table-column prop="id" label="请款ID" width="80"> </el-table-column>
        <el-table-column prop="debtor_number" label="委托编号" width="150">
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="250">
        </el-table-column>
        <el-table-column prop="debtor_name" label="债务人" width="250">
        </el-table-column>
        <el-table-column prop="lawyer_name" label="办案律师" width="150">
        </el-table-column>
        <el-table-column prop="entrusted_matters" label="办案事项" width="400">
        </el-table-column>
        <el-table-column prop="collection_amount" label="回款金额" width="150">
        </el-table-column>
        <el-table-column
          prop="float_service_rate"
          label="风险服务费率(%)"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="float_service_fee"
          label="风险服务费"
          width="150"
        >
        </el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
          prop="new_management_rate"
          label="平台管理费率(%)"
          width="150"
        ></el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
          prop="management_fee"
          label="平台管理费额"
          width="150"
        ></el-table-column>
        <el-table-column
          v-if="billType == 'Bill_Type_1'"
          prop="lawyer_fee"
          label="应付律师费"
          width="150"
        ></el-table-column>
        <el-table-column prop="bill_remarks" label="账单备注" width="150">
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
        <el-table-column prop="settlement_status" label="结算状态" width="150">
          <template slot-scope="scope">
            {{
              jeisuan(
                scope.row.settlement_number_1 ||
                  scope.row.settlement_number_2 ||
                  scope.row.settlement_number_3
              )
            }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              :disabled="
                jeisuan(
                  scope.row.settlement_number_1 ||
                    scope.row.settlement_number_2 ||
                    scope.row.settlement_number_3
                ) === '已结算'
              "
              @click="delected(2, scope.row.id)"
              style="color:#f04761;"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" src="./billList.ts"></script>
<style lang="scss">
@import './billList.scss';
</style>
