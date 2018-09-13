<template>
  <div>
    <page-header v-if="!$store.state.base.isEditor" />
    <editor-header v-else />
    <main>
      <nuxt/>
    </main>
    <page-footer v-show="!$store.state.base.isEditor" />
    <modal-wrapper v-if="$store.state.base.modalStatus.adminLogin || $store.state.base.modalStatus.remove" />
  </div>
</template>


<script>
import PageHeader from "@/components/common/PageHeader";
import EditorHeader from "@/components/editor/EditorHeader";
import PageFooter from "@/components/common/PageFooter";
import ModalWrapper from "@/components/modal/ModalWrapper";
export default {
  components: {
    PageHeader,
    PageFooter,
    ModalWrapper,
    EditorHeader
  },
  mounted() {
    this.checkLogged();
    this.checkEditorPage();
    this.checkPostPage();
  },

  watch: {
    $route: function() {
      this.checkEditorPage();
      this.checkPostPage();
    }
  },
  methods: {
    async checkLogged() {
      if (localStorage.logged === "true") {
        this.$store.commit("base/tempLogin");
      }
      try {
        await this.$store.dispatch("base/check");
      } catch (e) {
        console.log(e);
      }
    },
    checkEditorPage() {
      if (this.$route.name === "editor") {
        this.$store.commit("base/setEditorPage", true);
      } else {
        this.$store.commit("base/setEditorPage", false);
      }
    },
    checkPostPage() {
      if (this.$route.name === "post-id") {
        this.$store.commit("base/setPostPage", true);
      } else {
        this.$store.commit("base/setPostPage", false);
      }
    }
  }
};
</script>


<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 15rem);
}
</style>