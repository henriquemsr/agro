import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilServiceService } from 'src/app/service/util-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() childRecevied: any;
  @Output() childActionInjection = new EventEmitter<boolean>();
  load = false;
  showDelete = false;
  formUser: any;
  modalRef: any;
  update = false;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    public service: UtilServiceService
  ) {
    this.formUser = FormBuilder;
    this.modalRef = BsModalRef
  }

  ngOnInit(): void {
    this.createFormUser();
    if (this.childRecevied != null) {
      this.update = true;
      this.formUser.get('name').setValue(this.childRecevied?.name);
      this.formUser.get('phone_number').setValue(this.childRecevied?.phone_number);
      this.formUser.get('email').setValue(this.childRecevied?.email);
      this.formUser.get('age').setValue(this.childRecevied?.age);
      this.formUser.get('cpf').setValue(this.childRecevied?.cpf);
      this.formUser.get('rg').setValue(this.childRecevied?.rg);
      this.formUser.get('street').setValue(this.childRecevied?.address?.street);
      this.formUser.get('number').setValue(this.childRecevied?.address?.number);
      this.formUser.get('district').setValue(this.childRecevied?.address?.district);
      this.formUser.get('reference').setValue(this.childRecevied?.address?.reference);
    };

  }

  createFormUser() {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      district: ['', [Validators.required]],
      reference: ['', [Validators.required]]
    });
  }

  goBack() {
    this.childActionInjection.emit(false);
  }

  registerStudent() {

    let saveStudent = {
      age: this.formUser.get('age').value,
      email: this.formUser.get('email').value,
      name: this.formUser.get('name').value,
      phone_number: this.formUser.get('phone_number').value,
      rg: this.formUser.get('rg').value,
      cpf: this.formUser.get('cpf').value,
      address: {
        street: this.formUser.get('street').value,
        number: this.formUser.get('number').value,
        district: this.formUser.get('district').value,
        reference: this.formUser.get('reference').value,
      }
    }

    this.service.httpPost(this.service.URL.STUDENTS, saveStudent).subscribe(
      res => {
        console.log(res);
        this.goBack();
      },
      e => {
        console.log(e);
      }
    );

  }

  updateStudent() {
    let saveStudent = {
      age: this.formUser.get('age').value,
      email: this.formUser.get('email').value,
      name: this.formUser.get('name').value,
      phone_number: this.formUser.get('phone_number').value
    }

    this.service.httpPut(`${this.service.URL.STUDENTS}/${this.childRecevied._id}`, saveStudent).subscribe(
      res => {
        console.log(res);
        this.goBack();
      },
      e => {
        console.log(e);
      }
    );

  }

  infoDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteStudent() {
    this.service.httpDelete(`${this.service.URL.STUDENTS}/${this.childRecevied._id}`, null).subscribe(
      res => {
        console.log(res);
        this.goBack();
        this.modalRef.hide();
      },
      e => {
        console.log(e);
      }
    );
  }

}
