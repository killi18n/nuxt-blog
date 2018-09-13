<template>
    <div>
        <post-info
            v-if="post !== null" 
            :title="post.title" 
            :tags="post.tags"
            :publishedDate="post.publishedDate" />
        <post-body v-if="post !== null" :markdown="post.body" />
    </div>
</template>

<script>
import PostInfo from "@/components/post/PostInfo";
import PostBody from "@/components/post/PostBody";
export default {
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: this.post._id,
          name: "description",
          content: `${this.post.title} - ${this.post.body.slice(0, 200)}...`
        }
      ]
    };
  },
  components: {
    PostInfo,
    PostBody
  },
  async asyncData({ app, params, store }) {
    try {
      await store.dispatch("post/readPost", { postId: params.id });
      return {
        post: store.state.post.post
      };
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
</style>