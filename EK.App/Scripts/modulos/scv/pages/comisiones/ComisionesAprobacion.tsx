namespace EK.Modules.SCV.Pages.Comisiones.AprobacionComisiones {
    "use strict";

    const COMISIONES_POR_APROBAR: string = "ComisionesPorAprobar";
    const config: page.IPageConfig = global.createPageConfig("ComisionesAprobacion", "scv", [COMISIONES_POR_APROBAR]);


    interface IAprobacionComisiones extends page.IProps {
        estadoEntidad: any;
        revisionVigente: any;
    };

    interface IComisiones extends page.IProps {
        estadoEntidad: any;
        estatusComisiones: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IAprobacionComisiones, IAprobacionComisiones> {
        constructor(props: IAprobacionComisiones) {
            super(props);
            this.actualizarEstado = this.actualizarEstado.bind(this);
            this.saveForm = this.saveForm.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.revisionVigente = state.global.currentEntity;
            return retValue;
        };
        saveForm(): any {
            let revisionVigente: any = getData(this.props.revisionVigente);
            Forms.updateFormElement(config.id, "ID", revisionVigente.ID);

            let item: EditForm = Forms.getForm(config.id)

            let model: any = item
                .addID()
                .addObject(COMISIONES_POR_APROBAR)
                .addVersion()
                .toObject();

            return model;
        };
        onFilter(props: any, filters: any, type?: string): any {
            global.dispatchAsyncPost("load::currentEntity", "base/scv/ComisionesAprobacion/GetBP/ObtenerRevisionVigente", { parametros: null });
            global.dispatchSuccessful("global-page-data",[], COMISIONES_POR_APROBAR);
        };
        actualizarEstado(estado: boolean): void {
            dispatchSuccessful("load::currentEntityState", { viewMode: estado })
        }    
        componentDidMount() {
            dispatchSuccessful("load::currentEntityState", { viewMode: true })
            dispatchAsync("load::ESTATUSCOMISIONES", "catalogos/get(ESTATUSCOMISIONES)");
        }
        componentWillReceiveProps(nextProps: IAprobacionComisiones, nextState: IAprobacionComisiones): any {
            if (global.hasChanged(this.props.revisionVigente, nextProps.revisionVigente)) {
                if (global.isSuccessful(nextProps.revisionVigente)) {
                    let idEntidad = getDataID(nextProps.revisionVigente);
                    let parametros: any = global.assign({ idRevision: idEntidad });
                    if (idEntidad > 0) {
                       global.dispatchAsyncPost("global-page-data", "base/scv/ComisionesAprobacion/GetBP/ObtenerRevisionVigenteDetalle", { parametros }, COMISIONES_POR_APROBAR);
                    }

                };
            };
        };
        render(): JSX.Element {
      
            let entidad: any = getData(this.props.revisionVigente);
            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowDelete={false}
                allowNew={false}
                onFilter={this.onFilter}>

                <PageButtons>
                 
                    {modoVista ? 
                        <div>
                            <AuthorizeButton />
                            <EditarEntidad onClick={(e) => this.actualizarEstado(false)} />
                        </div>
                        :
                        <div>
                            <CancelButton onClick={(e) => this.actualizarEstado(true)} />
                            <SaveButton key="btnSave1" onClick={this.saveForm}/>
                        </div>
                    }
                   

                </PageButtons>


                <page.OptionSection
                    title={"Detalle de Revisión"}
                    icon="fas fa-info"
                    collapsed={false}
                    hideCollapseButton={true}
                    level="main">
                    <Estatus />
                    <Label id="TotalCompania" size={[12, 2, 2, 2]} />
                    <Label id="TotalAgentes" size={[12, 2, 2, 2]} />
                    <label.Currency id="TotalImporte" label="Total" size={[12, 2, 2, 2]} />


                </page.OptionSection>

                <Comisiones/>

        
            </page.Main>;
        };
    });

    export let Comisiones: any = global.connect(class extends React.Component<IComisiones, IComisiones> {
        constructor(props: IComisiones) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
            this.cancelarEdicion = this.cancelarEdicion.bind(this);
            this.actualizarEstatusComision = this.actualizarEstatusComision.bind(this);
            this.onSave = this.onSave.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.estatusComisiones = state.global.ESTATUSCOMISIONES;
            return retValue;
        };
        cancelarEdicion(): void {
            this.props.config.updateForm();
            Forms.remove(COMISIONES_POR_APROBAR);
            this.props.config.setState({ viewMode: true }, COMISIONES_POR_APROBAR);
        }
        onRowDoubleClick(item: any): void {

            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;

            if (!modoVista) {
                this.props.config.updateForm();
                Forms.remove(COMISIONES_POR_APROBAR);
                this.props.config.setState({ viewMode: false }, COMISIONES_POR_APROBAR);
                config.setEntity(item, COMISIONES_POR_APROBAR);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "Estatus", item.Estatus);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "TipoComision", item.TipoComision);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "Compania", item.Compania);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "Usuario", item.Usuario);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "ImportePorAplicar", item.ImportePorAplicar);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "ImporteAplicado", item.ImporteAplicado);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "ImporteComision", item.ImporteComision);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "ID", item.ID);
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "IdDesarrollo", item.IdDesarrollo);

                let centroCosto: any = { ID: -1, Clave: 'Seleccione una opción' };
                if (item.CentroCosto && item.CentroCosto.ID > 1) {
                    centroCosto = item.CentroCosto;
                }
                Forms.updateFormElement(COMISIONES_POR_APROBAR, "CentroCosto", centroCosto);
            }

        }
        actualizarEstatusComision(clave: string): void {
            let estatusComisiones: any = getData(this.props.estatusComisiones);
            for (var i = 0; i < estatusComisiones.length; i++) {

                if (estatusComisiones[i].Clave == clave) {
                    Forms.updateFormElement(COMISIONES_POR_APROBAR, "Estatus", estatusComisiones[i]);
                    break;
                }
            }
            this.onSave();
        }
        onSave(): void {
            /*Validando importe
            let elemento: any = Forms.getForm(COMISIONES_POR_APROBAR);

            let sumaImportes: number = parseFloat(elemento.ImporteAplicado) + parseFloat(elemento.ImportePorAplicar);

            if (sumaImportes > elemento.ImporteComision) {
                warning("El importe por aplicar no debe superar el importe de la comisión")
                return null;
            }*/
            let item: EditForm = Forms.getForm(COMISIONES_POR_APROBAR);
            let entidades: DataElement = this.props.config.getCatalogo(COMISIONES_POR_APROBAR);


            let model: any = item
                .addID()
                .addObject("Compania")
                .addObject("CentroCosto")
                .addObject("TipoComision")
                .addObject("TipoEntidad")
                .addObject("Usuario")
                .addObject("Estatus")
                .addObject("Referencia")
                .addObject("Origen")
                .addNumber("ImportePorAplicar")
                .addNumber("ImporteComision")
                .addNumber("ImporteAplicado")
                .addVersion()
                .toObject();


            if (item["ID"] < 0 || item["ID"] == undefined) {
                if (!(item["ID"])) {
                    model["ID"] = entidades.getNextLowerID();
                }
            }
            else {
                model._modificado = true;
                model["ID"] = item["ID"];
            }

            let retValue: DataElement = entidades.upsertItem(model);
            Forms.updateFormElement(config.id, COMISIONES_POR_APROBAR, retValue);
            global.dispatchSuccessful("global-page-data", retValue, COMISIONES_POR_APROBAR);
            this.props.config.setState({ viewMode: true }, COMISIONES_POR_APROBAR);

        }
        render(): JSX.Element {
            let estatus: any = Forms.getValue("Estatus", COMISIONES_POR_APROBAR);
            let estatusAprobacion: string = estatus && estatus.Clave ? estatus.Clave:"";

            let formatNombre: (data: any, row: any) => string = (data: any, row: any) => {
                let nombreUsuario: string = row.Usuario && row.Usuario.Nombre ? row.Usuario.Nombre + " " + row.Usuario.Apellidos : "";
                return nombreUsuario;
            };

            let formatMoneda: (data: any, row: any) => string = (data: any, row: any) => {

                let nombreUsuario: string = row.Moneda && row.Moneda.ID ? row.Moneda.MoneySymbol+" "+ row.Moneda.Clave + " " + row.Moneda.Nombre : "";
                return nombreUsuario;
            };

            let formatReferencia: (data: any, row: any) => any = (data: any, row: any) => {

                let tipoEntidad: string = row.TipoEntidad.Clave;

                let claveEntidad: string = "";
                let claveReferencia: string = row.Referencia.Clave;

                let idRelacion: string = row.Referencia.Nombre;

                switch (tipoEntidad)
                {
                    case "comisionesAjustes":
                        claveEntidad = "A";
                        break;

                    case "comisionesAjustesDetalle":
                        claveEntidad = "A";
                        break;

                    case "comisionesTabuladores":
                        claveEntidad = "T"
                        break;

                    case "comisionesSeguimiento":
                        claveReferencia = "";
                        claveEntidad = "S"

                        if (row.Referencia.Clave == "TABCOM")
                        {
                            claveEntidad="SC"
                        }

                        break;
                }
                return <div><span className="badge badge-primary" style={{ marginRight: "1px" }}>{claveEntidad}</span><span className="badge badge-success" style={{ marginRight: "1px" }}>{claveReferencia}</span><span>{idRelacion}</span></div >;
            };

            let formatConfigAcciones: (data: any, row: any) => any = (data: any, row: any): any => {
                let w: any = window;
                let windowFn: string = "$$Alerta";
                let modalID: string = "modalID";



                if (!w[windowFn]) {
                    w[windowFn] = (centroCosto: any, compania: boolean, id: number) => {

                        let centroCostoM: string = "";
                        let companiaM: string = "";

                        if (centroCosto) {
                            centroCostoM = "<span>Sin centro de costo Asignado</span>"
                        }

                        if (compania) {
                            companiaM = "<span>Sin Compañia Asignada</span>"
                        }

                        let contenido: string = centroCostoM + companiaM;


                        let link: any = $("#DE" + id);
                        link.popover({
                            trigger: "focus",
                            html: true,
                            content: contenido,
                            title: "Alerta",
                            container: 'body',
                            placement: "right"
                        }).on("mouseenter", function () {
                            link.popover("show");
                        }).on("mouseleave", function () {
                            link.popover("hide");
                        }).on("show.bs.popover", function () {
                            $(this).data("bs.popover").tip().css("max-width", "800");
                            $(this).data("bs.popover").tip().css("width", "400px");

                        });

                    };
                };
                let centroCosto: boolean = false;
                let compania: boolean = false;
                if (row.CentroCosto == null || row.CentroCosto.ID < 1) {
                    centroCosto = true;
                }

                if (row.Compania == null || row.Compania.ID < 1) {
                    compania = true
                }

                return <div>
                    {centroCosto || compania ?
                        <span id={"DE" + row.ID} ref='link' role='button' data-trigger='focus' data-toggle='popover' onMouseEnter={() => window[windowFn](centroCosto, compania, row.ID)} className='popovers' >
                            <i style={{ color: "#f0ad4e" }}  className="fas fa-exclamation-triangle"></i>
                        </span>
                        : null
                    }
                    <span>{row.TipoComision.Nombre}</span>

                </div>;
            };


            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "TipoComision.Nombre", width: "200px", format: formatConfigAcciones })
                .add({ data: "TipoMovimiento.Nombre", width: "200px" })
                .add({ data: "Referencia.Clave", width: "200px", format: formatReferencia })
                .addMoneyFormat({ data: "ImporteComisionMoneda", width: "150px" })
                .add({ data: "Moneda.Nombre", width: "150px", format: formatMoneda })
                .add({ data: "Usuario.Nombre", width: "150px", format: formatNombre })
                .add({ data: "Compania.Nombre", width: "250px" })
                .add({ data: "CentroCosto.Nombre", width: "200px" })
                .add({ data: "Estatus.Nombre", width: "150px", format: label.formatEstatusComisiones })
                .toArray();

            let modoVista: boolean = getData(this.props.estadoEntidad).viewMode;
            return <page.SectionListExtended
                id={COMISIONES_POR_APROBAR}
                onSave={this.onSave}
                subTitle={"Aprobación de comisiones"}
                title={"Aprobación de comisiones"}
                parent={config.id}
                onRowDoubleClick={this.onRowDoubleClick}
                hideNewButton={true}
                addRefresh={false}
                icon="fas fa-cogs"
                size={[12, 12, 12, 12]}
                level={1}
                dtConfig={dtConfig}
                readonly={true}>
                <SectionButtons>
                    <CancelButton idFormSection={COMISIONES_POR_APROBAR} iconOnly={true} className="" style={null} key="cancelButtonKey" onClick={this.cancelarEdicion}></CancelButton>
                </SectionButtons>
                <Row>
                    <Column size={[12, 12, 12, 12]}>

                        <Column size={[12, 12, 12, 12]}>
                            <label.Usuarios id="Usuario" idForm={COMISIONES_POR_APROBAR} label="Usuario" size={[12, 3, 3, 3]} />
                            <label.Entidad idForm={COMISIONES_POR_APROBAR} id="TipoComision" label="Tipo de Comisión" size={[12, 3, 3, 3]} />

                            {modoVista ? <label.Entidad idForm={COMISIONES_POR_APROBAR} id="Compania" label="Compañia" size={[12, 3, 3, 3]} /> :
                                <TipoComisionCompaniasDDL id="Compania" size={[12, 3, 3, 3]} idFormSection={COMISIONES_POR_APROBAR} validations={[validations.required()]} addNewItem={"SO"} />
                            }

                            {modoVista ? <label.Entidad idForm={COMISIONES_POR_APROBAR} id="CentroCosto" label="Compañia" size={[12, 3, 3, 3]} /> :
                                <CentroCostoComisionesDDL addNewItem={"SO"} id="CentroCosto" size={[12, 3, 3, 3]} idFormSection={COMISIONES_POR_APROBAR} validations={[validations.required()]} />
                            }
                        </Column>

                        <Column size={[12, 12, 12, 12]}>
                            <label.Currency id="ImporteComision" idForm={COMISIONES_POR_APROBAR} label="Importe de comisión" size={[12, 2, 2, 2]} />

                            <label.Currency id="ImporteAplicado" idForm={COMISIONES_POR_APROBAR} label="Importe Aplicado" size={[12, 2, 2, 2]} />

                            <label.Currency id="ImportePorAplicar" idForm={COMISIONES_POR_APROBAR} label="Importe por Aplicar" size={[12, 2, 2, 2]} />

                            <Column size={[12, 4, 4, 4]}>

                                <button className="btn btn-danger" type="button" onClick={(e) => this.actualizarEstatusComision("CAN")} style={{ margin: "5%" }}>
                                    <i className="fas fa-times" style={{ margin: 3 }}></i>Cancelar
                                    </button>

                                {estatusAprobacion == "PA" ?
                                    <button className="btn btn-success" type="button" onClick={(e) => this.actualizarEstatusComision("PEND")} style={{ margin: "5%" }}>
                                        <i className="fas fa-pause" style={{ margin: 3 }}></i> Pendiente
                                        </button>
                                    :
                                    null
                                }

                                {estatusAprobacion == "PEND" ?
                                    <button className="btn btn-primary" type="button" onClick={(e) => this.actualizarEstatusComision("PA")} style={{ margin: "5%" }}>
                                        <i className="fas fa-check-double" style={{ margin: 3 }}></i> Aplicar
                                         </button>
                                    :
                                    null
                                }

                            </Column>
                        </Column>

                    </Column>
                </Row>

            </page.SectionListExtended>
                       
        };
    });

    interface ICompania extends IDropDrownListProps {
        tipoComision?: number;
    }
    let TipoComisionCompaniasDDL: any = global.connect(class extends React.Component<ICompania, {}> {
        static props: any = (state: any) => ({
            items: state.global.COMPANIASDDL,
            tipoComision: Forms.getValue("TipoComision", COMISIONES_POR_APROBAR),
        });
        static defaultProps: ICompania = {
            id: "Compania",
            items: createDefaultStoreObject([]),
            label: "Compania",
            helpLabel: "Seleccione una compañia",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };

        obtenerInformacion(idTipoComision: number): void {
            let parametros: any = global.encodeParameters({ idComision: idTipoComision, kv: true });
            global.dispatchAsync("load::COMPANIASDDL", "base/scv/TMComisiones/Get/GetAllComisionCompania/" + parametros);

        };
        componentDidMount(): void {
            let tipoComision: any = this.props.tipoComision;
            let idTipoComision: number = tipoComision && tipoComision.ID ? tipoComision.ID : 0;
            if (idTipoComision > 0) {
                this.obtenerInformacion(idTipoComision);
            }
            else {
                dispatchSuccessful("load::COMPANIASDDL", [])
            }
        };
        componentWillReceiveProps(nextProps: ICompania, nextState: ICompania): any {
            if (global.hasChanged(this.props.tipoComision, nextProps.tipoComision)) {
                let tipoComision: any = nextProps.tipoComision;
                let idTipoComision: number = tipoComision && tipoComision.ID ? tipoComision.ID : 0;
                this.obtenerInformacion(idTipoComision);
            };

        };
        render(): any {

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export interface IEditar extends EK.UX.Buttons.IButtonProps {
        item?: any;
    }
    let EditarEntidad: any = global.connect(class extends React.Component<IEditar, {}> {
        constructor(props: IEditar) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
        });
        static defaultProps: IEditar = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
        render(): JSX.Element {
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }

            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            let estatus: string = entidad && entidad.Estatus ? entidad.Estatus.Clave : "";

            if (idEntidad > 0 && (estatus == "PA" || estatus == "REC")) {
                return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Write}>
                    <Button {...this.props} className={className} onClick={this.onClick} />
                </Authorize>;
            }
            else {
                return null;
            }

           
        };
    });


    interface IAuthorizeButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        estadoEntidad?: boolean;
        config?: page.IPageConfig;
    }
    let AuthorizeButton: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
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
            let item: any = getData(this.props.item);
            EK.Global.confirm($ml.autorizacion.descripcion, $ml.autorizacion.titulo, () => {
                let parametros: any = global.assign({ id: getDataID(this.props.item) });

                global.asyncPost("base/scv/ComisionesAprobacion/GetBP/RequestAuthorize/", {parametros:parametros}, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchSuccessful("global-page-data", [], COMISIONES_POR_APROBAR);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("load::currentEntity", data);
                        if (data.Estatus.Clave == "PAU")
                        {
                            success($ml.autorizacion.mensaje);
                        }
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                    }
                });
            });
        }
        render(): JSX.Element {
            let idEntidad: any = global.getDataID(this.props.item);
            let entidad: any = global.getData(this.props.item);
            let estatus: string = entidad && entidad.Estatus ? entidad.Estatus.Clave : "";
            if (idEntidad > 0 && (estatus == "PA" || estatus =="REC")) {
                return <Button {...this.props} onClick={this.onClick} />;
            }
            else {
                return null;
            }
        }
    });


    export let Estatus: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): any {
            let entidad: any = getData(this.props.entidad);
            let estatus: any = entidad && entidad.Estatus ? entidad.Estatus : "";
            let claveEstatus: string = estatus && estatus.Clave ? estatus.Clave : "";

            let resultad: any = <div></div>;

            let resultEstatus: any = null;
            switch (claveEstatus) {
                case "PA":
                    resultEstatus = <div style={{ margin: "0px 10px", fontWeight: 600, textAlign: "center", backgroundColor: "#3598dc !important" }}>{estatus.Nombre}</div>;
                    break;
                case "PAU":
                    resultEstatus = <div style={{ margin: "0px 10px", fontWeight: 600, textAlign: "center", backgroundColor: "#f3c200 !important" }}>{estatus.Nombre}</div>;
                    break;

                case "REC":
                    resultEstatus = <div style={{ margin: "0px 10px", fontWeight: 600, textAlign: "center", backgroundColor: "#f36a5a !important" }}>{estatus.Nombre}</div>;
                    break;

                case "AP":
                    resultEstatus = <div style={{ margin: "0px 10px", fontWeight: 600, textAlign: "center", backgroundColor: "#26C281 !important" }}>{estatus.Nombre}</div>;
                    break;

            }
            return <Column size={[12, 2, 2, 2]}>
                <div>
                    <Column size={[12, 12, 12, 12]}>
                        <div className={"form-group"}>
                            <div className={"label-text"}>
                                {"Revisión"}
                            </div>
                            <div className={"label-value"}>
                                <span className="badge badge-success" style={{ position: "absolute", marginTop: "-6px", top: "30px" }}>{entidad.NRevision}</span>
                                {resultEstatus}
                            </div>
                        </div>
                    </Column>
                </div>
            </Column>;

        };
    });

    interface ICentroCosto extends IDropDrownListProps {
        idDesarrollo?: any;
    }
    let CentroCostoComisionesDDL: any = global.connect(class extends React.Component<ICentroCosto, {}> {
        static props: any = (state: any) => ({
            items: state.global.CentroCostoComisiones,
            idDesarrollo: Forms.getValue("IdDesarrollo", COMISIONES_POR_APROBAR),
        });
        static defaultProps: ICentroCosto = {
            id: "CentroCosto",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo",
            helpLabel: "Seleccione un Centro de costo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            idDesarrollo: null,
        };
        cargarElementos(idDesarrollo: number): void {
            let url: string = "";

            if (idDesarrollo > 0) {
                url = global.encodeAllURL("kontrol", "CentroCosto", { idDesarrollo: idDesarrollo, ClaveTipoCentrosCosto: "CCINGRESO" });
            }
            else
            {
                url = global.encodeAllURL("kontrol", "CentroCosto", { idDesarrollo: idDesarrollo });
            }
            dispatchAsync("load::CentroCostoComisiones", url)
        }
        componentDidMount(): void {
            this.cargarElementos(this.props.idDesarrollo);
        };
        componentWillReceiveProps(nextProps: ICentroCosto, nextState: ICentroCosto): any {
            if (global.hasChanged(this.props.idDesarrollo, nextProps.idDesarrollo)) {
                this.cargarElementos(nextProps.idDesarrollo);
            };

        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
};


