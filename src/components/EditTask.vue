<template xmlns="http://www.w3.org/1999/html">
  <div v-show="modal.show" class="edit-task" @show="handleShow">
    <div class="edit-task__header">
      <h1 class="edit-task__title"></h1>
      <button
          class="
        edit-task__button-close
        button"
          @click="closeModal">Закрыть</button>
    </div>
    <form class="edit-task__form" @submit.prevent="submitForm" action="http://localhost:3000/database/lab" method="post">

      <div class="input" for="input-title">
        <span class="input__title">Предмет</span>
<!--        <span class="input__title">{{}}</span>-->
        <span class="input__title">{{(lab && 'Subject' in lab)  ? lab.Subject : "NOT DATA"}}</span>
      </div>
      <label class="input" for="input-title">
        <span class="input__title">Название</span>
        <input class="input__input" id="input-title" type="text"
               :readonly="!isEdit"
               v-model ="input.Title"
               :class="{
                 'input_edit': !isEdit,
                 'input_not-edit': isEdit
               }"/>
      </label>
      <label class="input" for="input-file-method">
        <span class="input__title">Методичка</span>
        <input
            class="input__input input_file"
            id="input-file-method" type="file"
            @change="loadFile(fileNameMethod, $event)"
            v-bind:readonly="!isEdit"/>
        <span class="button-file" id="button-file" >{{fileNameMethod.name }}</span>
      </label>
      <label class="input" for="input-file-lab">
        <span class="input__title">Файл</span>
        <input
            class="input__input input_file"
            id="input-file-lab" type="file"
            @change="loadFile(fileNameLab, $event)"
            v-bind:readonly="!isEdit"/>
        <span class="button-file" id="button-file">{{ fileNameLab.name }}</span>
      </label>

      <label class="input" for="input-date">
        <span class="input__title">Дата сдачи</span>
        <input class="input__input" id="input-date" type="date"
               :readonly="!isEdit"
               v-model ="input.Date"
               :class="{
                 'input_edit': !isEdit,
                 'input_not-edit': isEdit
               }"/>
      </label>
      <div class="edit-task__radiobuttons">
        <div v-for="(item, index) in lab.Types"
             class="radio__label"
             @mouseover="hoverHandler(index)"
             @mouseout="hoverHandler(null)">
          <label>
            <Square
                class="radio__text"
                :Type = "item"
                :isRadio = "Type"
                :Index = "index"
                :Info = "item"
                @click="changeRadio(item)"
            />
          </label>
<!--          <div :class="{
            'radio_hover': isHover === index,
            'radio_non-hover': isHover !== index
          }">{{item}}</div>-->
        </div>

      </div>
      <button
          :class="{'visible': isEdit, 'hide': !isEdit}"
          class="edit-task__button-edit button"
          @click="save()"
          type="submit" value="Отправить">Отправить</button>
      <button
          :class="{'visible': !isEdit, 'hide': isEdit}"
          class="edit-task__button-edit button"
          @click="edit()"
      type="button">Редактировать
      </button>
    </form>


  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref, watch, defineEmits} from "vue";
import Square from "./Square.vue";
import {Lab} from "../../backend/types/Subject";
const modal = inject('modal');
const submit = inject('submit');
const isHover = ref();
const lab = ref(new Lab())
const isEdit = ref(false);
const labEdit = ref({})
const input = ref(new Lab())
const oldValue = ref({});
const Type = ref();
const fileNameMethod = ref({name: ""});
const fileNameLab = ref({name: ""});

onMounted(()=> {
  watch(() => modal.value.data, (newValue, oldValue) => {
    if (newValue) {
      // console.log(modal.value.data)
      handleShow();
    }
  });
  watch(input, (newValue, oldValue) => {
  });
})

function save() {
  isEdit.value = false;
}

function submitForm(event) {
  event.preventDefault();
  if (JSON.stringify(input.value) !== JSON.stringify(oldValue.value) ) {
    fetch(`http://localhost:3000/database/lab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(input.value)
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response;
        })
        .then(data => {
          console.log('Response received:', data);
          // emit('submit', input.value);
          submit.value.data = input.value;

        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    oldValue.value = Object.assign({}, input.value)
  }

}
function changeRadio(item) {
  if (isEdit.value) {
    Type.value = item;
    input.value.Type = item;
  }
}

function edit() {
  isEdit.value = true;
  // console.log(isEdit)
}
function hoverHandler(index) {
  this.isHover = index;
}
function closeModal() {
  modal.value.show = false;
};
function loadFile(fileName, event) {
  const file = event.target.files[0];
  console.log(event)
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      fileName.name = file.name;
      // console.log(fileName);
      // console.log("Имя файла:", fileNameLab.value);
    };
    reader.onerror = function(error) {
      console.error("Ошибка чтения файла:", error);
    };
    reader.readAsText(file);
  }
}
function handleShow() {
  // Ваш код для выполнения при отображении компонента
  lab.value = modal.value.data;
  Type.value = lab.value.Type;
  input.value = Object.assign({}, lab.value)
  oldValue.value = Object.assign({}, lab.value)
  // console.log(input.value, lab)

  // console.log("lab")
};
</script>

<style scoped lang="scss">
@import "../css/colors.scss";

.input_edit {
  color: $gray-6;
}
.input_not-edit {
  color: $black;
}
.hide {
  display: none;
}
.visible {
  display: block;
}
.radio_non-hover {
  opacity: 0;
  position: absolute;

}
.radio__label{
  display: flex;
  align-items: center;
  justify-content: center;
}
.radio_hover {
  opacity: 1;
  transition: opacity 0.4s cubic-bezier(0.5,0,1,1);
  position: absolute;

  margin-top:-45px;
  margin-left:105px;
  transform: translate(-20px, 0);
  z-index: 99999;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: $gray-1;
  color: $gray-6;
  display: block;
}
.edit-task__radiobuttons {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(5, 60px);
  width: 80%;
  justify-items: center;
  margin: 30px 0;

}
.radio__text {
  width: 3em;
  height: 3em;
  max-width: 60px;
  max-height: 60px;
  border-radius: 10px;
}
input[type='radio'] {
  //display: none;
}
.edit-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  flex-shrink: 0;
  /*max-width: 400px;*/
  margin: 10px auto;
  width: 80%;
  max-width: 500px;
  //height: 50%;
  position: fixed;
  top: 15%;
  z-index: 9000;
  background-color: $color-primary-light-1;
  //background-color: $white;
  border: 7px outset $color-primary-light-1;
}
.edit-task__header {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  width: 90%;
}
/*.input__input:focus {
  border-bottom: 2px solid black;
  height:36px;

}*/
input {
  outline: none;
}
.edit-task__button-close, .edit-task__button-edit {
  /*margin: 10px 0;*/
  /*height: 60px;*/
  border-radius: 10px;
  font-size: 1em;
}
.edit-task__button-edit {
  margin: 10px;
  width: 200px;

}
.edit-task__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  justify-content: space-between;
}
.input__title {
  font-weight: bold;
}
.input_file {
  display: none;
}
.button-file {
  cursor: pointer;
  color: black;
  z-index: 5;
  /*vertical-align: bottom;*/
  vertical-align: baseline; /* Изменено значение на baseline */
  display: inline-flex;
  align-items: center;

}
.input__input, .button-file, .input_file {
  background-color: white;
  width: 70%;
  height: 100%;
  border-radius: 10px;
  padding: 5px 10px;
  font-family: inherit;
  font-size: 1em;
}
.input {
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0px 0 20px;
}


</style>
