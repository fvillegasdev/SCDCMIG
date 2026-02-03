/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />
namespace EK.UX.Validations {
    export class ValidationError {
        type: string;
        description?: string;
        validationFields?: string[];
        data?: any;
        isAsync?: boolean;

        constructor(type: string, description: string, isAsync?: boolean) {
            this.type = type;
            this.description = description;
            this.validationFields = [];
            this.isAsync = isAsync === true ? true : false;
        };

        getValidationInfo(): EK.UX.IValidationError {
            return {
                type: this.type,
                description: this.description,
                isAsync: this.isAsync
            };
        }

        validate(v: any, values?: any): boolean {
            return true;
        };
    };

    export class CustomValidation extends ValidationError {
        constructor(type: string, message: string, validationFields: string[], validateFn: (v: any, values?: any) => boolean) {
            super(type, message);

            this.type = type;
            this.description = message;
            this.validationFields = validationFields;
            this.validate = validateFn;
        };
    };

    export class RequiredValidation extends ValidationError {
        constructor(message: string) {
            super("requerido", message);

            if (!message) {
                this.description = "Este campo es requerido";
            };
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = true;
            if (v === undefined || v === null || $.trim(v) === "") {
                retValue = false;
            }
            else
            {
                if (v && v.constructor.name === "Object") {
                    retValue = v.ID === 0 || v.ID === -1 || v.ID === -3 || v.ID === null ? false : true;
                }
                else if (v && v.constructor.name === "String") {
                    retValue = v === undefined || v === null || $.trim(v) === "" ? false : true;
                }
                else if (v.constructor.name === "DataElement")
                {
                    retValue = false;
                }
            }
            return retValue;
        };
    };

    export class UniqueValidation extends ValidationError {
        url: string;
        field: string;


        constructor(url: string, message: string, field?: string) {
            super(field, message, true);

            this.field = field;
            this.url = url;
            this.validationFields.push("ID");
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = true;
            if (v === undefined || v === null || $.trim(v) === "") {
                return retValue = false;
            };

            let obj: any = {};
            obj.ID = values["ID"];
            obj[this.field] = v;
            //
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                url: this.url,
                data: JSON.stringify(obj),
                async: false
            }).done((data: any): any => {
                if (data === true) {
                    global.warning("El valor '" + v + "' ya esta registrado");
                }
                else {
                    //global.success("'" + v + "' disponible");
                };
                retValue = !data;
            }).fail((jqXHR: any, textStatus: any): any => {
            }).always((): any => {
            });

