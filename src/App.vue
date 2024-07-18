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
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#"> Previous </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
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

    const getTodos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/todos?_page=1&_limit=5"
        );
        console.log(res.headers);
        // comming soon
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };
    getTodos();

    const addTodo = async (todo) => {
      error.value = "";
      // 데이터베이스 투두를 저장 <- axios를 이용하여 post request를 보냄
      // 데이터 베이스 실행 명령어 : npx json-server db.json
      try {
        const res = await axios.post("http://localhost:3000/todos", {
          // id는 자동으로 추가됨.
          subject: todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
      console.log("hello");
    };

    const deleteTodo = async (index) => {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
    };

    const toggleTodo = async (index) => {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: !todos.value[index].completed,
        });
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
      }
      todos.value[index].completed = !todos.value[index].completed;
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
