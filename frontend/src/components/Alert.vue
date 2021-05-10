<template>
  <div class="alert">
    <button 
      @click="$emit('show')"
    >
      Close Window
    </button>
    <button 
      @click="onAction"
    >
      {{ action.toUpperCase() }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    action: {
      type: String,
      default: undefined
    }
  },
  emits: ['cancel', 'show', 'delete'],
  methods: {
    onAction: function(){
        this.$emit(this.action);
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
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