<template>
  <div id="footer">
    <div class="time-container">
      <div class="time">
        <h3>Manned hours</h3>
        <p>Mon-Fri: 06-20</p>
        <p>Saturdays: 08-18</p>
        <p>Sundays: 10-17</p>
      </div>
      <div class="time">
        <h3>Unmanned hours</h3>
        <p>Mon-Fri: 06-23</p>
        <p>Saturdays: 08-22</p>
        <p>Sundays: 08-17</p>
      </div>
    </div>
    <div class="end">
      <hr>
      <p>Copyright SomeCompany</p>
    </div>
  </div>
</template>

<script>
export default {
name: 'Footer',
};
</script>

<style lang="scss" scoped>
#footer{
  height: auto;
  padding-top: 4em;
  color: $text-color-weak;
}
.time-container{
  display: flex;
  justify-content: space-around;
  margin:auto;
  width: 60%;
}
.time{
  padding: 2em;
}
.end{
  width: 80%;
  margin: auto;
  padding: 2em;
  hr{
    border: 1px solid $text-color-weak;
  }
}
</style>