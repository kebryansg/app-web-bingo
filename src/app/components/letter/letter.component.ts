import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LetterComponent {
  @Input() letter: string = ''
}
