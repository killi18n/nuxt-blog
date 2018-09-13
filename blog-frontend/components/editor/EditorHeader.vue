<template>
    <div class="editor-header">
        <div class="button" @click="goBack">뒤로가기</div>
        <div class="right">
            <div class="button" @click="writePost">작성하기</div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async writePost() {
      const { title, markdown, tags } = this.$store.state.editor;
      const post = {
        title,
        body: markdown,
        tags:
          tags === ""
            ? []
            : [...new Set(tags.split(",").map(tag => tag.trim()))]
      };
      try {
        if (this.$route.query.id) {
          await this.$store.dispatch("editor/editPost", {
            postId: this.$route.query.id,
            ...post
          });
          this.$router.push({
            path: `/post/${this.$store.state.editor.postId}`
          });
          return;
        }
        await this.$store.dispatch("editor/writePost", post);
        this.$router.push({
          path: `/post/${this.$store.state.editor.postId}`
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";

.editor-header {
  background: $oc-blue-5;
  height: 5rem;

  display: flex;
  align-items: center;

  color: white;

  .button {
    margin-left: 1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    border: 2px solid white;
    border-radius: 2px;

    user-select: none;
    cursor: pointer;

    color: white;
    background: $oc-blue-6;

    font-weight: 600;

    &:hover {
      background: $oc-blue-7;
    }

    &:active {
      background: $oc-blue-8;
    }
  }

  .right {
    margin-left: auto;
    margin-right: 1rem;
  }
}
</style>