/// <reference path="../../typings/react/react-global.d.ts" />
/// <reference path="../Colors.tsx" />
/// <reference path="../Icon.tsx" />

namespace EK.UX {
    "use strict";

    class ConnectedDDLNotificadoresUsuario extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, EK.UX.DropDownLists.IDropDrownListProps>{

        componentDidMount() {
            this.props.loadData();
        }

        render(): JSX.Element {
            return <div id={"divddlNotificadorUsuario"}>
                <EK.UX.DropDownLists.DropdownList
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
                hasChanged={this.props.hasChanged}                
                >
                </EK.UX.DropDownLists.DropdownList>
            </div>
        }
    }

    const mapProps: any = (state: any): any => {        
        if (state.dropdownlistdata.ddldataNotificadoresUsuario !== undefined) {
            return { items: state.dropdownlistdata.PUESTOS.data }
        }
        else {
            return { items: [] }
        }
    }

    const mapDispatch: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                dispatchAsync("load::PUESTOS", "catalogos(puestos)");
            }
        };
    };

    export let ddlNotificadoresUsuario: any = ReactRedux.connect(mapProps, mapDispatch)(ConnectedDDLNotificadoresUsuario);
}