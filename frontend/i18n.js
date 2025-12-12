import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      loging: {
        entrance: "Войти",
        username: "Ваш ник",
        password: "Пароль",
        invalidFeedback: "Неверные имя пользователя или пароль",
        noAccount: "Нет аккаунта?",
        signup: "Регистрация",
      },
      mainPage: {
        managementChannel: "Управление каналом",
        delete: "Удалить",
        rename: "Переименовать",
        exit: "Выйти",
        channels: "Каналы",
        message: "Введите сообщение...",
        newMessage: "Новое сообщение",
        send: "Отправить",
        addSymbol: "+",
      },
      modal: {
        symbols: "от 3 до 20 символов",
        require: "Обязательное поле",
        unique: "Должно быть уникальным",
        nameChannel: "Имя канала",
        cancel: "Отменить",
        areYouSure: "Уверены?",
        rename: "Переименовать",
        renameChannel: "Переименовать канал",
        addChannel: "Добавить канал",
        send: "Отправить",
        delete: "Удалить",
        deleteChannel: "Удалить канал",
      },
      notFound: {
        notFoundText: "Страница не найдена",
        text: "Но вы можете перейти",
        mainPageLink: "на главную страницу",
      },
      signup: {
        symbols: "от 3 до 20 символов",
        require: "Обязательное поле",
        mastMutch: "Пароли должны совпадать",
        symbolsPassword: "Не менее 6 символов",
        registration: "Регистрация",
        userExists: "Такой пользователь уже существует",
        errorRegistration: "Ошибка регистрации. Попробуйте снова.",
        username: "Имя пользователя",
        password: "Пароль",
        confirm: "Подтвердите пароль",
        registr: "Зарегистрироваться",
      },
      networkError: "Ошибка соединения",
      succesAdd: "Канал создан",
      succesRename: "Канал переименован",
      succesDelete: "Канал удалён",
    },
  },
};

export const i18nInit = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: "ru",

    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
