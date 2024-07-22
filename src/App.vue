<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    // a태그가 아닌 router-link를 사용하면 페이지 리로딩 없이 페이지를 이동할 수 있다.
    <router-link class="navbar-brand" to="/">Lee's Todo List</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/todos">Todos</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<script>
export default {};
</script>

<style></style>
