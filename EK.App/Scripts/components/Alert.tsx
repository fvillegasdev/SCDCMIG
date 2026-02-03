// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
// ref: http://keenthemes.com/preview/metronic/theme/admin_1/ui_general.html
namespace EK.UX.Alerts {
    "use strict";

    export var AlertTypeEnum: any = {
        success: "alert-success",
        info: "alert-info",
        warning: "alert-warning",
        danger: "alert-danger"
    };

    interface IAlertProps extends React.Props<any> {
        dismiss?: boolean;
        type?: string;
    };

    export class Alert extends React.Component<IAlertProps, {}>{
        static defaultProps: IAlertProps = {
            dismiss: false,
            type: AlertTypeEnum.success
        };
        render(): JSX.Element {
            let className: string = "alert ";

            if (this.props.type) {
                className += this.props.type;
            };

            if (this.props.dismiss === true) {
                className += " alert-dismissable";
            };

            return <div className={className} style={{ margin: 0 }}>
                {this.props.dismiss === true ? <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button> : null}
                {this.props.children}
            </div>
        };
    };
}

import alerts = EK.UX.Alerts;