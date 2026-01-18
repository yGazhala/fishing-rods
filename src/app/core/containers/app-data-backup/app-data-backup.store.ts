import { inject, Injectable, signal } from '@angular/core';
import { catchError, concatMap, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { DbService } from '../../../database/db-service';
import { SnackbarService } from '../../services/snackbar.service';
import { DbData } from '../../../types/db-data';

@Injectable()
export class AppDataBackupStore {
  private dbService = inject(DbService);
  private snackbar = inject(SnackbarService);

  // selectors
  public isUploadDataFromFileLoading = signal(false);
  public uploadDataFromFileErrorMessage = signal<string | undefined>(undefined);
  public isDownloadDataLoading = signal(false);
  public downloadDataErrorMessage = signal<string | undefined>(undefined);

  // actions
  private uploadDataFromFileRequest = new Subject<File>();
  private downloadDataRequest = new Subject<void>();

  // effects
  private onUploadDataFromFile: Observable<void> = this.uploadDataFromFileRequest.pipe(
    tap(() => {
      this.isUploadDataFromFileLoading.set(true);
    }),
    switchMap((file) => {
      return this.getDataFromFile(file).pipe(
        concatMap((data) => {
          return this.dbService.setAppData(data).pipe(
            tap(() => {
              this.isUploadDataFromFileLoading.set(false);
              this.snackbar.success('Data uploaded successfully');
            }),
          );
        }),
      );
    }),
    catchError((error) => {
      this.uploadDataFromFileErrorMessage.set(error.message);
      this.isUploadDataFromFileLoading.set(false);
      return of(undefined);
    }),
  );

  private onDownloadData: Observable<void> = this.downloadDataRequest.pipe(
    tap(() => {
      this.isDownloadDataLoading.set(true);
    }),
    switchMap(() => {
      return this.dbService.getAppData().pipe(
        concatMap((data) => {
          return this.downloadDataAsJsonFile(data).pipe(
            tap(() => {
              this.isDownloadDataLoading.set(false);
              this.snackbar.success('Data downloaded successfully');
            }),
          );
        }),
      );
    }),
    catchError((error) => {
      this.downloadDataErrorMessage.set(error.message);
      this.isDownloadDataLoading.set(false);
      return of(undefined);
    }),
  );

  constructor() {
    this.onUploadDataFromFile.subscribe();
    this.onDownloadData.subscribe();
  }

  public uploadDataFromFile(file: File): void {
    this.uploadDataFromFileRequest.next(file);
  }

  public downloadData(): void {
    this.downloadDataRequest.next();
  }

  private getDataFromFile(file: File): Observable<DbData> {
    return new Observable<DbData>((observer) => {
      const reader = new FileReader();

      reader.onload = (event): void => {
        const fileContent = event.target?.result as string;
        try {
          const data = JSON.parse(fileContent) as DbData;
          observer.next(data);
          observer.complete();
        } catch (error) {
          observer.error(new Error('Failed to parse data from file'));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  private downloadDataAsJsonFile(data: DbData): Observable<void> {
    return new Observable((observer) => {
      try {
        const dataJson = JSON.stringify(data, undefined, 2);
        const blob = new Blob([dataJson], { type: 'application/json' });
        const todayDate = new Date().toISOString().split('T')[0];
        const fileName = `fishing-rods-data-${todayDate}.json`;

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);

        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );

        document.body.removeChild(link);

        observer.next(undefined);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
