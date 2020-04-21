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
    <div class="scroll-bar is-horizontal" ref="horizontal" v-if="scrollx">
      <div class="scrollbar__thumb" :style="{height: '100%', width:'30px', transform: 'translate3d(40px, 0, 0)'}"></div>
    </div>
    <div class="scroll-bar is-vertical" ref="vertical" v-if="scrolly">
      <div class="scrollbar__thumb"
        ref="vertical_thumb" 
        @mousedown="handleMouseDown($event, BAR_TYPE.V)" 
        :style="{width: '100%', height: verticalThumb + 'px', transform: `translate3d(0, ${scrollTop}px, 0)`}">
      </div>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from './helpers/resize-event'
import { debounce, throttle } from 'throttle-debounce';
import EventType  from './helpers/eventType'
const BAR_TYPE = {
  V: 'vertical',
  H: 'horizontal'
}
const MIN_THUMB_SIZE = 20
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
      type:null,
      scrollTop: 0,
      scrollLeft: 0
    }
  },
  computed: {
    width() {
      return this.scrollx? this.maxWidth + 'px': 'auto'
    },

    // 滚动条的高度
    verticalThumb() {
      let {itemHeight, viewHeight} = this.store.context
      return Math.max(viewHeight / (this.store.dataSize * itemHeight) * viewHeight, MIN_THUMB_SIZE)
    }
  },
  created() {
  },
  mounted() {
    this.bindEvents()
  },
  beforeDestroy() {
    this.removeEvents()
  },
  methods: {
    bindEvents() {
      let {eventBus} = this.store.context
      addResizeListener(this.$refs.view, this.handleResize)
      document.addEventListener('mouseup', this.handleMouseup)
      eventBus.$on(EventType.VIEW_UPDATE, this.handleViewUpdate)
    },

    removeEvents() {
      let {eventBus} = this.store.context
      removeResizeListener(this.$refs.view, this.handleResize)
      document.removeEventListener('mouseup', this.handleMouseup)
      eventBus.$off(EventType.VIEW_UPDATE, this.handleViewUpdate)
    },

    syncScrollTopByOffset(offset, cursorPosition) {
      let top = Math.max(offset - cursorPosition, 0)
      this.scrollTop = Math.min(top, this.maxHeight - this.verticalThumb)
    },

    handleViewUpdate(event) {
      this.syncScrollTopByOffset(event.verticalPercent * (this.maxHeight-this.verticalThumb), 0)
    },

    handleResize(entry) {
      let { contentRect } = entry
      this.scrolly = this.maxHeight !== undefined? contentRect.height >= this.maxHeight: false
      this.scrollx = this.maxWidth !== undefined? contentRect.width >= this.maxWidth: false
    },

    handleMouseDown(ev, type) {
      ev.stopImmediatePropagation()
      this.type = type
      this.cursorPosition = Math.abs(this.$refs[type+'_thumb'].getBoundingClientRect().top - ev.clientY)
      document.onselectstart = () => false
      document.addEventListener('mousemove', this.handleMousemove)
    },

    handleMousemove(ev) {
      if (!this.type) return 
      this.$nextTick(() => {
        if (this.type == BAR_TYPE.V) {
          let {itemHeight, viewHeight, eventBus} = this.store.context
          let offset = ev.clientY - this.$refs[this.type].getBoundingClientRect().top
          this.syncScrollTopByOffset(offset, this.cursorPosition)
          // 通过事件去更新数据
          eventBus.$emit(EventType.VIEW_SCROLL, {
            scrollTop: this.scrollTop,
            scrollHeight: this.maxHeight,
            verticalThumb: this.verticalThumb,
            verticalPercent: this.scrollTop / (this.maxHeight - this.verticalThumb)
          }) 
        }
      })
    },

    handleMouseup(ev) {
      this.type = null
      document.removeEventListener('mousemove', this.handleMousemove)
      document.onselectstart = null
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