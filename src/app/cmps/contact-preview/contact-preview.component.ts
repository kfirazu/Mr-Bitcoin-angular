import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() contact!: Contact
  @Output() selectedContactId = new EventEmitter<string>()
  @Output() remove = new EventEmitter<string>()

  onRemoveContact(){
    this.remove.emit(this.contact._id)
  }



}
