<template>
  <div class="home">
    <router-link :to="{ name: 'board-classic', params: { type: 'classic' } }">
      <HeaderScore typeGame="classic" :score="score" />
    </router-link>
    <router-link :to="{ name: 'board-bonus', params: { type: 'bonus' } }">
      <HeaderScore typeGame="bonus" :score="score" />
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderScore from '@/components/HeaderScore.vue';

export default {
  name: 'Home',
  components: {
    HeaderScore,
  },
  data() {
    return {
      score: {
        classic: 0,
        bonus: 0,
      },
    };
  },
  mounted() {
    this.classic = this.$store.state.classic || this.$attrs.classic;
    this.bonus = this.$store.state.bonus || this.$attrs.bonus;
  },
  created() {
    if (localStorage.getItem('score')) {
      const localScore = JSON.parse(localStorage.getItem('score'));
      this.$store.commit('updateScore', { type: '', score: localScore });
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
</style>
