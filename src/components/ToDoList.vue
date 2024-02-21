<template>
  <div class="to-do-list"
       :style="{'width': width +'px'}"
  >
    <h1 class="to-do-list__title">{{subject.Title}}</h1>
    <Squares
        v-if="isLabs"
        title="Лабораторные"
        :list="labs"
    ></Squares>
    <Squares
        title="Посещения"
      :list="visits">
    </Squares>
  </div>
</template>

<script setup lang="ts">
import {defineProps, inject, onMounted, ref, watch} from "vue";
import Squares from "./Squares.vue";
import {Lab, Subject, Visit} from "../../backend/types/Subject";
const props = defineProps({
  path: String,
})
const labs = ref<Array<Lab>>([])
const visits = ref<Array<Visit>>([])
const isLabs = ref(true)
const subject = ref<Subject>(new Subject());
const submit = inject('submit')
const width = ref();
function getData(url: string) {
  return new Promise((resolve, reject) => {
    fetch(new URL(url))
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

function sortInsertItem(array, item) {
  let i;
  for (i = 0; i < array.length; i++) {
    if (array[i].Number > item.Number) {
      return;
    }
  }
  array.splice(i, 0, item);
  // console.log(array.map((item) => item.Number))
}

onMounted(() => {
  fetch(`http://localhost:3000/database/${props.path}/subject`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else {
          console.log(response)
        }
      })
      .then((data: Subject) => {
        subject.value = data;

        // console.log(subject.value)
        if (subject.value.Labs.length > 0) {
          isLabs.value = true
          for (let lab of subject.value.Labs) {
                getData(
                    `http://localhost:3000/database/${props.path}/${props.path}_${lab}`)
                    .then((data: Lab) => {
                      sortInsertItem(labs.value, data)
                    })
                    .catch((error) => {
                      console.error(error); // Обработать ошибку, если возникла
                    })
          }

          // console.log(labs.value)
        }
        else {
          // isLabs.value = false
            labs.value.push(new Lab())
        }
        if (subject.value.Visits.length > 0) {
          for (let visit of subject.value.Visits) {
            getData(
                `http://localhost:3000/database/${props.path}/${props.path}_${visit}`)
                .then((data: Visit) => {
                  sortInsertItem(visits.value, data)
                })
                .catch((error) => {
                  console.error(error); // Обработать ошибку, если возникла
                })
          }

        }
        else {
          // isLabs.value = false
          visits.value.push(new Visit())
        }
      })
      .catch((error) => console.log(error))
  changeWidth()
})
watch(() => submit.value.data, (newValue) => {

  // console.log("newValue", newValue, subject.value)
  if (newValue.Subject === subject.value.Title) {
    // console.log("newValue", newValue)

    getData(
        `http://localhost:3000/database/${props.path}/${props.path}_${newValue.FileName}`)
        .then((data) => {
          // console.log(data); // Вывести полученные данные
          for (let lab of labs.value) {
            if (lab.FileName === newValue.FileName) {
              lab = Object.assign(lab, newValue)
            }
          }
          for (let visit of visits.value) {
            if (visit.FileName === newValue.FileName) {
              visit = Object.assign(visit, newValue)
            }
          }
        })
        .catch((error) => {
          console.error(error); // Обработать ошибку, если возникла
        })
  }

});
// Обработчик изменения размера окна для определения количества столбцов
window.addEventListener('resize', () => {
  changeWidth()
});

function changeWidth() {
  // console.log(document.getElementById('all-to-do-list').)
  const w = document.getElementById('all-to-do-list').clientWidth;
  let a;
  let i;
  for (i = 1; i <= 6; i++) {
    if ((i - 1) * 20 + 350 * (i) <= w) {
      // console.log((i - 1) * 20 + 350 * (i), w, (w - (i - 1) * 20) / i)
      width.value = (w - (i - 1) * 20) / i

    }
    else {
      return;
    }
    // console.log(i)
  }

  width.value = (w - (i - 1) * 20) / i
  width.value = 200
  // console.log(w, i, width.value)
}
</script>

<style scoped lang="scss">
@import "../css/colors.scss";

.to-do-list {
  background-color: $color-primary-light-1;
  border-radius: 10px;
  height: 100%;
  //width: 100px;
  transition: width 0.2s cubic-bezier(0.82, 0.7, 0.7, 0.74);
}

.to-do-list__list {
  border-radius: 10px;
  overflow: auto;
  width: 90%;
  margin: 0 auto;
}

.to-do-list__list::-webkit-scrollbar {
  width: 0;
}

.to-do-list__title {
  margin: 20px 20px 10px;
  font-size: 1.5em;
}


</style>
