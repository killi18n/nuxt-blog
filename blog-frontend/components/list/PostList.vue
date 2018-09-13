<template>
    <div class="post-list">
        <div class="wrapper" v-for="post in list" :key="post._id">
            <post-item :post="post"/>
        </div>
    </div>
</template>

<script>
import PostItem from "@/components/list/PostItem";
export default {
  props: ["list"],
  components: {
    PostItem
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.wrapper + .wrapper {
  border-top: 1px solid $oc-gray-3;
}
</style>