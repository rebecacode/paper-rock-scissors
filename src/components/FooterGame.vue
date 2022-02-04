<template>
  <footer class="footer">
    <button class="button uppercase" @click="$emit('goHome')">Home</button>
    <button class="button uppercase" @click="$emit('openModal')">Rules</button>
  </footer>
</template>

<script>
export default {
  name: 'FooterGame',
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 90vw;
  height: 5rem;

  @include bp-md-tablet {
    width: 65vw;
    margin-top: 2rem;
  }
}

.button {
  padding: 1rem 3rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 1rem;
  transition: all 0.4ms ease-in;

  @include bp-xs-phone {
    padding: 1.3rem 3.5rem;
    font-size: 1.4rem;
  }

  &:hover {
    color: $color-score;
    background-color: #fff;
  }
}
</style>
