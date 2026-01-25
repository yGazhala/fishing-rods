import { inject, Pipe, PipeTransform } from '@angular/core';
import { RodConfigStore } from '../services/rod-config.store';

@Pipe({
  name: 'rodTypeName',
})
export class RodTypeNamePipe implements PipeTransform {
  private configStore = inject(RodConfigStore);

  public transform(typeId: string): string {
    const getRodType = this.configStore.getRodTypeById(typeId);
    const rodType = getRodType();
    return rodType?.name ?? '--';
  }
}
