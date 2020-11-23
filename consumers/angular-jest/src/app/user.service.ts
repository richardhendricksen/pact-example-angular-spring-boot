import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = 'api/users';

  constructor(private httpClient: HttpClient) {
  }

  create(resource: User): Observable<number> {
    return this.httpClient
      .post(this.BASE_URL, resource).pipe(
        map(data => data['id']));
  }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}/${id}`);
  }


  update(resource: User, id: number): Observable<any> {
    return this.httpClient
      .put(`${this.BASE_URL}/${id}`, resource);
  }


}

