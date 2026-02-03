/// <reference path="../../typings/react/react-global.d.ts" />
/// <reference path="../Colors.tsx" />
/// <reference path="../Icon.tsx" />

//namespace EK.UX {
//    "use strict";

//    class ConnectedDDLAmbito extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}>{

//        componentDidMount() {
//            this.props.loadData();
//        }

//        render(): JSX.Element {
//            return <EK.UX.DropDownLists.DropdownList$Form
//                id={this.props.id}
//                label={this.props.label}
//                items={this.props.items}
//                size={this.props.size}
//                itemKey={"ID"}
//                itemValue={"Valor"}
//                helpLabel={this.props.helpLabel}
//                required={this.props.required}
//                value={this.props.value}
//                initialValue={this.props.initialValue}
//                updateState={this.props.updateState}
//                hasValidationError={this.props.hasValidationError}
//                hasChanged={this.props.hasChanged}>                
//                >
//                </EK.UX.DropDownLists.DropdownList$Form>
//        }
//    }

//    const mapProps: any = (state: any): any => {        
//            if (state.dropdownlistdata.dropdownlistdataAmbito !== undefined) {
//                return { items: state.dropdownlistdata.dropdownlistdataAmbito.data }
//            }
//            else {
//                return { items: [] }
//            }        
//    }

//    const mapDispatch: any = (dispatch: Redux.Dispatch<any>) => {

//        return {
//            loadData: (): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "load-data-ambito",
//                    url: "catalogos(ambito)"
//                }));
//            }
//        };
//    };

//    export let ddlAmbito: any = ReactRedux.connect(mapProps, mapDispatch)(ConnectedDDLAmbito);
//}