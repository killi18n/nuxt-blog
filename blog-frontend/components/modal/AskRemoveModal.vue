<template>
    <div>
        <div class='question'>
            <div class='title'>포스트 삭제</div>
            <div class='description'>이 포스트를 정말로 삭제하시겠습니까?</div>
        </div>
        <div class='options'>
            <div class="button gray" @click="hideModal">취소</div>
            <div class="button red" @click="deletePost">삭제</div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    hideModal() {
      this.$store.commit("base/hideModal", "remove");
    },
    async deletePost() {
      try {
        await this.$store.dispatch("post/deletePost", {
          postId: this.$route.params.id
        });
        this.hideModal();
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.question {
  background: white;
  padding: 2rem;
  .title {
    font-size: 1.25rem;
    font-weight: 500;
  }
  .description {
    margin-top: 0.25rem;
  }
}

.options {
  padding: 1rem;
  background: $oc-gray-1;
  text-align: right;

  display: flex;
  flex-direction: row-reverse;
  //   margin-left: auto;
  .button {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .button + .button {
    margin-right: 1rem;
  }
  .gray {
    background: $oc-gray-7;

    &:hover {
      background: $oc-gray-8;
    }

    &:active {
      background: $oc-gray-9;
    }
  }

  .red {
    background: $oc-red-7;

    &:hover {
      background: $oc-red-8;
    }

    &:active {
      background: $oc-red-9;
    }
  }
}
</style>