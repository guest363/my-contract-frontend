<template>
  <div
    class="dropZone"
    v-on:dragenter="enter($event)"
    v-on:dragleave="leave($event)"
    v-on:dragover="over($event)"
    v-on:drop="drop($event)"
  >
    <form class="flex-center dropZone--form">
      <p class="dropZone--form--text">{{ data.text.main }}</p>
      <label
        v-show="data.show.button"
        class="common--button dropZone--form--button flex-center"
      >
        {{ data.text.button }}
        <input
          v-on:change="selectInput($event)"
          type="file"
          class="dropZone--hide"
          title="Загрузите одну или несколько фотографий"
          required
          multiple
          accept="rtf"
        />
      </label>
      <p v-show="data.show.limits" class="dropZone--form--text--limits">
        {{ data.text.limits }}
      </p>
    </form>
    <!-- Локальная загрузка довольна быстрая, полоса загрузки не требуется
    <progress id="dropZone--progress-bar" max=100 value=0></progress>-->
    <div class="dropZone--gallery">
      <div class="dropZone--gallery--full"></div>
    </div>
    <div id="rtfDOM"></div>
  </div>
</template>

<script>
import { EMFJS, RTFJS, WMFJS } from "rtf.js";
export default {
  name: "drag-and-drop",
  data: () => {
    return {
      image: [],
      thumbnail: [],
    };
  },
  /** Параметры для инициализации компонента
   * @param {object} data входные параметры для инициализации
   * @param {object} data.show показ\скрытие отдельных эллементов
   * @param {Boolean} data.show.button показ\скрытие кнопку выбора файлов, по умолчанию показать
   * @param {Boolean} data.show.limits показ\скрытие строки с ограничениями, по умолчанию скрыть
   * @param {object} data.text
   * @param {object} data.text.main основной текст, поясняющий что можно делать с элементом
   * @param {object} data.text.button текст для кнопки
   * @param {object} data.text.limits текст ограничений
   */
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          show: {
            button: {
              type: Boolean,
              default: true,
            },
            limits: {
              type: Boolean,
              default: false,
            },
          },
          text: {
            main: {
              type: String,
              default: "Перетащите или выберите изображение",
            },
            button: {
              type: String,
              default: "Выбрать изображения",
            },
            limits: {
              type: String,
              default: "Файлы до 2 мегабайт",
            },
          },
        };
      },
    },
  },
  methods: {
    /**
     * Прерывает дефолтные действия браузера.
     * Если вы этого не сделаете, то браузер в конечном итоге откроет
     * файл, который вы перетаскиваете, вместо того,
     * чтобы отправить его в обработчик события drop.
     */
    defaultAсtion(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    enter(event) {
      this.defaultAсtion(event);
      this.$el.classList.add("highlight");
    },
    drop(event) {
      this.leave(event);
      const files = event.dataTransfer.files; //FileList переданных файлов
      this.handleFiles(files);
    },
    leave(event) {
      this.defaultAсtion(event);
      this.$el.classList.remove("highlight");
    },
    over(event) {
      /* Аналогично событию enter */
      this.enter(event);
    },
    selectInput(event) {
      this.defaultAсtion(event);
      const files = event.target.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      /* const vm = this; */
      RTFJS.loggingEnabled(false);
      WMFJS.loggingEnabled(false);
      EMFJS.loggingEnabled(false);
      const rtf = document.getElementById("rtfDOM");
      let reader = new FileReader();

      [...files].forEach((element) => {
        reader.readAsArrayBuffer(element);
      });
      reader.onload = function() {
        console.log(reader.result);
        const doc = new RTFJS.Document(reader.result);

        const meta = doc.metadata();
        doc
          .render()
          .then(function(htmlElements) {
            console.log(meta);
            console.log(htmlElements);
            const div = document.createElement("div");
            div.append(...htmlElements);
            rtf.append(div);
          })
          .catch((error) => console.error(error));
      };
    },
  },
};
</script>

<style lang="less">
.dropZone {
  border: 2px dashed var(--grey);
  border-radius: 0px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  text-align: center;
  overflow: hidden;
  &.highlight {
    border-color: var(--button--hover--bg);
  }
  &--hide {
    width: 20px;
    height: 20px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }
}
.dropZone--form {
  margin-bottom: 10px;
  &--text {
    margin-top: 0;
    &--limits {
      font-size: 12px;
    }
  }
  &--button {
    padding: 10px;
    cursor: pointer;
    margin-top: 0;
    border: 1px solid #ccc;
    &:hover {
      background: var(--button--hover--bg);
    }
  }
}
.dropZone--gallery {
  margin-top: 10px;
  &--full {
    display: none;
    &--img {
      width: 250px;
      max-width: 100%;
      margin-bottom: 10px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  &--thumbnail {
    &--img {
      width: 150px;
      margin-bottom: 10px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>
