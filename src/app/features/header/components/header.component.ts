import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Labels } from '../models/header.labels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly labels = Labels;
}
