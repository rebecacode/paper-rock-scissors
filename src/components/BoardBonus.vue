<template>
  <div class="container">
    <section :class="[showWinner ? 'game--extended' : '', 'game']">
      <article :class="[message === 'player' ? 'circle--winner' : '', 'player']">
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
      <article :class="[message === 'house' ? 'circle--winner' : '', 'player']">
        <h2 class="title uppercase">The house picked</h2>
        <BoardOption v-if="betHouse" :bet="betHouse" :class="[message === 'house' ? 'circle--bet' : '']" />
        <BoardOption v-else :bet="betHouse" />
      </article>
    </section>
  </div>
</template>

<script>
import BoardOption from '@/components/BoardOption.vue';
import getRandomBet from '@/helpers/apiBet';

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
        newest: 0,
      },
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
          this.score.newest += 1;
        }
      } else {
        this.message = 'house';
        if (this.$store.state.currentGame === 'classic') {
          this.score.classic -= 1;
        } else {
          this.score.newest -= 1;
        }
      }

      this.$store.commit('updateScore', { type: 'classic', score: this.score.classic });
      this.showWinner = true;
    },
    goBoard() {
      this.$route.push({
        name: 'board-home',
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
}

.game {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  min-width: 40vw;
  margin-top: 3rem;

  &--extended {
    min-width: 60vw;
  }
}

.title {
  margin-bottom: 3rem;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
}

.title--winner {
  margin-bottom: 2rem;
  font-size: 4rem;
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.button {
  padding: 1.5rem 6rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 1rem;
  transition: all 0.4ms ease-in;

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
  &--winner {
    position: relative;
    z-index: -10;
    padding: 0 6rem 4.2rem 6rem;
    background-color: rgba(255, 255, 255, 0.06);
    border-radius: 50%;

    &::before {
      position: absolute;
      top: -5rem;
      left: -5rem;
      z-index: -10;
      width: 43rem;
      height: 43rem;
      content: '';
      background-color: rgba(255, 255, 255, 0.04);
      border-radius: 50%;
    }

    &::after {
      position: absolute;
      top: -11rem;
      left: -11rem;
      z-index: -10;
      width: 55rem;
      height: 55rem;
      content: '';
      background-color: rgba(255, 255, 255, 0.02);
      border-radius: 50%;
    }
  }
}
</style>
