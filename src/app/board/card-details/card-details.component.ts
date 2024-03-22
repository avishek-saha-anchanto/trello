import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent {
  @Input() isModal;
  @Input() card;
  constructor(private router: Router, private route: ActivatedRoute) {}
  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
