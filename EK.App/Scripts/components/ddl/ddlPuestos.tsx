///// <reference path="../../typings/react/react-global.d.ts" />
///// <reference path="../Colors.tsx" />
///// <reference path="../Icon.tsx" />

//namespace EK.UX {
//    "use strict";

//    export class ConnectedDDLPuestos extends React.Component<EK.UX.IDropDrownListProps, {}> {
//        static defaultProps: IDropDrownListProps = {
//            id: "Puesto",
//            label: "Puesto",
//            helpLabel: "Seleccione el puesto del usuario",
//            size: [12, 6, 6, 4]
//        };

//        render(): JSX.Element {
//            //if (!this.props.items) {
//            //    this.props.loadData();
//            //}

//            return <DropdownList
//                id="Puesto"
//                label="Puesto"
//                items={this.props.items}
//                size={this.props.size}
//                itemKey={this.props.itemKey}
//                itemValue={this.props.itemValue}
//                helpLabel={this.props.helpLabel}
//                required={this.props.required}
//                value={this.props.value}
//                initialValue={this.props.initialValue}
//                updateState={this.props.updateState}
//                hasValidationError={this.props.hasValidationError}
//                hasChanged={this.props.hasChanged}>
//            </DropdownList>;
//        }

//        componentWillMount() {
//            this.props.loadData();
//            //let d = EK.Store.getState().global.PUESTOS;

//            //if (!d || d.status == AsyncActionTypeEnum.default || d.status == AsyncActionTypeEnum.failed) {
//            //    EK.Store.dispatch(EK.Global.actionAsync({
//            //        action: "load::PUESTOS",
//            //        url: "CatalogosGenerales/GetItems/PUESTOS",
//            //        key: "DropdownList::PUESTOS",
//            //        duration: 10
//            //    }));
//            //}
//        }
//    }

//    // state
//    const mapProps: any = (state: any): any => {
//        return {
//            items: state.global.PUESTOS
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            loadData: (): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "load::PUESTOS",
//                    url: "catalogos(puestos)",
//                    key: "DropdownList::PUESTOS",
//                    duration: 10
//                }));
//            }
//        };
//    };

//     export let ddlPuestos: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedDDLPuestos);
//}

//import DDLPuestos = EK.UX.ddlPuestos;