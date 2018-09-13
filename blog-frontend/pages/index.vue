<template>
  <div>
    <list-wrapper :list="list" :page="page" :lastPage="lastPage" :tag="tag" />
  </div>
</template>

<script>
import ListWrapper from "@/components/list/ListWrapper";

export default {
  components: {
    ListWrapper
  },
  data() {
    return {
      list: [],
      lastPage: null
    };
  },
  async asyncData({ store, route }) {
    try {
      await store.dispatch("post/postList", {
        page: route.query.page || 1,
        tag: route.query.tag || ""
      });
      return {
        list: store.state.post.posts,
        lastPage: store.state.post.lastPage
      };
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    page() {
      if (this.$route.query.page) {
        return this.$route.query.page;
      } else {
        return 1;
      }
    },
    tag() {
      if (this.$route.query.tag) {
        return this.$route.query.tag;
      } else {
        return "";
      }
    }
  },
  watch: {
    async page(newValue, oldValue) {
      try {
        if (this.$route.query.tag) {
          await this.$store.dispatch("post/postList", {
            page: newValue,
            tag: this.$route.query.tag
          });
        } else {
          await this.$store.dispatch("post/postList", {
            page: newValue,
            tag: ""
          });
        }

        this.list = this.$store.state.post.posts;
        this.lastPage = this.$store.state.post.lastPage;
      } catch (e) {
        console.log(e);
      }
    },
    async tag(newValue, oldValue) {
      try {
        if (this.$route.query.page) {
          await this.$store.dispatch("post/postList", {
            page: this.$route.query.page,
            tag: newValue
          });
        } else {
          await this.$store.dispatch("post/postList", {
            page: 1,
            tag: newValue
          });
        }

        this.list = this.$store.state.post.posts;
        this.lastPage = this.$store.state.post.lastPage;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>
</style>