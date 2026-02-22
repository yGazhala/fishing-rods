import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileSettingsStore } from './core/services/user-profile-settings.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private userSettings = inject(UserProfileSettingsStore);

  public ngOnInit(): void {
    this.userSettings.loadSettings();
  }
}
