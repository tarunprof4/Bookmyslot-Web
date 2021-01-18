import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-failure',
  templateUrl: './modal-failure.component.html',
  styleUrls: ['./modal-failure.component.css']
})
export class ModalFailureComponent implements OnInit {

  title: string;
  bodyItems: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
