<template>
  <div class="add">
    <el-cascader
      class="address"
      @change="pushOptionsAdress"
      :props="props"
      clearable
    ></el-cascader>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "myaddres",
  data() {
    return {
      //地区选择器
      optionsAdress: { country: "", province: "", city: "", county: "" },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          const { data } = node;
          let parentId = data ? data.id : 0;
          axios
            .get(`Tools/GetAddress`, {
              params: { parent_id: parentId }
            })
            .then(res => {
              const nodes = res.data.data.map(item => ({
                value: item.id,
                label: item.name,
                id: item.id,
                leaf: level >= 3
              }));
              resolve(nodes);
            });
        }
      }
    };
  },
  methods: {
    //地区
    pushOptionsAdress(val) {
      this.optionsAdress.country = val[0];
      this.optionsAdress.province = val[1];
      this.optionsAdress.city = val[2];
      this.optionsAdress.county = val[3];
      this.$emit("pullOptionsAdress", this.optionsAdress);
      // eslint-disable-next-line no-console
      console.log(111);
    },
    logsss() {}
  }
};
</script>

<style lang="scss">
.add {
  width: 100%;
}
</style>
