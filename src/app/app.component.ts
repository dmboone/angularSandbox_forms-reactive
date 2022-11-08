import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup({ // creates a form
      // now adding form controls - key/value pairs
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('female'), // can set a default rather than choosing null
    }); 
  }
}
