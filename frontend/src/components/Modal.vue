<template>
  <div class="modal">
    <div
      class="cancel"
      @click="$emit('show')"
    >
      X
    </div>
    <div class="userHeading">
      Users signed up for session:
    </div>
    <div
      v-for="user in users"
      :key="user._id"
      class="container"
    >
      <div class="user">
        {{ user.firstname }} {{ user.lastname }}
      </div>
      <div class="user">
        {{ user.email }}
      </div>
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
  width: 50vw;
  height: 50vh;
  transform: translate(-50%, -50%);
  padding: 2em;
  background: white;
  color: black;
  z-index: 1000;
  background-color: $grey-color;
}

.container {
  color: white;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 0.5em;
  border-bottom: 1px solid white;
}

.userHeading {
  font-weight: bold;
  color: white;
  margin-bottom: 1em;
}

.cancel {
  text-align: right;
  color: red;
  z-index: 1;
  font-size: 30px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}

</style>