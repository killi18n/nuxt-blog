<template>
    <div class="page-header">
        <nuxt-link to="/" class="logo">
            Nuxt-Blog
        </nuxt-link>
        <div class="right" v-show="$store.state.base.logged">
            <nuxt-link to="/editor" class="button">글 작성</nuxt-link>
            <nuxt-link 
                v-if="$store.state.base.isPost"
                :to="{ name: 'editor', query: {id: this.$route.params.id}}" 
                class="button">글 수정</nuxt-link>
            <div 
                v-if="$store.state.base.isPost"
                to="/editor" 
                class="button"
                 @click="showModal">글 삭제</div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$store.commit("base/showModal", "remove");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.page-header {
  height: 5rem;
  display: flex;
  align-items: center;
  background: $oc-blue-5;

  .logo {
    padding: 1rem;
    font-size: 1.5rem;
    color: white;
    font-weight: 600;
    user-select: none;
  }

  .right {
    display: flex;
    margin-left: auto;
    margin-right: 1rem;
    // width: 10rem;

    .button {
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

    .button + .button {
      margin-left: 1rem;
    }
  }
}
</style>