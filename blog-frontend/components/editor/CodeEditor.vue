<template>
    <div class='editor-pane'>
        <input 
        class='title' 
        name="title" 
        placeholder="제목을 입력하세요" 
        :value="$store.state.editor.title" 
        @input="handleChangeInput"/>
        <div class='code-editor' ref="editor"></div>
        <div class='tags'>
          <div class='description'>태그</div>
          <input 
          name="tags" 
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          :value="$store.state.editor.tags"
          @input="handleChangeInput"/>
        </div>
      </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

let CodeMirror = null;

export default {
  props: ["markdown"],
  mounted() {
    if (process.browser) {
      CodeMirror = require("codemirror");
      require("codemirror/mode/markdown/markdown");
      require("codemirror/mode/javascript/javascript");
      require("codemirror/mode/jsx/jsx");
      require("codemirror/mode/css/css");
      require("codemirror/mode/shell/shell");
    }
    this.initializeEditor();
  },
  data() {
    return {
      codeMirror: null,
      cursor: null
    };
  },
  methods: {
    initializeEditor() {
      this.codeMirror = CodeMirror(this.$refs.editor, {
        mode: "markdown",
        theme: "monokai",
        lineNumbers: true, // 좌측에 라인넘버 띄우기
        lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
      });
      this.codeMirror.on("change", this.handleChangeMarkdown);
    },
    handleChangeMarkdown(doc) {
      this.cursor = doc.getCursor();
      this.$store.commit("editor/changeInput", {
        name: "markdown",
        value: doc.getValue()
      });
    },
    handleChangeInput(e) {
      const { name, value } = e.target;
      this.$store.commit("editor/changeInput", { name, value });
    }
  },
  watch: {
    markdown: function(newMarkdown, oldMarkdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return;
      codeMirror.setValue(newMarkdown);
      if (!cursor) return; // 커서가 없는 경우
      codeMirror.setCursor(cursor);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/utils.scss";
.editor-pane {
  flex: 1; // 자신에게 주어진 영역을 다 채우기
  // 세로방향으로 내용 나열
  display: flex;
  flex-direction: column;
  .title {
    background: $oc-gray-7;
    border: none;
    outline: none;
    font-size: 1.5rem;
    padding: 1rem;
    color: white;
    font-weight: 500;
    &::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }
  }
  .code-editor {
    flex: 1; // 남는 영역 다 차지하기
    background: $oc-gray-9;
    display: flex;
    flex-direction: column; // .CodeMirror 가 세로영역을 전부 차지
    :global .CodeMirror {
      font-size: 1rem;
      flex: 1;
      font-family: "D2 Coding";
    }
  }
  .tags {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    background: $oc-gray-7;
    display: flex;
    align-items: center;
    .description {
      font-size: 0.85rem;
      color: white;
      font-weight: 600;
      margin-right: 1rem;
    }
    input {
      font-size: 0.85rem;
      border: none;
      flex: 1;
      background: none;
      outline: none;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      &::placeholder {
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
}
</style>