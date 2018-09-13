<template>
    <div class="post-list">
        <div v-for="post in list" :key="post._id">
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
</style>