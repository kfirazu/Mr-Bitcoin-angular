import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { lastValueFrom } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  constructor(private contactService: ContactService) { }


  @Input() contactId!: string
  contact!: Contact

  async ngOnInit(): Promise<void> {
    const contact = await lastValueFrom(this.contactService.getContactById(this.contactId))
    if (contact) this.contact = contact
  }


}

//gets contact id from props and renders contact details