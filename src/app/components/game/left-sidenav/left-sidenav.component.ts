import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AjaxService } from '../../../services/ajax.service';
import { PlayValidationService } from '../../../services/play-validation.service';
import { DataModelService } from '../../../services/data-model.service';
import { DataMutationsService } from '../../../services/data-mutations.service';

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnInit {

  @Input() sidenav: any;
  @Input() toggleEmailNotifications: () => void;

  constructor(
    private ajaxService: AjaxService,
    private playValidationService: PlayValidationService,
    public dms: DataModelService,
    public mut: DataMutationsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
