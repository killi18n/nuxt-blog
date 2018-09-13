<template>
    <div>
        <div class='gray-background'>
          <div class='modal-wrapper'>
            <div class='modal'>
                <login-modal v-if="$store.state.base.modalStatus.adminLogin"/>
                <ask-remove-modal v-if="$store.state.base.modalStatus.remove"/>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import LoginModal from "@/components/modal/LoginModal";
import AskRemoveModal from "@/components/modal/AskRemoveModal";
export default {
  components: {
    LoginModal,
    AskRemoveModal
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils.scss";
.gray-background {
  background: rgba(100, 100, 100, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  &.enter {
    animation: fadeIn 0.25s ease-in both;
  }
  &.leave {
    animation: fadeOut 0.25s ease-in both;
  }
}
.modal-wrapper {
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .modal {
    @include material-shadow(3, 0.5);
    background: white;
    &.enter {
      animation: slideUp 0.25s ease-in both;
    }
    &.leave {
      animation: slideDown 0.25s ease-in both;
    }
  }
}
</style>