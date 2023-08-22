import { reactive } from 'vue';

const data = reactive([
  {
    id: 'main',
    name: 'Мой день',
    tasks: [],
    completedTasks: []
  }
]);

export function addList(item) {
  data.length = 0;
  data.push(...item);
  console.log(data);
}

export default data;
