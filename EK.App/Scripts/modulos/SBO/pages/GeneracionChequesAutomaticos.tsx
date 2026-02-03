namespace EK.Modules.SBO.Pages {
    "use strict";
    
    const PAGE_ID: string = "SBO022";

    interface IGeneracionChequesAutomaticosState {
        hasCheckSelected?: boolean;
        countCheckSelected?: number;
    }

    interface IGeneracionChequesAutomaticosProps extends React.Props<any> {
        banco?: any;
        cuentabancaria?: any;
        tipocheque?: any;
        compania?: any;
        paramsForm?: any;
        pagosprogramados?: any;
        pagosSelected?: any;
        ClickConsultar?: (item: any) => void;
        ClickGenerar?: () => void;
        setListSelected?: (listItems: any) => void;
        setLstPagosaCheques?: (listItems: any) => void;
        fecha?: any;
        setListPagosProgramados?: (listItems: any) => void;
    }

    export class PageGeneracionChequesAutomaticos extends React.Component<IGeneracionChequesAutomaticosProps, IGeneracionChequesAutomaticosState> {
        constructor(props: IGeneracionChequesAutomaticosProps) {
            super(props);
            this.onSelectedCheckChanged = this.onSelectedCheckChanged.bind(this);
            this.onClickGenerar = this.onClickGenerar.bind(this);
            this.onSelectedAll = this.onSelectedAll.bind(this);
            this.state = ({
                countCheckSelected: 0
            })
        }

        static defaultProps: IGeneracionChequesAutomaticosProps = {
            fecha: new Date()
        };

        shouldComponentUpdate(nextProps: IGeneracionChequesAutomaticosProps, nextState: IGeneracionChequesAutomaticosState): boolean {
            return true;
        }

        EsItemaGenerar(itemPagos: any): boolean {
            let retValue: boolean = false;
            let itemSelected: any = this.props.pagosSelected.data ? this.props.pagosSelected.data : [];
            for (var i = 0; i < itemSelected.length; i++) {
                if (itemSelected[i].factura == itemPagos.Factura &&
                    itemSelected[i].cc == itemPagos.CentroCosto.Clave &&
                    itemSelected[i].oc == itemPagos.OrdenCompra &&
                    itemSelected[i].proveedor == itemPagos.Proveedor.Clave) {
                    retValue = true;
                    return true;
                }
            }
            return retValue;
        }

        onSelectedAll(item: any): void {
            let lstPagosProgramados: any[] = this.props.pagosprogramados && this.props.pagosprogramados.data &&
                this.props.pagosprogramados.data.length > 0 ? this.props.pagosprogramados.data : [];

            let contador: number = 0;
            for (let it of lstPagosProgramados) {
                it.Saldo = 0;
                for (let itPagos of it.Items) {
                    itPagos.StChecked = item.currentTarget.checked;
                    if (item.currentTarget.checked) {
                        it.Saldo = it.Saldo + parseFloat(itPagos.Monto)
                        contador = contador + 1
                    }
                }
            }
            this.setState({ countCheckSelected: contador })
            this.props.setListPagosProgramados(lstPagosProgramados);
        }

        onSelectedCheckChanged(item: any): void {
            let lstPagosProgramados: any[] = this.props.pagosprogramados && this.props.pagosprogramados.data &&
                this.props.pagosprogramados.data.length > 0 ? this.props.pagosprogramados.data : [];
            let values: string = item.currentTarget.attributes["data-id"].value; // item.currentTarget.dataset.id;
            let factura: string = values.split("|")[0];
            let compania: string = values.split("|")[1];
            let cc: string = values.split("|")[2];
            let oc: string = values.split("|")[3];
            let proveedor: string = values.split("|")[4];

            for (let it of lstPagosProgramados) {
                if (it.Proveedor.Clave == proveedor) {
                    for (let itPagos of it.Items) {
                        if (itPagos.Factura == factura && itPagos.IdCompania == compania &&
                            itPagos.CentroCosto.Clave == cc && itPagos.OrdenCompra) {
                            itPagos.StChecked = item.currentTarget.checked;
                            if (item.currentTarget.checked) {
                                it.Saldo = it.Saldo + parseFloat(itPagos.Monto)
                                this.setState({ countCheckSelected: (this.state.countCheckSelected + 1) })
                            } else {
                                it.Saldo = it.Saldo - parseFloat(itPagos.Monto)
                                this.setState({ countCheckSelected: (this.state.countCheckSelected - 1) })
                            }

                        }
                    }
                }
            }

            this.props.setListPagosProgramados(lstPagosProgramados);
        }

        onClickGenerar(info: any): void {
            let pagosaGenerar: any[] = [];
            let EsGenerarCheque: boolean = false;
            let itemsSeleccionados: any[] = [];
            this.props.pagosprogramados.data.map((item: any, i: number): any => {
                item.Items.map((itemPagos: any, i: number): any => {
                    // if (this.EsItemaGenerar(itemPagos)) {
                    if (itemPagos.StChecked) {
                        EsGenerarCheque = true;
                        itemsSeleccionados.push(itemPagos);
                    }
                });
                if (EsGenerarCheque) {
                    pagosaGenerar.push({
                        "Proveedor": {
                            "ID": item.Proveedor.ID,
                            "Clave": item.Proveedor.Clave,
                            "Nombre": item.Proveedor.Nombre,
                        },
                        "Items": itemsSeleccionados,
                        "CuentaBancaria": this.props.cuentabancaria.data,
                        "TipoCheque": this.props.tipocheque.data,
                        "IdCompania": this.props.compania.data.ID,
                        "IdEstado": EK.UX.SBO.EstadoChequesEnum.Capturado
                    });
                }
                EsGenerarCheque = false;
                itemsSeleccionados = [];
            });
            this.props.setLstPagosaCheques(pagosaGenerar);
            go("/sbo/procesos/generacionpagos/chequesautomaticos/confirmacionpagos");
        }

        render(): JSX.Element {
            let itemsBC: any = [
                { text: "SBO", link: "/sbo" },
                { text: "Procesos Diarios", link: "/sbo/procesos" },
                { text: "Generación de Pagos", link: "/sbo/procesos/generacionpagos" },
                { text: "Cheques Automáticos", link: "/sbo/procesos/generacionpagos/chequesautomaticos" },
            ];
            var compania = this.props.compania && this.props.compania.data ? this.props.compania.data.ID : 0;

            // create the page component
            let page: JSX.Element =
                <PageV2 id={PAGE_ID} title={"Cheques Automáticos"} breadcrumb={itemsBC}>
                    <PageButtons>
                        <GenerarButton icon={"fa fa-check"} text="Generar" iconOnly={false} inverse={true}
                            color={ColorEnum.greenSharp} onClick={this.onClickGenerar} visible={this.state.countCheckSelected > 0 ? true : false} />
                    </PageButtons>
                    <Form id="chequesautomaticos">
                        <OptionSection title="Configurar Datos Bancarios" readOnly={true}>
                        <BancoDDL size={[12, 12, 4, 4]} />
                        <CuentaBancariaDDL size={[12, 12, 4, 4]} />
                        <TipoChequeDDLFilter size={[12, 12, 4, 4]} />
                        </OptionSection>
                        <Row className={"col-xs-12 col-sm-12 col-md-12 col-lg-12 content"} style={{ overflow: "auto" }}>
                            <LstWrapper
                                onSelectedAll={this.onSelectedAll}
                                onSelectedCheckChanged={this.onSelectedCheckChanged} />
                        </Row>
                    </Form>
                    
                    <PageFilter>
                        <CollapsePanel title={"Filtros"} >
                            <Form id="filtroscheques">
                                <Input id="IdCompania" value={compania} label="" visible={false} />
                                <Select
                                    id={"ccInicial"}
                                    label={"Centro de Costo Inicial"}
                                    remoteUrl={"CentroCosto/Search"}
                                    mode={SelectModeEnum.Single}
                                    itemFormatter={(index: number, item: any) => {
                                        return <h5 style={{ display: "inline-block", marginTop: "0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}</span>{item.Nombre}</h5>;
                                    }}
                                    suggestionFormatter={(item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    size={[12, 12, 10, 12]}
                                    helpLabel={"Seleccione el centro de costos inicial"}
                                    itemLabel={"centrocosto"}
                                    itemValue={"Nombre"}
                                    itemKey={"ID"}
                                    required={true}
                                    style={{ marginTop: 15 }} />
                                <Select
                                    id={"ccFinal"}
                                    label={"Centro de Costo Final"}
                                    remoteUrl={"CentroCosto/Search"}
                                    mode={SelectModeEnum.Single}
                                    itemFormatter={(index: number, item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    suggestionFormatter={(item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    size={[12, 12, 12, 12]}
                                    helpLabel={"Centro de costo final"}
                                    itemLabel={"centro costo"}
                                    itemValue={"Nombre"}
                                    itemKey={"ID"}
                                    required={true}
                                    style={{ marginTop: 15 }} />
                                <Select
                                    id={"ProveedorIni"}
                                    label={"Proveedor Inicial"}
                                    remoteUrl={"Proveedor/Search"}
                                    mode={SelectModeEnum.Single}
                                    itemFormatter={(index: number, item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    suggestionFormatter={(item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    size={[12, 12, 12, 12]}
                                    helpLabel={"Seleccione el proveedor inicial "}
                                    itemLabel={"proveedor"}
                                    itemValue={"Nombre"}
                                    itemKey={"ID"}
                                    required={true}
                                    style={{ marginTop: 15 }} />
                                <Select
                                    id={"ProveedorFin"}
                                    label={"Proveedor Final"}
                                    remoteUrl={"Proveedor/Search"}
                                    mode={SelectModeEnum.Single}
                                    itemFormatter={(index: number, item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    suggestionFormatter={(item: any) => {
                                        return <h5 style={{ margin: "5px 0px" }}>
                                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
                                                {item.Clave}
                                            </span>{item.Nombre}
                                        </h5>
                                    }}
                                    size={[12, 12, 12, 12]}
                                    helpLabel={"Seleccione el proveedor final"}
                                    itemLabel={"proveedor"}
                                    itemValue={"Nombre"}
                                    itemKey={"ID"}
                                    required={true}
                                    style={{ marginBottom: 15, marginTop: 15 }} />
                                <DatePicker id="FechaCorte" label="Fecha de Pago" size={[12, 12, 12, 12]} initialValue={this.props.fecha} value={this.props.fecha} />
                                <Row style={{ marginLeft: 100 }}>
                                <ConsultarButton
                                    icon={"fa fa-table"} iconOnly={false} inverse={false}
                                    color={ColorEnum.greenSharp} text="Consultar" />
                                </Row>
                            </Form>
                        </CollapsePanel>
                    </PageFilter>
                </PageV2 >;
            return page;
        }
    }

    //<PortletTab id="filtros">
    //    <PortletTabPane title="Filtros" icon="fa fa-filter" >
    //        <div style={{ height: "auto" }}>
    //            <Form id="filtroscheques">
    //                <Input id="IdCompania" value={compania} label="" visible={false} />
    //                <Select
    //                    id={"ccInicial"}
    //                    label={"Centro de Costo Inicial"}
    //                    remoteUrl={"CentroCosto/Search"}
    //                    mode={SelectModeEnum.Single}
    //                    itemFormatter={(index: number, item: any) => {
    //                        return <h5 style={{ display: "inline-block", marginTop: "0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}</span>{item.Nombre}</h5>;
    //                    } }
    //                    suggestionFormatter={(item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    size={[12, 12, 10, 12]}
    //                    helpLabel={"Seleccione el centro de costos inicial"}
    //                    itemLabel={"centrocosto"}
    //                    itemValue={"Nombre"}
    //                    itemKey={"ID"}
    //                    required={true}
    //                    style={{ marginTop: 15 }} />
    //                <Select
    //                    id={"ccFinal"}
    //                    label={"Centro de Costo Final"}
    //                    remoteUrl={"CentroCosto/Search"}
    //                    mode={SelectModeEnum.Single}
    //                    itemFormatter={(index: number, item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    suggestionFormatter={(item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    size={[12, 12, 12, 12]}
    //                    helpLabel={"Centro de costo final"}
    //                    itemLabel={"centro costo"}
    //                    itemValue={"Nombre"}
    //                    itemKey={"ID"}
    //                    required={true}
    //                    style={{ marginTop: 15 }} />
    //                <Select
    //                    id={"ProveedorIni"}
    //                    label={"Proveedor Inicial"}
    //                    remoteUrl={"Proveedor/Search"}
    //                    mode={SelectModeEnum.Single}
    //                    itemFormatter={(index: number, item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    suggestionFormatter={(item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    size={[12, 12, 12, 12]}
    //                    helpLabel={"Seleccione el proveedor inicial "}
    //                    itemLabel={"proveedor"}
    //                    itemValue={"Nombre"}
    //                    itemKey={"ID"}
    //                    required={true}
    //                    style={{ marginTop: 15 }} />
    //                <Select
    //                    id={"ProveedorFin"}
    //                    label={"Proveedor Final"}
    //                    remoteUrl={"Proveedor/Search"}
    //                    mode={SelectModeEnum.Single}
    //                    itemFormatter={(index: number, item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    suggestionFormatter={(item: any) => {
    //                        return <h5 style={{ margin: "5px 0px" }}>
    //                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
    //                                {item.Clave}
    //                            </span>{item.Nombre}
    //                        </h5>
    //                    } }
    //                    size={[12, 12, 12, 12]}
    //                    helpLabel={"Seleccione el proveedor final"}
    //                    itemLabel={"proveedor"}
    //                    itemValue={"Nombre"}
    //                    itemKey={"ID"}
    //                    required={true}
    //                    style={{ marginBottom: 15, marginTop: 15 }} />
    //                <DatePicker id="FechaCorte" label="Fecha de Pago" size={[12, 12, 12, 12]} initialValue={this.props.fecha} value={this.props.fecha} />
    //                <ConsultarButton
    //                    icon={"fa fa-table"} iconOnly={false} inverse={false}
    //                    color={ColorEnum.greenSharp} text="Consultar" />
    //            </Form>
    //        </div>
    //    </PortletTabPane>
    //</PortletTab>


    const mapProps: any = (state: any): any => {
        return {
            banco: state.bancos.selected,
            cuentabancaria: state.cuentabancaria.selected,
            tipocheque: state.chequesautomaticos.tipocheque,
            pagosprogramados: state.chequesautomaticos.pagosprogramados,
            pagosSelected: state.chequesautomaticos.pagosSelected,
            compania: state.global.usuariocompania
        };
    };


    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setListSelected: (listItems: any[]): void => {
                dispatchSuccessful("SBO-chequesautomaticos-pagosSelected", listItems);
            },
            setLstPagosaCheques: (listItems: any) => {

                dispatch(actionAsync({
                    action: "SBO-chequesautomaticos-pagosaGenerar",
                    type: HttpMethod.PUT,
                    url: "VerificarPagos(Cheques)",
                    data: listItems,
                    status: AsyncActionTypeEnum.default
                }));
            },
            setListPagosProgramados: (listItems: any): void => {
                dispatchSuccessful("SBO-chequesautomaticos-pagosprogramados", listItems);
            },
        }
    }

    const mapGenerarButtonProps: any = (state: any) => {
        return {
            items: state.global.TIPOCHEQUE,
            value: state.chequesautomaticos.tipocheque,
        }
    }

    // Consultar
    const mapConsultarButtonProps: any = (state: any) => {
        return {
            ccInicial: (state.forms && state.forms.filtroscheques &&
                state.forms.filtroscheques.ccInicial && state.forms.filtroscheques.ccInicial.value) ?
                state.forms.filtroscheques.ccInicial.value : {},
            info: {
                paramsForm: state.forms.filtroscheques
            },
        };
    }

    const mapConsultarButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let item: any = info.paramsForm.form;
                var compania = item.IdCompania.value;
                var fechaCorte = item.FechaCorte.value ? item.FechaCorte.value.getFullYear() + "-" +
                    (item.FechaCorte.value.getMonth() + 1) + "-" + item.FechaCorte.value.getDate() : null;
                var ccInicial = item.ccInicial.value ? item.ccInicial.value.Clave : "";
                var ccFinal = item.ccFinal.value ? item.ccFinal.value.Clave : "";
                var proveedorini = item.ProveedorIni.value ? item.ProveedorIni.value.Clave : 0;
                var proveedorfin = item.ProveedorFin.value ? item.ProveedorFin.value.Clave : 0;

                dispatch(actionAsync({
                    action: "SBO-chequesautomaticos-pagosprogramados",
                    type: HttpMethod.POST,
                    url: "PagosProgramados/Get",
                    data: {
                        "idcompania": compania,
                        "proveedorini": proveedorini,
                        "proveedorfin": proveedorfin,
                        "ccInicial": ccInicial,
                        "ccFinal": ccFinal,
                        "fechaCorte": fechaCorte
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };



    let GenerarButton: any = ReactRedux.connect(mapGenerarButtonProps, null)(Button);
    let ConsultarButton: any = ReactRedux.connect(mapConsultarButtonProps, mapConsultarButtonDispatchs)(Button);

    export let GeneracionChequesAutomaticosPage: any = ReactRedux.connect(mapProps, mapDispatchs)(PageGeneracionChequesAutomaticos);


    // DDL Tipo de Cheque 
    export interface ITipoChequeDDLProps extends IDropDrownListProps {
        obtenerDatos?: (items: any) => any;
    }

    export class TipoChequeFilterDDL extends React.Component<ITipoChequeDDLProps, ITipoChequeDDLProps> {
        constructor(props: ITipoChequeDDLProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "TipoCheque",
            items: createDefaultStoreObject([]),
            label: "Tipo de Cheque",
            helpLabel: "Seleccione el tipo de cheque",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };

        componentDidMount(): any {
            if (!isSuccessful(this.props.items)) {
                let datos: any[] = [];
                datos.push({
                    "ID": EK.UX.SBO.TipoChequesEnum.Fisico,
                    "Nombre": "Físico"
                });
                datos.push({
                    "ID": EK.UX.SBO.TipoChequesEnum.Electronico,
                    "Nombre": "Electrónico"
                });
                this.props.obtenerDatos(datos);
            }
        }

        shouldComponentUpdate(nextProps: ITipoChequeDDLProps, nextState: ITipoChequeDDLProps): boolean {
            return getTimestamp(this.props.items) !== getTimestamp(nextProps.items) ||
                getTimestamp(this.props.value) !== getTimestamp(nextProps.value);
        };

        componentDidUpdate(prevProps: ITipoChequeDDLProps, prevState: ITipoChequeDDLProps) {
            if (isSuccessful(this.props.items)) {
                if (!isSuccessful(this.props.value) && this.props.items.data.length > 0) {
                    this.props.change(this.props.items.data[1]);
                }
            }
        }

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);

            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={this.props.label}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    const mapTipoChequeProps: any = (state: any) => {
        return {
            items: state.chequesautomaticos.tipocheques,
            value: state.chequesautomaticos.tipocheque
        };
    }

    const mapTipoChequeDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            change: (item: any): any => {
                dispatchSuccessful("SBO-chequesautomaticos-tipocheque", item);
            },
            obtenerDatos: (items: any): any => {
                dispatchSuccessful("SBO-chequesautomaticos-tipocheques", items);
            }
        }
    };

    let TipoChequeDDLFilter: any = ReactRedux.connect(mapTipoChequeProps, mapTipoChequeDispatchs)(TipoChequeFilterDDL);
    // Filtro Cuenta Bancaria 

    // Lista Wrapper 
    export interface IListWrapperProps extends EK.UX.IListProps {
        itemsSelected?: any;
        onSelectedAll?: (item: any) => void;
        onSelectedCheckChanged?: (item: any) => void;
    }

    export class ListWrapper extends React.Component<IListWrapperProps, IListWrapperProps> {
        constructor(props: IListWrapperProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IListWrapperProps, nextState: IListWrapperProps): boolean {
            return getTimestamp(this.props.itemsSelected) != getTimestamp(this.props.items);
        }

        render(): any {

            return <UpdateColumn info={this.props.items} text="obteniendo información">
                <List addRemoveButton={false} readonly={true} itemClass={"list-item-content"}
                    items={this.props.items}
                    listHeader={
                        <div className={"row"} style={{ paddingLeft: "12px" }}>
                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>
                                <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline" style={{ textAlign: "center" }}>
                                    <input data-index={"0"} id={"chkSelectAll"} type="checkbox" value={"false"}
                                        onClick={this.props.onSelectedAll} />
                                    <span></span></label>
                            </div>
                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>Factura</div>
                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>Fecha Venc</div>
                            <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "center", fontWeight: "bold" }}>CC</div>
                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>OC</div>
                            <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "center", fontWeight: "bold" }}>Concepto</div>
                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>TM Banco</div>
                            <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center", fontWeight: "bold" }}>Monto</div>
                        </div>
                    }
                    formatter={(index: number, item: any) => {

                        let dateFormat: (data: Date) => string = (data) => {
                            var pad = "00";
                            return (data != undefined || data != null) ?
                                (pad + data.getDate().toString()).slice(-pad.length) + "/" +
                                (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
                                data.getFullYear() : "";
                        };

                        let elements: JSX.Element[] = [];
                        var sumMonto = 0;
                        var tm = "";
                        for (var it of item.Items) {
                            var saldo = it.Monto.toLocaleString(undefined, { minimumFractionDigits: 2 });
                            sumMonto = sumMonto + parseFloat(it.Monto);
                            tm = (it.TipoMovimiento.Clave ? it.TipoMovimiento.Clave : ""); // + " " + (it.TipoMovimiento.Nombre ? it.TipoMovimiento.Nombre : "")
                            elements.push(<div key={"li_" + it.Factura} className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                                <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"}>
                                    <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline" style={{ textAlign: "center" }}>
                                        <input data-index={"0"} id={"chkSelectItem_" + it.Factura + "_" + it.CentroCosto.Clave} type="checkbox" value={"false"}
                                            data-id={(it.Factura + "|" + it.IdCompania + "|" + it.CentroCosto.Clave + "|" + it.OrdenCompra + "|" + it.Proveedor.Clave)}
                                            onClick={this.props.onSelectedCheckChanged}
                                            checked={it.StChecked} />
                                        <span></span></label>
                                </div>
                                <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "left" }}><h6>{it.Factura}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "left" }}><h6>{dateFormat(it.FechaVencimiento)}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-2 col-lg-2"} style={{ "textAlign": "left" }}><h6>{(it.CentroCosto.Clave + "-" + it.CentroCosto.Nombre)}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "center" }}><h6>{it.OrdenCompra}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-3 col-lg-3"} style={{ "textAlign": "left" }}><h6>{it.Concepto}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "left" }}><h6>{tm}</h6></div>
                                <div className={"col-xs-12 col-sm-12 col-md-1 col-lg-1"} style={{ "textAlign": "right" }}><h6>{saldo}</h6></div>
                            </div>)
                        }
                        var saldototal = sumMonto.toLocaleString(undefined, { minimumFractionDigits: 2 });
                        var saldoProveedor = item.Saldo.toLocaleString(undefined, { minimumFractionDigits: 2 });

                        return <div className={"row"}>
                            <div className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"} style={{ marginTop: 10, marginBottom: 10 }}>
                                <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-8"} style={{ textAlign: "left" }}>
                                    <h6 style={{ fontWeight: "bold" }}>{item.Proveedor.Nombre}</h6>
                                </div>
                                <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-2"} style={{ textAlign: "right", fontWeight: "bold" }}>
                                    {saldototal}
                                </div>
                                <div className={"col-xs-12 col-sm-12 col-md-6 col-lg-2"} style={{ textAlign: "right", fontWeight: "bold" }}>
                                    {saldoProveedor}
                                </div>
                            </div>
                            {elements}
                        </div>
                    }}
                />
            </UpdateColumn>;
        }
    }

    const mapListProps: any = (state: any) => {
        return {
            items: state.chequesautomaticos.pagosprogramados,
            itemsSelected: state.chequesautomaticos.pagosSelected
        };
    }
    export let LstWrapper: any = ReactRedux.connect(mapListProps, null)(ListWrapper);
    // Lista Wrapper 

    // let ListPagos: any = ReactRedux.connect(, null)(LstWrapper);
}