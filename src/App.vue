<template>
  <div class="container">
    <h4>count: {{ count }}</h4>
    <h4>doble count: {{ doubleCountComputed }}</h4>
    <h4>doble count: {{ doubleCountComputed }}</h4>
    <h4>doble count: {{ doubleCountMethod() }}</h4>
    <h4>doble count: {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add one</button>
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const todoStyle = {
      textDecoration: "line-through",
      color: "grey",
    };

    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    // computed 와 함수의 차이점 비교
    const count = ref(1);

    // 결과를 캐싱함.
    const doubleCountComputed = computed(() => {
      console.log("computed"); // 한 번만 출력됨.
      return count.value * 2;
    });

    // 함수는 인자를 받아서 함수 내에서 사용할 수 있다.
    // 렌더링할 때마다 함수를 실행한다.
    const doubleCountMethod = () => {
      console.log("method"); // 두번 출력됨
      return count.value * 2;
    };

    return {
      todos,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
      count,
      doubleCountComputed,
      doubleCountMethod,
    };
  },
};
</script>

<style>
.todo {
  color: grey;
  text-decoration: line-through;

  text-align: center;
}
</style>
