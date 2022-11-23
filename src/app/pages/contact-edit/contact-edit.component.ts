import { Component, inject, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // contactService = inject(ContactService)
  contact!: Contact
  paramsSubscription!: Subscription

  ngOnInit(): void {
    this.paramsSubscription = this.route.data.subscribe(({ contact }) => {
      this.contact = contact || this.contactService.getEmptyContact() as Contact
    })

    // this.paramsSubscription = this.route.data.subscribe(data => {
    //   const contact = data['contact']
    //   if(contact) this.contact = contact
    //   else this.contact = this.contactService.getEmptyContact() as Contact
    // })
  }

  // ngOnInit(): void {
  //   this.paramsSubscription = this.route.params.subscribe(async ({ id }) => {
  //     if (id) {
  //       const contact = await lastValueFrom(this.contactService.getContactById(id))
  //       if (contact) this.contact = contact
  //     } else {
  //       this.contact = this.contactService.getEmptyContact() as Contact
  //     }
  //   })
  // }

  async onSaveContact() {
    await (this.contactService.saveContact(this.contact))
    this.contact._id
    ? this.router.navigateByUrl(`/contact/${this.contact._id}`)
    : this.router.navigateByUrl('/contact')
  }

  onBack() {
    this.contact._id
      ? this.router.navigateByUrl(`/contact/${this.contact._id}`)
      : this.router.navigate(['/contact'])
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }
}
