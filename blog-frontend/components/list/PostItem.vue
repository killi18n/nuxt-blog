<template>
    <div class='post-item'>
      <h2><nuxt-link :to="{name: 'post-id', params: {id: post._id}}">{{post.title}}</nuxt-link></h2>
      <div class='date'>{{date}}</div>
      <p>{{body}}</p>
      <div class='tags'>
        <div v-for="tag in post.tags" :key="tag">
            <nuxt-link :to="{name: 'index', query: {tag}}">#{{tag}}</nuxt-link>
        </div>
      </div>
    </div>
</template>

<script>
import moment from "moment";
import removeMd from "remove-markdown";
export default {
  props: ["post"],
  computed: {
    date() {
      return moment(this.$props.post.publishedDate).format("ll");
    },
    body() {
      return removeMd(this.$props.post.body);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.post-item {
  padding: 1.5rem;
  transition: all 0.15s ease-in;
  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    color: $oc-gray-8;
    a {
      transition: all 0.15s ease-in; // 스타일 바뀔 때 애니메이션 효과
      border-bottom: 1px solid transparent;
    }
    a:hover {
      color: $oc-blue-6;
      // 마우스 호버시 밑줄 (밑줄과 글자 사이 여백, 얇은 밑줄을 위해 border-bottom 사용)
      border-bottom: 1px solid $oc-blue-6;
    }
  }
  .date {
    font-size: 0.85rem;
    color: $oc-gray-5;
  }
  p {
    font-weight: 300;
    color: $oc-gray-7;
    word-wrap: break-word;
  }
  .tags {
    font-size: 0.85rem;
    color: $oc-blue-6;
    a {
      &:hover {
        color: $oc-blue-5;
        text-decoration: underline;
      }
    }
    a + a {
      // 태그 사이 여백
      margin-left: 0.25rem;
    }
  }
  &:hover {
    // 호버시 배경색 변경
    background: rgba($oc-blue-6, 0.05);
  }
}
.post-item + .post-item {
  // 아이템 사이 여백
  border-top: 1px solid $oc-gray-3;
}
</style>