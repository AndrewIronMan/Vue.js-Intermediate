<template>
  <div class='flex-container'>
   <div > Posts do not exist</div>
  </div>
</template>

<script>
export default {
  name: 'PostsPlaceholderComponent',
};
</script>

<style lang="scss" scoped>
.flex-container{
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
