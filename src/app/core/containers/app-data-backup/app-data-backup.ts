import { Component, inject } from '@angular/core';
import { AppDataBackupStore } from './app-data-backup.store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-app-data-backup',
  imports: [MatButton],
  templateUrl: './app-data-backup.html',
  styleUrl: './app-data-backup.scss',
  providers: [AppDataBackupStore],
})
export class AppDataBackup {
  protected store = inject(AppDataBackupStore);

  protected onUploadFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files?.length) {
      this.store.uploadDataFromFile(files[0]);
    }
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
