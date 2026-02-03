/// <reference path="../../typings/react/react-global.d.ts" />
/// <reference path="../Colors.tsx" />
/// <reference path="../Icon.tsx" />

namespace EK.UX {
    "use strict";

    class ConnectedDDLEstatus extends React.Component<EK.UX.DropDownLists.IDropDrownListProps, {}> {
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
            </EK.UX.DropDownLists.DropdownList>;
        }

        componentDidMount() {
            this.props.loadData();
        }
    }

    // state
    const mapProps: any = (state: any): any => {
        return {
            items: state.global.ESTATUS.data
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            loadData: (): void => {
                dispatchAsync("load::ESTATUS", "catalogos(puestos)");
            }
        };
    };

    export let ddlEstatus: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedDDLEstatus);
}