            return retValue;
        };
    };

    export class NameValidation extends ValidationError {
        constructor(message: string) {
            super("email", message);
        };

        validateName(name: string): boolean {
            var re = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ( )]+$/;
            var ws = /([ ]{2,})|(^[ ])|([ ]$)/;
            return re.test(name) && !ws.test(name) && (name.indexOf("(") === -1 && name.indexOf(")") === -1);
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v) === "" || this.validateName(v)) {
                retValue = true;
            };

            return retValue;
        };
    };

    export class EmptyValidation extends ValidationError {
        constructor(message: string) {
            super("empty", message);
        };

        validate(v: any, values?: any): boolean {
            return true;
        };
    };

    export class EmailValidation extends ValidationError {
        constructor(message?: string) {
            super("email", message);
            if (!message) {
                this.description = "El correo electrónico no es valido";
            };
        };

        validateEmail(email): boolean {
            var valido = false;
            //--var re = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[A-Z]{5}|es|ES|com|COM|org|ORG|net|NET|gov|GOV|mil|MIL|biz|BIZ|info|INFO|mobi|MOBI|name|NAME|aero|AERO|jobs|JOBS|museum|MUSEUM)\b/;
            var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]|es|ES|com|COM|org|ORG|net|NET|gov|GOV|mil|MIL|biz|BIZ|info|INFO|mobi|MOBI|name|NAME|aero|AERO|jobs|JOBS|museum|MUSEUM)+$/
            valido = re.test(email);
            if (email.includes("..")) {
                valido = false;
            }
            return valido;
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v) === "" || this.validateEmail($.trim(v))) {
                retValue = true;
            };

            return retValue;
        };
    };

    export class isNumber extends ValidationError {
        constructor(message: string) {
            super("número", message);
        };

        validateIsNumber(number): boolean {
            var re = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
            return re.test(number);
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v) === "" || this.validateIsNumber($.trim(v))) {
                retValue = true;
            };

            return retValue;
        };
    };

    export class isDateTime extends ValidationError {
        constructor(message: string) {
            super("Fecha", message);
        };

        validateIsDateTime(date): boolean {
            var re = /^([0-3][0-9])\/([0-1][0-9])\/(19|20)\d{2}$/;
            return re.test(date);
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v) === "" || this.validateIsDateTime($.trim(v))) {
                retValue = true;
            };
            return retValue;
        };
    };

    export class isBoolean extends ValidationError {
        constructor(message: string) {
            super("Fecha", message);
        };

        validateIsBoolean(date): boolean {
            var re = /^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$/;
            return re.test(date);
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v) === "" || this.validateIsBoolean($.trim(v))) {
                retValue = true;
            };
            return retValue;
        };
    };

    export class LengthValidation extends ValidationError {
        length: number;
        constructor(message: string, length: number) {
            super("longitud", message);

            this.length = length;
        };

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;

            if (v === undefined || v === null || $.trim(v).length === this.length) {
                retValue = true;
            };

            return retValue;
        };
    };

    export class CompareValidation extends ValidationError {
        compareType: number;

        constructor(compareType: number, fieldName: string, message: string) {
            super("validación", message);

            this.fieldName = fieldName;
            this.compareType = compareType;
            this.validationFields.push(fieldName);
        };

        fieldName: string;

        validate(v: any, values?: any): boolean {
            let retValue: boolean = false;
            let compareToValue: any;

            if (values) {
                compareToValue = values[this.fieldName];
            };

            if (v === undefined || v === null || compareToValue === undefined || compareToValue === null) {
                retValue = true;
            } else {
                let typeName: string = v.constructor.name;
                let compareToTypeName: string = compareToValue.constructor.name;

                if (typeName === "Date" && compareToTypeName === "Date") {
                    if (this.compareType === -2) {
                        if (v.getTime() < compareToValue.getTime()) {
                            retValue = true;
                        };
                    } else if (this.compareType === -1) {
                        if (v.getTime() <= compareToValue.getTime()) {
                            retValue = true;
                        };
                    } else if (this.compareType === 0) {
                        if (v.getTime() === compareToValue.getTime()) {
                            retValue = true;
                        };
                    } else if (this.compareType === 1) {
                        if (v.getTime() >= compareToValue.getTime()) {
                            retValue = true;
                        };
                    } else if (this.compareType === 2) {
                        if (v.getTime() > compareToValue.getTime()) {
                            retValue = true;
                        };
                    };
                };
            };

            return retValue;
        };
    };

    export class ClaveValidation extends ValidationError {       
        field: string;
        message: string;
        idForm: string;
        idProperty: string;

        constructor(field?: string, message?: string, idForm?: string, idProperty?: string) {
            super(field, message, true);

            this.field = field;
            this.idForm = idForm;
            this.idProperty = idProperty;
            this.validationFields.push("ID");
        };

        validate(v: any, values?: any): boolean {
            let retValue: any = true;
            if (v === undefined || v === null || $.trim(v) === "") {
                return retValue = false;
            };

            let obj: any = {};
            obj.ID = values["ID"];
            obj[this.field] = v;      

            let a: any = global.getData(Forms.getForm(this.idForm).getValue(this.idProperty));
            if (a && a.length > 0 && a != undefined) {
                if (v != null && v != undefined) {
                    a.forEach((value: any, index: number): any => {
                        if (value.Clave === v && (global.isNull(obj.ID) || value.ID != obj.ID)) {
                            v = value.Clave;
                            retValue = false;
                        }
                    });
                }
            }
            return retValue;
        };
    };
};

