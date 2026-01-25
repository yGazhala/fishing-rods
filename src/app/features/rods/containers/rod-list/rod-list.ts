import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RodListStore } from './rod-list.store';
import { RodListRouterService } from '../../services/rod-list-router.service';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { SelectOption } from '../../../../types/select-option';
import { RodConfigStore } from '../../services/rod-config.store';
import { RodListParams } from '../../../../types/rod-list-params';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import { RodTypeNamePipe } from '../../pipes/rod-type-name.pipe';

type AllOption = 'ALL';

@Component({
  selector: 'app-rod-list',
  imports: [
    RouterLink,
    BrandNamePipe,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatIcon,
    RodTypeNamePipe,
  ],
  templateUrl: './rod-list.html',
  styleUrl: './rod-list.scss',
  providers: [RodListStore],
})
export class RodList implements OnInit {
  private listRouter = inject(RodListRouterService);
  private configStore = inject(RodConfigStore);
  protected list = inject(RodListStore);

  protected selectedFilterRodType = signal<string | AllOption>('ALL');
  protected selectedFilterMaxLureWeight = signal<string | AllOption>('ALL');
  protected selectedFilterOnlyFavorites = signal<boolean>(false);

  protected rodTypeFilterOptions: Signal<SelectOption<string | AllOption>[]> = computed(() => {
    const rodTypes = this.configStore.rodTypes();
    const rodTypeOptions: SelectOption<string>[] = rodTypes.map((rodType) => ({
      label: rodType.name,
      value: rodType.id,
    }));
    return [{ label: 'All', value: 'ALL' }, ...rodTypeOptions];
  });

  protected maxLureWeightFilterOptions: SelectOption<string | AllOption>[] = [
    {
      label: 'All',
      value: 'ALL',
    },
    {
      label: 'Up to 5 grams',
      value: JSON.stringify({ from: 0.1, to: 5 }),
    },
    {
      label: '6-10 grams',
      value: JSON.stringify({ from: 6, to: 10 }),
    },
    {
      label: '11-15 grams',
      value: JSON.stringify({ from: 11, to: 15 }),
    },
    {
      label: '16-21 grams',
      value: JSON.stringify({ from: 16, to: 21 }),
    },
    {
      label: '22-28 grams',
      value: JSON.stringify({ from: 22, to: 28 }),
    },
    {
      label: '29-45 grams',
      value: JSON.stringify({ from: 29, to: 45 }),
    },
    {
      label: '46-56 grams',
      value: JSON.stringify({ from: 46, to: 56 }),
    },
    {
      label: '57-100 grams',
      value: JSON.stringify({ from: 57, to: 100 }),
    },
    {
      label: 'Over 100 grams',
      value: JSON.stringify({ from: 101 }),
    },
  ];

  public ngOnInit(): void {
    const listParams = this.listRouter.getParams();

    if (listParams.typeId) {
      this.selectedFilterRodType.set(listParams.typeId);
    }
    if (listParams.maxLureWeightGrams) {
      this.selectedFilterMaxLureWeight.set(JSON.stringify(listParams.maxLureWeightGrams));
    }
    if (listParams.onlyFavorites) {
      this.selectedFilterOnlyFavorites.set(listParams.onlyFavorites);
    }

    this.list.loadItems(listParams);
  }

  public setFilterRodType(event: MatSelectChange<string | AllOption>): void {
    this.selectedFilterRodType.set(event.value);
    this.applyFilters();
  }

  public setFilterMaxLureWeight(event: MatSelectChange<string | AllOption>): void {
    this.selectedFilterMaxLureWeight.set(event.value);
    this.applyFilters();
  }

  public setFilterOnlyFavorites(event: MatSlideToggleChange): void {
    this.selectedFilterOnlyFavorites.set(event.checked);
    this.applyFilters();
  }

  private async applyFilters(): Promise<void> {
    const typeId = this.selectedFilterRodType();
    const maxLureWeight = this.selectedFilterMaxLureWeight();

    const listParams: RodListParams = {
      onlyFavorites: this.selectedFilterOnlyFavorites(),
      typeId: this.isAllOption(typeId) ? undefined : typeId,
      maxLureWeightGrams: this.isAllOption(maxLureWeight) ? undefined : JSON.parse(maxLureWeight),
    };
    this.list.loadItems(listParams);
    await this.listRouter.navigate(listParams, true);
  }

  private isAllOption(value: unknown): value is AllOption {
    return value === 'ALL';
  }
}
