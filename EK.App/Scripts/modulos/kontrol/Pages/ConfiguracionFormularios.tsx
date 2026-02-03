namespace EK.Modules.Kontrol.Pages.ConfiguracionFormularios {
         
    const CONFIGURACIONFORMULARIO: string = "configuracion"

    const config: page.IPageConfig =
        global.createPageConfig("configuracionFormulario", "kontrol", [CONFIGURACIONFORMULARIO]);


    interface IConfiguracionFormularios extends page.IProps {
        tipoEntidad: any;
        estadoEntidad: any;
        configuracion: any;
    };

    let buscarNombre: (clave: string, ml: any) => any = (clave: string, ml: any): any => {
        let busquedaEspecial: any = clave.indexOf("Id", 0);
        let claveCampo: string = busquedaEspecial == 0 ? clave.substr(2, clave.length) : clave;

        if (ml && ml.form[claveCampo] != undefined) {

            let campo: any = ml.form[claveCampo];
            return campo.label;
        }
        return clave;
    };

    let buscarML: () => any = (): any => {

        let tipoEntidad: any = Forms.getValue("TipoEntidad", config.id);

        let claveTipoEntidad: string = tipoEntidad && tipoEntidad.ID > 0 ? tipoEntidad.Clave : "";

        let busquedaEntidad: any = claveTipoEntidad && claveTipoEntidad.indexOf("scvclientes") == 0 ? "scvclientes" : claveTipoEntidad;

        return $ml[busquedaEntidad];
    };

    export let Vista: any = global.connect(class extends React.Component<IConfiguracionFormularios, IConfiguracionFormularios> {
        constructor(props: IConfiguracionFormularios) {
            super(props);
            this.saveForm = this.saveForm.bind(this);
            this.obtenerConfiguracion = this.obtenerConfiguracion.bind(this);
            this.actualizarEstado = this.actualizarEstado.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tipoEntidad = Forms.getValue("TipoEntidad", config.id);
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.configuracion = state.global.catalogo$configuracion;
            return retValue;
        };
        saveForm(): any {
            let item: EditForm = Forms.getForm(config.id)

            let model: any = item
                .addID()
                .addObject(CONFIGURACIONFORMULARIO)
                .addObject("TipoEntidad")
                .addVersion()
                .toObject();

            dispatchSuccessful("global-page-data", [], CONFIGURACIONFORMULARIO);
            return model;
        };
        onFilter(props: page.IProps, filters: any): any {
        };
        obtenerConfiguracion(claveTipoEntidad: string): void {
            let parametros: any = global.assign({ claveTipoEntidad: claveTipoEntidad });

            global.dispatchAsync("global-page-data",
                "base/kontrol/ConfiguracionFormulario/Get/GetAll/" + global.encodeObject(parametros), CONFIGURACIONFORMULARIO);

        }
        componentDidMount() {
            dispatchSuccessful("global-page-data", [], CONFIGURACIONFORMULARIO);
            dispatchSuccessful("load::currentEntityState", { viewMode: true })

        }
        actualizarEstado(estado: boolean): void {
            dispatchSuccessful("load::currentEntityState", { viewMode: estado })
        }
        componentWillReceiveProps(nextProps: IConfiguracionFormularios, nextState: IConfiguracionFormularios): any {

            if (hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad)) {
                let tipoEntidad: any = nextProps.tipoEntidad;
                if (tipoEntidad && tipoEntidad.ID > 0) {
                    this.obtenerConfiguracion(tipoEntidad.Clave);
                }
                else {
                    dispatchSuccessful("global-page-data", [], CONFIGURACIONFORMULARIO);
                }
            }

            if (hasChanged(this.props.configuracion, nextProps.configuracion)) {

                let next: any = nextProps.configuracion;
                let current: any = Forms.getValue(CONFIGURACIONFORMULARIO, config.id);

                if (global.hasChanged(current, next) && global.getTimestamp(next) > global.getTimestamp(current)) {
                    Forms.updateFormElement(config.id, CONFIGURACIONFORMULARIO, next);
                };

            }

        };

        shouldComponentUpdate(nextProps: IConfiguracionFormularios, nextState: IConfiguracionFormularios): boolean {
            return hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad) ||
                hasChanged(this.props.tipoEntidad, nextProps.tipoEntidad);
        };
        render(): JSX.Element {
            let estadoEntidad: any = getData(this.props.estadoEntidad);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            let permiso: number = getOptionPermissionValue(config.id);

            if (permiso === null || permiso === auth.NONE_PERMISSION)
            {
                return null;
            };

            let permisoEscritura: boolean = permiso >= auth.WRITE_PERMISSION ? true : false;

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowDelete={false}
                allowView={false}
                onSave={this.saveForm}
                onFilter={this.onFilter}
                allowExcel={false}
                allowNew={false}>

                <PageButtons>

                    {(canPageEdit == true && permisoEscritura) ?
                        <div>
                            <EditarEntidad onClick={(e) => this.actualizarEstado(false)} />
                        </div>
                        : null
                    }

                    {(canPageEdit == false) ?
                        < CancelButton onClick={(e) => this.actualizarEstado(true)} /> : null
                    }

                    <SaveButton key="btnSave1" onClick={this.saveForm} />

                </PageButtons>

                <Column size={[12, 12, 12, 12]} style={{ marginBottom: "2%" }}>
                    <TipoEntidadConfiguracionDDL addNewItem={"SO"} />
                </Column>


                <ViewConfiguracionFormulario />
                <EditConfiguracionFormulario /> 
                
            </page.Main>;
        };
    });


    interface IConfiguracionFormulario extends page.IProps {
        configuracion: any;
        estadoEntidad: any;
        configuracionForm: any;
    };

    export let ViewConfiguracionFormulario: any = global.connect(class extends React.Component<IConfiguracionFormulario, IConfiguracionFormulario> {
        constructor(props: IConfiguracionFormulario) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.configuracion = state.global.catalogo$configuracion;
            retValue.estadoEntidad = state.global.currentEntityState;
            return retValue;
        };
        shouldComponentUpdate(nextProps: IConfiguracionFormulario, nextState: IConfiguracionFormulario): boolean {
            return hasChanged(this.props.configuracion, nextProps.configuracion) ||
                   hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad);
        };
        render(): JSX.Element {

            if (page.canViewEditMode())
            {
                return null;
            }
            let configuracion: any = getData(this.props.configuracion);
            let ml: any = buscarML();

            return <Row>

                <Column size={[12, 12, 7, 7]}>
                   <OptionSection
                        id={CONFIGURACIONFORMULARIO}
                        parent={config.id}
                        style={{margin:"1%"}}
                        title={"Campos"}
                        level={1}
                        hideNewButton={true}
                        icon={"fas fa-cogs"}
                        size={[12, 12, 6, 6]}
                        collapsed={false}>
                        <PanelUpdate info={this.props.configuracion}>
                            <List
                                id={"Lista_list"}
                                items={global.createSuccessfulStoreObject(configuracion)}
                                readonly={true}
                                addRemoveButton={false}
                                listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Orden"}</Column>
                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Campo"}</Column>
                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Visible"}</Column>
                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Requerido"}</Column>

                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className="fas fa-mobile-alt"></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className={"fas fa-tablet-alt"}></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className="fas fa-laptop"></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className={"fas fa-tv"}></i></span></Column>

                                    </Row>
                                </div>}
                                formatter={(index: number, item: any): any => {
                                    return <Row>

                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {item.Orden > 0 ?
                                                <span className="badge  badge-success">{item.Orden}</span> :
                                                null
                                            }
                                           
                                        </Column>

                                        <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                            {buscarNombre(item.Clave, ml)}
                                        </Column>

                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                            {EK.UX.Labels.ok(item.Visible)}
                                        </Column>

                                        <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                            {EK.UX.Labels.ok(item.Requerido)}
                                        </Column>

                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {item.xs > 0 ? item.xs + "%": ""}
                                        </Column>

                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {item.sm > 0 ? item.sm + "%": ""}
                                        </Column>

                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {item.md > 0 ? item.md + "%": ""}
                                        </Column>

                                        <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                            {item.lg > 0 ? item.lg + "%": ""}
                                        </Column>

                                    </Row>;
                                }}
                            />
                        </PanelUpdate>
                        </OptionSection>
                   
                </Column>
               
            </Row>

        };
    });


    export let EditConfiguracionFormulario: any = global.connect(class extends React.Component<IConfiguracionFormulario, IConfiguracionFormulario> {
        constructor(props: IConfiguracionFormulario) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.configuracion = state.global.catalogo$configuracion;
            retValue.estadoEntidad = state.global.currentEntityState;
            retValue.configuracionForm = Forms.getValue(CONFIGURACIONFORMULARIO, config.id);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IConfiguracionFormulario): any {

            if (global.hasChanged(this.props.configuracionForm, nextProps.configuracionForm)) {

                let npe: any = getData(nextProps.configuracionForm);
                let tpe: any = getData(this.props.configuracionForm);

                if (npe && npe.length && npe.length > 0 && tpe && tpe.length && tpe.length>0)
                {

                    let posicionCambio: number = -1;


                    /*De la configuracion existente obtenemos la posicion que cambio*/
                    if (npe && npe.length > 0 && tpe && tpe.length > 0) {
                        for (var i = 0; i < npe.length; i++) {
                            if ((npe[i].Orden != tpe[i].Orden)) {
                                posicionCambio = i;
                                break;
                            }
                        }
                    }

                    /*Si encontramos que la posicion cambio obtenemos la posicion
                    que tiene el mismo orden*/

                    if (posicionCambio != -1) {

                        let ordenCambio: number = parseInt(npe[posicionCambio].Orden);
                        let posicionNextCambio: number = -1;

                        for (var i = 0; i < npe.length; i++) {
                            let orden: number = parseInt(npe[i].Orden);

                            if (orden == ordenCambio && posicionCambio != i) {
                                posicionNextCambio = i;
                                break;
                            }
                        }

                        if (posicionNextCambio != -1) {
                            /*Sumamos 1 si el valor es secuencial*/
                            let ordenInicial: number = ordenCambio;
                            for (var i = posicionNextCambio; i < npe.length; i++) {

                                if ((parseInt(npe[i].Orden) == ordenInicial) && (i != posicionCambio)) {
                                    npe[i].Orden = ordenInicial + 1;
                                    npe[i]._modificado = true;
                                    ordenInicial = ordenInicial + 1;
                                }

                            }

                            /*Ordenar elementos por orden*/
                            let temp: number = parseInt(npe[0].Orden);

                            let auxili: number;
                            let j: number;

                            for (let i: number = 0; i < npe.Length; i++) {
                                auxili = parseInt(npe[i].Orden);

                                j = i - 1;

                                while (j >= 0 && npe[j].Orden > auxili) {
                                    npe[j + 1].Orden = parseInt(npe[j].Orden);
                                    j--;
                                }

                                npe[j + 1].Orden = auxili;
                            }

                        }


                        /*Actualizar formulario*/
                        let data: any = nextProps.configuracionForm;

                        if (npe && npe.length > 0) {
                            data.data = npe;
                            data.timestamp = data.timestamp + 1;
                            Forms.updateFormElement(config.id, CONFIGURACIONFORMULARIO, data);
                        }

                    }
                }

            }
        };

        shouldComponentUpdate(nextProps: IConfiguracionFormulario, nextState: IConfiguracionFormulario): boolean {
            return hasChanged(this.props.configuracion, nextProps.configuracion)||
                hasChanged(this.props.estadoEntidad, nextProps.estadoEntidad) ||
                hasChanged(this.props.configuracionForm, nextProps.configuracionForm)
        };
        render(): JSX.Element {

            if (page.canViewReadMode()) {
                return null;
            }

            let configuracion: any = getData(this.props.configuracion);
            let ml: any = buscarML();

            return <Row>


                <Column size={[12, 7, 7, 7]}>

                    <OptionSection
                        id={CONFIGURACIONFORMULARIO}
                        parent={config.id}
                        title={"Campos"}
                        level={1}
                        hideNewButton={true}
                        icon={"fas fa-cogs"}
                        style={{margin:"1%"}}
                        collapsed={false}>

                        <PanelUpdate info={this.props.configuracion}>
                                <List
                                    id={"Lista_list"}
                                    items={global.createSuccessfulStoreObject(configuracion)}
                                    readonly={true}
                                    dragAndDrop={true}
                                    drawOddLine={true}
                                    addRemoveButton={false}
                                    listHeader={<div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header">{"Orden"}</Column>
                                        <Column size={[12, 3, 3, 3]} className="list-default-header">{"Campo"}</Column>
                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Visible"}</Column>
                                        <Column size={[12, 2, 2, 2]} className="list-default-header">{"Requerido"}</Column>

                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className="fas fa-mobile-alt"></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className={"fas fa-tablet-alt"}></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className="fas fa-laptop"></i></span></Column>
                                        <Column size={[12, 1, 1, 1]} className="list-default-header"><span><i className={"fas fa-tv"}></i></span></Column>

                                    </Row>
                                    </div>}
                                    formatter={(index: number, item: any): any => {
                                    return <Row>

                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                <input.Integer property={CONFIGURACIONFORMULARIO} index={index} value={item.Orden} id="Orden" idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 3, 3, 3]} className="listItem-default-item">
                                                {buscarNombre(item.Clave, ml)}
                                            </Column>

                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                <checkBox.CheckBox textAlign="center" property={CONFIGURACIONFORMULARIO}
                                                    value={item.Visible} index={index} id={"Visible"} idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                                <checkBox.CheckBox textAlign="center" property={CONFIGURACIONFORMULARIO}
                                                    value={item.Requerido} index={index} id={"Requerido"} idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                 <input.Porcentaje property={CONFIGURACIONFORMULARIO} index={index} value={item.xs > 0 ? item.xs : null} id="xs" idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <input.Porcentaje property={CONFIGURACIONFORMULARIO} index={index} value={item.sm > 0 ? item.sm : null} id="sm" idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <input.Porcentaje property={CONFIGURACIONFORMULARIO} index={index} value={item.md > 0 ? item.md : null} id="md" idFormSection={config.id} />
                                            </Column>

                                            <Column size={[12, 1, 1, 1]} className="listItem-default-item">
                                                    <input.Porcentaje  property={CONFIGURACIONFORMULARIO} index={index} value={item.lg > 0 ? item.lg : null} id="lg" idFormSection={config.id} />
                                            </Column>

                                        </Row>;
                                    }}
                                />
                        </PanelUpdate>

                       
                    </OptionSection>

                </Column>

            </Row>

        };
    });

    //Se agrego un componente igual en DropDownList.tsx Pendiente de ajustar en esta página, Determinar Impacto
    let TipoEntidadConfiguracionDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoEntidadConfiguracionForm,
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoEntidad",
            items: createDefaultStoreObject([]),
            label: "Tipo Entidad",
            helpLabel: "Seleccione un Tipo Entidad",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {

            if (!isLoadingOrSuccessful(this.props.items)) {
                let parametros: any = global.encodeParameters({ activos: 1 });
                global.dispatchAsync("load::TipoEntidadConfiguracionForm", "base/kontrol/ConfiguracionFormulario/Get/GetAllEntidades/" + parametros);
            }
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });

   // state: state.global.currentEntityState

    export interface IEntidadButton extends EK.UX.Buttons.IButtonProps {
        estado: any;
    }
    let EditarEntidad: any = global.connect(class extends React.Component<IEntidadButton, {}> {
        constructor(props: IEntidadButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            estado: state.global.currentEntityState
        });
        static defaultProps: IEntidadButton = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined, 
            estado:undefined,
        };
        onClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
        };
        shouldComponentUpdate(nextProps: IEntidadButton, nextState: IEntidadButton): boolean {
            return hasChanged(this.props.estado, nextProps.estado)
        };
        render(): JSX.Element {
            let estadoEntidad: any = getData(this.props.estado);
            let canPageEdit: boolean = estadoEntidad && estadoEntidad.viewMode ? estadoEntidad.viewMode : false;

            if (canPageEdit == false)
            {
                return null;
            }
            let className: string;
            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn btn-default-ek";
            }
            
            return <Button {...this.props} className={className} onClick={this.onClick} />

        };
    });

}

