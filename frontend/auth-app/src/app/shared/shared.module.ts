import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MATERIAL_STYLES } from "./utils";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgxMaskDirective,
    NgxMaskPipe,
    MATERIAL_STYLES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgxMaskDirective,
    NgxMaskPipe,
    MATERIAL_STYLES
  ]
})
export class SharedModule { }
