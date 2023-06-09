import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styles: [
  ]
})
export class DashboardItemComponent {

  @Input() 
  itemName  = '';

  @Input() 
  itemNumber = '';

  @Input()
  styleClass = '';

}
