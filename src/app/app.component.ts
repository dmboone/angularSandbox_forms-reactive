import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(){
    this.signupForm = new FormGroup({ // creates a form
      // now adding form controls - key/value pairs
      'gender': new FormControl('female'), // can set a default rather than choosing null

      // creating a form group within the main form group
      'userData': new FormGroup({                                                   // need to bind this for it to work because the validator gets called by Angular rather than inside the typescript file
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // form control is done here rather than in the html file by using Validators
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // if multiple validators use an array; asynchronous validators are their own separate parameter
      }),

      // form array - holds an array of controls
      'hobbies': new FormArray([])
    });

    // Tracking Value Changes
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );

    // Tracking Status Changes
    // this.signupForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   }
    // );

    // Setting Values - for defining values for the entire form
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Max',
    //     'email': 'max@test.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });

    // Patching Values - for defining values for specific parts of form
    // this.signupForm.patchValue({
    //   'userData': {
    //     'username': 'Max',
    //   },
    //   'gender': 'male',
    // });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset(); // resets form on submission
    // can also pass an object to reset so it only resets specific values rather than the whole form
  }

  onAddHobby(){ // this method creates a new form control with no default input (null) and pushes it onto our hobbies Form Array
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control); // have to cast to form array
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // creating our own validator - takes in a form control and returns an object with a key name that has a value of either true or false
  forbiddenNames(control: FormControl): {[s: string] : boolean} 
  {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){ // if the input from the formControl matches any of the values in our forbiddenUsernames array
      return {'nameisForbidden': true};
    } // otherwise indexOf returns -1 if it doesn't find the string in the array
    else{ // if validation is sucessfull you need to return nothing or null!
      return null
    }
  }

  // creating a custom asynchronous validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }
        else{
          resolve(null);
        }
      }, 1500)
    });

    return promise;
  }
}
