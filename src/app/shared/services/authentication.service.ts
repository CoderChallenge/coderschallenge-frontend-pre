import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataStoreService } from '@app/shared/services/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper: JwtHelperService = new JwtHelperService();
  constructor(private dataStoreService: DataStoreService) {
  }
  get token(): string {
    return this.dataStoreService.getData('token');
  }
  public isAuthenticated(): boolean {
    const token = this.token;
    if (!token) { return false; }
    return !this.helper.isTokenExpired(token);
  }
  get decodeToken(){
    return this.helper.decodeToken(this.token);
  }
  get role(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.role;
  }
  get uid(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.uid;
  }
  get isActive(): boolean{
    if (!this.decodeToken) { return false; }
    return this.decodeToken.isActive;
  }
  get isVerified(): boolean{
    if (!this.decodeToken) { return false; }
    return this.decodeToken.isVerified;
  }
  get email(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.email;
  }
  get username(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.nickName;
  }

}
