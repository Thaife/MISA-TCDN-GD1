<template>
  <transition>
    <ul
      class="m-popover"
      id="basePopover"
      v-if="isShowPopover"
      :style="{ top: popOverY + 'px', left: popOverX + 'px' }"
    >
      <li class="popover-list" @click.prevent="onDeleteClick">Xóa</li>
      <li class="popover-list">Nhân bản</li>
      <li class="popover-list">Ngừng</li>
    </ul>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.m-popover {
  position: fixed;
  z-index: 100;
  width: 100px;
  background-color: #fff;
  border: 1px solid #babec5;
  border-radius: 2px;
  list-style: none;
  font-size: 12px;
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}

.m-popover li {
  margin: 0;
  padding: 5px 10px;
  text-align: start;
}

.m-popover li:hover {
  color: #35bf22;
  background-color: #ebedf0;
}

.list__func {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
