<template>
    <div>
        <editor-template v-if="!this.isChecking" :markdown="markdown" />
    </div>
</template>

<script>
import EditorTemplate from "@/components/editor/EditorTemplate";
export default {
  components: {
    EditorTemplate
  },
  data() {
    return {
      isChecking: true
    };
  },
  mounted() {
    this.checkLogged();
    if (this.$route.query.id) {
      this.readPost(this.$route.query.id);
    }
  },
  beforeDestroy() {
    this.$store.commit("editor/initialize");
  },
  methods: {
    async checkLogged() {
      try {
        await this.$store.dispatch("base/check");
        if (this.$store.state.base.logged) {
          this.isChecking = false;
        } else {
          this.$router.go(-1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async readPost(postId) {
      try {
        await this.$store.dispatch("editor/readPost", {
          postId
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    markdown() {
      return this.$store.getters["editor/markdown"];
    }
  }
};
</script>

<style scoped>
</style>