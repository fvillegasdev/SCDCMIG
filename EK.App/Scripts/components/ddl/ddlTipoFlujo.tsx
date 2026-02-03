/// <reference path="../../typings/react/react-global.d.ts" />
/// <reference path="../Colors.tsx" />
/// <reference path="../Icon.tsx" />

namespace EK.UX {
    "use strict";

    class ConnectedDDLTipoFlujo extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, EK.UX.DropDownLists.IDropDrownListProps>{

        componentDidMount() {
            this.props.loadData();
        }

        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList
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
                hasChanged={this.props.hasChanged}>
                >
                </EK.UX.DropDownLists.DropdownList>
        }
    }

    const mapProps: any = (state: any): any => {        
        if (state.dropdownlistdata.FLUJOESTATUS !== undefined) {
            return { items: state.dropdownlistdata.FLUJOESTATUS.data }
            }
            else{
                return { items:[] }
            }  
    }

    const mapDispatch: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                dispatchAsync("load::FLUJOESTATUS", "catalogos(flujoestatus)");
            }
        };
    };

    export let ddlTipoFlujo: any = ReactRedux.connect(mapProps, mapDispatch)(ConnectedDDLTipoFlujo);
}