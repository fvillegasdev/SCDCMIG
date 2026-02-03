//namespace EK.UX {
//    "use strict";

//    export class ControlInfo extends React.Component<{}, {}> {

//        static defaultProps: IDropDrownListProps = {
//            id: "TimeZone",
//            label: "Zona",
//            helpLabel: "Zona horaria donde utilizará el sistema",
//            size: [12, 6, 6, 4]
//        };

//        render(): JSX.Element {
//            let state = EK.Store.getState();

//            return <DropdownList
//                id={this.props.id}
//                label={this.props.label}
//                items={state.dropdownlistdata.TIMEZONE}
//                size={this.props.size}
//                itemKey={this.props.itemKey}
//                itemValue={this.props.itemValue}
//                helpLabel={this.props.helpLabel}
//                required={this.props.required}
//                value={this.props.value}
//                initialValue={this.props.initialValue}
//                updateState={this.props.updateState}
//                hasValidationError={this.props.hasValidationError}
//                hasChanged={this.props.hasChanged} />;
//        }
//    }
//}

//import ControlInfo = EK.UX.ControlInfo;