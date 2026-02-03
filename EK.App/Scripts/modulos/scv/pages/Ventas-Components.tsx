// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Ventas {
    "use strict";

    interface IAuthorizeButton extends EK.UX.Buttons.IButtonProps, page.IProps {
        allowAuthorize?: global.DataElement;
    };

    //***Boton para autorizar venta***//
    export let AuthorizeButton: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            allowAuthorize: state.global.allowAuthorize
        });
        static defaultProps: IAuthorizeButton = {
            icon: "fa fa-check-circle",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let entidad: any = getData(this.props.entidad);

            EK.Global.confirm($ml.mensajes.solicitarAutorizacion, "Solicitar Autorización", () => {
                global.asyncPost("Ventas/RequestAuthorize/", entidad, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        if (data.EstatusVenta.Clave === "P") {
                            success($ml.mensajes.pendingAuthorization);
                        }
                    }
                });
            });
        };
        componentWillReceiveProps(nextProps: IAuthorizeButton) {
            if (hasChanged(this.props.entidad, nextProps.entidad)) {
                if (isSuccessful(nextProps.entidad)) {
                    let item: any = getData(nextProps.entidad);
                    dispatchAsync("load::allowAuthorize", "Ventas/AllowAuthorize/" + item.IdExpediente);
                }
            }
        };
        shouldComponentUpdate(nextProps: IAuthorizeButton, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.allowAuthorize, nextProps.allowAuthorize);
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let autorizacion: any = global.getData(this.props.allowAuthorize);

            if (entidad.ReadOnlyKontrol === true) {
                if (autorizacion.Allowed === true) {
                    if (global.isSuccessful(this.props.entidad)) {
                        return <Button {...this.props} onClick={this.onClick} />;
                    }
                }
            }

            return null;
        };
    });

    interface IReestructureButtonProps extends EK.UX.Buttons.IButtonProps, page.IProps {
        allowReestructura?: global.DataElement;
    }

    //***Boton para cambiar a modo reestructura en la venta***//
    export let ReestructureButton: any = global.connect(class extends React.Component<IReestructureButtonProps, {}> {
        constructor(props: IReestructureButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            allowReestructura: state.global.allowReestructura
        });
        static defaultProps: IReestructureButtonProps = {
            icon: "fa fa-exchange-alt",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let entidad: any = global.getData(this.props.entidad);

            EK.Global.confirm("Presione Confirmar para solicitar la Reestructura de la venta", "Reestructurar Venta", () => {
                global.asyncPost("Ventas/StartReestructura/", entidad, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        success($ml.mensajes.pendingReestructura);
                    }
                });
            });
        };
        componentWillReceiveProps(nextProps: IReestructureButtonProps) {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (global.isSuccessful(nextProps.entidad)) {
                    let item: any = global.getData(nextProps.entidad);
                    global.dispatchAsync("load::allowReestructura", "ventas/AllowReestructura/" + item.IdExpediente);
                }
            }
        };
        shouldComponentUpdate(nextProps: IReestructureButtonProps, {}): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.allowReestructura, nextProps.allowReestructura);
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let reestructura: any = global.getData(this.props.allowReestructura);

            if (reestructura.Allowed === true) {
                if (global.isSuccessful(this.props.entidad)) {
                    return <Button {...this.props} onClick={this.onClick} />
                }
            }

            return null;
        };
    });

    interface ICotizacionButton extends EK.UX.Buttons.IButtonProps, page.IProps {
        allowCotizacion?: global.DataElement;
    }

    //***Boton para seleccionar una cotización***//
    export let CotizacionButton: any = global.connect(class extends React.Component<ICotizacionButton, {}> {
        constructor(props: ICotizacionButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            allowCotizacion: state.global.allowCotizacion
        });
        static defaultProps: ICotizacionButton = {
            icon: "fa fa-clone",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let entidad: any = global.getData(this.props.entidad);

            EK.Global.confirm("Presione Confirmar para seleccionar la cotización", "Seleccionar Cotización", () => {
                let idCotizacion: number = global.getDataID(this.props.entidad);
                let idExpediente: number = global.getData(this.props.entidad).IdExpediente;
                this.props.config.dispatchEntityBase({ idCotizacion, idExpediente }, "ventas/SelectCotizacion/", undefined, global.HttpMethod.POST);
            });
        };
        componentWillReceiveProps(nextProps: ICotizacionButton) {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (global.isSuccessful(nextProps.entidad)) {
                    let item: any = global.getData(nextProps.entidad);
                    global.dispatchAsync("load::allowCotizacion", "ventas/AllowSelectCotizacion/" + item.IdExpediente);
                }
            }
        };
        shouldComponentUpdate(nextProps: ICotizacionButton, {}): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.config.getState(), nextProps.config.getState()) ||
                global.hasChanged(this.props.allowCotizacion, nextProps.allowCotizacion);
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let state: any = global.getData(this.props.config.getState());
            let cotizar: any = global.getData(this.props.allowCotizacion);

            if (entidad.ReadOnlyKontrol === true) {
                if (state.viewMode === true) {
                    if (cotizar.Allowed === true) {
                        if (global.isSuccessful(this.props.entidad)) {
                            if (entidad.PlanPagos && entidad.PlanPagos.Clave !== null){
                                return <Button {...this.props} onClick={this.onClick} titulo='Selecciónar Cotización' />;
                            }
                        }
                    }
                }
            }

            return null;
        };
    });

    interface IFiniquitoButtonProps extends EK.UX.Buttons.IButtonProps, page.IProps {
        allowFiniquito?: global.DataElement;
    }

    //***Boton para actualizar la venta a modo finiquito***//
    export let FiniquitoButton: any = global.connect(class extends React.Component<IFiniquitoButtonProps, {}> {
        constructor(props: IFiniquitoButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            allowFiniquito: state.global.allowFiniquito
        });
        static defaultProps: IFiniquitoButtonProps = {
            icon: "fa fa-flag-checkered",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let entidad: any = global.getData(this.props.entidad);

            EK.Global.confirm("Presione Confirmar para acceder al finiquito de la venta", "Finiquitar Venta", () => {
                global.asyncPost("ventas/StartFiniquito/", entidad, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        success($ml.mensajes.pendingFiniquito);
                    }
                });
            });
        };
        componentWillReceiveProps(nextProps: IFiniquitoButtonProps): void {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (global.isSuccessful(nextProps.entidad)) {
                    let item: any = global.getData(nextProps.entidad);
                    global.dispatchAsync("load::allowFiniquito", "ventas/AllowFiniquito/" + item.IdExpediente);
                }
            }
        };
        shouldComponentUpdate(nextProps: IFiniquitoButtonProps, {}): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.allowFiniquito, nextProps.allowFiniquito);
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let finiquito: any = global.getData(this.props.allowFiniquito);

            if (finiquito.Allowed === true) {
                if (global.isSuccessful(this.props.entidad)) {
                    return <Button {...this.props} onClick={this.onClick} />;
                }
            }

            return null;
        };
    });

    interface IPrintButtonProps extends EK.UX.Buttons.IButtonProps, page.IProps {
    }

    //***Boton para actualizar la venta a modo finiquito***//
    export let PrintButton: any = global.connect(class extends React.Component<IPrintButtonProps, {}> {
        constructor(props: IPrintButtonProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            entidad: state.global.currentEntity,
            config: global.getPageConfig(state.global.pageConfig),
            state: state.global.currentEntityState
        });
        static defaultProps: IPrintButtonProps = {
            icon: "fa fa-print",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        shouldComponentUpdate(nextProps: IPrintButtonProps, {}): boolean {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.state, nextProps.state);
        };
        onClick(): void {
            let entidad: any = global.getData(this.props.entidad);
            let estatusVenta: any = global.assign({}, entidad.EstatusVenta);
            let url: string = "";

            if (entidad.IdCotizacion>0)
            {
                url = ["ventas/imprimir/cotizacion/", entidad.IdCotizacion, "/expediente/", entidad.IdExpediente].join("");
            }
            else
            {
                url = ["ventas/imprimir/cotizacion/", entidad.ID, "/expediente/", entidad.IdExpediente].join("");
            }
           
            let win = window.open(url, "_blank")
            //win.focus();
            //win.print();
        };
        render(): JSX.Element {
            let state: any = global.getData(this.props.state);
            let entidad: any = global.getData(this.props.entidad);
            let estatusVenta: any = global.assign({}, entidad.EstatusVenta);

            if (global.isSuccessful(this.props.entidad)) {
                if (estatusVenta.Clave !== "CO" || (Boolean(state.selectedItem) === true && entidad.ID > 0)) {
                    return <Button {...this.props} onClick={this.onClick.bind(this)} />
                }
            }

            return null;
        };
    });

}