import { reactive } from 'vue';

const data = reactive([
  {
    id: '1',
    name: 'Мой день',
    tasks: [],
    completedTasks: []
  },
  {
    id: '2',
    name: 'SSS',
    tasks: [],
    completedTasks: []
  }
]);

export function addList(item) {
  data.length = 0; // Очищаем текущий массив
  data.push(...item); // Добавляем новые элементы
  console.log(data);
}

export default data;
