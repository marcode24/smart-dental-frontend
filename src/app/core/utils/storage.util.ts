export default class Storage {

  static saveSessionStorage(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  static deleteSessionStorage(name: string) {
    sessionStorage.removeItem(name);
  }

}
