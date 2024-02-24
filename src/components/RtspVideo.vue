<template>
  <div>
    <video class="video" controls autoplay>
      <source src="http://localhost:3000/stream" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.video {
  width: 80%;
}
</style>
