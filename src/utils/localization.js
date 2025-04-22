import { translations } from "../constants/locales";

class Localization {
  constructor() {
    this.lang = document.documentElement.lang || "en";
    this._listeners = new Set();
  }

  get currentLang() {
    return this.lang;
  }

  set currentLang(lang) {
    if (translations[lang]) {
      this.lang = lang;
      document.documentElement.lang = lang;
      this.notifyListeners();
    }
  }

  t(key) {
    const keys = key.split(".");
    let value = translations[this.lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return value;
  }

  addListener(listener) {
    this._listeners.add(listener);
  }

  removeListener(listener) {
    this._listeners.delete(listener);
  }

  notifyListeners() {
    this._listeners.forEach((listener) => listener(this.lang));
  }
}

export const localization = new Localization();
