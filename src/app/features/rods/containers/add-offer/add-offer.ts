import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { form, min, required, maxLength, submit, FormField } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AddOfferRouterService } from '../../services/add-offer.router-service';
import { NewOffer } from '../../../../types/new-offer';
import { Datepicker } from '../../../../shared/forms/datepicker/datepicker';
import { InputNumber } from '../../../../shared/forms/input-number/input-number';
import { Input } from '../../../../shared/forms/input/input';
import { Textarea } from '../../../../shared/forms/textarea/textarea';
import { RodDetailsStore } from '../../services/rod-details.store';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { AddOfferStore } from './add-offer.store';

@Component({
  selector: 'app-add-offer',
  imports: [
    FormField,
    MatCheckboxModule,
    MatButtonModule,
    Datepicker,
    InputNumber,
    Input,
    Textarea,
    BrandNamePipe,
  ],
  templateUrl: './add-offer.html',
  styleUrl: './add-offer.scss',
  providers: [RodDetailsStore, AddOfferStore],
})
export class AddOffer implements OnInit {
  private addOfferStore = inject(AddOfferStore);
  private activatedRoute = inject(ActivatedRoute);

  protected addOfferRouter = inject(AddOfferRouterService);
  protected rodStore = inject(RodDetailsStore);
  protected goBackText?: string;
  protected rodId = '';

  public ngOnInit(): void {
    const routeData = this.addOfferRouter.getRouteData(this.activatedRoute);
    this.goBackText = routeData.goBackText;
    this.rodId = routeData.rodId;
    this.rodStore.load(this.rodId);
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  protected readonly offerModel = signal({
    date: new Date(),
    priceUAH: null as null | number,
    priceUSD: null as null | number,
    description: '',
    isUsed: false,
    sellerName: '',
    url: '',
  });

  protected readonly offerForm = form(this.offerModel, (path) => {
    required(path.date);
    required(path.priceUAH);
    required(path.priceUSD);
    required(path.sellerName);
    min(path.priceUAH, 1);
    min(path.priceUSD, 1);
    maxLength(path.sellerName, 30);
    maxLength(path.description, 500);
    maxLength(path.url, 300);
  });

  public async save(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.offerForm, async () => {
      if (this.offerForm().invalid()) {
        return;
      }

      const formValue = this.offerModel();
      const description = formValue.description.trim();
      const url = formValue.url.trim();

      const offer: NewOffer = {
        rodId: this.rodId,
        timestamp: formValue.date.getTime(),
        priceUAH: Number(formValue.priceUAH),
        priceUSD: Number(formValue.priceUSD),
        isUsed: formValue.isUsed,
        sellerName: formValue.sellerName.trim(),
      };

      if (description) {
        offer.description = description;
      }
      if (url) {
        offer.url = url;
      }

      this.addOfferStore.add(offer);
    });
  }
}
