import { Component, EventEmitter, Output } from '@angular/core';
import { Attendee } from '../../../models';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss']
})
export class AddAttendeeComponent {
  @Output()
  addAttendee = new EventEmitter<Attendee>();

  eventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  submit() {
    const attendee = {
      name: this.eventForm.value.name,
      address: this.eventForm.value.address,
      date: this.eventForm.value.date,
      attending: true,
      guests: 0
    };
    this.addAttendee.emit(attendee);
  }
}
