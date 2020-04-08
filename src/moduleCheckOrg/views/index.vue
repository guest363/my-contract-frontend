<template>
  <div class="check-org">
    <custom-input
      :textLabel="`ИНН организации`"
      :placeholder="`1234567891`"
      :pattern="`[0-9]{10}`"
      :max="`9999999999`"
      v-model="inn"
      :type="`number`"
    />
    <button class="" @click.prevent="showOrgInfo">Проверить</button>
    <div v-html="htmlOrgStr"></div>
  </div>
</template>
<script>
import dadataOrgInfo from "../../assets/js/dadataOrg.js";
export default {
  data() {
    return {
      inn: "",
      orgInfo: {},
      htmlOrgStr: "",
    };
  },
  methods: {
    formatOficialInfo(info) {
      this.orgInfo.kpp = info.data.kpp;
      this.orgInfo.ogrn = info.data.ogrn;
      this.orgInfo.fullName = info.data.name.full_with_opf;
      this.orgInfo.fullAddress = info.data.address.unrestricted_value;
      this.htmlOrgStr = `<p><b>Название</b> - ${info.value || "Нет данных"}</p>
            <p><b>КПП</b> - ${info.data.kpp || "Нет данных"}</p>
            <p><b>ОГРН</b> - ${info.data.ogrn || "Нет данных"}</p>
            <p><b>ОКВЭД</b> - ${info.data.okved || "Нет данных"}</p>
            <p><b>Статус</b> - ${
              info.data.state.status === "ACTIVE" ? "функционирует" : "закрыто"
            }</p>
            <p><b>Полное имя</b> - ${info.data.name.full_with_opf ||
              "Нет данных"}</p>
            <p><b>Полный адрес</b> - ${info.data.address.unrestricted_value ||
              "Нет данных"}</p>
            <p><b>Форма правления</b> - ${info.data.opf.full ||
              "Нет данных"} (код ${info.data.opf.code})</p>
            <p><b>Руководитель</b> - ${info.data.management.name ||
              "Нет данных"}</p>
            <p><b>Телефон</> - ${info.data.phones || "Нет данных"}</p>`;
      return "Данные получены успешно";
    },
    getOficialInfo(action = () => {}) {
      return dadataOrgInfo(this.inn)
        .then((response) => {
          const info = response.data.suggestions[0] || false;
          const msg = info
            ? this.formatOficialInfo(info)
            : "Нет данных, скорее всего вы ошиблись в ИНН";
          this.showAlert("Результат", msg);
        })
        .catch((error) => {
          this.showAlert("Ошибка", `Ошибка ${error}`);
        });
    },
    showOrgInfo() {
      const inn = this.inn;
      if (this.innLength !== 10) {
        this.showAlert("Ошибка", "В ИНН должно быть 9 цифр");
      }
      this.getOficialInfo();
    },
  },
};
</script>

<style src="../css/index.less"></style>
