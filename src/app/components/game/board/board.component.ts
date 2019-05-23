import { Component } from '@angular/core';
import { DataModelService } from 'src/app/services/data-model.service';
import { DataMutationsService } from 'src/app/services/data-mutations.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  arrayOf15 = Array(15).fill(null);

  constructor(
    public dms: DataModelService,
    public mut: DataMutationsService
  ) { }

}
