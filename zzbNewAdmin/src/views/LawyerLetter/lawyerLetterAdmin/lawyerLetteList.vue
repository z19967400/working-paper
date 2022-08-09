<template>
  <div class="lawyerLetteList-wrap">
    <div class="lawyerLetteList-box">
      <div id="select" class="nav">
        <div class="nav-left">
          <span
            :class="`option ${index >= 4 ? 'bigW' : ''}`"
            v-for="(item, index) in data.options"
            :key="index"
          >
            <el-date-picker
              size="small"
              v-if="item.value === 'send_time'"
              v-model="getData[item.value]"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="item.label"
            >
            </el-date-picker>
            <el-select
              size="small"
              v-else-if="
                item.value === 'express_status' ||
                  item.value === 'courier_receipt' ||
                  item.value === 'ai_status'
              "
              v-model="getData[item.value]"
              :placeholder="item.label"
            >
              <el-option
                v-for="item in item.value === 'express_status'
                  ? expressOption
                  : item.value === 'ai_status'
                  ? executing_states
                  : courierOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-else-if="item.value === 'courier_receipt_img'"
              size="small"
              v-model="getData[item.value]"
              :placeholder="item.label"
            >
              <el-option
                v-for="item in courierImg"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-else
              size="small"
              v-model="getData[item.value]"
              :placeholder="item.label"
            ></el-input>
          </span>
          <el-button
            size="small"
            type="primary"
            plain
            @click="
              () => {
                getData.page = 1
                init()
              }
            "
            >查询</el-button
          >
          <el-button size="small" type="primary" plain @click="Reset()"
            >重置</el-button
          >
        </div>
        <div class="nav-right">
          <el-button size="small" @click="openReceipt3()" type="primary"
            >快递状态更新</el-button
          >
          <el-button size="small" @click="download()" type="primary"
            >寄送信息下载</el-button
          >
          <el-button size="small" @click="openReceipt2()" type="primary"
            >寄送单号上传</el-button
          >
          <el-button size="small" @click="openReceipt()" type="primary"
            >寄送底单状态更新</el-button
          >
          <el-button size="small" @click="goExpress()" type="primary"
            >寄送底单上传</el-button
          >
        </div>
      </div>
      <el-table
        highlight-current-row
        v-loading="data.loading"
        ref="multipleTable"
        :height="height"
        :data="data.list"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(item, index) in data.dataType"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color:#67C23A;"
              @click="goInfo(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              style="color:#409EFF;"
              type="text"
              @click="goDownload(scope.row)"
              >律师函</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <comPaging
        :page="getData.page"
        :limit="getData.limit"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
    <!-- 底单状态更新 -->
    <el-dialog
      custom-class="letteDialog"
      title="EMS底单状态更新"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-table height="400px" style="width:100%;" center :data="slectList">
        <el-table-column
          v-for="(item, index) in selectTypes"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        ></el-table-column>
        <el-table-column width="80px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delect(scope.$index)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;margin-left:20px;">
        <el-radio-group v-model="radio">
          <el-radio :label="0">未收到</el-radio>
          <el-radio :label="1">已收到</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDataCourier()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 快递状态更新 -->
    <el-dialog
      custom-class="letteDialog"
      title="快递状态更新"
      center
      :visible.sync="dialogFormVisible3"
    >
      <el-table height="400px" style="width:100%;" center :data="slectList">
        <el-table-column
          v-for="(item, index) in selectTypes"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        ></el-table-column>
        <el-table-column width="80px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delect(scope.$index)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;margin-left:10px;">
        <span style="width:120px;display:inline-block;">快递状态</span>
        <el-radio-group v-model="radio">
          <el-radio :label="0">待投递</el-radio>
          <el-radio :label="1">快递中</el-radio>
          <el-radio :label="2">投递成功</el-radio>
          <el-radio :label="3">投递失败</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-top:20px;margin-left:10px;">
        <span style="width:120px;display:inline-block;">投递失败原因</span>
        <el-input style="width:620px;" size="small" v-model="shibai"></el-input>
      </div>
      <div style="margin-top:20px;margin-left:10px;">
        <span style="width:120px;display:inline-block;">快递底单状态</span>
        <el-radio-group v-model="radio2">
          <el-radio :label="0">未收到</el-radio>
          <el-radio :label="1">已收到</el-radio>
          <!-- <el-radio :label="2">无需</el-radio> -->
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            () => {
              dialogFormVisible3 = false
              shibai = ''
            }
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="upDataCourier3()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传单号 -->
    <el-dialog
      custom-class="letteDialog letteDialog2"
      title="快递单号上传"
      center
      :visible.sync="dialogFormVisible2"
      @close="dialogFormVisible2Close"
    >
      <el-table
        height="400px"
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width:100%;"
        center
        :data="slectList"
      >
        <el-table-column
          v-for="(item, index) in selectTypes2"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        >
          <template slot-scope="scope">
            <el-select
              v-if="item.prop === 'courier_company'"
              v-model="scope.row.courier_company"
              placeholder="快递公司"
            >
              <el-option label="邮政EMS" value="邮政EMS"></el-option>
              <el-option label="顺丰快递" value="顺丰快递"></el-option>
              <el-option label="邮政挂号信" value="邮政挂号信"></el-option>
            </el-select>
            <el-input
              v-else-if="item.prop === 'courier_number'"
              :ref="'smInput' + scope.$index"
              @keyup.enter.native="saomaQ(scope.$index)"
              v-model="scope.row.courier_number"
              placeholder="快递单号"
            ></el-input>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column width="80px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delect(scope.$index)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row style="height:40px;line-height:40px;margin-top:20px;">
        <el-col :span="3">批量修改快递公司</el-col>
        <el-col :span="21">
          <el-select
            v-model="allCourierCompany"
            @change="allCourierCompanyChange"
            placeholder="快递公司"
          >
            <el-option label="邮政EMS" value="邮政EMS"></el-option>
            <el-option label="顺丰快递" value="顺丰快递"></el-option>
            <el-option label="邮政挂号信" value="邮政挂号信"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upDataCourier2()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./lawyerLetteList.ts"></script>

<style lang="scss">
@import './lawyerLetteList.scss';
</style>
