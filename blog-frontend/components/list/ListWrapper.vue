<template>
    <div class='list-wrapper'>
        <post-list :list="list" />
        <pagination :page="page" :lastPage="lastPage" :tag="tag" />
    </div>
</template>

<script>
import PostList from "@/components/list/PostList";
import Pagination from "@/components/list/Pagination";
export default {
  props: ["list", "page", "lastPage", "tag"],
  components: {
    PostList,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";

.list-wrapper {
  width: 1024px;
  margin: 0 auto;

  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @include media("<wide") {
    width: 768px;
  }
  @include media("<large") {
    width: 512px;
  }
  @include media("<medium") {
    width: 100%;
  }
}
</style>