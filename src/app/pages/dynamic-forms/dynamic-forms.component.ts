import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss']
})
export class DynamicFormsComponent implements OnInit {

  isCreationFromSubmitted: boolean = false;
  isUorFormValid: boolean = false;
  createFormFields!: FormGroup;
  yourForm!: FormGroup;
  addedFieldsToGenerate: any;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1
  };
  cities: any = [];
  disabled = false;
  fieldsAddedOnform = [
    {
      name: 'field1',
      fieldDetails: {
        fieldName: '',
        fieldType: '',
        fieldPlaceholder: '',
        fieldValidation: '',
        minlength: '',
        maxlength: '',
        errorKeyword: '',
        selectBoxOptions: ''
      }
    }
  ]

  formFields = [
    {
      id: 1,
      value: 'input',
      name: 'Input Box',
    },
    {
      id: 2,
      value: 'select',
      name: 'Select Box'
    },
    {
      id: 3,
      value: 'radio',
      name: 'Radio Box'
    },
    {
      id: 4,
      value: 'checkbox',
      name: 'Check Box'
    },
    {
      id: 5,
      value: 'textarea',
      name: 'Text Area'
    }
  ]
  inputTypes = [
    {
      name: 'For Text',
      value: 'text'
    },
    {
      name: 'For Number',
      value: 'number'
    },
    {
      name: 'For Email',
      value: 'email'
    },
    {
      name: 'For Password',
      value: 'Password'
    }
  ]
  formValidationsType: any = [
    {
      id: 1,
      name: 'Required',
      value: 'required'
    },
    {
      id: 2,
      name: 'Min Length',
      value: 'minLength'
    },
    {
      id: 3,
      name: 'Max Length',
      value: 'maxLength'
    }
  ]

  selectOptions = [
    {
      name: 'First',
      value: 'first'
    },
    {
      name: 'First',
      value: 'first'
    }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.fieldsAddedOnform);

    this.createFormFields = this.fb.group({
      field1: this.fb.group({
        fieldName: ['', Validators.required],
        fieldType: ['', Validators.required],
        fieldPlaceholder: ['', Validators.required],
        fieldValidation: ['', Validators.required],
        minlength: [''],
        maxlength: [''],
        errorKeyword: [''],
        selectBoxOptions: ['']
      })
    })
    // generated form
    this.yourForm = this.fb.group({})

  }

  get creationFormControls() {
    console.log('controls', this.createFormFields.controls['field1'].get('fieldName')?.errors?.['required']);
    return this.createFormFields.controls;
  }

  get yourFormControls() {
    console.log('controls', this.yourForm.controls);
    return this.yourForm.controls;
  }


  createForm() {
    this.isCreationFromSubmitted = true;
    console.log(this.createFormFields);
    if (!this.createFormFields.valid) {
      return;
    }
    console.log(this.createFormFields.value);
    this.generateForm(this.createFormFields.value);
  }

  addNewField() {
    try {
      let formLength = this.fieldsAddedOnform.length;
      this.fieldsAddedOnform.push({
        name: `field${formLength + 1}`,
        fieldDetails: {
          fieldName: '',
          fieldType: '',
          fieldPlaceholder: '',
          fieldValidation: '',
          minlength: '',
          maxlength: '',
          errorKeyword: '',
          selectBoxOptions: ''
        }
      })
      this.createFormFields.addControl(`field${formLength + 1}`, this.fb.group({
        fieldName: ['', Validators.required],
        fieldType: ['', Validators.required],
        fieldPlaceholder: ['', Validators.required],
        fieldValidation: ['', Validators.required],
        minlength: [''],
        maxlength: [''],
        errorKeyword: [''],
        selectBoxOptions: ['']
      }))
      console.log(this.fieldsAddedOnform);
    } catch (e) {
      console.log(e);
    }
  }

  removeField(field: any) {
    try {
      console.log('field to remove: ', field);
      this.fieldsAddedOnform = this.fieldsAddedOnform.filter(item => item.name !== field.name);
      this.createFormFields.removeControl(field.name);
    } catch (e) {
      console.log('err', e);
    }
  }

  generateForm(formdata: any) {
    try {
      console.log('formdata: ', formdata);
      let arrOfObjects = Object.values(formdata);
      this.addedFieldsToGenerate = arrOfObjects.map((item: any) => {
        let controlName = item.fieldName.split(' ');
        if (controlName.length > 1) {
          item.formControlName = controlName[0].toLowerCase() + controlName[1].toLowerCase();
        } else {
          item.formControlName = controlName[0].toLowerCase();
        }
        return item;
      })
      console.log(this.addedFieldsToGenerate);
      this.addFieldsOnYourForm(this.addedFieldsToGenerate)
    } catch (e) {
      console.log('err', e);
    }
  }

  addFieldsOnYourForm(formFields: []) {
    try {
      console.log(formFields);
      // this.yourForm.reset();
      formFields.forEach((element: any) => {
        let validators: any = [];
        element.fieldValidation.forEach((item: any) => {
          if (item.value == 'required') { validators.push(Validators.required) }
          if (item.value == 'minLength') { validators.push(Validators.minLength(element.minLength)) }
          if (item.value == 'maxLength') { validators.push(Validators.maxLength(element.maxlength)) }
        })
        console.log(validators);
        this.yourForm.addControl(`${element.formControlName}`, this.fb.control(''));
        this.yourForm.controls[element.formControlName].clearValidators()
        this.yourForm.controls[element.formControlName].setValidators(validators);
        this.yourForm.controls[element.formControlName].updateValueAndValidity();
      });
      this.createFormFields.reset();
      this.isCreationFromSubmitted = false;
      this.fieldsAddedOnform = [{
        name: 'field1',
        fieldDetails: {
          fieldName: '',
          fieldType: '',
          fieldPlaceholder: '',
          fieldValidation: '',
          minlength: '',
          maxlength: '',
          errorKeyword: '',
          selectBoxOptions: ''
        }
      }]
    } catch (e) {
      console.log('err', e);
    }
  }

  submitYourForm() {
    console.log(this.yourForm);
  }


  // tag input 
  onItemRemoved(event: any) {
    console.log('event: ', event);
    console.log(this.createFormFields.get('field1')?.value.selectBoxOptions);
  }

  onItemAdded(event: any) {
    console.log('event: ', event);

  }

}
