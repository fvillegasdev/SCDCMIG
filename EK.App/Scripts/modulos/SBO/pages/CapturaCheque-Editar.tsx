namespace EK.Modules.SBO.Pages {
    "use strict";

    const PAGE_ID = "SBO006";
    const idForm: string = "capturacheque";
    const idPage: string = "";


    const form: () => EditForm = (): EditForm => {
        return new EditForm(idForm);
    };

    const formatDate: (d: Date) => string = (d: Date): string => {
        if (d) {
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/");
        }

        return "";
    };

    interface IChequeParams {
        id: number;
    }

    interface IChequeProps extends React.Props<any> {
        cargarDatos?: (id: number) => void;
        cheque: any;
        banco: any;
        params?: IChequeParams;
        history?: any[];
        global?: any;
        guardar?: (item: any, strUrl: string) => void;
        isNew?: boolean;
        cargaGlobal?: () => any;
        consecutivo: any;
        getConsecutivo?: (id: number) => void;
      
      
 
    }

    interface IChequeState {
        viewMode?: boolean;
        monto?: any;
      
    }

    export class ConnectedPageEditarCheque extends React.Component<IChequeProps, IChequeState> {
        constructor(props: IChequeProps) {
            super(props);
            this.editForm = this.editForm.bind(this);
            this.saveForm = this.saveForm.bind(this);
            this.cancelEditForm = this.cancelEditForm.bind(this);
            this.state = { viewMode: true };
          
        }

        static defaultProps: IChequeProps = {
            isNew: false,
            cheque: undefined,
            global: {},
            banco: undefined,
            consecutivo: undefined
         
        };

        saveForm(item: any): void {
            let strUrl: string = this.props.isNew ? "Cheques/Save" : "Cheques/update";
            this.props.guardar(item, strUrl);
            this.setState({ viewMode: false });
        }

        editForm(): void {
            this.setState({ viewMode: false });
        }

        cancelEditForm(): void {
            if (!this.props.isNew) {
                this.setState({ viewMode: true });
            } else {
                ReactRouter.hashHistory.push("sbo/procesos/capturacheque");
            }
        }

        shouldComponentUpdate(nextProps: IChequeProps, nextState: IChequeState): boolean {
            return (getTimestamp(this.props.consecutivo) !== getTimestamp(nextProps.consecutivo))
        }

        componentDidMount(): any {
            this.props.cargaGlobal();
          //  console.log("log: " + tipoChequesEnum.Fisico);

            if (!this.props.isNew) {
                if (this.props.params.id) {
                    this.props.cargarDatos(Number(this.props.params.id));

                } else {
                    dispatchFailed("SBO-cheques-setSelected", null);
                }
            } else {
              this.props.getConsecutivo(this.props.global.cuentaSel.ID);
                dispatchSuccessful("SBO-cheques-setSelected", createSuccessfulStoreObject({}));
            }

        };

        componentDidUpdate(prevProps: IChequeProps, prevState: IChequeState): any {
            if (prevProps.cheque.status === AsyncActionTypeEnum.updating) {
                if (this.props.cheque.status === AsyncActionTypeEnum.successful) {
                    success("El cheque ha sido creado...");
                }
            }
        }
       
        render(): JSX.Element {
            let cheque: any = this.props.cheque.data;

            let itemsBC: any = [
                { text: "SBO", link: "/" },
                { text: "Procesos Diarios", link: "/" },
                { text: "Cheques", link: "sbo/procesos/capturacheque/" },
                (this.props.isNew ? { text: "Nuevo", href: "" } : { text: cheque.NumeroCheque, href: "" })
            ];


            let pageTitle: string = !this.props.isNew ? cheque.NumeroCheque : "Cheque";
            let pageSubtitle: string = !this.props.isNew ? cheque.Clave : "Nuevo";


            // create the page component
            let page: JSX.Element =
                <Page id={PAGE_ID}>
                    <PageBar>
                        <Breadcrumb data={itemsBC} />
                    </PageBar>
                    <Grid>
                        <Row>
                            <LeftPanelUpdate info={this.props.cheque}>
                                {!this.props.isNew && this.state.viewMode
                                    ? <View
                                        data={cheque}
                                        onEditForm={this.editForm}
                                        global={this.props.global} />
                                    : <Edit
                                        isNew={this.props.isNew}
                                        data={cheque}
                                        global={this.props.global}
                                        onCancelEditForm={this.cancelEditForm}
                                        onSaveForm={this.saveForm}
                                        consecutivo={this.props.consecutivo} />}
                            </LeftPanelUpdate>
                            {!this.props.isNew
                                ? <RightColumn>
                                    <PortletTab>
                                        <HistoryItemTab data={this.props.history} />
                                    </PortletTab>
                                </RightColumn>
                                : <RightColumn>
                                    <PortletTab id="configuración">
                                        <PortletTabPane title="Datos de Cuenta" icon="icon-info">

                                            <Label label="Banco" value={this.props.global.bancoSel.Clave + " " + this.props.global.bancoSel.Descripcion}
                                                size={[12, 12, 12, 12]} />

                                            <Label label="Cuenta Bancaria" value={this.props.global.cuentaSel.Clave + " " + this.props.global.cuentaSel.Descripcion}
                                                            size={[12, 12, 12, 12]} />

                                            
                                    </PortletTabPane>
                                </PortletTab>
                                </RightColumn>
                                }
                        </Row>
                    </Grid>
                </Page>;
            return page;
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            cheque: state.cheques.setSelected,
            consecutivo: state.cheques.consecutivo,
            global: {
                tm: state.tipomovimiento.tipomovimiento,
                cc: state.centroscosto.centroscosto,
                tipopoliza: state.global.tipopoliza,
                cuentaSel: state.cuentabancaria.selected.data,
                bancoSel: state.bancos.selected.data,
                user: state.global.app.data.Iniciales,
                compania: state.global.usuariocompania
            }

        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargarDatos: (id: number): void => {
                dispatchAsync("SBO-cheques-setSelected", "Cheques/GetById/" + id);
            },
            cargaGlobal: (): void => {
                dispatchAsync("TipoMovimiento-catalogo", "TipoMovimiento/GetAll");
                dispatchAsync("CentrosCosto-catalogo", "CentroCosto/Get");
                dispatchAsync("load::tipopoliza", "CatalogosGenerales/GetItems/TIPOPOLIZA");
            },
            //
            getConsecutivo: (id: number): void => {
                dispatchAsync("SBO-cheques-consecutivo", "Cheques/GetConsecutivoCheque/" + id + "/" + tipoChequesEnum.Fisico);
            },
            guardar: (item: any, strUrl: string): void => {
                dispatchAsyncPut("SBO-cheques-guardar", strUrl, item);
            }
        };
    };

    export let PageChequeCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarCheque);
   
    /*** BEGIN: NEW FORM ***/
    export class NuevoCheque extends React.Component<{}, {}> {
        render(): JSX.Element {
            return <PageChequeCatalogo isNew={true} />
        }
    };
    /***
    /*** END: NEW FORM ***/

    /*** BEGIN: EDIT FORM ***/
    interface IEditProps extends React.Props<any> {
        data?: any;
        isNew?: boolean;
        global?: any;
        onCancelEditForm?: () => any;
        onSaveForm?: (item: any) => any;
        consecutivo?: any;
              
    };
   

    class Edit extends React.Component<IEditProps, IChequeState> {
        constructor(props: IEditProps) {
            super(props);
            this.onSaveFormClick = this.onSaveFormClick.bind(this);
            this.onChange = this.onChange.bind(this);
            this.state = { monto: undefined };
        };
        onSaveFormClick(): void {
            let item: EditForm = form();

            let cheque: any = {

                "ID": !this.props.isNew ? this.props.data.ID : 0,
                "NumeroCheque": item.formData.form.NumeroCheque.value,
                "Descripcion": item.formData.form.Descripcion.value,
                "Monto": item.formData.form.Monto.value,
                "FechaMovimiento": item.formData.form.FechaMovimiento.value,
              //  "FechaRetencion": item2.formData.form.Referencia.value,
                "Concepto1": item.formData.form.Concepto1.value,
                "CuentaBancaria": this.props.global.cuentaSel,
                "TipoMovimiento": item.formData.form.TM.value,
                "IdCompania": this.props.global.compania.data.ID,
                "TipoCheque": EK.UX.SBO.TipoChequesEnum.Fisico,
                "Poliza": item.formData.form.Poliza.value,
                "TipoPoliza": item.formData.form.TipoPoliza.value,
                "CC": item.formData.form.CC.value,
              //  "Proveedor": item.formData.form.Proveedor.value,
                "EstadoCheque": !this.props.isNew ? EK.UX.SBO.EstadoChequesEnum.Modificado : EK.UX.SBO.EstadoChequesEnum.Capturado
            };

            this.props.onSaveForm(cheque);
        };

        onChange(value: number): void {

            console.log(value);
            this.setState({ monto: value });
           
        }
        render(): JSX.Element {
            let current: any = this.props.data;
            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
            let pageTitle: string = !this.props.isNew ? current.Descripcion : "Nuevo Cheque";
            let pageSubtitle: string = !this.props.isNew ? current.NumeroCheque : "";
            let numeroCheque: string = !this.props.isNew ? current.NumeroCheque : this.props.consecutivo.data;
            let numeroPoliza: string = !this.props.isNew ? current.IdPoliza: this.props.consecutivo.data;
            
            let fechaMov: string = !this.props.isNew ? current.FechaMovimiento : new Date();
        

            return <FadeInColumn>
                <PageToolbar>
                    <PageTitle title={pageTitle} subTitle={pageSubtitle} />
                    <ButtonGroup>
                        <SaveButton onClick={this.onSaveFormClick} />
                        <CancelButton onClick={this.props.onCancelEditForm} />
                    </ButtonGroup>
                </PageToolbar>
                <Form id={idForm} ref="form">
                    <Input id="ID" value={current.ID} label="" visible={false} />
                    
                    <Input
                        id="NumeroCheque"
                        label="Cheque"
                        size={[12, 12, 12, 2]}
                        helpLabel="Número de Cheque"
                        value={numeroCheque}
                        maxLength={5}
                        validations={[
                            validations.required("el número de cheque es requerido")
                        ]} />
                    <DatePicker id="FechaMovimiento" label="Fecha"
                        xs={{ size: 6 }} sm={{ size: 4 }} md={{ size: 4 }} lg={{ size: 2 }}
                        validations={[validations.required("Fecha de Movimiento")]}
                        value={fechaMov} />

                    <Input
                        id="Descripcion"
                        label="Paguesé a"
                        size={[12, 12, 12, 9]}
                        helpLabel="Nombre de Proveedor"
                        value={current.Descripcion}
                        maxLength={120}
                        validations={[
                            validations.required("el nombre de proveedor es requerido")
                        ]} />

                    <Input
                        id="Monto"
                        label="Monto"
                        size={[12, 12, 12, 3]}
                        helpLabel="Monto a pagar"
                        value={current.Monto}
                        maxLength={15}
                        change={this.onChange}
                        validations={[
                            validations.required("El monto es requerido"),
                            validations.isNumber("El valor del campo debe ser numérico")
                        ]} />

                    <LblMontoWrapper monto={this.state.monto} />
                    
                    <Input
                        id="Concepto1"
                        label="Concepto"
                        size={[12, 12, 12, 12]}
                        helpLabel="Capture el Concepto"
                        value={current.Concepto1}
                        maxLength={120}
                    />
                    <Input
                        id="CreadoPor"
                        label="Elaborado"
                        size={[12, 12, 12, 2]}
                        value={this.props.global.user}
                        maxLength={5}
                    />

                    <DropdownList
                        id="CC"
                        label="CC"
                        items={this.props.global.cc}
                        size={[12, 6, 6, 3]}
                        helpLabel="Centro de Costo"
                        required={true}
                        value={current.IdCC}
                    />

                    <DropdownList
                        id="TM"
                        label="TM"
                        items={this.props.global.tm}
                        size={[12, 6, 6, 3]}
                        helpLabel="Tipo Movimiento"
                        required={true}
                        itemKey={"ID"}
                        itemValue={"Descripcion"}
                        value={!this.props.isNew ? current.TipoMovimiento.ID : ""}
                    />

                    <Input
                        id="Poliza"
                        label="Póliza"
                        size={[12, 12, 12, 2]}
                        value={numeroPoliza}
                        maxLength={5} />

                    <DropdownList
                        id="TipoPoliza"
                        label="Tipo Póliza"
                        items={this.props.global.tipopoliza}
                        size={[12, 6, 6, 2]}
                        helpLabel="Tipo Póliza"
                        required={true}
                        value={!this.props.isNew ? current.TipoPoliza.ID : ""}
                    />
                    
                </Form>
            </FadeInColumn>;
        };
    }
    /*** END: EDIT FORM ***/

    /*** BEGIN: VIEW FORM ***/
    interface IViewProps extends React.Props<any> {
        data: any;
        onEditForm?: () => any;
        global: any;

    };

    class View extends React.Component<IViewProps, IViewProps> {
        constructor(props: IViewProps) {
            super(props);
            this.onCancelEditForm = this.onCancelEditForm.bind(this);
        }

        onCancelEditForm(): void {
            ReactRouter.hashHistory.push("sbo/procesos/capturacheque");
        }

        render(): JSX.Element {
            let current: any = this.props.data;

            return <FadeInColumn>
                <PageToolbar>
                    <PageTitle title={current.Descripcion} subTitle={current.NumeroCheque}>
                        {EK.UX.Labels.badgeEstatus(current.Estatus)}
                    </PageTitle>
                    <ButtonGroup>
                        <EditButton onClick={this.props.onEditForm} />
                        <CancelButton onClick={this.onCancelEditForm} />
                    </ButtonGroup>
                </PageToolbar>
                <Row style={{ marginBottom: 35 }}>



                    <Label label="Banco" value={current.Banco.Clave + " " + current.Banco.Descripcion} size={[12, 10, 10, 4]} />
                    <Label label="Cuenta Bancaria" value={current.CuentaBancaria.Clave + " " + current.CuentaBancaria.Descripcion} size={[12, 10, 10, 4]} />

                    <Label label="Fecha" value={current.FechaMovimiento} size={[12, 12, 12, 2]} />
                    <Label label="Número Cheque" value={current.NumeroCheque} size={[12, 12, 12, 2]} />
                    <Label label="Paguesé a" value={current.Descripcion} size={[12, 10, 10, 9]} />
                    <Label label="Monto" value={current.Monto} size={[12, 10, 10, 3]} labelType="Money" />
                    <Label label="" value={current.CantidadLetra} size={[12, 10, 10, 12]} />
                    <Label label="Concepto" value={current.Concepto1} size={[12, 10, 10, 12]} />
                    <Label label="Elaborado Por" value={this.props.global.user} size={[12, 10, 10, 2]} />
                    <Label label="CVE CC" value={current.IdCC} size={[12, 10, 10, 2]} />
                    <Label label="CVE TM" value={current.TipoMovimiento.Clave} size={[12, 10, 10, 2]} />
                    <Label label="Póliza" value={current.IdPoliza} size={[12, 10, 10, 2]} />
                    <Label label="CVE Póliza" value={current.TipoPoliza.Clave} size={[12, 10, 10, 2]} />
                    <Label label="Tipo Póliza" value={current.TipoPoliza.Nombre} size={[12, 10, 10, 2]} />

                </Row>
            </FadeInColumn>;
        };
    }
    /*** END: VIEW FORM ***/

    /** CONSULTA MONTO*/
    export interface ILabelMontoProps extends React.Props<any> {
        monto?: any;
        cantidadLetra?: any;
        getCantidadLetra?: (item: any) => void;  
       
    }
    
    export class LabelMontoWrapper extends React.Component<ILabelMontoProps, ILabelMontoProps> {
        constructor(props: ILabelMontoProps) {
            super(props);
          
        }

        static defaultProps: ILabelMontoProps = {
            cantidadLetra: ""
        };

        shouldComponentUpdate(nextProps: LabelMontoWrapper, nextState: LabelMontoWrapper): boolean {
         //  return this.props.monto != this.props.monto;
            return true;
        }

        componentDidMount(): any {

            if (this.props.monto == undefined)
            {
                dispatchDefault("SBO-cheques-cantidadLetra", createSuccessfulStoreObject({}));
            }
            else
            {
                this.props.getCantidadLetra(this.props.monto);

            }
            
        }

        componentWillUpdate(nextProps: ILabelMontoProps, nextState: ILabelMontoProps) {
            if (this.props.monto !== nextProps.monto) {
                this.props.getCantidadLetra(nextProps.monto);
            }
        };
         

        render(): any {
           
            let cantidad: string = isSuccessful(this.props.cantidadLetra) ? this.props.cantidadLetra.data : "";
            return <Label label="cantidad" value={cantidad} size={[12, 10, 10, 12]} />;
           }

        


    }

    const mapMontoProps: any = (state: any) => {
        return {
            cantidadLetra: state.cheques.cantidadLetra
          
        };
    }

    const mapDispatchsMonto: any = (dispatch: Redux.Dispatch<any>) => {
        return {

            getCantidadLetra: (monto: number): void => {
                dispatchAsync("SBO-cheques-cantidadLetra", "Cheques/CantidadLetra/" + monto + "/MXN" );
            }
        };
    };

    export let LblMontoWrapper: any = ReactRedux.connect(mapMontoProps, mapDispatchsMonto)(LabelMontoWrapper);

    
}