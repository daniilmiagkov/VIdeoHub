<template>
  <div class="main-page">
    <main class="main-content">
      <section class="activity">
        <h2 class="title">Сфера деятельности</h2>
        <p class="main-content__content">
          Программно-аппаратный комплекс «HiRus VideoMedBox Solution», который позволит создавать «умные» операционные и транслировать медицинские операции в любую точку мира в реальном времени в высоком разрешении. В зависимости от задачи, данные могут обрабатываться и сохраняться на сервере. Кроме того, система микрофонов и ПО распознавания голосовых команд от врачей (хирургов) во время операции позволит голосом управлять функционалом камер (зум) и переключением между источниками для вывода на монитор наиболее важного изображения.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.main-page {
  //height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.main-content__content {
  text-align: justify;
}

</style>
