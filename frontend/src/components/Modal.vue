<template>
  <div class="modal">
    <button
      class="close"
      @click="$emit('show')"
    >
      CLOSE HERE
    </button>
    <div
      v-for="user in users"
      :key="user._id"
      class="container"
    >
      {{ user.firstname }}
      {{ user.lastname }}
      {{ user.email }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    users: {
      type: Object,
      default: null
    }
  },
  emits: ['show']
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vh;
  transform: translate(-50%, -50%);
  background: white;
  color: black;
  z-index: 1000;
}

.container {
    color: black;
}

</style>