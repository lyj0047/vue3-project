<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="type"
      v-model="searchText"
      placeholder="Search"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!filteredTodos.length">There is nothing to display</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
import axios from "axios";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref("");

    const todoStyle = {
      textDecoration: "line-through",
      color: "grey",
    };

    const addTodo = (todo) => {
      error.value = "";
      // 데이터베이스 투두를 저장 <- axios를 이용하여 post request를 보냄
      // 데이터 베이스 실행 명령어 : npx json-server db.json
      console.log("start");
      axios
        .post("http://localhost:3000/todos", {
          // id는 자동으로 추가됨.
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          console.log(res);
          todos.value.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          error.value = "Something went wrong.";
        });
      console.log("hello");
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    return {
      todos,
      error,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos,
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
