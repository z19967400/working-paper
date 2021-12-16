import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class About extends Vue {
  data: any = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1'
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
      ]
    }
  ]
  created() {
    //
  }

  activated() {
    this.init()
  }

  mounted() {
    //
  }
  init() {
    //
  }
  append(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)

    const newChild = { id: data.id++, label: 'testtest', children: [] }
    if (!data.children) {
      this.$set(data, 'children', [])
    }
    data.children.push(newChild)
  }

  remove(node: any, data: any) {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d: any) => d.id === data.id)
    children.splice(index, 1)
  }
}
