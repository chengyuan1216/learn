<template>
  <div class="el-datatable-scrollbar" :class="{
    'el-datatable-scrollbar--scrollx': scrollx,
    'el-datatable-scrollbar--scrolly': scrolly
  }" :style="{
    maxHeight: maxHeight + 'px',
    width: width
  }">
    <div ref="view" class="el-datatable-scrollbar__view" >
      <slot></slot>
    </div>
    <div class="scroll-bar is-horizontal"  v-if="scrollx"   :style="{}" >
      <div class="scrollbar__thumb" :style="{height: '100%', width:'30px', transform: 'translate3d(40px, 0, 0)'}"></div>
    </div>
    <div class="scroll-bar is-vertical" v-if="scrolly">
      <div class="scrollbar__thumb" @mousedown="handleMouseDown($event, BAR_TYPE.V)" :style="{width: '100%', height: verticalThumb + 'px', transform: verticalThumbTranslate}"></div>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from './helpers/resize-event'
const BAR_TYPE = {
  V: 1,
  H: 2
}
export default {
  props: {
    store: {
      require: true
    },
    maxHeight: {
      type: Number
    },
    maxWidth: {
      type: Number
    }
  },
  data() {
    return {
      scrollx: false,
      scrolly: false,
      BAR_TYPE,
      type:null
    }
  },
  computed: {
    width() {
      return this.scrollx? this.maxWidth + 'px': 'auto'
    },

    // 滚动条的高度
    verticalThumb() {
      let {itemHeight, viewHeight} = this.store.context
      return Math.max(viewHeight / (this.store.dataSize * itemHeight) * viewHeight, 10)
    },

    verticalThumbTranslate() {
      let {itemHeight, viewHeight} = this.store.context
      let dist = this.store.scrollTop / (this.store.dataSize * itemHeight) * viewHeight
      if (dist + this.store.scrollbarWidth > viewHeight) {
        dist =  viewHeight - this.store.scrollbarWidth
      }
      return `translate3d(0, ${dist}px, 0)`
    }
  },
  mounted() {
    addResizeListener(this.$refs.view, this.handleResize)
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.view, this.handleResize)
  },
  mounted() {
    this.bindEvents()
  },
  beforeDestroy() {
    this.removeEvents()
  },
  methods: {
    handleResize(entry) {
      console.log(entry)
      let { contentRect } = entry
      this.scrolly = this.maxHeight !== undefined? contentRect.height >= this.maxHeight: false
      this.scrollx = this.maxWidth !== undefined? contentRect.width >= this.maxWidth: false
    },

    bindEvents() {
      document.addEventListener('mouseup', this.handleMouseup)
    },

    removeEvents() {
      document.removeEventListener('mouseup', this.handleMouseup)
    },

    handleMouseDown(ev, type) {
      console.log('ev', ev)
      this.type = type
      document.addEventListener('mousemove', this.handleMousemove)
    },

    handleMousemove(ev) {
      console.log(ev.clientX, ev.clientY)
    },

    handleMouseup(ev) {
      this.type = null
      document.removeEventListener('mousemove', this.handleMousemove)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-datatable-scrollbar {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .el-datatable-scrollbar__view {
    display: inline-block;
    vertical-align: top;
  }
  .scroll-bar {
    position: absolute;
    box-sizing: border-box;
    z-index: 10;
    .scrollbar__thumb {
      cursor:pointer;
      background: gray;
      border-radius: 2px;
    }
  }
  .scroll-bar.is-vertical {
    top: 0px;
    right: 0px;
    width: 10px;
    height: 100%;
    background: #fff;
    border-left: 1px solid #ebeef5;
  }
  .scroll-bar.is-horizontal {
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 10px;
    background: #fff;
  }
}
.el-datatable-scrollbar--scrollx {
  .el-datatable-scrollbar__view {
      padding-bottom: 10px;
  }
}
.el-datatable-scrollbar--scrolly {
  .el-datatable-scrollbar__view {
    padding-right: 10px;
  }
}
</style>