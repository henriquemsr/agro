import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilServiceService } from 'src/app/service/util-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  list: any;
  pagination = {
    limit: 10,
    page: 1,
    pages: null,
    total: null
  }
  itemSelected: any;
  showMatter = false;
  matters: any;
  unitSubject = '';
  showFormRegister = false;
  formRegister: FormGroup; // Deve ser do tipo FormGroup
  units: Array<any> = [];

  constructor(
    public service: UtilServiceService,
    public route: Router,
    private formBuilder: FormBuilder,
  ) {

    this.formRegister = this.formBuilder.group({
      matter: ['', [Validators.required]],
      nameMater: ['', [Validators.required]],
      matUnit: ['', [Validators.required]],
      level: ['', [Validators.required]],
      subject: [''],
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.httpGet(`${this.service.URL.MATARIALS}?page=${this.pagination.page}&limit=${this.pagination.limit}`, null).subscribe(
      res => {

        this.list = res.body;

        this.list.docs.map((v: any) => {
          v.clicked = false
        });
        console.log(this.list);

        this.pagination.limit = this.list.limit;
        this.pagination.page = this.list.page;
        this.pagination.pages = this.list.pages;
        this.pagination.total = this.list.total;

      },
      e => {
        console.log(e);
      }
    );
  }
  selectItem(item: any) {
    console.log(item);

    this.list.docs.map((v: any) => {
      v.clicked = false
    });
    item.clicked = true;
    this.itemSelected = item;
    this.itemSelected.modules.map((v: any) => {
      v.clicked = false
    });
    this.showMatter = false;
    this.showFormRegister = false;
  }
  selectMatter(item: any) {
    this.unitSubject = item._id_matter;
    this.itemSelected.modules.map((v: any) => {
      v.clicked = false
    });
    item.clicked = true;
    this.matters = item;
    this.showMatter = true;
  }
  goToSchedule(item: any) {
    let obj = {
      matter: item.matter,
      matter_subject: item.matter_subject,
      module_level: item.module_level,
      unitMatter: item.unitMatter,
      id_subject: this.unitSubject
    }
    this.route.navigate(['/schedule', obj])
  }
  showRegister() {
    this.showFormRegister = !this.showFormRegister;
    this.list.docs.forEach((element: any) => {
      element.clicked = false;
    });
    this.showMatter = false;
  }
  addNameUnit() {
    this.units.push({
      subject: this.formRegister.get("subject")?.value,
      units: [
        {
          matter: this.formRegister.get("matter")?.value,
          unitMatter: this.formRegister.get("subject")?.value,
          matter_subject: this.formRegister.get("nameMater")?.value,
          module_level: this.formRegister.get("level")?.value
        },
      ]
    });
    setTimeout(() => {
      this.formRegister.get("subject")?.reset();
      console.log(this.units);
    }, 0);
  }
  save() {
    const objSend = {
      matter_name: this.formRegister.get("nameMater")?.value,
      module: this.formRegister.get("matUnit")?.value,
      modules: this.units
    }
    console.log(objSend);
    console.log(typeof objSend.module, objSend.module);
    let checkModuleNumberOfSubjects = Number(objSend.module);
    const checkModulesNumberOfSubjects = objSend.modules;

    console.log(checkModuleNumberOfSubjects, "objSend.module");
    console.log(checkModulesNumberOfSubjects.length, "units");

    if (checkModuleNumberOfSubjects === checkModulesNumberOfSubjects.length) {
      console.log("save");
      this.service.httpPost(this.service.URL.MATARIALS, objSend).subscribe(res => {
        console.log(res);
        this.showFormRegister = false;
        this.getList();
      },
        e => {
          console.log(e);
        }
      )

    } else {
      console.log("no save");
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "O número da quantidade de matérias deve ser o mesmo da quantidade de unidades"
      })
    }

  }
  deleteMaterial(item: any) {
    console.log(item);
    console.log(item._id,"id");
    Swal.fire({
      title: "Atenção",
      text: `Tem certeza que deseja deletar esse módulo: ${item.matter_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        //tratar com sucesso e chamar getList()
        Swal.fire({
          title: "Deletado!",
          text: "Módulo deletado com sucesso!",
          icon: "success"
        });
      }
    });
  }

}
