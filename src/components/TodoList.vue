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
            class="ml-2 mr-2"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <span :class="{ todo: todo.completed }">{{ todo.subject }}</span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(todo.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
import { useRouter } from "vue-router";
import Modal from "@/components/DeleteModal.vue";
import { ref } from "vue";

export default {
  components: {
    Modal,
  },

  props: {
    todos: {
      type: Array,
      required: true,
    },
  },

  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit("delete-todo", todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
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
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>

<style></style>
