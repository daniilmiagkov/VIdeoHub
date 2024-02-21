<template>
  <div class="list" >
    <div class="list__title" @click="isShow = !isShow">
      <h3 >{{props.title}}</h3>
      <transition-group name="main-grid" tag="div" class="list__flex">
        <Square
            v-for="(item, index) in props.list"
            :Type = "item.Type"
            :isRadio = "item.Type"
            class='list__title-element'
            :Index = "index"
            :Info = "item.Type"
            :style="{ 'transition-delay': `${index * 0.05}s` }"
            :class="{
            // 'list__grid-element': index !== props.list.length - 1,
            'list__grid_hide': index === props.list.length - 1
          } "
            :key="index"

        />
    </transition-group>
    </div>
    <transition-group name="main-grid" tag="div"
                      v-bind:class="{ list__grid_show: isShow, list__grid_hide: !isShow} ">
      <Square
          :key="index"
          v-for="(item, index) in props.list"
          :Type = "item.Type"
          :isRadio = "item.Type"
          :Add="index === props.list.length - 1"

          @click="openModal(item, index)"
          v-if="isShow"
          :class="{
            'list__grid-element': index !== props.list.length - 1,
            'list__grid-element-add': index === props.list.length - 1
          } "
          :style="{ 'transition-delay': `${index * 0.03}s` }"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import { inject } from 'vue';
import Square from "./Square.vue";
import {Lab} from "../../backend/types/Subject";

const modal = inject('modal');
const props = defineProps({
  title: String,
  list: Array
})
const openModal = (item: Lab, index: number) => {
  modal.value.show = true;
  modal.value.data = item;
  // console.log(item);
  if (index === props.list.length -1) {
    const lab = Object.assign({}, item)
    const str = lab.FileName.split('_')
    lab.FileName = str[0] + '_' + (parseInt(str[1]) + 1)
    lab.Title = str[0] + '_' + (parseInt(str[1]) + 1)

    props.list.push(lab);
  }
  // console.log(item)
};
let isShow = ref(false);

</script>

<style scoped lang="scss">
@import '../css/colors.scss';
.list {
  padding: 4px 10px 6px;
  cursor: pointer;
  width: 90%;
}

.main-grid-enter-active,
.main-grid-leave-active {
  transition: 0.2s ease;
  transition-property: opacity, transform;
}
.main-grid-enter-from,
.main-grid-leave-to {
  opacity: 0;
}
.list__title{
  //padding: 4px 10px 6px;
  padding-left: 4px;
  padding-top: 10px;
  flex-direction: row;
  display: flex;
  align-items: center;
  //justify-content: space-between;
  gap: 10px;
}

.list__flex {
  display: grid;
  //flex-direction: row;
  gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(10px, 1fr));
  //height: 10px;
  aspect-ratio: 20;
  //max-width: 200px;
  width: 100%;
}

.list__title-element {
  height: 10px;
  aspect-ratio: 1;
  border-radius: 5px;
}

.list__grid_show {
  display: grid;
  margin: 10px auto;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  //grid-template-rows: repeat(4, 1fr);
  width: 100%;
  //height: 50%;
  gap: 5px;
}

.list__grid_hide {
  display: none;
}

.list__grid-element {
  border-radius: 5px;
  aspect-ratio: 1; /* Определяет соотношение сторон, чтобы ширина и высота были в пропорции 1:1 */
  //height: 100%;
  cursor: pointer;

}
.list__grid-element-add {
  border-radius: 5px;    aspect-ratio: 1; /* Определяет соотношение сторон, чтобы ширина и высота были в пропорции 1:1 */

  //height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
