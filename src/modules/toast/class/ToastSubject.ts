import type { TObserver, TToast } from "../types/toastTypes";

export class ToastSubject {
  private static instance: ToastSubject | null = null;
  private observers: TObserver[] = [];

  public static getInstance() {
    if (!this.instance) this.instance = new ToastSubject();
    return this.instance;
  }

  subscribe(observer: TObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: TObserver) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(toast: TToast) {
    this.observers.forEach((observer) => observer(toast));
  }
}
