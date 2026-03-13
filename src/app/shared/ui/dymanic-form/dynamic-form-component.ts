import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormField } from "../models/form-field";
import { PRIMENG_IMPORTS } from "../primeng/primeng.module";

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [
        CommonModule,
        ...PRIMENG_IMPORTS
    ],
    templateUrl: './dynamic-form-component.html'
})
export class DynamicFormComponent implements OnInit {

    @Input() fields: FormField[] = [];
    @Output() submitForm = new EventEmitter<any>();

    form!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {

        const control: any = {};

        this.fields.forEach(field => {
            control[field.name] = [
                '',
                field.required ? Validators.required : []
            ];
        });

        this.form = this.fb.group(control);
    }

    submit() {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
        }
    }
}