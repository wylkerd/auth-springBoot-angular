import { Injectable } from '@angular/core';
import { IEStorageKey, ITypeStorage } from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private setToken(
    tipoStorage: ITypeStorage,
    key: IEStorageKey,
    data: unknown
  ): void {
    window[tipoStorage].setItem(key, JSON.stringify(data));
  }

  setSession(key: IEStorageKey, data: unknown): void {
    this.setToken('sessionStorage', key, data);
  }

  setLocal(key: IEStorageKey, data: unknown): void {
    this.setToken('localStorage', key, data);
  }

  private returnToken<TResultado = unknown>(
    tipoStorage: ITypeStorage,
    key: IEStorageKey
  ): TResultado | undefined {
    const resultado = window[tipoStorage].getItem(key);
    if (!resultado) {
      return undefined;
    }

    return JSON.parse(resultado) as TResultado;
  }

  returnTokenSessao<TResultado = unknown>(
    key: IEStorageKey
  ): TResultado | undefined {
    return this.returnToken<TResultado>('sessionStorage', key);
  }

  returnTokenLocal<TResultado = unknown>(
    key: IEStorageKey
  ): TResultado | undefined {
    return this.returnToken<TResultado>('localStorage', key);
  }

  private removeToken(ItypeStorage: ITypeStorage, key: IEStorageKey): void {
    window[ItypeStorage].removeItem(key);
  }

  removeTokenSessao(key: IEStorageKey): void {
    this.removeToken('sessionStorage', key);
  }

  removeTokenokenLocal(key: IEStorageKey): void {
    this.removeToken('localStorage', key);
  }

  private cleanToken(ItypeStorage: ITypeStorage): void {
    window[ItypeStorage].clear();
  }

  cleanSessao(): void {
    this.cleanToken('sessionStorage');
  }

  cleanLocal(): void {
    this.cleanToken('localStorage');
  }
}
