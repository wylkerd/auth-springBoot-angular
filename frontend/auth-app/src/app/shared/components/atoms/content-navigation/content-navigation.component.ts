import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { SharedModule } from "../../../shared.module";

@Component({
  selector: 'app-content-navigation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './content-navigation.component.html',
  styleUrl: './content-navigation.component.scss'
})
export class ContentNavigationComponent {
  location = inject(Location);
  @Input() showBackBtn: boolean = true;
  @Input({ required: false }) showOnlyTitle: boolean = false;
  @Input() boldTitle!: string
  @Input() showAuxiliarButton: boolean = false;
  @Input() customAuxiliarButtonStyle: { [key: string]: string } = {}
  @Input() title?: string = ''
  @Input() navigateTo?: string = ''
  goBack() {
    this.location.back()
  }
}
