export class LocalStorageService {
  public static set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  public static get(key: string) {
    return localStorage.getItem(key);
  }

  public static remove(key: string) {
    return localStorage.removeItem(key);
  }

  public static clearAllKeyAndValue() {
    return localStorage.clear();
  }
}
