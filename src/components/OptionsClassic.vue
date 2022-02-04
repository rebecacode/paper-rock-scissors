<template>
  <div class="board">
    <TriangleIcon class="board__icon-background" />
    <div class="board__options">
      <router-link :to="{ name: 'classic-game', params: { bet: 'paper' } }">
        <BoardOption bet="paper" />
      </router-link>
      <router-link :to="{ name: 'classic-game', params: { bet: 'scissors' } }">
        <BoardOption bet="scissors" />
      </router-link>
      <router-link class="full-row" :to="{ name: 'classic-game', params: { bet: 'rock' } }">
        <BoardOption bet="rock" />
      </router-link>
    </div>
  </div>
</template>

<script>
import TriangleIcon from '@/assets/icons/bg-triangle.svg';
import BoardOption from '@/components/BoardOption.vue';

export default {
  name: 'OptionsClassic',
  components: {
    TriangleIcon,
    BoardOption,
  },
  created() {
    this.$store.commit('updateCurrentGame', 'classic');
  },
};
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  margin: 1rem;

  &__icon-background {
    position: absolute;
    z-index: -2;
    max-height: 50%;
    padding: 0 3rem;
    margin-top: 1rem;
    margin-left: 2rem;

    @include bp-md-tablet {
      max-height: 80%;
      margin-top: 8rem;
    }
  }

  &__options {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 0.1rem 6rem;

    @include bp-md-tablet {
      gap: 1rem 15rem;
    }

    .full-row {
      grid-column: 1 / span 2;
      justify-self: center;
    }
  }
}
</style>
