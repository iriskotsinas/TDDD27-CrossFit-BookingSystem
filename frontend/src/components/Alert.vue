<template>
  <div class="alert">
    <div 
      class="cancel"
      @click="$emit('show')"
    >
      X
    </div>
    Are you sure you want to {{ action }} this session?
    <button
      class="delete-btn"
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
  width: 25em;
  height: 10em;
  transform: translate(-50%, -50%);
  background-color: $grey-color;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

button {
  box-sizing: border-box;
  appearance: none;
  background-color: black !important;
  border: 2px solid #fff;
  border-radius: 0.6em;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  padding: 0.5em 0.5em;
  width: 10em;
  height: 3em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin: 0 1.5em;
  
  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    /* transform: translateX(-50%); */
    width: 0;
    height: 100%;
    background: red;
    z-index: -1;
    transition: width 150ms ease-in-out;
  }
  
  &:hover {
    color: #000;
    &:after {
      width: 110%;
    }
  }
}

.cancel {
  text-align: right;
  margin: 1em 1em 0 0;
  color: red;
  z-index: 1;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
}

.delete-btn {
  border-color: red;
  margin: 1em auto;
  border-radius: 0.1;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 150ms ease-in-out;
  background: red !important;

  &:after {
    background: black;
  }
  
  &:hover {
    color: red;
    &:after {
      width: 110%;
    }
  }
}

</style>