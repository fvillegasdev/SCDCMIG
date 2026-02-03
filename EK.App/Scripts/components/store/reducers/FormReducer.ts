/// <reference path="../StoreTypes.ts" />
/// <reference path="../Store.ts" />

namespace EK.Store.Reducers {
    "use strict";
    export const FormReducer: any = (state: any, action: EK.Store.IAction) => {

        if (state === undefined) {
            return {};
        }
        else if (action.type === "forms-reset-state") {
            let formId: string = action.data.idForm;
            let newForm: any = {};
            let newState: any = {};

            if (action.data.remove === true) {
                newForm[formId] = {};
                let retValue: any = EK.Global.assign(state, newForm);

                return retValue;
            } else {
                if (state[formId] && state[formId].form) {
                    for (var p in state[formId].form) {
                        let element: any = state[formId].form[p];
                        let newElement: any = {
                            value: element.initialValue,
                            initialValue: element.initialValue,
                            hasChanged: false,
                            hasValidationError: false,
                            validations: element.validations,
                            errors: [],
                            isFormComponent: element.isFormComponent,
                            validate: false,
                            timestamp : Number(new Date())
                        };

                        newForm[p] = newElement;
                    };
                };

                newState[formId] = {
                    form: newForm,
                    hasChanged: false,
                    hasValidationError: false,
                    timestamp: Number(new Date()),
                    errors: []
                };

                let retValue: any = EK.Global.assign(state, newState);

                return retValue;
            }
        }
        else if (action.type === "forms-set-validate") {
            let formId: string = action.data.idForm;
            let newForm: any = {};
            let newState: any = {};

            if (state[formId] && state[formId].form) {
                for (var p in state[formId].form) {
                    let element: any = EK.Global.assign({}, state[formId].form[p]);
                    element.validate = true;

                    newForm[p] = element;
                };
            };

            newState[formId] = {
                form: newForm,
                hasChanged: state[formId].hasChanged,
                hasValidationError: state[formId].hasValidationError,
                timestamp: Number(new Date()),
                errors: []
            };

            let retValue: any = EK.Global.assign(state, newState);

            return retValue;
        }
        else if (action.type === "forms-update-form") {
            let formId: string = action.data.idForm;
            let newState: any = {};

            newState[formId] = action.data.form;
            newState[formId].timestamp = Number(new Date());
            // create the new state object
            let retValue: any = EK.Global.assign(state, newState);

            return retValue;
        }
        else if (action.type === "forms-update-element") {
            // get the form identifier
            let formId: string = action.data.idForm;
            let element: EK.UX.IFormElement = action.data.element;
            let newElement: any = {};

            let newForm: any = {};
            let newState: any = {};
            let currentForm: any = state[formId] ? state[formId].form : {};

            newElement[element.id] = {
                value: element.value,
                initialValue: element.initialValue,
                hasChanged: element.hasChanged,
                hasValidationError: element.hasValidationError,
                validations: element.validations,
                errors: element.errors,
                isFormComponent: element.isFormComponent,
                validate: element.validate,
                timestamp : Number(new Date())
            };

            newForm = EK.Global.assign(currentForm, newElement);

            let formHasChanged: boolean = false;
            let formHasErrors: boolean = false;
            let errors: IValidationError[] = [];

            for (var e in newForm) {
                if (newForm[e].hasChanged) {
                    formHasChanged = true;
                };

                if (newForm[e].hasValidationError) {
                    formHasErrors = true;
                    if (newForm[e].errors && newForm[e].errors.length > 0) {
                        errors = errors.concat(newForm[e].errors);
                    };
                };
            };

            newState[formId] = {
                form: newForm,
                hasChanged: formHasChanged,
                hasValidationError: formHasErrors,
                timestamp: Number(new Date()),
                errors: errors
            };

            // create the new state object
            let retValue: any = EK.Global.assign(state, newState);

            return retValue;
        }
        else if (action.type === "forms-update-elements") {

            // get the form identifier
            let formId: string = action.data.idForm;
            let element: EK.UX.IFormElement;
            let elements: EK.UX.IFormElement[] = action.data.elements;
            let newElements: any = {};

            let newForm: any = {};
            let newState: any = {};
            let currentForm: any = state[formId] ? state[formId].form : {};

            for (var i = 0; i < elements.length; i++) {
                element = elements[i];

                newElements[element.id] = {
                    value: element.value,
                    initialValue: element.initialValue,
                    hasChanged: element.hasChanged,
                    hasValidationError: element.hasValidationError,
                    validations: element.validations,
                    errors: element.errors,
                    isFormComponent: element.isFormComponent,
                    validate: element.validate,
                    timestamp: Number(new Date())
                };
            };
            newForm = EK.Global.assign(currentForm, newElements);            

            let formHasChanged: boolean = false;
            let formHasErrors: boolean = false;
            let errors: IValidationError[] = [];

            for (var e in newForm) {
                if (newForm[e].hasChanged) {
                    formHasChanged = true;
                };

                if (newForm[e].hasValidationError) {
                    formHasErrors = true;
                    if (newForm[e].errors && newForm[e].errors.length > 0) {
                        errors = errors.concat(newForm[e].errors);
                    };
                };
            };

            newState[formId] = {
                form: newForm,
                hasChanged: formHasChanged,
                hasValidationError: formHasErrors,
                timestamp: Number(new Date()),
                errors: errors
            };

            // create the new state object
            let retValue: any = EK.Global.assign(state, newState);

            return retValue;
        }

        return state;
    };
}