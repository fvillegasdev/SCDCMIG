//namespace EK.Modules.SBO.Pages {
//    "use strict";
//    const PAGE_ID: string = "cuentabancaria";
//    const CONFIGURATION_SECTION_ID: string = ["SBO003", "CFG"].join("$");

//    const idForm: string = "cuentabancaria";
//    const idPage: string = "";

//    /* const form: () => EditForm = (): EditForm => {
//         return new EditForm(idForm);
//     };
//     */
//    interface ICuentaBancariaParams {
//        id: number;
//    }

//    interface ICuentaBancariatoProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        cuentabancaria: any;
//        params?: ICuentaBancariaParams;
//        history?: any[];
//        global?: any;
//        guardar?: (item: any[]) => void;
//        isNew?: boolean;
//        cargaGlobal?: () => any;
//        banco?: any;
//    }

//    interface ICuentaBancariaState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarCuentaBancaria extends React.Component<ICuentaBancariatoProps, ICuentaBancariaState> {
//        constructor(props: ICuentaBancariatoProps) {
//            super(props);

//            this.onEditForm = this.onEditForm.bind(this);
//            this.onSaveForm = this.onSaveForm.bind(this);
//            this.onCancelEditForm = this.onCancelEditForm.bind(this);

//            this.state = { viewMode: true };
//        }

//        static defaultProps: ICuentaBancariatoProps = {
//            isNew: false,
//            cuentabancaria: undefined,
//            global: {}
//        };

       
//        onEditForm(): void {
//            this.setState({ viewMode: false });
//        }

//        onCancelEditForm(): void {
//           // if (!this.props.isNew) {
//             //   this.setState({ viewMode: true });
//           // } else {
//                ReactRouter.hashHistory.push("sbo/cuentasbancarias");
//           // }
//        }

//        shouldComponentUpdate(nextProps: ICuentaBancariatoProps, nextState: ICuentaBancariaState): boolean {
//            return (hasChanged(this.props.cuentabancaria, nextProps.cuentabancaria) ||
//                (this.state.viewMode !== nextState.viewMode));

//        }

//        onSaveForm(): void {
//            let item: EditForm = Forms.getForm();

//            let cb: any = item
//                .addNumberConst("ID", !this.props.isNew ? item.formData.form.ID.value : 0)
//                .addString("Clave")
//                .addString("Descripcion")
//                .addString("CuentaBanco")
//                .addString("Contrato")
//                .addString("Referencia")
//                .addString("BancaElectronica")
//                .addString("Clabe")
//                .addString("Plaza")
//                .addString("LugarEmision")
//                .addString("SucursalOrigen")
//                .addString("Responsable")
//                .addString("Telefono1")
//                .addString("ExtTel")
//                .addString("Banco")
//                .addString("IdcuentaContable")
//                .addString("Moneda")
//                .addString("CentroCosto")
//                .addString("TipoPoliza")
//                .addString("TipoCuenta")
//                .addString("ChequeFisico")
//                .addString("ChequeElectronico")
//                .addString("Clasificacion")
//                .addString("CuentaTercero")
//                .addEstatus("Estatus")
//                .toObject();
            
//            this.props.guardar(cb);

//            this.setState({ viewMode: false });
//        };

//        componentDidMount(): any {

//            requireGlobal(Catalogos.estatus);
//            this.props.cargaGlobal();

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));

//                } else {
//                    dispatchFailed("CuentasBancarias-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("CuentasBancarias-setSelected", createSuccessfulStoreObject({}));
//            }
//        };


