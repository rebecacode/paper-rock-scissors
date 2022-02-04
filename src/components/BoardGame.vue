<template>
  <div class="container">
    <section :class="[showWinner ? 'game--extended' : '', 'game']">
      <article :class="[message === 'player' ? 'circle--winner' : '', 'player', 'player__bet']">
        <h2 class="title uppercase">You picked</h2>
        <BoardOption :bet="bet" :class="[message === 'player' ? 'circle--bet' : '']" />
      </article>
      <article class="message" v-if="showWinner">
        <h1 class="uppercase title title--winner">
          {{ message === 'player' ? 'You win' : message === 'house' ? 'You lose' : "It's a tie" }}
        </h1>
        <button
          :class="[message === 'house' ? 'color--house' : 'color--winner', 'button', 'uppercase']"
          @click="goBoard"
        >
          Play again
        </button>
      </article>
      <article :class="[message === 'house' ? 'circle--winner' : '', 'player', 'player__house']">
        <h2 class="title uppercase">The house picked</h2>
        <!-- TODO:
        become cursor: auto -->
        <BoardOption v-if="betHouse" :bet="betHouse" :class="[message === 'house' ? 'circle--bet' : '']" />
        <BoardOption v-else :bet="betHouse" />
      </article>
    </section>
  </div>
</template>

<script>
import BoardOption from '@/components/BoardOption.vue';
import getRandomBet from '@/helpers/apiBet';
import getRouteName from '@/helpers/functions';

export default {
  name: 'BoardGame',
  components: {
    BoardOption,
  },
  data() {
    return {
      bet: 'paper',
      betHouse: '',
      message: '',
      showWinner: false,
      score: {
        classic: 0,
        bonus: 0,
      },
      routeName: '',
    };
  },
  methods: {
    getBetHouse() {
      setTimeout(() => {
        this.betHouse = getRandomBet(this.$store.state.currentGame);
        this.checkWinner();
      }, 1000);
    },
    checkWinner() {
      if (this.bet === this.betHouse) {
        this.message = 'tie';
        this.score = { ...this.score };
      } else if (
        (this.bet === 'paper' && this.betHouse === 'rock') ||
        (this.bet === 'rock' && this.betHouse === 'scissors') ||
        (this.bet === 'scissors' && this.betHouse === 'paper') ||
        (this.bet === 'lizard' && this.betHouse === 'spock') ||
        (this.bet === 'spock' && this.betHouse === 'scissors') ||
        (this.bet === 'rock' && this.betHouse === 'lizard') ||
        (this.bet === 'paper' && this.betHouse === 'spock') ||
        (this.bet === 'scissors' && this.betHouse === 'lizard') ||
        (this.bet === 'spock' && this.betHouse === 'rock') ||
        (this.bet === 'lizard' && this.betHouse === 'paper')
      ) {
        this.message = 'player';
        if (this.$store.state.currentGame === 'classic') {
          this.score.classic += 1;
        } else {
          this.score.bonus += 1;
        }
      } else {
        this.message = 'house';
        if (this.$store.state.currentGame === 'classic') {
          this.score.classic -= 1;
        } else {
          this.score.bonus -= 1;
        }
      }

      this.$store.commit('updateScore', { type: this.$store.state.currentGame, score: this.score });
      this.showWinner = true;

      localStorage.setItem('score', JSON.stringify(this.$store.state));
    },
    goBoard() {
      this.routeName = getRouteName(this.$route.name);
      this.$router.push({
        name: this.routeName,
      });
    },
  },
  created() {
    this.bet = this.$route.params.bet;
    this.score.classic = this.$store.state.classic;
    this.score.bonus = this.$store.state.bonus;
  },
  mounted() {
    this.getBetHouse();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 68vh;

  @include bp-md-tablet {
    height: 63vh;
  }
}

.game {
  min-width: 40vw;
  margin-top: 3rem;

  .player__bet {
    grid-area: player__bet;
  }

  .player__house {
    grid-area: player__house;
  }

  @include bp-xs-phone {
    display: grid;
    grid-template-areas:
      'player__bet player__house'
      'message--winner  message--winner';
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 4rem;
    align-items: center;
  }

  @include bp-md-tablet {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    min-width: 40vw;
    margin-top: 3rem;
  }

  &--extended {
    min-width: 60vw;
  }
}

.title {
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #fff;
  text-align: center;

  @include bp-xs-phone {
    order: 1;
  }

  @include bp-md-tablet {
    order: 0;
    margin-top: 0;
    margin-bottom: 3rem;
    font-size: 1.5rem;
  }
}

.title--winner {
  order: 0;
  margin-bottom: 1rem;
  font-size: 3.5rem;

  @include bp-md-tablet {
    margin-bottom: 2rem;
    font-size: 4rem;
  }
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message {
  @include bp-xs-phone {
    display: grid;
    grid-area: 'message--winner';
    grid-row: 2 / span 2;
    grid-column: 1 / span 2;
    margin-top: 3rem;
  }

  @include bp-md-tablet {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}

.button {
  place-self: center;
  width: 65%;
  padding: 1.4rem 5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 1rem;
  transition: all 0.4ms ease-in;

  @include bp-md-tablet {
    width: 100%;
    padding: 1.5rem 6rem;
  }

  &:hover {
    color: $color-score;
    background-color: #fff;
  }
}

.color {
  &--winner {
    color: $background;
  }

  &--house {
    color: $rock-gradient-from;
  }
}

.circle {
  &--bet {
    position: relative;
    z-index: -10;
    padding: 0.1rem 1.4rem 0.3rem 1.8rem;
    background-color: rgba(255, 255, 255, 0.06);
    border-radius: 50%;

    @include bp-md-tablet {
      padding: 2rem 5rem 3.5rem 5rem;
    }

    &::before {
      position: absolute;
      top: -2rem;
      left: -2.5rem;
      z-index: -10;
      width: 21rem;
      height: 22rem;
      content: '';
      background-color: rgba(255, 255, 255, 0.04);
      border-radius: 50%;

      @include bp-md-tablet {
        top: -6rem;
        left: -6rem;
        width: 38rem;
        height: 38rem;
      }
    }

    &::after {
      position: absolute;
      top: -4.6rem;
      left: -5.6rem;
      z-index: -10;
      width: 28rem;
      height: 28rem;
      content: '';
      background-color: rgba(255, 255, 255, 0.02);
      border-radius: 50%;

      @include bp-md-tablet {
        top: -12rem;
        left: -12rem;
        width: 50rem;
        height: 50rem;
      }
    }
  }
}
</style>
