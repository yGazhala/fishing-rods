import { Component, inject } from '@angular/core';
import { AppDataBackupStore } from './app-data-backup.store';
import { MatButton } from '@angular/material/button';
import { UserProfileSettingsStore } from '../../services/user-profile-settings.store';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { CurrencyCode } from '../../../types/currency-code';
import { getCurrencyOptions } from '../../../utils/get-currency-options';

@Component({
  selector: 'app-app-data-backup',
  imports: [MatButton, MatFormField, MatLabel, MatOption, MatSelect],
  templateUrl: './app-data-backup.html',
  styleUrl: './app-data-backup.scss',
  providers: [AppDataBackupStore],
})
export class AppDataBackup {
  protected store = inject(AppDataBackupStore);
  protected userSettings = inject(UserProfileSettingsStore);

  protected currencyOptions = getCurrencyOptions();

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

  protected setDefaultCurrency(event: MatSelectChange<CurrencyCode>): void {
    this.userSettings.setDefaultCurrency(event.value);
  }
}
