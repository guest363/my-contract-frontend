<template>
  <div class="login__bg">
    <div class="login__wrapper">
      <div class="login--about">
        <h3>Аутентификация на портале <br />Мои Контракты</h3>
      </div>
      <div class="login--form">
        <div class="login--form--input-wrap">
          <custom-input
            :textLabel="`Логин`"
            :placeholder="`ivanov490`"
            :maxlength="`30`"
            :required="true"
            v-model="user.login"
            :type="`text`"
          />
        </div>
        <div class="login--form--input-wrap">
          <custom-input
            :textLabel="`Пароль`"
            :placeholder="`**********`"
            :maxlength="`30`"
            :required="true"
            v-model="user.password"
            :type="`password`"
          />
        </div>
        <button class="login--form--button" @click="logAction">
          {{ displayName === "" ? `Войти` : `Выйти` }}
        </button>
        <button
          @click="usbAuth"
          class="login--form--button login--form--icon-button"
        >
          <i class="fab fa-usb"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        displayName: "",
        login: "",
        password: "",
      },
    };
  },
  computed: {
    authResult() {
      return this.$store.getters.GET_AUTH_RESULT;
    },
    displayName() {
      return this.$store.getters.GET_DISPLAY_NAME;
    },
  },
  methods: {
    logAction() {
      this.displayName === "" ? this.makeLogin() : this.makeLogout();
    },
    makeLogin() {
      if (this.user.login === "" || this.user.password === "")
        return this.showAlert("Внимание", "Имя и пароль не могут быть пустыми");
      this.$store.dispatch("LOGIN", this.user);
      this.$router.push({ path: "/" });
    },
    makeLogout() {
      this.$store.dispatch("LOGOUT");
    },
    usbAuth() {
      this.showAlert("Внимание", "Аутентификация по USB токену в разработке.");
    },
  },
};
</script>

<style src="../css/index.less"></style>