namespace validations {
    export const required: (message?: string) => EK.UX.Validations.RequiredValidation
        = (message?: string): EK.UX.Validations.RequiredValidation => {
            return new EK.UX.Validations.RequiredValidation(message);
        };
    export const unique: (url: string, field: string, message?: string) => EK.UX.Validations.UniqueValidation
        = (url: string, field: string, message?: string): EK.UX.Validations.UniqueValidation => {
            return new EK.UX.Validations.UniqueValidation(url, message, field);
        };
    export const email: (message?: string) => EK.UX.Validations.EmailValidation
        = (message?: string): EK.UX.Validations.EmailValidation => {
            return new EK.UX.Validations.EmailValidation(message);
        };
    export const name: (message: string) => EK.UX.Validations.NameValidation
        = (message: string): EK.UX.Validations.NameValidation => {
            return new EK.UX.Validations.NameValidation(message);
        };
    export const empty: () => EK.UX.Validations.EmptyValidation
        = (): EK.UX.Validations.EmptyValidation => {
            return new EK.UX.Validations.EmptyValidation("");
        };
    export const length: (message: string, length: number) => EK.UX.Validations.LengthValidation
        = (message: string, length: number): EK.UX.Validations.LengthValidation => {
            return new EK.UX.Validations.LengthValidation(message, length);
        };
    export const lessThan: (fieldName: string, message: string) => EK.UX.Validations.CompareValidation
        = (fieldName: string, message: string): EK.UX.Validations.CompareValidation => {
            return new EK.UX.Validations.CompareValidation(-2, fieldName, message);
        };
    export const lessEqualThan: (fieldName: string, message: string) => EK.UX.Validations.CompareValidation
        = (fieldName: string, message: string): EK.UX.Validations.CompareValidation => {
            return new EK.UX.Validations.CompareValidation(-1, fieldName, message);
        };
    export const equalThan: (fieldName: string, message: string) => EK.UX.Validations.CompareValidation
        = (fieldName: string, message: string): EK.UX.Validations.CompareValidation => {
            return new EK.UX.Validations.CompareValidation(0, fieldName, message);
        };
    export const greaterEqualThan: (fieldName: string, message: string) => EK.UX.Validations.CompareValidation
        = (fieldName: string, message: string): EK.UX.Validations.CompareValidation => {
            return new EK.UX.Validations.CompareValidation(1, fieldName, message);
        };
    export const greaterThan: (fieldName: string, message: string) => EK.UX.Validations.CompareValidation
        = (fieldName: string, message: string): EK.UX.Validations.CompareValidation => {
            return new EK.UX.Validations.CompareValidation(2, fieldName, message);
        };
    export const isNumber: (message?: string) => EK.UX.Validations.isNumber
        = (message?: string): EK.UX.Validations.isNumber => {
            return new EK.UX.Validations.isNumber(message);
        };
    export const isDateTime: (message: string) => EK.UX.Validations.isDateTime
        = (message: string): EK.UX.Validations.isDateTime => {
            return new EK.UX.Validations.isDateTime(message);
        };
    export const isBoolean: (message: string) => EK.UX.Validations.isBoolean
        = (message: string): EK.UX.Validations.isBoolean => {
            return new EK.UX.Validations.isBoolean(message);
        };
    export const custom: (type: string, message: string, validationFields: string[], validate: (v: any, values?: any[]) => boolean) => EK.UX.Validations.CustomValidation
        = (type: string, message: string, validationFields: string[], validate: (v: any, values?: any[]) => boolean): EK.UX.Validations.CustomValidation => {
            return new EK.UX.Validations.CustomValidation(type, message, validationFields, validate);
        };

    export const clave: (field: string, message?: string, idForm?: string, idProperty?: string) => EK.UX.Validations.ClaveValidation
        = (field: string, message?: string, idForm?: string, idProperty?: string): EK.UX.Validations.ClaveValidation => {
            return new EK.UX.Validations.ClaveValidation(field, message, idForm, idProperty);
        };
};

namespace EK.UX {
    "use strict";

    const ID_ACTION_UPDATE_ELEMENT: string = "forms-update-element";
    const ID_ACTION_UPDATE_FORM: string = "forms-update-form";
    const ID_ACTION_RESET: string = "forms-reset-state";

    export interface IValidationError {
        type: string;
        description?: string;
        isAsync: boolean;
    };

    export class FormElement implements IFormElement {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        value?: any;
        initialValue?: any;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        errors?: any[];
        warnings?: any[];
        isFormComponent?: boolean;

        constructor(id: string, initialValue: any, idForm: string, isSection?: boolean) {
            this.id = id;
            this.initialValue = initialValue;
            this.hasChanged = false;
            this.hasValidationError = false;
            this.isFormComponent = true;
            this.errors = [];
            this.warnings = [];

            if (isSection === true) {
                this.idForm = undefined;
                this.idFormSection = idForm;
            } else {
                this.idForm = idForm;
                this.idFormSection = undefined;
            }
        };

        update(): void {
            let idForm: string = this.idFormSection ? this.idFormSection : this.idForm;

            Forms.updateFormElement(idForm, this);
        }
    };

    export class Forms {
        static props: any = (state: any) => {
            return {
                forms: state.forms,
                idForm: getData(state.global.page).id
            };
        };

