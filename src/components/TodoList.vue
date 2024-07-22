<template>
  <div>
    <!-- 이전 노트북에서는 오류 안나왔었는데 갑자기 no-multiple-template-root 떠서 div 추가. -->
    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(todo.id)"
      >
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <label class="form-check-label" :class="{ todo: todo.completed }">{{
            todo.subject
          }}</label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },

  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      // router.push("/todos/" + todoId);
      router.push({
        // 코드의 재사용성, 유지 보수를 위해
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    };
  },
};
</script>

<style></style>
