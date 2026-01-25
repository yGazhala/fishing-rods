import { Component, inject, OnInit } from '@angular/core';
import { RodConfigStore } from '../../services/rod-config.store';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rods-root',
  imports: [RouterOutlet, MatProgressSpinner],
  templateUrl: './rods-root.html',
  styleUrl: './rods-root.scss',
  providers: [RodConfigStore],
})
export class RodsRoot implements OnInit {
  protected configStore = inject(RodConfigStore);

  public ngOnInit(): void {
    this.configStore.loadConfig();
  }
}