        static propsNoId: any = (state: any) => {
            return {
                forms: state.forms
            };
        };

        //static actions = {
        //    updateFormElement: (idForm: string, element: any): void => {
        //        dispatchSync("forms-update-element", { idForm, element });
        //    }
        //};

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            updateFormElement: (idForm: string, element: any): void => {
                dispatchSync("forms-update-element", { idForm, element });
            }
        });

        static updateFormElement:
        (idForm: string, element: (string | EK.UX.IFormElement), value?: any, validateAsync?: boolean) => void =
        (idForm: string, element: (string | EK.UX.IFormElement), value?: any, validateAsync?: boolean): void => {
            let item: IFormElement;
            let form: any = {};
            let formElement: IFormElement;
            let e: any = element;
            let hasValidationError: boolean = false;
            let errors: IValidationError[] = [];
            let vAsync: boolean = validateAsync ? true : false;
            //
            let state: any = Store.getState();
            if (state && state.forms && state.forms[idForm] && state.forms[idForm].form) {
                form = Store.getState().forms[idForm].form;
            };
            //
            if (e.constructor.name === "String") {
                formElement = Forms.getFormElement(idForm, { id: e });
                item = global.assign({}, formElement); //Forms.getFormElement(idForm, { id: e }, false);
                item.id = e;
                item.value = value;
                if (item.exists === true) {
                    item.hasChanged = true;
                } else {
                    item.initialValue = value;
                    item.hasChanged = false;
                };
            } else {
                formElement = Forms.getFormElement(idForm, { id: e.id });
                item = element as IFormElement;
                if (!item.validations || item.validations.length === 0) {
                    item.validations = formElement.validations;
                };
            };
            //
            let validations: EK.UX.Validations.ValidationError[] = item.validations;
            //
            if (validations && validations.length > 0) {

                validations.forEach((v: EK.UX.Validations.ValidationError, index: number) => {
                    if (v)
                    {
                        let fields: string[] = v.validationFields;
                        let fieldValues: any = {};

                        if (fields) {
                            for (var fi = 0; fi < fields.length; fi++) {
                                let fieldValue = fields[fi];
                                if (form && form[fieldValue]) {
                                    fieldValues[fieldValue] = form[fieldValue].value;
                                } else {
                                    fieldValues[fieldValue] = undefined;
                                };
                            };
                        };

                        if (v.isAsync !== true || (v.isAsync === true && vAsync === true)) {
                            if (!v.validate(item.value, fieldValues)) {
                                hasValidationError = true;

                                errors.push(v.getValidationInfo());
                            };
                        }
                        else {
                            if (formElement.errors) {
                                for (var i = 0; i < formElement.errors.length; i++) {
                                    if (v.type === formElement.errors[i].type) {
                                        errors.push(v.getValidationInfo());
                                        //
                                        break;
                                    };
                                };
                            };
                        };
                    }
                });
            };
            //
            item.hasValidationError = hasValidationError;
            item.errors = errors;
            //
            dispatchSync("forms-update-element", { idForm, element: item });
        };

        static updateFormElements:
        (idForm: string, elements: any) => void =
        (idForm: string, elements: any): void => {
            let item: IFormElement;
            let formElements: EK.UX.IFormElement[] = [];

            if (elements) {
                let state: any = EK.Store.getState();

                for (var e in elements) {
                    item = Forms.getFormElement(idForm, { id: e, forms: state.forms });
                    item.id = e;
                    item.value = elements[e];

                    if (item.exists === true) {
                        item.hasChanged = true;
                    } else {
                        item.initialValue = elements[e];
                        item.hasChanged = false;
                    };

                    formElements[formElements.length] = item;
                };
            };

            dispatchSync("forms-update-elements", { idForm, elements: formElements });
        };

        static reset: (idForm?: string) => void = (idForm?: string): void => {
            if (!idForm) {
                let state: any = EK.Store.getState();

                idForm = getData(state.global.page).id;
            };

            dispatchSync("forms-reset-state", { idForm });
        };

        static remove: (idForm?: string) => void = (idForm?: string): void => {
            if (!idForm) {
                let state: any = EK.Store.getState();

                idForm = getData(state.global.page).id;
            };

            dispatchSync("forms-reset-state", { idForm, remove: true });
        };

        static update: (idForm?: string) => void = (idForm?: string): void => {
            if (!idForm) {
                let state: any = EK.Store.getState();

                idForm = getData(state.global.page).id;
            };

            dispatchSync("forms-reset-state", { idForm });
        };

        static isValid: (idForm?: string) => boolean = (idForm?: string): boolean => {
            let state: any = EK.Store.getState();
            let f: any = state.forms[idForm];
            let valid: boolean = false;
            let item: EK.UX.IFormElement;
            let formElements: EK.UX.IFormElement[] = [];

            if (f) {
                let form = f.form;

                if (form) {
                    valid = true;

                    for (var e in form) {
                        item = Forms.getFormElement(idForm, { id: e });
                        item.validate = true;

                        if (item.hasValidationError === true) {
                            valid = false;
                        };

                        formElements.push(item);
                    };
                    dispatchSync("forms-update-elements", { idForm, elements: formElements });
                };
            };

            return valid;
        };

        static hasChanged: (idForm?: string) => boolean = (idForm?: string): boolean => {
            let state: any = EK.Store.getState();
            let form: any = state.forms[idForm];

            return form.hasChanged === true;
        };

        static getForm: (idForm?: string, state?: any) => EditForm = (idForm?: string, state?: any): EditForm => {
            return new EditForm(idForm, state);
        };

        static getValue: (idElement: string, idForm: string, state?: any) => any = (idElement: string, idForm: string, state?: any): any => {
            let value: any;

            try {
                if (!state) {
                    state = EK.Store.getState();
                }

                if (state.forms) {
                    value = state.forms[idForm].form[idElement].value;
                }
                else {
                    if (state[idForm]) {
                        value = state[idForm].form[idElement].value;
                    };
                };
            } catch (e) { }

            return value;
        };
        static getDataValue: (idElement: string, idForm: string, state: any, defaultValue?: any) => DataElement =
        (idElement: string, idForm: string, state: any, defaultValue?: any): DataElement => {
            let retValue: DataElement;

            try {
                if (!state) {
                    state = EK.Store.getState();
                }
                let element: IFormElement = state.forms[idForm].form[idElement];
                retValue = element.value;

                if (retValue && retValue !== null) {
                    retValue = createSuccessfulStoreObject(retValue);
                    retValue.timestamp = element.timestamp;
                };
            } catch (e) { }

            if (!retValue) {
                retValue = createDefaultStoreObject(defaultValue);
            };

            return retValue;
        };

        static getValues: (idForm: string, state?: any) => any =
        (idForm: string, state?: any): any => {
            let retValue: any = {};

            try {
                if (!state) {
                    state = EK.Store.getState();
                }
                let form: IFormElement = state.forms[idForm].form;
                for (var e in form) {
                    retValue[e] = form[e].value;
                };
            } catch (e) { }

            return retValue;
        };

        static createFormElement:
        (idForm: string, idElement: string, value: any) => void =
        (idForm: string, idElement: string, value: any): void => {
            let element: EK.UX.IFormElement = {}; //Forms.getFormElement(idForm, { id: idElement });
            element.id = idElement;
            element.value = value;
            element.initialValue = value;
            element.hasValidationError = false;
            element.hasChanged = false;

            dispatchSync("forms-update-element", { idForm, element });
        };

        static cloneChildrenElements:
        (children: any, map?: (p: any) => any) => any =
        (children: any, map?: (p: any) => any): any => {
            let clonedChildren: any[] = React.Children.map(children, (child: any, index: number) => {
                let newProps: any = global.assign(child.props);
                if (map) {
                    newProps = map(newProps);
                };
                newProps = Forms.cloneElementProps(child.props, newProps);

                return React.cloneElement(child, newProps);
            });

            return clonedChildren;
        };

        static cloneElementProps:
        (props: any, newProps: any) => any =
        (props: any, newProps: any): any => {
            let clonedProps: any = global.assign(props, newProps);
            clonedProps.change = newProps.change ? newProps.change : props.change;
            clonedProps.getValidations = newProps.getValidations ? newProps.getValidations : props.getValidations;
            clonedProps.updateState = newProps.updateState ? newProps.updateState : props.updateState;

            return clonedProps;
        };

        static validateElement: (idForm: string, element: IFormElement) => IFormElement =
        (idForm: string, element: IFormElement): IFormElement => {
            let state: any = EK.Store.getState();
            let formElement: IFormElement;
            let hasValidationError: boolean = false;
            let errors: IValidationError[] = [];
            let validations: EK.UX.Validations.ValidationError[] = element.validations;
            let form: any = {};
            let validate: boolean = false;

            // obtener el elemento actual de la forma
            if (state.forms[idForm] && state.forms[idForm].form) {
                form = state.forms[idForm].form;
                if (form) {
                    formElement = form[element.id];
                };

                // verificar si cambio el valor, si no, se mantiene el mismo estado
                if (element && formElement) {
                    let elementType: string = element.value
                    if (!global.areEqual(element.value, formElement.value)) {
                        validate = true;
                    }
                }
            };
            //
            if (validate === true) {
                if (validations && validations.length > 0) {
                    validations.forEach((v: EK.UX.Validations.ValidationError, index: number) => {
                        let fields: string[] = v.validationFields;
                        let fieldValues: any = {};

                        if (fields) {
                            for (var fi = 0; fi < fields.length; fi++) {
                                let fieldValue = fields[fi];
                                if (form && form[fieldValue]) {
                                    fieldValues[fieldValue] = form[fieldValue].value;
                                } else {
                                    fieldValues[fieldValue] = undefined;
                                };
                            };
                        };

                        let isValid: boolean = v.validate(element.value, fieldValues);
                        if (!isValid) {
                            hasValidationError = true;

                            errors.push(v.getValidationInfo());
                        };
                    });
                };
            }
            else {
                hasValidationError = formElement.hasValidationError;
                errors = formElement.errors;
            };
            //
            element.hasValidationError = hasValidationError;
            element.errors = errors;
            //
            return element;
        };

        static getFormElement:
        (idForm: string, props: IFormElement) => IFormElement =
        (idForm: string, props: IFormElement): IFormElement => {
            let form: any;
            let element: IFormElement = null;
            //
            if (!props.forms) {
                let state: any = EK.Store.getState();
                form = state.forms[idForm];
            } else {
                form = props.forms[idForm];
            };
            //
            if (form) {
                form = form.form;

                if (form && form[props.id]) {
                    element = form[props.id];

                    if (element && element !== null) {
                        element.id = props.id;
                        element.exists = true;
                    };
                };
            };
            //
            if (!element || element == null) {
                element = {
                    id: props.id,
                    value: props.value,
                    initialValue: props.value,
                    hasChanged: props.hasChanged,
                    hasValidationError: false,
                    validations: props.validations,
                    errors: [],
                    isFormComponent: true,
                    validate: false,
                    exists: false
                };
            };

            return element;
        };
    };

    export interface IFormElement {
        id?: string;
        idForm?: string;
        idFormSection?: string;
        index?: number;
        property?: string;
        className?: string;
        config?: page.IPageConfig;
        forms?: any;
        value?: any;
        initialValue?: any;
        timestamp?: number;
        hasChanged?: boolean;
        hasValidationError?: boolean;
        validations?: EK.UX.Validations.ValidationError[];
        getValidations?: () => EK.UX.Validations.ValidationError[];
        errors?: any[];
        warnings?: any[];
        updateState?: (element: EK.UX.IFormElement, validateAsync?: boolean) => void;
        change?: (item?: any) => void;
        //updateFormElement?: (idForm: string, element: EK.UX.IFormElement) => void;
        isFormComponent?: boolean;
        validate?: boolean;
        exists?: boolean;
    };

    export interface IFormProps extends React.Props<any> {
        id: string;
        value?: any;
        hasChanged?: boolean;
        hasValidationErrors?: boolean;
        errors?: IValidationError[];
        updateForm: (idForm: string, form: any) => void;
        update: (idForm: string, form: any) => void;
        get?: () => {};
    };

    export class ConnectedStateForm extends React.Component<IFormProps, IFormProps> {
        constructor(props: IFormProps) {
            super(props);

            this.updateFormState = this.updateFormState.bind(this);
            //this.isValid = this.isValid.bind(this);
        }

        refs: {
            validationBox: Element;
        };

        //isValid(): boolean {
        //    let retValue: boolean = true;
        //    let form: any = this.props.value[this.props.id];
        //    let formErrors: any[] = [];
        //    let newFormState: any = {
        //        form: {},
        //        hasChanged: false,
        //        hasValidationErrors: false
        //    };

        //    React.Children.forEach(this.props.children, (child: any, index: number) => {
        //        let element: IFormElement = child.props;
        //        let newData: IFormElement = {};

        //        if (element.isFormComponent === true) {
        //            let hasValidationErrors: boolean = false;
        //            let errors: IValidationError[] = [];
        //            let validations: EK.UX.Validations.ValidationError[] = element.validations;

        //            if (validations) {
        //                validations.forEach((v: EK.UX.Validations.ValidationError, index: number) => {
        //                    let fields: string[] = v.validationFields;
        //                    let fieldValues: any[] = [];

        //                    fields.forEach((fieldValue: string) => {
        //                        fieldValues.push(form.form[fieldValue].value);
        //                    });

        //                    if (!v.validate(element.value, fieldValues)) {
        //                        hasValidationErrors = true;

        //                        errors.push(v.getValidationInfo());
        //                    };
        //                });
        //            };

        //            newFormState.form[element.id] = {
        //                id: element.id,
        //                value: element.value,
        //                initialValue: element.value,
        //                hasChanged: element.hasChanged,
        //                hasValidationError: hasValidationErrors,
        //                errors: errors,
        //                isFormComponent: element.isFormComponent
        //            };

        //            if (element.hasChanged) {
        //                newFormState.hasChanged = true;
        //            };

        //            if (hasValidationErrors) {
        //                formErrors = formErrors.concat(errors);
        //                newFormState.hasValidationErrors = true;
        //            };
        //        };
        //    });

        //    if (newFormState.hasValidationErrors) {
        //        retValue = false;

        //        newFormState.errors = formErrors;
        //        this.props.update(this.props.id, newFormState);
        //    };

        //    return retValue;
        //};

        componentDidMount(): void {
          
        };

        componentWillMount(): void {
            let newFormState: any = {
                form: {},
                hasChanged: false,
                hasValidationErrors: false
            };

            let children: any = React.Children.map(this.props.children, (child: any, index: number) => {
                if (child.props.isFormComponent === true) {
                    newFormState.form[child.props.id] = {
                        value: child.props.value,
                        initialValue: child.props.value,
                        hasChanged: child.props.hasChanged,
                        hasValidationError: child.props.hasValidationError,
                        errors: child.props.errors,
                        isFormComponent: child.props.isFormComponent
                    };

                    return React.cloneElement(child, {
                        value: child.props.value,
                        initialValue: child.props.value,
                        hasChanged: child.props.hasChanged,
                        hasValidationError: child.props.hasValidationError,
                        errors: child.props.errors,
                        updateState: this.updateFormState,
                        isFormComponent: child.props.isFormComponent
                    });
                };
            });

            // update the initial state
            this.props.update(this.props.id, newFormState);

            // first props
            this.state = {
                id: this.props.id,
                children: children,
                updateForm: null,
                update: null
            };
        }

        componentWillReceiveProps(nextProps: IFormProps) {
            // check differences between children            
            let children: any = React.Children.map(this.props.children, (child: any, index: number) => {
                if (child.props.isFormComponent === true) {
                    let newChild: any;
                    React.Children.forEach(nextProps.children, (nChild: any, newIndex: number) => {
                        if (child.props.id === nChild.props.id &&
                            child.props.value !== nChild.props.value) {
                            newChild = nChild;
                        }
                    });

                    if (newChild) {
                        let newElementState: any = {};

                        // the state update is by element
                        newElementState = {
                            id: newChild.props.id,
                            value: newChild.props.value,
                            initialValue: newChild.props.value,
                            hasChanged: false,
                            hasValidationError: false,
                            errors: newChild.props.errors,
                            isFormComponent: newChild.props.isFormComponent
                        };

                        // update the state with the new values
                        this.props.updateForm(this.props.id, newElementState);

                        return React.cloneElement(newChild, {
                            value: newChild.props.value,
                            initialValue: newChild.props.value,
                            hasChanged: false,
                            hasValidationError: false,
                            updateState: this.updateFormState,
                            errors: newChild.props.errors,
                            isFormComponent: newChild.props.isFormComponent
                        });
                    } else {
                        // on updates, check validation errors

                        let stateValue: any = nextProps.value ? nextProps.value[this.props.id] : {};
                        let stateChild: IFormElement = {
                            id: child.props.id,
                            hasChanged: false,
                            hasValidationError: false,
                            errors: child.props.errors,
                            isFormComponent: child.props.isFormComponent
                        };

                        for (var e in stateValue.form) {
                            if (e === child.props.id) {
                                stateChild = stateValue.form[e];
                                break;
                            }
                        };

                        return React.cloneElement(child, {
                            value: stateChild.value,
                            initialValue: stateChild.initialValue,
                            hasChanged: stateChild.hasChanged,
                            hasValidationError: stateChild.hasValidationError,
                            updateState: this.updateFormState,
                            errors: stateChild.errors,
                            isFormComponent: stateChild.isFormComponent
                        });
                    }
                } else {
                    return child;
                };
            });

            this.state.children = children;
        };

        updateFormState(element: IFormElement): void {
            let newData: IFormElement = {};
            let form: any = this.props.value[this.props.id];
            let hasValidationErrors: boolean = false;
            let errors: IValidationError[] = [];
            let validations: EK.UX.Validations.ValidationError[] = element.validations;

            if (validations) {
                validations.forEach((v: EK.UX.Validations.ValidationError, index: number) => {
                    let fields: string[] = v.validationFields;
                    let fieldValues: any[] = [];

                    fields.forEach((fieldValue: string) => {
                        fieldValues.push(form.form[fieldValue].value);
                    });

                    if (!v.validate(element.value, fieldValues)) {
                        hasValidationErrors = true;

                        errors.push(v.getValidationInfo());
                    };
                });
            };

            // the state update is by element
            newData = {
                id: element.id,
                value: element.value,
                initialValue: element.initialValue,
                hasChanged: element.hasChanged,
                hasValidationError: hasValidationErrors,
                errors: errors,
                isFormComponent: element.isFormComponent
            };

            if (this.props.updateForm) {
                this.props.updateForm(this.props.id, newData);
            }
        };

        render(): JSX.Element {
            let formControlId: string;

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "ek.ux.form_" + Number(d).toString();
            } else {
                formControlId = "ek.ux.form_" + this.props.id.toString();
            };

            let validationBox: any;
            let form: any = this.props.value[this.props.id];

            //if (form && form.hasValidationError) {
            let errors: IValidationError[] = [];
            let formErrorClass: string = "formError-box";

            if (form && form.errors) {
                errors = form.errors;

                if (errors.length > 0) {
                    formErrorClass = "formError-box formError-items";

                    validationBox = <div className={formErrorClass} ref="validationBox">
                        <Row className="note note-warning">{errors.map((v: IValidationError, index: number) => {
                            return <Column
                                key={index}
                                className="help-block"
                                size={[12, 12, 6, 6]}
                                style={{ fontSize: 12 }}>
                                <span className="badge badge-danger">&nbsp;{v.type}&nbsp;</span>&nbsp;{v.description}
                            </Column>;
                        })}</Row>
                    </div>;
                } else {
                    formErrorClass = "formError-box formError-noitems";
                }
            };

            return <div id={formControlId}>
                {validationBox}
                {this.state.children}
            </div>;
        }
    }

    // state
    const mapProps: any = (state: any): any => {
        return {
            value: state.forms
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            updateForm: (idForm: string, element: any): void => {
                EK.Store.dispatch(EK.Store.getAction(ID_ACTION_UPDATE_ELEMENT, { idForm, element }));
            },
            update: (idForm: string, form: any): void => {
                EK.Store.dispatch(EK.Store.getAction(ID_ACTION_UPDATE_FORM, { idForm, form }));
            }
        };
    };
    export let Form: any = ReactRedux.connect(mapProps, mapDispatchs, null, { withRef: true })(ConnectedStateForm);


    export let getCurrentConfiguration: (idPage: string) => any = (idPage: string): any => {

        let parametros: any = global.assign({ claveTipoEntidad: idPage });
        global.dispatchAsync("load::currentEntityConfiguration$" + idPage,
            "base/kontrol/ConfiguracionFormulario/Get/GetFormConfiguration/" + global.encodeObject(parametros));

    };

    export let formatObjConfig: (formConfiguration: any) => any = (formConfiguration: any): any => {

        let formObjConfig: any = {};

        for (var i = 0; i < formConfiguration.length; i++) {
            let element: any = formConfiguration[i];

            formObjConfig[element.Clave] = element;
            if (element.Requerido === true) {
                element.ValidacionRequerido = validations.required();
            };
        };
        return formObjConfig;
    };

    export let formatForm: (formConfiguration: any, fields: any) => any = (formConfiguration: any, fields: any): any => {

        let form: any[] = [];

        for (var i = 0; i < formConfiguration.length; i++) {
            let element: any = fields[formConfiguration[i].Clave];

            if (formConfiguration[i].Visible === true) {
                form.push(element);
            }
        }

        return form;
    };
}

import Form = EK.UX.Form;
import Forms = EK.UX.Forms;
import IValidationError = EK.UX.IValidationError;