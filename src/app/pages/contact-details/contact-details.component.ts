import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { lastValueFrom, Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  @Input() contactId!: string
  contact!: Contact
  paramsSubscription!: Subscription

  async ngOnInit(): Promise<void> {
    this.paramsSubscription = this.route.data.subscribe(data => {
      console.log('data:', data)
      const contact = data['contact']
      if (contact) this.contact = contact
    })
  }

  // async ngOnInit(): Promise<void> {
  //   this.paramsSubscription = this.route.params.subscribe(async params => {
  //     const contact = await lastValueFrom(this.contactService.getContactById(params['id']))
  //     if (contact) this.contact = contact

  //   })
  // }

  onBack() {
    this.router.navigate(['/contact'])
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
    this.router.navigateByUrl('/contact')

  }

  onEditContact(ev: MouseEvent){
    // ev.stopPropagation()
    this.router.navigate(['edit', this.contact._id])
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }


}

//gets contact id from props and renders contact details