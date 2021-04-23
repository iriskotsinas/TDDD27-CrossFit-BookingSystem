<template>
  <v-date-picker
    v-model="date"
    mode="date"
  />
  <v-date-picker
    v-model="range"
    mode="time"
    is-range
    is24hr
  />
</template>

<script>
export default ({
  name: 'Calendar',
  data(){
    return {
      date: '',
      range: {
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 23),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
    };
  }
});
</script>
