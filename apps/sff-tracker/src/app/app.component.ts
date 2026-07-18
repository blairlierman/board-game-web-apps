import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'farming-game-remote-host-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'sff-tracker';
}
