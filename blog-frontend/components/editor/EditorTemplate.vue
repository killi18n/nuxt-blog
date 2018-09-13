<template>
    <div class="editor-template">
        <div class="panes">
            <div class="pane code-editor" v-bind:style="{flex: this.leftPercentage}">
                <code-editor :markdown="markdown" />
            </div>
            <div class="pane preview-pane" v-bind:style="{flex: 1 - this.leftPercentage}">
                <preview-pane />
            </div>
            <div 
            class="separator" 
            v-bind:style="{left: `${this.leftPercentage * 100}%`}"
            @mousedown="this.handleSeparatorMouseDown" />
        </div>
    </div>
</template>

<script>
import CodeEditor from "@/components/editor/CodeEditor";
import PreviewPane from "@/components/editor/PreviewPane";
export default {
  props: ["markdown"],
  components: {
    CodeEditor,
    PreviewPane
  },
  mounted() {},
  beforeDestroy() {
    this.$store.commit("editor/initialize");
  },
  data() {
    return {
      leftPercentage: 0.5
    };
  },
  methods: {
    handleMouseMove(e) {
      this.leftPercentage = e.clientX / window.innerWidth;
    },
    handleMouseUp(e) {
      document.body.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
    },
    handleSeparatorMouseDown(e) {
      document.body.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.editor-template {
  .panes {
    height: calc(100vh - 5rem);
    display: flex;
    position: relative;

    .pane {
      display: flex;
      min-width: 0; // 내부의 내용이 커도 반대편 영역을 침범하지 않게 해줌
      overflow: auto; // 너무 많이 줄이면 스크롤바가 나타나게 해줌
    }

    .separator {
      width: 1rem; // 클릭 영역을 넓게 설정하기 위함
      height: 100%;
      position: absolute;
      transform: translate(-50%); // 자신의 50% 만큼 왼쪽으로 이동
      cursor: col-resize; // 리사이즈 커서
      //   background: black;
    }

    @include media("<medium") {
      .code-editor {
        flex: 1 !important;
      }
      .preview-pane,
      .separator {
        display: none;
      }
    }
  }
}
</style>