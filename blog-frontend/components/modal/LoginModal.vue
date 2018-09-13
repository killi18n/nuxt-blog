<template>
    <div class="form">
        <div class="close" @click="hideModal">&times;</div>
        <div class="title">관리자 로그인</div>
        <div class="description">관리자 비밀번호를 입력하세요.</div>
        <div class="error" v-show="$store.state.base.error">{{$store.state.base.errorMessage}}</div>
        <input 
            autofocus 
            name="adminPassword" 
            type="password" 
            placeholder="비밀번호 입력" 
            :value="$store.state.base.inputs.adminPassword" 
            @input="changeInput"
            @keypress.enter="login"/>
        <div class="login" @click="login">로그인</div>
    </div>
</template>

<script>
export default {
  methods: {
    hideModal() {
      this.$store.commit("base/hideModal", "adminLogin");
    },
    changeInput(e) {
      const { name, value } = e.target;
      this.$store.commit("base/changeInput", { name, value });
    },
    async login() {
      try {
        await this.$store.dispatch("base/login", {
          password: this.$store.state.base.inputs.adminPassword
        });
        this.hideModal();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.form {
  background: white;

  padding: 2rem;
  position: relative;
  padding-top: 2.5rem;
  width: 20rem;
  .close {
    line-height: 2rem;
    font-size: 2rem;
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    cursor: pointer;
    &:hover {
      color: $oc-gray-6;
    }
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
  }
  .description {
    margin-top: 0.25rem;
  }
  .error {
    color: $oc-red-5;
    margin-top: 0.25rem;
  }
  input {
    width: 100%;
    font-size: 1.25rem;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 1px solid $oc-gray-3;
    padding: 0.25rem;
    outline: none;
    border-radius: 4px;
  }
  .login {
    background: $oc-blue-6;
    text-align: center;
    color: white;
    font-weight: 500;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 1.25rem;
    &:hover {
      background: $oc-blue-5;
    }
    &:active {
      background: $oc-blue-6;
    }
  }
}
</style>
