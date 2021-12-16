<template>
  <div class="address-wrap">
    <el-cascader
      @change="onChange"
      v-if="data.cascaderShow"
      v-model="data.detailed_address"
      :props="props"
      clearable
    ></el-cascader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../api/user'
@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: true,
    default: ''
  })
  address!: string
  @Prop({})
  id?: number

  // data
  data: any = {
    detailed_address: '',
    cascaderShow: true
  }
  props: any = {
    lazy: true,
    lazyLoad: this.loadAddress
  }

  @Watch('address', { immediate: true, deep: true })
  addressOnchange(newval: any, oldVal: any) {
    this.data.cascaderShow = false
    this.data.detailed_address = newval
    setTimeout(() => {
      this.data.cascaderShow = true
    }, 500)
    // if (newval == '' || newval == null) {
    //   this.data.detailed_address = []
    // } else {
    //   this.data.detailed_address[0] = newval
    // }
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //地址栏选中变化
  onChange(val: any) {
    let data: any = {
      country: val[0],
      province: val[1],
      city: val[2],
      county: val[3],
      id: this.id
    }
    this.$emit('emitAddress', data)
  }
  loadAddress(node: any, resolve: any) {
    const { level } = node
    const { data } = node
    let parentId = data ? data.id : 0
    Api.getAddress(parentId).then((res: any) => {
      const nodes = res.data.map((item: any) => ({
        value: item.id,
        label: item.name,
        id: item.id,
        leaf: level >= 3
      }))
      resolve(nodes)
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.address-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