//        componentDidUpdate(prevProps: ICuentaBancariatoProps, prevState: ICuentaBancariaState): any {
//            if (prevProps.cuentabancaria.status === AsyncActionTypeEnum.updating) {
//                if (this.props.cuentabancaria.status === AsyncActionTypeEnum.successful) {
//                    success("La Cuenta Bancaria " + this.props.cuentabancaria.data.Descripcion + " ha sido actualizado...");
//                }
//            }
//        }
//        render(): JSX.Element {
//            let cb: any = this.props.cuentabancaria.data;
//            // define the breadcrumb element, maybe could be automatically in the future
//            let itemsBC: EK.UX.IBreadcrumbItem[] = [
//                { text: "SBO", link: "/" },
//                { text: "Catálogos", link: "/" },
//                { text: "Cuentas Bancarias", link: "sbo/cuentasbancarias" },
//                (this.props.isNew ? { text: "Nuevo", href: "" } : { text: cb.Clave, href: "" })
//            ];
            
//            let title: IPageTitle = {
//                title: !this.props.isNew ? cb.Descripcion : "Cuenta Bancaria",
//                subTitle: !this.props.isNew ? [cb.Clave].join("") : "",
//                children: [EK.UX.Labels.badgeEstatus(cb.Estatus)]
//            };

//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            return <PageV2 id={PAGE_ID} title={title} breadcrumb={itemsBC}>
//                <PageButtons>
//                    {editView ? <SaveButton onClick={this.onSaveForm} /> : null}
//                    {!editView ? <EditButton onClick={this.onEditForm} /> : null}
//                    <CancelButton onClick={this.onCancelEditForm} />
//                </PageButtons>

//                <PanelUpdate info={this.props.cuentabancaria}>
//                    {!editView
//                        ? <ViewCB data={cb} />
//                        : <EditCB
//                            isNew={this.props.isNew}
//                            data={cb}
//                            global={this.props.global}/>}
//                </PanelUpdate>
//            </PageV2>;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            cuentabancaria: state.cuentabancaria.selected,
//            banco: state.bancos.selected,
//            global: {
//                bancos: state.global.bancos,
//                tipoCuenta: state.global.tipocuenta,
//                moneda: state.global.moneda,
//                tipoPoliza: state.global.tipopoliza,
//                cc: state.centroscosto.centroscosto,
//                forms: {
//                    cuentabancaria: state.forms.cuentabancaria,
//                    frmInfoDatosBancarios: state.forms.frmInfoDatosBancarios,
//                    frmInfoContable: state.forms.frmInfoContable,
//                    frmConfig: state.forms.frmConfig
//                }
//            }
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.cuentabancaria.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatchAsync("CuentasBancarias-setSelected", "cuentabancaria(" + id + ")");
//            },
//            cargaGlobal: (): void => {
//                dispatchAsync("load::bancos", "bancos/GetAll");
//                dispatchAsync("load::ESTATUS", "CatalogosGenerales/GetItems/ESTATUS");
//                dispatchAsync("load::tipocuenta", "CatalogosGenerales/GetItems/TIPOCUENTA");
//                dispatchAsync("load::tipopoliza", "CatalogosGenerales/GetItems/TIPOPOLIZA");
//                dispatchAsync("load::moneda", "CatalogosGenerales/GetItems/MONEDA");
//                dispatchAsync("CentrosCosto-catalogo", "CentroCosto/Get");
//            },
//            guardar: (info: any): void => {
//                dispatchAsyncPut("CuentasBancarias-guardar", "cuentabancaria/Save", info);
//            },
//            inicializaForma: (idForm: string): void => { dispatch(EK.Global.action("forms-reset-state", { idForm })); }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageCuentaBancariaCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarCuentaBancaria);


//    /*** BEGIN: NEW FORM ***/
//    export class NuevoCuentaBancaria extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageCuentaBancariaCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        data?: any;
//        isNew?: boolean;
//        global?: any;
//        fecha?: any;
//    };

//    class EditCB extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
          
//        };

//        static defaultProps: IEditProps = {
//            fecha: new Date()
//        };
      

//        render(): JSX.Element {
//            let current: any = this.props.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let pageTitle: string = !this.props.isNew ? current.Descripcion : "Nueva Cuenta Bancaria";

