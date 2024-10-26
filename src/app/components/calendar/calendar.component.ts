import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  load: Boolean = false;
  /*MOSTRA PAINEIS DE REGISTRO, CADASRTO EM LOTE E GERENCIAMENTO  */
  registerProducts: Boolean = false;
  registerManyProducts: Boolean = false;
  manageOrder: Boolean = false;
  /* UPLOAD IMAGEM DE PRODUTOS */
  changeImgProducts: Boolean = false;
  msgError: Boolean = false;

  urlProducts: any;
  fileNameProducts: any;
  nameSaveImgProducts: any;
  productObs: any;
  /* DADOS DA EMPRESA PARA REGISTRO DE PRODUTOS */
  idUserAdm: any;
  listBusiness: any;
  productIdBusiness: any;
  /* DADOS PARA REGISTRO DE PRODUTOS */
  categories: any; /* vincula categoria ao produto */
  nameProducts: any;
  productCode: any;
  productType: any;
  productPrice: any;
  productNameCategory: any;
  productIdCategory: any;
  subCategories: any;
  productIdSubCategory: any;
  msgSuccess: Boolean = false;
  /* GERENCIAMENTO DE PRODUTOS */
  manageProduct: Boolean = false;
  listBusinessManage: any;
  btPriceSave: Boolean = false;
  btStatusSave: Boolean = false;
  btPromoSave: Boolean = false;
  msgInfoPromo: Boolean = false;
  modalPromo: Boolean = false;
  myHeight: any;

  buttonsManager: Boolean = false;
  /** Calendar */
  date: any = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: any;
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  dateFim: any = new Date();
  daysInThisMonthFim: any;
  daysInLastMonthFim: any;
  daysInNextMonthFim: any;
  monthNamesFim: any;
  currentMonthFim: any;
  currentYearFim: any;
  currentDateFim: any;
  saveDiaFim: any;
  diaFim: any;
  panelButton: Boolean = false;
  selectDates: any;
  datesChoice: Boolean = false;
  saveDiaInicio: any;
  dia: any;
  showCalendar: Boolean = true;
  infoNoDate: Boolean = false;
  infoNoDateFim: Boolean = false;
  btSaveDates: Boolean = false;
  cld1: Boolean = true;
  cld2: Boolean = true;
  saveIdDate: any;
  dateInitDB: any;
  dateEndDB: any;


  constructor() {
    this.monthNames = [
      'Janeiro',
      'Fevereiro',
      'Maio',
      'Abril',
      'Março',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    this.monthNamesFim = [
      'Janeiro',
      'Fevereiro',
      'Maio',
      'Abril',
      'Março',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
  } //constructor
  ngOnInit() {
    this.getDaysInicio();
    this.getDaysFim();
  }
  /*
  #########################
  CALENDÁRIO INICIO
  #########################
  */
  getDaysInicio() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (let i = 0; i < (6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (let i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysInicio();
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysInicio();
  }
  formatarData(data: string) {
    var d = new Date(data),
      mes = '' + (d.getMonth() + 1),
      dia = '' + d.getDate(),
      ano = d.getFullYear();
    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;
    return [ano, mes, dia].join('-');
  }
  showDate = false;
  getDayInicio(day: Date) {
    this.showDate = true;
    var d = new Date();
    var today = this.formatarData(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day;
    this.saveDiaInicio = this.formatarData(thisDate1);
    if (today > this.saveDiaInicio) {
      this.infoNoDate = true;
    } else {
      this.infoNoDate = false;
      this.cld2 = true;
    }

    /* superflo */
    this.dia = day;
    console.log('hoje', today);
    console.log('data escolhida', this.saveDiaInicio)
  }
  /*
#########################
CALENDÁRIO FIM
#########################
*/
  getDaysFim() {
    this.daysInThisMonthFim = new Array();
    this.daysInLastMonthFim = new Array();
    this.daysInNextMonthFim = new Array();
    this.currentMonthFim = this.monthNamesFim[this.dateFim.getMonth()];
    this.currentYearFim = this.dateFim.getFullYear();
    if (this.dateFim.getMonth() === new Date().getMonth()) {
      this.currentDateFim = new Date().getDate();
    } else {
      this.currentDateFim = 999;
    }

    var firstDayThisMonthFim = new Date(this.dateFim.getFullYear(), this.dateFim.getMonth(), 1).getDay();
    var prevNumOfDaysFim = new Date(this.dateFim.getFullYear(), this.dateFim.getMonth(), 0).getDate();

    for (let i = prevNumOfDaysFim - (firstDayThisMonthFim - 1); i <= prevNumOfDaysFim; i++) {
      this.daysInLastMonthFim.push(i);
    }

    var thisNumOfDaysFim = new Date(this.dateFim.getFullYear(), this.dateFim.getMonth() + 1, 0).getDate();
    for (let i = 0; i < thisNumOfDaysFim; i++) {
      this.daysInThisMonthFim.push(i + 1);
    }

    var lastDayThisMonthFim = new Date(this.dateFim.getFullYear(), this.dateFim.getMonth() + 1, 0).getDay();
    var nextNumOfDaysFim = new Date(this.dateFim.getFullYear(), this.dateFim.getMonth() + 2, 0).getDate();
    for (let i = 0; i < (6 - lastDayThisMonthFim); i++) {
      this.daysInNextMonthFim.push(i + 1);
    }
    var totalDaysFim = this.daysInLastMonthFim.length + this.daysInThisMonthFim.length + this.daysInNextMonthFim.length;
    if (totalDaysFim < 36) {
      for (let i = (7 - lastDayThisMonthFim); i < ((7 - lastDayThisMonthFim) + 7); i++) {
        this.daysInNextMonthFim.push(i);
      }
    }
  }
 

}
