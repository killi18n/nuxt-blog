<template>
    <div class="preview-pane">
        <h1 class="title">
            {{$store.state.editor.title}}
        </h1>
        <div>
            <markdown-render :markdown="$store.state.editor.markdown" />
        </div>
    </div>
</template>

<script>
import MarkdownRender from "@/components/common/MarkdownRender";
export default {
  components: {
    MarkdownRender
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";

.preview-pane {
  flex: 1;
  padding: 2rem;
  overflow-y: auto; // 사이즈 초과시 스크롤바 나타나게 설정
  font-size: 1.125rem;
  word-wrap: break-word;

  .title {
    font-size: 2.5rem;
    font-weight: 300;
    padding-bottom: 2rem;
    border-bottom: 1px solid $oc-gray-4;
    word-wrap: break-word;
  }
}
</style>