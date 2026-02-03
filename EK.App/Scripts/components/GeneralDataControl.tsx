/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface IGeneralDataControlProps extends React.Props<any>, grid.IColumn {
        id: string;
        hasChanged?: boolean;
        creado?: Date;
        modificado?: Date;
        creadoPor?: any;
        modificadoPor?: any;
    }

    export class GeneralDataControl extends React.Component<IGeneralDataControlProps, IGeneralDataControlProps> {
        constructor(props: IGeneralDataControlProps) {
            super(props);
        }

        static defaultProps: IGeneralDataControlProps = {
            id: "",
            hasChanged: false

        };

        refs: {
            requiredPoint: Element;
        };

        shouldComponentUpdate(nextProps: IGeneralDataControlProps, nextState: IGeneralDataControlProps): boolean {
            if ((this.props.creadoPor !== nextProps.creadoPor) || (this.props.modificadoPor !== nextProps.modificadoPor)) {
                return true;
            } else {
                return false;
            }
        }

        render(): JSX.Element {
            let formControlId: string;
            let className: string = "form-control input-sm";
            let formGroupClass: string = "form-group form-md-line-input form-md-floating-label";

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };

            const lhStyle = {
                color: 'gray',
                fontSize: 'small'
            };

            let StrCreado = ((this.props.creadoPor != undefined) ? this.props.creadoPor.Nombre : "") + " - " +
                ((this.props.creado != undefined) ? this.props.creado.toLocaleString() : "");
            let StrModificado = ((this.props.modificadoPor != undefined) ? this.props.modificadoPor.Nombre : "") + " - " +
                ((this.props.modificado != undefined) ? this.props.modificado.toLocaleString() : "");
            return <grid.Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className={formGroupClass}>
                    <Label
                        id={"CreadoPor"}
                        size={[12, 12, 6, 6]}
                        label={"Creado Por"}
                        value={StrCreado}
                        />
                    <Label
                        id={"ModificadoPor"}
                        size={[12, 12, 6, 6]}
                        label={"Modificado Por"}
                        value={StrModificado}
                        />
                </div>
            </grid.Column>;
        }
    }


    import GeneralDataComponent = EK.UX.GeneralDataControl;
}