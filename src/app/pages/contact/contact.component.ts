import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private ContactService: ContactService) { }
  title = 'contact-page';

  contacts!: Contact[]
  contacts$!: Observable<Contact[]>
  subscription!: Subscription
  // selectedContactId = ''


  ngOnInit(): void {
    this.ContactService.loadContacts()
    this.contacts$ = this.ContactService.contacts$
  }

  // onSelectContactId(contactId: string){
  //   console.log('contactId:', contactId)
  //   this.selectedContactId = contactId
  // }

  onRemoveContact(contactId: string) {
    // console.log('contactId from contact page:', contactId)
    this.ContactService.deleteContact(contactId)
  }

}
