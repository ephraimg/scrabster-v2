import { Component } from '@angular/core';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'scrabster-v2';

  constructor(public dms: DataModelService) { }

}
