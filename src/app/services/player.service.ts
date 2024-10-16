import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private dbPlayer = "https://playerdb.co/api/player/minecraft/"
  constructor(private client: HttpClient) { }

  getPlayerUID(playerName: String): Observable<any> {
    return this.client.get(this.dbPlayer + playerName);
  }

 

}
