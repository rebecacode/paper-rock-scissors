<template>
  <div class="board">
    <PentagonIcon class="board__icon-background" />
    <div class="board__options">
      <router-link class="full-row" :to="{ name: 'bonus-game', params: { bet: 'scissors' } }">
        <BoardOption bet="scissors" />
      </router-link>
      <router-link class="spock" :to="{ name: 'bonus-game', params: { bet: 'spock' } }">
        <BoardOption bet="spock" />
      </router-link>
      <router-link class="paper" :to="{ name: 'bonus-game', params: { bet: 'paper' } }">
        <BoardOption bet="paper" />
      </router-link>

      <router-link class="lizard" :to="{ name: 'bonus-game', params: { bet: 'lizard' } }">
        <BoardOption bet="lizard" />
      </router-link>
      <router-link class="rock" :to="{ name: 'bonus-game', params: { bet: 'rock' } }">
        <BoardOption bet="rock" />
      </router-link>
    </div>
  </div>
</template>

<script>
import PentagonIcon from '@/assets/icons/bg-pentagon.svg';
import BoardOption from '@/components/BoardOption.vue';

export default {
  name: 'OptionsBonus',
  components: {
    PentagonIcon,
    BoardOption,
  },
  created() {
    this.$store.commit('updateCurrentGame', 'bonus');
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
    max-height: 65%;
    padding: 0 1rem;
    margin-top: 1rem;
    margin-left: 2rem;

    @include bp-md-tablet {
      max-height: 80%;
      padding: 0 3rem;
      margin-top: 8rem;
    }
  }

  &__options {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    @include bp-xs-phone {
      grid-template-columns: repeat(3, 1fr);
    }

    @include bp-md-tablet {
      grid-template-columns: 2fr 1fr 2fr;
      gap: 0.2rem 5rem;
    }

    .full-row {
      justify-self: center;

      @include bp-xs-phone {
        grid-column: 1 / span 3;
      }

      @include bp-md-tablet {
        grid-column: 1 / span 3;
      }
    }

    .spock {
      grid-column-start: 1;
      justify-self: flex-start;
    }

    .paper {
      grid-column-start: 3;
      justify-self: flex-end;
    }

    .lizard {
      grid-column-start: 1;
      justify-self: center;
    }

    .rock {
      grid-column: 3;
      justify-self: flex-end;
    }
  }
}
</style>
