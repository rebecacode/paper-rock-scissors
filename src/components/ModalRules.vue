<template>
  <section class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="title uppercase">Rules</h2>
        <CloseIcon class="icon" @click="$emit('closeModal')" />
      </div>
      <RulesIcon v-if="isClassic" class="modal__rules" />
      <RulesBonusIcon v-else class="modal__rules" />
    </div>
  </section>
</template>

<script>
import RulesIcon from '@/assets/icons/image-rules.svg';
import RulesBonusIcon from '@/assets/icons/image-rules-bonus.svg';
import CloseIcon from '@/assets/icons/icon-close.svg';

export default {
  name: 'ModalRules',
  components: {
    RulesIcon,
    RulesBonusIcon,
    CloseIcon,
  },
  data() {
    return {
      isClassic: true,
    };
  },
  created() {
    // TODO: think about changing for $route.params instead of $store.state
    if (this.$store.state.currentGame === 'classic') {
      this.isClassic = true;
    } else {
      this.isClassic = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2.2rem;
  @include bp-xs-phone {
    max-width: 3rem;
  }
}

.icon {
  max-width: 2rem;
  cursor: pointer;

  @include bp-xs-phone {
    max-width: 3rem;
  }
}

// Modal
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s linear;

  @include bp-xs-phone {
    width: 90%;
    height: 90%;
  }

  @include bp-md-tablet {
    width: 100%;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 30vw;
    padding: 3rem;
    background-color: #fff;
    border-radius: 1rem;

    @include bp-xs-phone {
      position: relative;
      width: 100vw;
      height: 100vh;
    }

    @include bp-md-tablet {
      width: 30vw;
      height: 60vh;
    }
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  &__rules {
    height: 100%;
  }
}
</style>
