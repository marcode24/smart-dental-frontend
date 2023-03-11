import Storage from "./storage.util";

describe('Storage Util', () => {
  describe('save session storage', () => {
    it('should save a value in session storage', () => {
      const name = 'name';
      const value = 'value';
      Storage.saveSessionStorage(name, value);

      expect(sessionStorage.getItem(name)).toEqual(value);
    });
  });

  describe('delete session storage', () => {
    it('should delete a value in session storage', () => {
      const name = 'name';
      const value = 'value';
      sessionStorage.setItem(name, value);

      Storage.deleteSessionStorage(name);

      expect(sessionStorage.getItem(name)).toBeNull();
    });
  });
});