//            let pageSubtitle: string = !this.props.isNew ? current.Clave : "";
//            let esCuentaTercero: boolean = this.props.isNew ? false : (current.CuentaTercero !== "0") ? true : false;

//            let fecha: any = current.FechaInicio ? current.FechaInicio : this.props.fecha;

//            let cc: any = (this.props.global && this.props.global.cc && this.props.global.cc.data &&
//                this.props.global.cc.data.length > 0) ? this.props.global.cc.data[0] : undefined;

//            let moneda: any = (this.props.global && this.props.global.moneda && this.props.global.moneda.data &&
//                this.props.global.moneda.data.length > 0) ? this.props.global.moneda.data[0] : undefined;

//            let tipoPoliza: any = (this.props.global && this.props.global.tipoPoliza && this.props.global.tipoPoliza.data &&
//                this.props.global.tipoPoliza.data.length > 0) ? this.props.global.tipoPoliza.data[0] : undefined;

//            let tipoCuenta: any = (this.props.global && this.props.global.tipoCuenta && this.props.global.tipoCuenta.data &&
//                this.props.global.tipoCuenta.data.length > 0) ? this.props.global.tipoCuenta.data[0] : undefined

//            let options: EK.UX.IOption[] = [
//                { title: "Concentradora", value: "1", checked: false },
//                { title: "Pagadora", value: "2", checked: false },
//                { title: "Ambas", value: "3", checked: false },
//                { title: "Ninguna", value: "4", checked: false }
//            ];

//            return <FadeInColumn>
                
              
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input
//                        id="Clave"
//                        label="Clave"
//                        size={[12, 12, 12, 2]}
//                        helpLabel="Capture la Clave"
//                        value={current.Clave}
//                        maxLength={4}
//                        validations={[
//                            validations.required("La Clave es requerida")
//                        ]} />
//                    <Input
//                        id="Descripcion"
//                        label="Descripcion"
//                        size={[12, 12, 12, 8]}
//                        helpLabel="Capture la descripción de su Cuenta Bancaria"
//                        value={current.Descripcion}
//                        maxLength={150} />
//                    <CheckBoxStatus
//                        id="Estatus"
//                        label="Activo"
//                        xs={{ size: 12 }}
//                        sm={{ size: 12 }}
//                        md={{ size: 12 }}
//                        lg={{ size: 2 }}
//                        helpLabel="Estatus de Cuenta Bancaria"
//                        value={Status} />
               
//                <Column size={[12, 12, 12, 12]}>
//                    <OptionSection title="Datos Bancarios" readOnly={true}>
//                        <Row>
                        
//                                <Input
//                                    id="CuentaBanco"
//                                    label="Número de Cuenta"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture Cuenta de Banco"
//                                    value={current.CuentaBanco}
//                                    maxLength={10}
//                                    />
//                                <Input
//                                    id="Contrato"
//                                    label="Número de Contrato"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture el Número de Contrato"
//                                    value={current.Contrato}
//                                    maxLength={10}
//                                    />
//                                <Input
//                                    id="Referencia"
//                                    label="Número de Referencia"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture el Número de Referencia"
//                                    value={current.Referencia}
//                                    maxLength={10}
//                                    />
//                                <Input
//                                    id="BancaElectronica"
//                                    label="Banca Electrónica"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture el Número de Banca Electrónica"
//                                    value={current.BancaElectronica}
//                                    maxLength={10}
//                                    />

//                                <Input
//                                    id="Clabe"
//                                    label="Clabe"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture su Clabe Interbancaria"
//                                    value={current.Clabe}
//                                    maxLength={18}
//                                    />

//                                <Input
//                                    id="Plaza"
//                                    label="Plaza"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture su Plaza"
//                                    value={current.Plaza}
//                                    maxLength={10}
//                                    />

//                                <DatePicker id="FechaInicio" label="Inicio Operación" size={[12, 6, 6, 4]} value={fecha} />

