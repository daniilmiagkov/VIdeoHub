<template>
  <div class="user-profile">
    <h1>Личный кабинет пользователя</h1>
<!--    <div class="profile-info">
      <h2>{{ user.name }}</h2>
      <p><strong>Возраст:</strong> {{ user.age }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Телефон:</strong> {{ user.phone }}</p>
    </div>
    <div class="medical-history">
      <h2>Медицинская история</h2>
      <ul>
        <li v-for="record in medicalHistory" :key="record.id">
          <p><strong>Дата:</strong> {{ record.date }}</p>
          <p><strong>Описание:</strong> {{ record.description }}</p>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';

const user = ref({
  name: 'Иван Иванов',
  age: 35,
  email: 'ivan@example.com',
  phone: '+7 (123) 456-7890'
});

const medicalHistory = ref([
  { id: 1, date: '01.01.2024', description: 'Посещение терапевта' },
  { id: 2, date: '15.02.2024', description: 'Анализы крови' },
  { id: 3, date: '20.02.2024', description: 'УЗИ органов брюшной полости' }
]);
onMounted(() => {

})
</script>

<style scoped lang="scss">
.user-profile {
  max-width: 600px;
  margin: 0 auto;
}

.profile-info {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.medical-history {
  margin-top: 20px;
}

.medical-history li {
  margin-bottom: 15px;
}

.medical-history li p {
  margin: 5px 0;
}
</style>
