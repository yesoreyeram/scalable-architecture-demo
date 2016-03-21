export abstract class Model<T> {
  protected _store: T;
  get store(): T {
    return this._store;
  }
}
