<template>
  <div class="devel-warp">
    <div class="devel-box">
      <comselect
        :options="data.options"
        :kaifa="true"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="adddevel"></comOperation>
      <template>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane
            v-for="(item, index) in data.list"
            :key="index"
            :label="item.module_name"
          >
            <el-table
              :data="item.list"
              :height="height"
              border
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="function_name"
                label="功能"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="priority" label="优先级" width="180">
              </el-table-column>
              <el-table-column prop="time" label="计划发布时间" width="180">
              </el-table-column>
              <el-table-column prop="front_end" label="前端负责人" width="180">
              </el-table-column>
              <el-table-column prop="back_end" label="后端负责人" width="180">
              </el-table-column>
              <el-table-column
                prop="front_end_progress"
                label="前端开发状态"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="back_end_progress"
                label="后端开发状态"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="total_progress" label="总进度" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleEdit(scope.row)"
                    type="text"
                    size="small"
                    class="edit"
                    >管理</el-button
                  >
                  <el-button
                    @click="handleDelete(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>
<script lang="ts" src="./develManage.ts"></script>

<style lang="scss" scoped>
@import './develManage.scss';
</style>
