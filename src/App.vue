<template>
  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import { ref } from "vue";
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
      console.log(todo);
      todos.value.push(todo);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      todoStyle,
      addTodo,
      deleteTodo,
    };
  },
};
</script>

<style>
.todo {
  color: grey;
  text-decoration: line-through;

  text-align: center;

  text-transform: capitalize'center;
}
</style>
rtd;;dn이.유중  
내 이름으웅피]ㅠㅣㅇㄿ후ㅏㄹ피사 로ㅡㅎㅅ  