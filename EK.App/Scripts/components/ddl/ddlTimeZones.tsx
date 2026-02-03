namespace EK.UX {
    "use strict";

    //export const dispatchTimeZones: () => void = (): void => {
    //    EK.Store.dispatch(EK.Global.actionAsync({
    //        action: "load::TIMEZONE",
    //        url: "CatalogosGenerales/GetItems/TIMEZONE",
    //        key: "DropdownList::TIMEZONE",
    //        duration: 1440
    //    }));
    //};

    export class ConnectedDDLTimeZones extends React.Component<IDropDrownListProps, {}> {

        static defaultProps: IDropDrownListProps = {
            id: "TimeZone",
            label: "Zona Horaria",
            helpLabel: "Zona horaria donde utilizará el sistema",
            size: [12, 6, 6, 4]
        };

        render(): JSX.Element {
            // let state = EK.Store.getState();

            //if (state.dropdownlistdata.TIMEZONES.data) {
            //    let d: any[] = state.dropdownlistdata.TIMEZONES.data;

            //    d.forEach((v: any, index: number) => {
            //        console.log(" insert catalogosGeneralesValores (idCatalogo, idEstatus, Creado, CreadoPor, Modificado, ModificadoPor, Clave, Nombre) values (9, 13, getutcdate(), 1, getutcdate(), 1, '" + v.Clave + "', '" + v.Nombre + "');");
            //    });
            //}
            //if (!this.props.items) {
            //    this.props.loadData();
            //}

            return <DropdownList
                id={this.props.id}
                label={this.props.label}
                items={this.props.items}
                size={this.props.size}
                itemKey={this.props.itemKey}
                itemValue={this.props.itemValue}
                helpLabel={this.props.helpLabel}
                required={this.props.required}
                value={this.props.value}
                initialValue={this.props.initialValue}
                updateState={this.props.updateState}
                hasValidationError={this.props.hasValidationError}
                hasChanged={this.props.hasChanged} />;
        }

        componentWillMount() {
            this.props.loadData();
        //    let d = EK.Store.getState().global.TIMEZONE;

        //    if (!d || d.status == AsyncActionTypeEnum.default || d.status == AsyncActionTypeEnum.failed) {
        //        EK.Store.dispatch(EK.Global.actionAsync({
        //            action: "load::TIMEZONE",
        //            url: "CatalogosGenerales/GetItems/TIMEZONE",
        //            key: "DropdownList::TIMEZONE",
        //            duration: 1440
        //        }));
        //    }
        }
    }

    // state
    const mapProps: any = (state: any): any => {
        return {
            items: state.global.TIMEZONES
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                dispatchAsync("load::TIMEZONES", "catalogos(timezone)");
            }
        };
    };

    export const ddlTimeZones: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedDDLTimeZones);
}

import DDLTimeZones = EK.UX.ddlTimeZones;
//import dispatchTimeZones = EK.UX.dispatchTimeZones;