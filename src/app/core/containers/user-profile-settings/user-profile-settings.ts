import { Component, inject } from '@angular/core';
import { AppDataBackupStore } from './app-data-backup.store';
import { UserProfileSettingsStore } from '../../services/user-profile-settings.store';
import { getCurrencyOptions } from '../../../utils/get-currency-options';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';
import { CurrencyCode } from '../../../types/currency-code';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-profile-settings',
  imports: [MatButton, MatFormField, MatLabel, MatOption, MatSelect],
  templateUrl: './user-profile-settings.html',
  styleUrl: './user-profile-settings.scss',
  providers: [AppDataBackupStore],
})
export class UserProfileSettings {
  protected backupStore = inject(AppDataBackupStore);
  protected userSettings = inject(UserProfileSettingsStore);

  protected currencyOptions = getCurrencyOptions();

  protected onUploadFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files?.length) {
      this.backupStore.uploadDataFromFile(files[0]);
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
