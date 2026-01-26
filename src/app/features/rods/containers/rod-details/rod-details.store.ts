import { inject, Injectable, signal } from '@angular/core';
import { DbService } from '../../../../database/db-service';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Rod } from '../../../../types/rod';

@Injectable()
export class RodDetailsStore {
  private dbService = inject(DbService);

  public rod = signal<Rod | undefined>(undefined);
  public isLoading = signal(false);
  public errorMessage = signal<string | undefined>(undefined);

  private loadRequest = new Subject<string>();

  private onLoadRequest: Observable<undefined> = this.loadRequest.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap((rodId) => {
      return this.dbService.getRodById(rodId).pipe(
        tap((rod) => {
          if (!rod) {
            throw new Error('Rod not found');
          }
          this.rod.set(rod);
          this.isLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          this.errorMessage.set(error?.message || 'Failed to load rod data');
          this.isLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onLoadRequest.subscribe();
  }

  public load(rodId: string): void {
    this.loadRequest.next(rodId);
  }
}
