import { Component, signal } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  cont = signal(1);
  playerUrl = "https://crafatar.com/renders/body/f26c5545-7276-40cc-b892-7169b98559d5";
  isDropdownOpen = false;
  phototype = 0;
  playerId = "";
  avatarPlayer = "https://crafatar.com/avatars/"
  bodyPlayer = "https://crafatar.com/renders/body/"
  headPlayer = "https://crafatar.com/renders/head/"

  photoValue(typeEnum: number ,PlayerName: string) {
    this.phototype = typeEnum;
    this.isDropdownOpen = false;
    this.searchValue(PlayerName);
  }
  constructor(private client: PlayerService) {

  }

  searchValue(PlayerName: string) {
    if (PlayerName == "") {
      return console.log("Nome invalido");
    }
    console.log(PlayerName);
    console.log(this.phototype);
    this.client.getPlayerUID(PlayerName).subscribe({
      next: (data) => {
        this.playerId = data.data.player.id
        this.playerUrl = this.getPlayerProfileImage(this.playerId, this.phototype)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Requisição feita");
      }
    });
  }

  getPlayerProfileImage(playerId: string, typeEnum: Number): string {
    switch (typeEnum) {
      case 0: {
        return this.bodyPlayer + playerId;
      }
      case 1: {
        return this.headPlayer + playerId;
      }
      case 2: {
        return this.avatarPlayer + playerId;
      }
      default:
        return "";
    }
  }

  mouseover() {
    console.log("Viu a Skin");
  }

  toogleMenu(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }
}
