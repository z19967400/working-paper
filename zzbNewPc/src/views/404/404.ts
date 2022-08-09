import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class apply extends Vue {
  goback() {
    this.$router.go(-1);
  }
}
