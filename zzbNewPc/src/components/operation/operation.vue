<template>
  <div id="operation" class="operation-wrap">
    <div class="input-box">
      <div class="total">
        当前页共
        <span class="totalSpan">
          {{ totalize }}
        </span>
        条数据
      </div>
      <el-button
        @click="addEdit()"
        v-show="addShow"
        type="primary"
        size="small"
        icon="el-icon-circle-plus-outline"
        style="margin-right:15px;"
        plain
        >{{ addText }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { OperationData } from "../../types/components/operation.interface";

@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: ""
  })
  name!: string;
  @Prop({}) totalize!: number;
  @Prop({ default: true }) addShow!: boolean;
  @Prop({ default: "添加" }) addText?: string;
  // data
  data: OperationData = {
    componentName: "operation"
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //添加修改
  addEdit() {
    this.$emit("add");
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.operation-wrap {
  width: 100%;
  .input-box {
    display: flex;
    justify-content: space-between;
    .total {
      font-size: $Auxiliary-font;
      color: $Secondary-text;
      line-height: 32px;
      .totalSpan {
        color: #ec193a;
        padding: 0 4px;
      }
    }
    margin-bottom: 20px;
  }
}
</style>
