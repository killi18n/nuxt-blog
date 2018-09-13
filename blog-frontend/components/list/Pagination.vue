<template>
    <div class='pagination'>
    <nuxt-link 
        v-if="parseInt(page, 10) !== 1" 
        :to="{name: 'index', query: {tag: tag, page: page - 1}}" 
        class="button">
      이전 페이지
    </nuxt-link>
    <div class="button gray" v-else> 
        이전 페이지
    </div>
    <div class='number'>
      페이지 {{page}}
    </div>
    <nuxt-link 
        v-if="parseInt(page, 10) !== parseInt(lastPage, 10)" 
        :to="{name: 'index', query: {tag: tag, page: parseInt(page, 10) + 1}}" 
        class="button">
      다음 페이지
    </nuxt-link>
    <div class="button gray" v-else> 
        다음 페이지
    </div>
  </div>
</template>

<script>
export default {
  props: ["page", "lastPage", "tag"]
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.pagination {
  margin-top: 2rem;

  // 세로 중앙 정렬
  display: flex;
  align-items: center;

  .number {
    font-size: 0.85rem;
    text-align: center;
    color: $oc-gray-6;
    flex: 1; // 남은 공간을 다 차지
  }
  .button {
    background: $oc-blue-5;
    color: white;
    padding-right: 0.25rem;
    padding-left: 0.25rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;

    font-weight: 600;
    cursor: pointer;

    user-select: none;

    &:hover {
      background: $oc-blue-6;
    }

    &:active {
      background: $oc-blue-7;
    }
  }

  .gray {
    background: $oc-gray-5;

    &:hover {
      background: $oc-gray-5;
    }

    &:active {
      background: $oc-gray-5;
    }
  }
}
</style>