//                                <Input
//                                    id="LugarEmision"
//                                    label="Lugar de Emisión"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture Lugar de Emision"
//                                    value={current.LugarEmision}
//                                    maxLength={10}
//                                    />

//                                <Input
//                                    id="SucursalOrigen"
//                                    label="Sucursal Origen"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture Sucursal Origen"
//                                    value={current.SucursalOrigen}
//                                    maxLength={10}
//                                    />

//                                <Input
//                                    id="Responsable"
//                                    label="Ejecutivo de Cuenta"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture Ejecutivo de Cuenta"
//                                    value={current.Responsable}
//                                    maxLength={30}
//                                    />
//                                <Input id="Telefono1"
//                                    label="Teléfono de Contacto"
//                                    size={[12, 6, 6, 4]}
//                                    value={current.Telefono1} mask="(99) 9999-9999" maxLength={10}
//                                    validations={[
//                                        validations.length("la longitud del teléfono es de 10 posiciones", 10)
//                                    ]} />
//                                <Input
//                                    id="ExtTel"
//                                    label="Extensión Telefónica"
//                                    size={[12, 6, 6, 3]}
//                                    helpLabel="Capture Extensión"
//                                    value={current.ExtTel}
//                                    mask="9999"
//                                    maxLength={4}
//                                    />
                        
//                        </Row>
//                    </OptionSection>
//                </Column>
//                <Column size={[12, 12, 12, 12]}>
//                    <OptionSection title="Información Contable" readOnly={false}>
//                        <Row>
                        
//                                <BancoDDL size={[12, 12, 4, 4]} />
//                                <Input
//                                    id="IdcuentaContable"
//                                    label="Cuenta Contable"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture Cuenta Contable"
//                                    value={current.IdCuentaContable}
//                                    maxLength={10}
//                                    />
//                                <DropdownList
//                                    id="Moneda"
//                                    label="Moneda"
//                                    items={this.props.global.moneda}
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Moneda"
//                                    required={true}
//                                    value={!this.props.isNew ? current.Moneda : moneda}
//                                    />
//                                <DropdownList
//                                    id="IdCentroCosto"
//                                    label="Centro de Costo"
//                                    items={this.props.global.cc}
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Moneda"
//                                    required={true}
//                                    value={!this.props.isNew ? current.IdCentroCosto : cc}
//                                    />

//                                <DropdownList
//                                    id="TipoPoliza"
//                                    label="Tipo Póliza"
//                                    items={this.props.global.tipoPoliza}
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Tipo Póliza"
//                                    required={true}
//                                    value={!this.props.isNew ? current.TipoPoliza : tipoPoliza}
//                                    />
                            
//                        </Row>
//                    </OptionSection>
//                </Column>

//                <Column size={[12, 12, 12, 12]}>
//                    <OptionSection id={CONFIGURATION_SECTION_ID} title="Configuración" readOnly={true}>
//                        <Row>
//                                <Input
//                                    id="ChequeFisico"
//                                    label="Cheque Físico"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture consecutivo"
//                                    value={current.ChequeFisico}
//                                    maxLength={10}
//                                    />
//                                <Input
//                                    id="ChequeElectronico"
//                                    label="Cheque Electrónico"
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Capture consecutivo"
//                                    value={current.ChequeElectronico}
//                                    maxLength={10}
//                                    />
//                                <DropdownList
//                                    id="TipoCuenta"
//                                    label="Tipo de Cuenta"
//                                    items={this.props.global.tipoCuenta}
//                                    size={[12, 6, 6, 4]}
//                                    helpLabel="Tipo de Cuenta"
//                                    required={true}
//                                    value={!this.props.isNew ? current.TipoCuenta : tipoCuenta}
//                                    />
//                                <RadioButton
//                                    label="Clasificación"
//                                    id="Clasificacion"
//                                    groupName="clasificacion"
//                                    size={[12, 6, 6, 12]}
//                                    radios={options}
//                                    required={false}
//                                    value={current.Clasificacion}
//                                    />
//                                <CheckBox
//                                    id="CuentaTercero"
//                                    label="Cuenta Tercero"
//                                    size={[6, 4, 4, 3]}
//                                    required={false}
//                                    value={esCuentaTercero}
//                                    helpLabel="Cuenta de Tercero" />
//                        </Row>
//                    </OptionSection>
//                </Column>
//            </FadeInColumn>;
//        };

