<template>
  <div class="board">
    <HeaderScore :typeGame="typeGame" :score="score" />
    <router-view />
    <FooterGame @openModal="toggleModal" @goHome="redirectHome" :score="score" />
    <ModalRules v-if="showModal" @closeModal="toggleModal" />
  </div>
</template>

<script>
import HeaderScore from '@/components/HeaderScore.vue';
import FooterGame from '@/components/FooterGame.vue';
import ModalRules from '@/components/ModalRules.vue';

export default {
  components: {
    HeaderScore,
    FooterGame,
    ModalRules,
  },
  data() {
    return {
      isPlaying: false,
      showModal: false,
      score: {
        classic: 0,
        bonus: 0,
      },
      typeGame: 'classic',
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    redirectHome() {
      this.$router.push({
        name: 'home',
      });
    },
  },
  mounted() {
    this.score.classic = this.$store.state.classic;
    this.score.bonus = this.$store.state.bonus;
    this.typeGame = this.$route.params.type || this.$store.state.currentGame;
  },
  created() {
    if (localStorage.getItem('score')) {
      const localScore = JSON.parse(localStorage.getItem('score'));
      this.$store.commit('updateScore', { type: '', score: localScore });
    }
    this.$store.commit('updateCurrentGame', this.$route.name.split('-')[1]);
  },
};
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}
</style>
