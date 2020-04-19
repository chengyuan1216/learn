<script>
function debounce(fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
const SLICE_LEN = 10000
export default {
  props: {
    itemSize: {
      type: Number,
      default: 20
    },
    itemHeight: {
      type: Number,
      default: 47
    }
  },
  data() {
    return {
      tableData: [],
      scrollTop: 0,
      startIndex: 0,
      viewHeight: 0,
      isDrag: false
    }
  },
  render(h) {
    return h('el-table', {
      ref: 'elTable',
      props: {
        ...this.$attrs,
        data: this.tableData
      },
      on: {
        ...this.$listeners
      }
    }, this.$slots.default)
  },
  created() {
    this.data = {}
    window.vm = this
  },
  mounted() {
    this.bodyWrapper = this.$el.querySelector('.el-table__body-wrapper')
    this.bodyTable = this.$el.querySelector('.el-table__body-wrapper>table')
    this.bodyWrapper.addEventListener('scroll', this.handleScroll, {
      passive: true
    })
    this.bodyWrapper.addEventListener('mouseup', this.update)
  },
  beforeDestroy() {
    this.bodyWrapper.removeEventListener('scroll', this.handleScroll)
    this.bodyWrapper.removeEventListener('mouseup', this.update)
  },
  methods: {
    update() {
       requestAnimationFrame(() => {
        let marginBottom = this.itemHeight * (this.data.length - this.itemSize)
        console.log('marginBottom', marginBottom)
        // this.bodyTable.style.cssText = (`
        //   margin-top: ${this.scrollTop}px;
        //   margin-bottom: ${marginBottom - this.scrollTop}px;
        //   transform: translate3d(0, ${-this.scrollTop + this.startIndex * this.itemHeight}px, 0)
        // `)
        // this.bodyTable.style.cssText = (`
        //   margin-bottom: ${Math.max(marginBottom - this.scrollTop, 0)}px;
        //   transform: translate3d(0, ${Math.min(this.scrollTop, marginBottom)}px, 0)
        // `)

        this.bodyTable.style.cssText = (`
          padding-top: ${marginBottom}px;
          transform: translate3d(0, ${Math.min(-marginBottom, 0)}px, 0)
        `)
        this.filter()
      })
    },

    filter() {
      debugger
      this.startIndex = parseInt(this.scrollTop / this.itemHeight);
      this.tableData = this.getTableData(this.startIndex, this.startIndex + this.itemSize);
    },

    setData(data) {
      this.data = data
      // this.data = {}
      // let i = 0
      // do {
      //   this.data[i] = data.slice(SLICE_LEN * i, SLICE_LEN * (i+1))
      //   i++
      // } while (this.data[i-1].length === SLICE_LEN)
      // this.data.length = data.length
      this.update()
    },

    handleScroll(ev) {
      debugger
      // console.log(ev.target.scrollTop, ev.target.clientHeight, ev.target.scrollHeight)
      if (this.preScrollTop + ev.target.clientHeight > ev.target.scrollHeight - 1) {
        this.preScrollTop = ev.target.scrollTop
        return 
      }
      this.scrollTop = ev.target.scrollTop
      this.viewHeight = this.bodyWrapper.clientHeight
      if (this.scrollTop < this.itemHeight * this.data.length - this.viewHeight) {
        this.$nextTick(() => {
          this.update()
        })
      }
      this.preScrollTop = ev.target.scrollTop
    },

    getTableData(startIndex, endInex) {
      console.log(this.data.slice(startIndex, endInex))
      return this.data.slice(startIndex, endInex)
      // let rangeStart = parseInt(startIndex / SLICE_LEN)
      // let rangeEnd = parseInt(endInex / SLICE_LEN)
      // let _startIndex = startIndex - rangeStart * SLICE_LEN
      // let _endInex = endInex - rangeEnd * SLICE_LEN
      // // 在同一区间
      // if (rangeStart == rangeEnd) {
      //   return this.data[rangeStart].slice(_startIndex, _endInex)
      // } else {
      //   return this.data[rangeStart].slice(_startIndex, SLICE_LEN).concat(
      //     this.data[rangeEnd].slice(0, _endInex + 1)
      //   )
      // }
    }
  }
}
</script>

<style>

</style>