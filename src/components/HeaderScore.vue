<template>
  <header class="header">
    <div
      class="header__svg header__svg--classic"
      v-if="typeGame === 'classic'"
      src="./assets/icons/logo.svg"
      alt="logo-classic"
    />
    <div class="header__svg header__svg--bonus" v-else src="../assets/icons/logo-bonus.svg" alt="logo-bonus" />
    <section class="score">
      <h3 class="score__title">SCORE</h3>
      <p class="score__points">{{ typeGame === 'classic' ? this.$store.state.classic : this.$store.state.bonus }}</p>
    </section>
  </header>
</template>

<script>
export default {
  props: {
    typeGame: {
      type: String,
      required: true,
      default: 'classic',
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50vw;
  padding: 1rem 2rem 1rem 3.5rem;
  margin-bottom: 1rem;
  color: white;
  border: 0.2rem $border-color solid;
  box-shadow: 0 0 0.1rem 0.1rem $border-color;

  @include bp-xs-phone {
    width: 90vw;
    max-height: 15rem;
    padding: 1rem 1.3rem 1rem 2rem;
    margin: 2rem 3rem;
    border-radius: 1rem;
  }

  @include bp-md-tablet {
    width: 50vw;
    max-height: 20rem;
    padding: 1rem 2rem 1rem 3.5rem;
    margin: 3rem;
    border-radius: 1.5rem;
  }
  &__svg {
    min-width: 9rem;
    height: 9rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    @include bp-md-tablet {
      min-width: 12rem;
      height: 12rem;
    }

    &--classic {
      background-image: url('../assets/icons/logo.svg?external');
    }
    &--bonus {
      background-image: url('../assets/icons/logo-bonus.svg?external');
    }
  }

  .score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: #fff;
    border-radius: 0.5rem;

    @include bp-xs-phone {
      width: ($score-size - 2);
      height: ($score-size - 2);
    }

    @include bp-md-tablet {
      width: $score-size;
      height: $score-size;
    }

    &__title {
      font-size: 1.2rem;
      color: $color-title-score;
    }

    &__points {
      font-weight: bold;
      color: $color-score;

      @include bp-xs-phone {
        font-size: 4.5rem;
      }
      @include bp-md-tablet {
        font-size: 6rem;
      }
    }
  }
}
</style>
