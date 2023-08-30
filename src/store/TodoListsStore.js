import { defineStore } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import data from '../service/service';

export const useTodoListsStore = defineStore('todoListsStore', () => {
  const lists = ref([
    {
      id: 'main',
      name: 'Мой день',
      tasks: [],
      completedTasks: []
    }
  ]);
  const searchTasks = ref([]);

  onMounted(() => {
    if (localStorage.getItem('data') === null) {
      localStorage.setItem('data', JSON.stringify(lists.value));
    }
    lists.value.splice(0, lists.value.length);
    lists.value.push(...JSON.parse(localStorage.getItem('data')));
  });
  watch(lists.value, () => {
    localStorage.setItem('data', JSON.stringify(lists.value));
    console.log('lists watch');
  });
  const getList = computed(() => {
    return (pageId) => {
      return lists.value.find((item) => item.id === pageId.value);
    };
  });

  function addList(newList) {
    lists.value.push(newList);
  }

  function deleteList(elem) {
    lists.value.splice(
      lists.value.findIndex((item) => item.id === elem.id),
      1
    );
  }

  function getFilteredTasks(searchInput) {
    searchTasks.value.splice(0, searchTasks.value.length);

    lists.value.forEach((todoList) => {
      const filteredTasksInList = todoList.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      const filteredCompletedTasksInList = todoList.completedTasks.filter(
        (task) => task.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      searchTasks.value.push(
        ...filteredTasksInList,
        ...filteredCompletedTasksInList
      );
    });
  }

  function changeTaskStateInList(currentTask, pageId) {
    if (currentTask.done === true) {
      lists.value = lists.value.map((list) => {
        const updatedTasks = list.completedTasks.map((e) =>
          e.id === currentTask.id ? currentTask : e
        );
        return { ...list, completedTasks: updatedTasks };
      });
    } else {
      lists.value = lists.value.map((list) => {
        const updatedTasks = list.tasks.map((e) =>
          e.id === currentTask.id ? currentTask : e
        );
        return { ...list, tasks: updatedTasks };
      });
    }
  }
  function deleteTasksInSearchTasks(currentTask) {
    if (currentTask.done === false) {
      lists.value = lists.value.map((list) => {
        const index = list.tasks.findIndex(
          (item) => item.id === currentTask.id
        );
        list.tasks.map((e) => {
          if (e.id === currentTask.id) {
            list.tasks.splice(index, 1);
          }
        });

        return { ...list };
      });
    } else {
      lists.value = lists.value.map((list) => {
        const index = list.completedTasks.findIndex(
          (item) => item.id === currentTask.id
        );
        list.completedTasks.map((e) => {
          if (e.id === currentTask.id) {
            list.completedTasks.splice(index, 1);
          }
        });
        return { ...list };
      });
    }
    localStorage.setItem('data', JSON.stringify(lists.value));
  }

  function switchingStateSearchTask(currentTask) {
    if (currentTask.done === true) {
      lists.value = lists.value.map((list) => {
        const index = list.tasks.findIndex(
          (item) => item.id === currentTask.id
        );
        list.tasks.map((e) => {
          if (e.id === currentTask.id) {
            list.tasks.splice(index, 1);
            list.completedTasks.push(currentTask);
          }
        });

        return { ...list };
      });
    } else {
      lists.value = lists.value.map((list) => {
        const index = list.completedTasks.findIndex(
          (item) => item.id === currentTask.id
        );
        list.completedTasks.map((e) => {
          if (e.id === currentTask.id) {
            list.completedTasks.splice(index, 1);
            list.tasks.push(currentTask);
          }
        });
        return { ...list };
      });
    }
    localStorage.setItem('data', JSON.stringify(lists.value));
  }

  function onChangeSearchTaskInTasks(currentTask) {
    if (!currentTask.done) {
      lists.value = lists.value.map((list) => {
        const updatedTasks = list.tasks.map((e) =>
          e.id === currentTask.id ? currentTask : e
        );
        return { ...list, tasks: updatedTasks };
      });
    } else {
      lists.value = lists.value.map((list) => {
        const updatedTasks = list.completedTasks.map((e) =>
          e.id === currentTask.id ? currentTask : e
        );
        return { ...list, completedTasks: updatedTasks };
      });
    }
    localStorage.setItem('data', JSON.stringify(lists.value));
  }

  return {
    lists,
    searchTasks,
    getFilteredTasks,
    getList,
    addList,
    deleteList,
    changeTaskStateInList,
    deleteTasksInSearchTasks,
    switchingStateSearchTask,
    onChangeSearchTaskInTasks
  };
});
