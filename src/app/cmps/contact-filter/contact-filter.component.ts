import { Component, Inject, OnInit } from '@angular/core';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {


  constructor(private ContactService: ContactService) { }

  filterBy!: ContactFilter 
    // term: ''


  ngOnInit(): void {
    this.ContactService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy
    })
  }

  onSetFilter(){
    this.ContactService.setFilter(this.filterBy)
  }

  ngOnDestroy(): void {
    // this.filterBy$.unsubscribe()
}

}
