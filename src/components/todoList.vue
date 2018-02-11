<template>
  <ul class="todoList">
    <li><b>{{title}} :</b></li>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: ['title'],
  mounted: function() {
    this.$nextTick(function(){
      console.log(this.title)
    }.bind(this));
  }
}
</script>