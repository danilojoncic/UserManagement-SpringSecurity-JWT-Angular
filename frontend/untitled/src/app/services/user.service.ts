// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user";
import {UserAdoption} from "../models/user-adoption";
import {PermissionType} from "../models/permissionType";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  createUser(user: UserAdoption): Observable<any> {
    return this.http.post(this.API_URL, user);
  }

  updateUser(id: number, user: UserAdoption): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getPermissions(): Observable<PermissionType[]> {
    return this.http.get<PermissionType[]>(`${this.API_URL}/permissions`);
  }
}
