<template>
  <div class="user-panel--login__bg">
    <div class="user-panel--login__wrapper">
      <div class="user-panel--about">
        <h3>Аутентификация на портале <br />Мои Контракты</h3>
      </div>
      <div class="user-panel--login">
        <div class="user-panel--login--input-wrap">
          <custom-input
            :textLabel="`Логин`"
            :placeholder="`ivanov490`"
            :maxlength="`30`"
            :required="true"
            v-model="user.login"
            :type="`text`"
          />
        </div>
        <div class="user-panel--login--input-wrap">
          <custom-input
            :textLabel="`Пароль`"
            :placeholder="`**********`"
            :maxlength="`30`"
            :required="true"
            v-model="user.password"
            :type="`password`"
          />
        </div>
        <button class="user-panel--login--button" @click="logAction">
          {{ displayName === "" ? `Войти` : `Выйти` }}
        </button>
        <button
          @click="showModal"
          class="user-panel--login--button user-panel--login--icon-button"
        >
          <i class="fab fa-usb"></i>
        </button>
      </div>
    </div>
    <!-- ======================== Modal ================================ -->
    <modal
      :prop="user"
      v-show="isShowModal"
      @close="closeModal"
      @createUser="createUser"
    >
      <template v-slot:header>
        <h2>Создание нового пользовател</h2>
      </template>
      <div class="user-panel--login--input-wrap">
        <custom-input
          :textLabel="`ФИО`"
          :placeholder="`Иванов Иван Иванович`"
          :maxlength="`90`"
          :required="true"
          v-model="user.displayName"
          :type="`text`"
        />
      </div>
      <div class="user-panel--login--input-wrap">
        <custom-input
          :textLabel="`Логин`"
          :placeholder="`ivanov490`"
          :maxlength="`30`"
          :required="true"
          v-model="user.login"
          :type="`text`"
          id="new--login"
        />
      </div>
      <div class="user-panel--login--input-wrap">
        <custom-input
          :textLabel="`Пароль`"
          :placeholder="`**********`"
          :maxlength="`30`"
          :required="true"
          v-model="user.password"
          :type="`password`"
          id="new--password"
        />
      </div>
      <template v-slot:footer>
        <button class="user-panel--login--button" @click="createUser">
          Создать пользователя
        </button>
      </template>
    </modal>
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
      this.$store.dispatch("LOGIN", this.user);
      this.$router.push({ path: '/' })
    },
    createUser() {
      if (this.user.login === "" || this.user.password === "")
        return this.showAlert("Внимание", "Имя и пароль не могут быть пустыми");
      const result = this.$store.commit("CREATE_USER", this.user);
      this.showAlert("Результат", this.authResult);
    },
    makeLogout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>
<style src="../css/userPanel.less"></style>
