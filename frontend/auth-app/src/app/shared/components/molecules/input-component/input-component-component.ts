import { Component, EventEmitter, Input, Output,  CUSTOM_ELEMENTS_SCHEMA, SimpleChanges, OnInit, OnChanges, ViewChild, inject, ContentChildren, QueryList, } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AbstractControl, FormControl } from '@angular/forms';
import { VALIDATORS_MESSAGES } from 'app/shared/constants';
import { Observable, map, startWith } from 'rxjs';
import moment from 'moment';
import { DateTime } from 'ts-luxon';
import { DatePipe } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { SharedModule } from "../../../shared.module";
import { ContentNavigationComponent } from "../../atoms/content-navigation/content-navigation.component";


export interface DropdownOption {
  text: string;
  route: string;
}

@Component({
  selector: 'input-component',
  standalone: true,
  imports: [SharedModule, ContentNavigationComponent, MatDatepickerModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './input-component-component.html',
  styleUrl: './input-component-component.scss',
})
export class InputTypesComponent implements OnInit, OnChanges {
  datePipe = inject(DatePipe)
  @Output() optionSelected = new EventEmitter<string>();
  @Output() changedTextValue = new EventEmitter<string>();
  @Output() onOptionSelectedKey = new EventEmitter<any>();
  @Input() showErrorsWhen: boolean = false
  @Input() mask!: string
  @Input() value: any;
  @Input() title!: string;
  @Input() placeholder!: string;
  @Input() showTitle: boolean = true;
  selectedOption: string = '';
  @Input() options: any[] = [];
  @Input() type: 'text' | 'dropdown' | 'search' | 'number'| 'email'| 'time' | 'tel' | 'password' | 'datetime' | 'textarea' | 'selectAndText' | 'radio' | 'keyvalue' | 'datetime-local' = 'text';
  @Input() subType: 'text' | 'number'  = 'text';
  @Input() showOnlyDescriptionName: boolean = false;
  @Input() control!: AbstractControl;
  @Input() errorMessagers: string[] = []
  @Input() hideIcon: boolean = false;
  @Input() maxSizeNumber!: number
  @Input() dataArray!: any[];
  @Input() descriptionName!: string;
  @Input() codeName!: string;
  @Input() keyName!: string;
  @Input() maxlength!: string
  timeValue!: string;
  filteredTypes: any[] = [];
  touched = false;
  hide = true;
  date: string = '';
  time: string = '';
  dateTimeValue!: string;
  selectedDate!: Date;
  selectedTime!: string;


  constructor(private router: Router) {}

  @ViewChild('timepicker') timepicker: any;
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControl.disabled) {
      timepicker.open();
    }
  }
  get formattedDateTime(): string {
    if (this.value) {
      return this.datePipe.transform(this.value, 'dd/MM/yy \'às\' HH:mm') || '';
    }
    return '';
  }
  onClear($event: Event) {
    this.formControl.setValue(null);
  }

  onOptionSelected(selectedOption: string) {
    this.optionSelected.emit(selectedOption);
  }
  maxTime: DateTime = DateTime.local().set({
    hour: 16,
  });
  minTime: DateTime = DateTime.local().set({
    hour: 14,
  });
  checkValidation() {
    const errors = this.control.errors;

    if(!errors) {
      this.errorMessagers = []
      return
    }

    const errorKeys = Object.keys(errors)
    this.errorMessagers = errorKeys.map(key => VALIDATORS_MESSAGES[key])
    if(this.showErrorsWhen) {
      this.control.markAsTouched({ onlySelf: false });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
    console.log(this.showErrorsWhen)

    this.teste()
  }
  onChangeValue(event: Event) {
    const enteredText = (event.target as HTMLInputElement)?.value;
    this.changedTextValue.emit(enteredText);
  }
  onChangeDatetimeValue(event: any) {
    if(event) {
      const date = new Date(event);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
      const year = date.getFullYear();
      const formattedDate = `${day}${month}${year}`;
      this.changedTextValue.emit(formattedDate);
    }
  }
  getErrorMessage(errorKey: string): string {
    return VALIDATORS_MESSAGES[errorKey] || '';
  }
  get formControl() {
    return this.control as FormControl
  }

  filteredOptions!: Observable<string[]>;

  protected teste() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  //For Input-key
  selectOption(option: any) {
    this.onOptionSelectedKey.emit(option);
  }
  filterData(event?: any) {
    if (!event) {
      this.filteredTypes = this.dataArray;
      return;
    }
    const codData = (event.target as HTMLInputElement)?.value;
    this.filteredTypes = this.dataArray.filter(v => {
      return this.formatSelectItem(v)
        .toLowerCase()
        .includes(codData.toLowerCase());
    });
  }
  formatSelectItem(data: any) {
    if (this.showOnlyDescriptionName) {
      return `${data[this.descriptionName] || data.description || data.name}`
    }
    return `${data[this.codeName || this.keyName]} - ${data[this.descriptionName] || data.description || data.name}`
  }
  showDataType = (dataCode?: any): string => {
    if (dataCode === null || !Array.isArray(this.dataArray)) return '';

    const type = this.dataArray.find((c: any) => c[this.keyName] === dataCode);
    if (type?.description) {
      return type?.description
    }
    else if (type?.name) {
      return type?.name
    }
    else if (type[this.descriptionName]) {
      return type[this.descriptionName]
    }
    return '';
  }
  openTimePicker() {
    const timePicker: HTMLElement = document.querySelector('#timePicker')!;
    timePicker.click(); // Abre o seletor de tempo escondido
  }
  onChangeTime(event: any) {
    // Atualiza o valor da hora
    const time = event.split(':');
    const date = new Date(this.value);
    date.setHours(+time[0], +time[1]);
    this.value = date.toISOString().slice(0, 16);
    this.formControl.setValue(this.value);
  }



  onDateSelected() {
    if (this.selectedDate) {
      this.updateDateTimeValue();
    }
  }

  onTimeSelected() {
    if (this.selectedTime) {
      this.updateDateTimeValue();
    }
  }

  updateDateTimeValue() {
    const [datePart, timePart] = this.dateTimeValue.split(' ');
    if (datePart && timePart) {
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
      const formattedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
      this.dateTimeValue = formattedDate.toISOString(); // Formata para o formato ISO
      this.formControl.setValue(this.dateTimeValue); // Atualiza o formControl com o valor formatado
    }
  }

  onDateTimeChange(event: string) {
    this.updateDateTimeValue(); // Atualiza o valor formatado ao modificar a entrada
  }

}
