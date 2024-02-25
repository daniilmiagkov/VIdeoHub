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
  <footer class="footer">
    <div class="footer-content">
      <ul class="contact-info">
        <li>Телефон: +79375740016</li>
        <li>E-mail: info@hirus.life</li>
        <li>Сайт: <a href="https://hirus.life/" target="_blank">hirus.life</a></li>
      </ul>
      <!-- Здесь может быть код для кнопок "Поделиться" в социальных сетях -->
    </div>
  </footer>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.main-page {
  height: 100%;
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

.title {
  margin-bottom: 20px;
  font-weight: normal;
}
.footer {
  padding: 20px 0;
  text-align: center;
  bottom: 0;
  flex-shrink: 0;

}
.footer-content {
  font-size: 14px;
  max-width: 1200px;
  margin: 0 auto;
}
a {
  color: black;
}
.contact-info {
  list-style-type: none;
  padding: 0;
}

.contact-info li {
  margin-bottom: 5px;
}


</style>
