<template>
  <button class="nav--list--button">
    <router-link
      :to="param.link"
      class="nav--list--button--link"
      :class="param.inWork ? 'in-Work' : ''"
    >
      <i
        class="nav--list--button--link--icon"
        :class="param.icon"
        aria-hidden="true"
      ></i>
      <span>{{ param.text }}</span>
    </router-link>
  </button>
</template>
<script>
export default {
  props: {
    param: {
      link: String,
      icon: String,
      text: String,
      inWork: {
        default: false,
        type: Boolean,
      },
    },
  }
};
</script>
