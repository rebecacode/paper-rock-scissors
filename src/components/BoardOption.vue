<template>
  <div class="container__option">
    <template v-if="bet === 'paper'">
      <div class="circle circle--blue">
        <div class="circle__container">
          <PaperIcon class="circle__icon" />
        </div>
      </div>
    </template>
    <template v-else-if="bet === 'scissors'">
      <div class="circle circle--yellow">
        <div class="circle__container">
          <ScissorsIcon class="circle__icon" />
        </div>
      </div>
    </template>
    <template v-else-if="bet === 'rock'">
      <div class="circle circle--red">
        <div class="circle__container">
          <RockIcon class="circle__icon" />
        </div>
      </div>
    </template>
    <template v-else-if="bet === 'spock'">
      <div class="circle circle--cyan">
        <div class="circle__container">
          <SpockIcon class="circle__icon" />
        </div>
      </div>
    </template>
    <template v-else-if="bet === 'lizard'">
      <div class="circle circle--purple">
        <div class="circle__container">
          <LizardIcon class="circle__icon" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="circle circle--dark">
        <div class="circle__container"></div>
      </div>
    </template>
  </div>
</template>

<script>
import RockIcon from '@/assets/icons/icon-rock.svg';
import PaperIcon from '@/assets/icons/icon-paper.svg';
import ScissorsIcon from '@/assets/icons/icon-scissors.svg';
import SpockIcon from '@/assets/icons/icon-spock.svg';
import LizardIcon from '@/assets/icons/icon-lizard.svg';

export default {
  name: 'BoardOption',
  components: {
    RockIcon,
    PaperIcon,
    ScissorsIcon,
    SpockIcon,
    LizardIcon,
  },
  props: {
    bet: {
      type: String,
      required: true,
      default: 'paper',
    },
  },
};
</script>

<style lang="scss" scoped>
.container__option {
  cursor: pointer;
}

.circle {
  position: relative;
  width: ($option-size - 4);
  height: ($option-size - 4);
  padding: 2rem;
  margin: 4rem 2rem;
  background: #fff;
  border-radius: 50%;

  @include bp-md-tablet {
    width: $option-size;
    height: $option-size;
  }

  &::after {
    position: absolute;
    top: 0.4rem;
    left: 0;
    width: ($option-size - 4.2);
    height: ($option-size - 4.1);
    content: '';
    border-radius: 50%;
    box-shadow: 0.1rem -0.7rem 0.1rem 0.2rem darken(#fff, 12%);

    @include bp-md-tablet {
      top: 0.6rem;
      width: ($option-size - 0.2);
      height: ($option-size - 0.1);
    }
  }

  &__icon {
    max-height: 7rem;
    margin: 0.5rem;

    @include bp-md-tablet {
      margin: 1rem 0.5rem;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--dark {
    cursor: auto;
    background: darken($background-from, 5%);
    &::after {
      box-shadow: 0.1rem -0.7rem 0.1rem 0.2rem darken($background-from, 5%);
    }
  }

  @include set-border-color('blue', $paper-gradient-from, $paper-gradient-to);
  @include set-border-color('yellow', $scissors-gradient-from, $scissors-gradient-to);
  @include set-border-color('red', $rock-gradient-from, $rock-gradient-to);
  @include set-border-color('purple', $lizard-gradient-from, $lizard-gradient-to);
  @include set-border-color('cyan', $spock-gradient-from, $spock-gradient-to);
}
</style>
