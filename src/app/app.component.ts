import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      'gender': new FormControl('female'), // can set a default rather than choosing null

      // creating a form group within the main form group
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required), // form control is done here rather than in the html file by using Validators
        'email': new FormControl(null, [Validators.required, Validators.email]), // if multiple validators use an array
      }),

      // form array - holds an array of controls
      'hobbies': new FormArray([])
    }); 
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){ // this method creates a new form control with no default input (null) and pushes it onto our hobbies Form Array
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control); // have to cast to form array
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}
