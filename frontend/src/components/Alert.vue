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
      {{action.toUpperCase()}}
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
      if(this.action === 'cancel')
        this.$emit('cancel');
      if(this.action === 'delete')
        this.$emit('delete');
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
}

.container {
    color: black;
}

</style>