//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        data: any;
//    };

//    class ViewCB extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }
        
//        render(): JSX.Element {
//            let current: any = this.props.data;

//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>

//                    <Label label="Clave" value={current.Clave} size={[12, 6, 6, 2]} />
//                    <Label label="Descripcion" value={current.Descripcion} size={[12, 6, 6, 10]} />

//                    <Column size={[12, 12, 12, 12]}>
//                        <OptionSection title="Datos Bancarios" readOnly={true}>
//                            <Row>

//                                <Label label="Número de Cuenta" value={current.CuentaBanco} size={[12, 6, 6, 4]} />
//                                <Label label="Número de Contrato" value={current.Contrato} size={[12, 6, 6, 4]} />
//                                <Label label="Número de Referencia" value={current.Referencia} size={[12, 6, 6, 4]} />


//                                <Label label="Banca Electrónica" value={current.BancaElectronica} size={[12, 6, 6, 4]} />
//                                <Label label="Clabe" value={current.Clabe} size={[12, 6, 6, 4]} />
//                                <Label label="Plaza" value={current.Plaza} size={[12, 6, 6, 4]} />


//                                <Label label="Fecha de Inicio Operación" value={current.FechaInicio} size={[12, 6, 6, 4]} />
//                                <Label label="Lugar de Emisión" value={current.LugarEmision} size={[12, 6, 6, 4]} />
//                                <Label label="Sucursal" value={current.SucursalOrigen} size={[12, 6, 6, 4]} />

//                                <Label label="Ejecutivo de Cuenta" value={current.Responsable} size={[12, 6, 6, 4]} />
//                                <Label label="Teléfono de Contacto" value={current.Telefono1} size={[12, 6, 6, 4]} />
//                                <Label label="Extensión Telefónica" value={current.ExtTel} size={[12, 6, 6, 4]} />

//                            </Row>
//                        </OptionSection>
//                        <OptionSection title="Información Contable" readOnly={true}>
//                            <Row>
//                                <Label label="Banco" value={current.Banco.Clave + " - " + current.Banco.Nombre} size={[12, 6, 6, 4]} />
//                                <Label label="Cuenta Contable" value={current.IdCuentaContable} size={[12, 6, 6, 4]} />
//                                <Label label="Moneda" value={current.Moneda.Clave + " - " + current.Moneda.Nombre} size={[12, 6, 6, 4]} />
//                                <Label label="Centro de Costo" value={current.IdCentroCosto} size={[12, 6, 6, 4]} />
//                                <Label label="Tipo Póliza" value={current.TipoPoliza.Nombre} size={[12, 6, 6, 4]} />
//                            </Row>
//                        </OptionSection>
//                        <OptionSection id={CONFIGURATION_SECTION_ID} title="Configuración" readOnly={true}>
//                            <Row>
//                                <Label label="Consecutivo de Cheque Físico" value={current.ChequeFisico} size={[12, 6, 6, 4]} />
//                                <Label label="Consecutivo de Cheque Electrónico" value={current.ChequeElectronico} size={[12, 6, 6, 4]} />
//                                <Label label="Tipo de Cuenta" value={current.TipoCuenta.Nombre} size={[12, 6, 6, 4]} />
//                                <Label label="Estatus Clasificación" value={current.IdClasificacion} size={[12, 6, 6, 4]} />
//                                <Label label="Cuenta de Tercero" value={current.CuentaTercero} size={[12, 6, 6, 4]} />
//                            </Row>
//                        </OptionSection>
//                    </Column>
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/



//}