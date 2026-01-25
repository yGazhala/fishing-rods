import { inject, Pipe, PipeTransform } from '@angular/core';
import { RodConfigStore } from '../services/rod-config.store';

@Pipe({
  name: 'brandName',
})
export class BrandNamePipe implements PipeTransform {
  private configStore = inject(RodConfigStore);

  public transform(brandId: string): string {
    const getBrand = this.configStore.getBrandById(brandId);
    const brand = getBrand();
    return brand?.name ?? '--';
  }
}
