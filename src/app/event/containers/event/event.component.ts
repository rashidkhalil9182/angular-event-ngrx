import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Attendee } from '../../../models';
import { EventService } from '../../services/event.service';
import { State } from '../../../state/state';
import { StartSpinner, StopSpinner } from '../../../state/spinner/spinner.actions';
import { getSpinner } from '../../../state/spinner/spinner.selectors';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  show = false;
  spinner$: Observable<boolean>;
  attendees$: Observable<Attendee[]>;

  constructor(
    private store: Store<State>,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getAttendees();
    this.spinner$ = this.store.pipe(select(getSpinner));
  }

  getAttendees() {
    this.attendees$ = this.eventService.getAttendees();
    console.log("EventComponent -> getAttendees ->  this.attendees$", this.attendees$)
  }

  addAttendee(attendee: Attendee) {
    console.log("EventComponent -> addAttendee -> attendee", attendee)
    this.store.dispatch(new StartSpinner());
    this.eventService.addAttendee(attendee).subscribe(() => {
      this.store.dispatch(new StopSpinner());
      this.show = false;
      this.getAttendees();
    });
  }

  addMore() {
    this.show = true;
  }
}
