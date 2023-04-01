import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-spinner',
  template: `<div class="spinner"></div>`,
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

}
