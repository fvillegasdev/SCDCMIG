namespace EK.Modules.Kontrol.Pages.TiposFlujo {
    "use strict";
    const FLUJO_TRABAJO: string = "flujoAutorizacion";
    const FLUJO_TRABAJO_TAREAS: string = "Tareas";
    const FLUJO_TRABAJO_NOTIFICADORES: string = "Notificadores";
    const FLUJO_TRABAJO_TAREAS_AUTORIZADORES: string = "Autorizadores";

    var TipoNotificador = ["PUESTO", "POSICION", "JEFEDIRECTO", "AREA", "GRUPO"]
    const config: page.IPageConfig = global.createPageConfig(FLUJO_TRABAJO, "kontrol", [FLUJO_TRABAJO_TAREAS, FLUJO_TRABAJO_NOTIFICADORES]);


    interface IFlujoTrabajoProps extends page.IProps {
        item?: DataElement;
        config?: page.IPageConfig;
        elementos?: any;
    };
    interface IFlujoTrabajoState {
    }

    class FlujoTrabajo extends React.Component<IFlujoTrabajoProps, IFlujoTrabajoState> {
        constructor(props: IFlujoTrabajoProps) {
            super(props);
            this.onSaveNotificadoresFlujoTrabajo = this.onSaveNotificadoresFlujoTrabajo.bind(this);
            this.onSaveAutorizadores = this.onSaveAutorizadores.bind(this);
            this.onSaveTarea = this.onSaveTarea.bind(this);
            this.onValidateNotificadorAutorizador = this.onValidateNotificadorAutorizador.bind(this);
            this.onValidateTarea = this.onValidateTarea.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            elementos: state.global.FlujoTrabajo_Tarea,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            
        });
        componentWillMount(): void
        {
            let item: any = Forms.getForm(FLUJO_TRABAJO);

            Forms.updateFormElement(FLUJO_TRABAJO, FLUJO_TRABAJO_TAREAS, global.createSuccessfulStoreObject(item.Tareas));
            global.dispatchSuccessful("global-page-data", item.Tareas, FLUJO_TRABAJO_TAREAS);

            Forms.updateFormElement(FLUJO_TRABAJO, FLUJO_TRABAJO_NOTIFICADORES, item.Notificadores);
            global.dispatchSuccessful("global-page-data", item.Notificadores, FLUJO_TRABAJO_NOTIFICADORES);

            global.dispatchSuccessful("global-page-data", [], FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
        };
        onSaveNotificadoresFlujoTrabajo(): void
        {
            let item: EditForm = Forms.getForm(FLUJO_TRABAJO_NOTIFICADORES);
            if (this.onValidateNotificadorAutorizador(item, FLUJO_TRABAJO_NOTIFICADORES))
            {
                warning("Este Notificador ya fue añadido");
                return;
            }
            else
            {
                let entidades: DataElement = this.props.config.getCatalogo("Notificadores");
                let retValue: DataElement;
                let elemento: any;
                elemento = item
                    .addNumber("ID")
                    .addObject("TipoNotificador")
                    .addObject("Registro")
                    .addObject("TipoPuesto")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    elemento["ID"] = entidades.getNextLowerID();
                }
                if (elemento["TipoNotificador"].Clave === "JEFEDIRECTO") {
                    elemento["Registro"] = null;
                }
                if (entidades.data == undefined) {
                    let element: any = [];
                    element[0] = elemento;
                    entidades.data = element;
                    retValue = entidades;
                }
                else {
                    retValue = entidades.upsertItem(elemento);
                }
                Forms.updateFormElement(FLUJO_TRABAJO, FLUJO_TRABAJO_NOTIFICADORES);
                global.dispatchSuccessful("global-page-data", retValue, FLUJO_TRABAJO_NOTIFICADORES);
                this.props.config.setState({ viewMode: true }, FLUJO_TRABAJO_NOTIFICADORES);
            }
        }
        onSaveAutorizadores(): void
        {
            let item: EditForm = Forms.getForm(FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
            if (this.onValidateNotificadorAutorizador(item, FLUJO_TRABAJO_TAREAS_AUTORIZADORES))
            {
                warning("Este Notificador ya fue añadido");
                return;
            }
            else {
                let entidades: DataElement = this.props.config.getCatalogo(FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
                let retValue: DataElement;
                let elemento: any;
                elemento = item
                    .addNumber("ID")
                    .addString("Expresion")
                    .addString("ExpresionMensaje")
                    .addObject("TipoNotificador")
                    .addObject("TipoPuesto")
                    .addObject("Registro")
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    elemento["ID"] = entidades.getNextLowerID();
                }
                if (elemento["TipoNotificador"].Clave === "JEFEDIRECTO") {
                    elemento["Registro"] = null;
                }
                if (elemento["TipoNotificador"].Clave != "PUESTO") {
                    elemento["TipoPuesto"] = null;
                    elemento["IdTipoPuesto"] = null;
                }
                if (entidades.data == undefined) {

                    let element: any = [];
                    element[0] = elemento;
                    entidades.data = element;
                    retValue = entidades;
                }
                else {
                     retValue= entidades.upsertItem(elemento);
                }
                Forms.updateFormElement(FLUJO_TRABAJO_TAREAS, FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
                global.dispatchSuccessful("global-page-data", retValue, FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
                this.props.config.setState({ viewMode: true }, FLUJO_TRABAJO_TAREAS_AUTORIZADORES);
            }
        }
        onSaveTarea(): void {
            let item: EditForm = Forms.getForm(FLUJO_TRABAJO_TAREAS);
            if (this.onValidateTarea(item, FLUJO_TRABAJO_TAREAS)) {
                warning("Esta Tarea ya fue añadida");
                return;
            }
            else {
                let entidadesOrdenadas: any[] = [];
                let entidades: DataElement = this.props.config.getCatalogo(FLUJO_TRABAJO_TAREAS);
                ///Valida Orden
                let Cambio: boolean = false;
                if (entidades.data != undefined && entidades.data.forEach != undefined) {

                    entidades.data.forEach((value: any, index: number) => {

                        if (value.Orden == item.formData.form.Orden.value) {
                            entidades.data[index].Orden = value.Orden + 1;
                            if (entidades.data[index].ID < 0) {
                                entidades.data[index].Estado = 1;//Nuevo
                            }
                            else if (entidades.data[index].Estado != 2)//Eliminado
                            {
                                entidades.data[index].Estado = 3;//Modificado
                            }
                            Cambio = true;
                        }
                        else if (Cambio === true) {
                            entidades.data[index].Orden = value.Orden + 1;
                            if (entidades.data[index].ID < 0) {
                                entidades.data[index].Estado = 1;//Nuevo
                            }
                            else if (entidades.data[index].Estado != 2)//Eliminado
                            {
                                entidades.data[index].Estado = 3;//Modificado
                            }
                        }
                    });
                }
                let retValue: DataElement;
                let elemento: any;
                elemento = item
                    .addNumber("ID")
                    .addClave()
                    .addNombre()
                    .addNumber("DiasVigencia")
                    .addNumber("Orden")
                    .addString("Expresion")
                    .addString("ExpresionMensaje")
                    .addObject(FLUJO_TRABAJO_TAREAS_AUTORIZADORES)
                    .addEstatus()
                    .addVersion()
                    .toObject();
                if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                    elemento["ID"] = entidades.getNextLowerID();
                }
                if (entidades.data == undefined) {

                    let element: any = [];
                    element[0] = elemento;
                    entidades.data = element;
                    retValue = entidades;
                }
                else {
                    retValue = entidades.upsertItem(elemento);
                }
                let cantidadElementos = retValue.data.length;
                for (var i = 0, k = 0; i < cantidadElementos - 1; i++) {
                    k = i;
                    for (var j = i + 1; j < cantidadElementos; j++)
                    {
                        var valorEnCurso = retValue.data[k].Orden;
                        var valorEnCurso2 = retValue.data[j].Orden;
                        if (valorEnCurso > valorEnCurso2){
                            k = j;
                        }
                    }
                    if (i != k)
                    {
                        var temporal = retValue.data[i];
                        retValue.data[i] = retValue.data[k];
                        retValue.data[k] = temporal
                    }
                }
                if (retValue.data.length >= 2)
                {
                    if (retValue.data[cantidadElementos - 2].Orden != retValue.data[cantidadElementos - 1].Orden - 1) {
                        retValue.data[cantidadElementos - 1].Orden = retValue.data[cantidadElementos - 2].Orden + 1;
                    }
                }

                Forms.updateFormElement(FLUJO_TRABAJO, FLUJO_TRABAJO_TAREAS);
                global.dispatchSuccessful("global-page-data", retValue, FLUJO_TRABAJO_TAREAS);
                this.props.config.setState({ viewMode: true }, FLUJO_TRABAJO_TAREAS);
            }
        }
        onValidateNotificadorAutorizador(item: any, seccion: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(seccion);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (items != undefined && items.forEach != undefined)
            {
                items.forEach((value: any, index: number) =>
                {
                    if (item.TipoNotificador.Clave === "JEFEDIRECTO" || value.TipoNotificador.Clave ==="JEFEDIRECTO") {
                        if (value.TipoNotificador.Clave == item.TipoNotificador.Clave)
                        {
                            result = true;
                        }
                    }
                    else
                    {
                        if ((value.Registro.Clave == item.Registro.Clave && value.TipoNotificador.Clave == item.TipoNotificador.Clave)
                            && (item.ID < 1 || item.ID === undefined))
                        {
                            result = true;
                        }
                    }
                });
            }
            return result;
        }
        onValidateTarea(item: any, seccion: string): boolean {
            let entidades: DataElement = this.props.config.getCatalogo(seccion);
            let items: any[] = entidades.data;
            let result: boolean = false;
            if (items != undefined && items.forEach != undefined) {
                items.forEach((value: any, index: number) => {
                    if (
                        (value.Clave == item.Clave && value.Nombre == item.Nombre)
                        &&
                        (item.ID < 1 || item.ID === undefined)
                    ) {
                        result = true;
                    }
                });
            }
            //Valida Orden

            return result;
        }
        render(): JSX.Element {
            let valorElementos: DataElement = this.props.elementos;
            let claveFlujo: string = valorElementos.data ? valorElementos.data.item ? valorElementos.data.item.Clave : "" : "";
            let item: any = Forms.getForm(FLUJO_TRABAJO);
            let editTarea: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    valorElementos = item.Autorizadores;
                    EK.Global.dispatchFullSuccessful("global-page-data", valorElementos, FLUJO_TRABAJO_TAREAS_AUTORIZADORES, 0, "");
                    Forms.remove(id);
                    Forms.updateFormElements(id, item);
                    config.setState({ viewMode: false }, id);
                }
            };
            return <FadeInColumn>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <Label label={"Clave"} id={"Clave"} size={[12, 12, 4, 4]} idFormSection={FLUJO_TRABAJO} value={claveFlujo} />
                        <input.Nombre label={"Nombre"} idFormSection={FLUJO_TRABAJO} size={[12, 12, 8, 8]}/* value={valorElementos.data.item.Nombre}*/ maxLength={150} />
                    </Column>
                </Row>
                <page.SectionList
                    id={FLUJO_TRABAJO_TAREAS}
                    parent={FLUJO_TRABAJO}
                    level={1}
                    onSave={this.onSaveTarea}
                    style={{ paddingTop: 20 }}
                    icon="fa fa-tasks"
                    size={[12, 12, 12, 12]}
                    readonly={false}
                    items={createSuccessfulStoreObject([])}
                    addRemoveButton={true}
                    mapFormToEntity={(form: EditForm): any => {
                        return form
                            .addID()
                            .addClave()
                            .addNombre()
                            .addNumber("DiasVigencia")
                            .addNumber("Orden")
                            .addObject(FLUJO_TRABAJO_TAREAS_AUTORIZADORES)
                            .addString("Expresion")
                            .addString("ExpresionMensaje")
                            .addVersion()
                            .addEstatus()
                            .toObject();
                    }}
                    formatter={(index: number, item: any) => {
                        let estatus: boolean = item.Estatus.Clave === "B" ? true : false;
                        return <Row style={{ padding: 0, margin: 0 }} >
                            <Column size={[1, 1, 1, 1]}>
                                <div style={{ paddingBottom: 2 }} className={"tarea-list-sm"}>{item.Orden}</div>
                            </Column>
                            <Column size={[10, 10, 10, 10]} style={{ padding: "7px 0px", fontWeight: 600 }}>
                                {item.Nombre}
                                {(estatus) ?
                                    <span className="badge badge-danger ek-sombra" style={{ float: "right" }}>INACTIVA</span>
                                    :
                                    null
                                }
                            </Column>
                            <Column size={[1, 1, 1, 1]} style={{ paddingTop: 4 }}>
                                <buttons.PopOver idParent={config.id} idForm={FLUJO_TRABAJO_TAREAS} info={item}
                                    extraData={[editTarea, buttons.PopOver.remove]} />
                            </Column>
                        </Row>;
                    }}>

                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <input.Clave size={[12, 3, 3, 3]} label={"Clave"} idFormSection={FLUJO_TRABAJO_TAREAS} maxLength={20} />
                            <input.Nombre size={[12, 7, 7, 7]} label={"Nombre"} idFormSection={FLUJO_TRABAJO_TAREAS} maxLength={150} />
                            <checkBox.Status size={[12, 2, 2, 2]} idFormSection={FLUJO_TRABAJO_TAREAS} />
                            <input.Integer size={[6, 3, 3, 3]} id={"Orden"} label={"Orden"} idFormSection={FLUJO_TRABAJO_TAREAS} validations={[validations.required()]} />
                            <input.Integer id={"DiasVigencia"} size={[6, 3, 3, 3]} label={"Dias Vigencia"} idFormSection={FLUJO_TRABAJO_TAREAS} />
                            <input.Text id={"Expresion"} size={[12, 6, 6, 6]} label={"Expresión"} idFormSection={FLUJO_TRABAJO_TAREAS} />
                            <input.Text id={"ExpresionMensaje"} size={[12, 12, 12, 12]} label={"Mensaje (Expresión)"} idFormSection={FLUJO_TRABAJO_TAREAS} />
                        </Column>
                        <page.SectionList
                            id={FLUJO_TRABAJO_TAREAS_AUTORIZADORES}
                            parent={FLUJO_TRABAJO_TAREAS}
                            level={1}
                            onSave={this.onSaveAutorizadores}
                            style={{ paddingTop: 20 }}
                            icon="fas fa-check-circle"
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[12, 5, 5, 5]} className="list-default-header">{"Tipo"}</Column>
                                        <Column size={[12, 7, 7, 7]} className="list-default-header">{"Autorizador"}</Column>
                                    </Row>
                                </div>}

                            size={[12, 12, 12, 12]}
                            items={createSuccessfulStoreObject([])}
                            addRemoveButton={true}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addVersion()
                                    .addObject("TipoNotificador")
                                    .addObject("Registro")
                                    .addObject("TipoPuesto")
                                    .addString("Expresion")
                                    .addString("ExpresionMensaje")
                                    .addEstatus()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[12, 5, 5, 5]} className="listItem-default-header">
                                        <span>{item.TipoNotificador.Nombre}</span>
                                        {(item.TipoPuesto && item.TipoPuesto.Clave) ?
                                            <span className='badge badge-info'>{item.TipoPuesto.Nombre}</span>
                                            :
                                            null
                                        }
                                    </Column>
                                    <Column size={[12, 5, 5, 5]} className="listItem-default-header">
                                        {(item.Registro) ?
                                            <span>{item.Registro.Nombre}</span>
                                            :
                                            null
                                        }
                                    </Column>
                                    <buttons.PopOver idParent={FLUJO_TRABAJO_TAREAS} idForm={FLUJO_TRABAJO_TAREAS_AUTORIZADORES} info={item}
                                        extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                </Row>;
                            }}>
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ backgroundColor: "#f1f1f1", paddingBottom: 10 }}>
                                    <TiposNotificadoresDDL id={"TipoNotificador"} size={[12, 6, 6, 6]}  idFormSection={FLUJO_TRABAJO_TAREAS_AUTORIZADORES} validations={[validations.required()]} />
                                    <input.Text id={"Expresion"} size={[12, 6, 6, 6]} label={"Expresión"} idFormSection={FLUJO_TRABAJO_TAREAS_AUTORIZADORES} />
                                    <input.Text id={"ExpresionMensaje"} size={[12, 12, 12, 12]} label={"Mensaje (Expresión)"} idFormSection={FLUJO_TRABAJO_TAREAS_AUTORIZADORES} />
                                </Column>
                                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10, paddingBottom: 10}}>
                                    <MultiEditor id={"Registro"} formSection={FLUJO_TRABAJO_TAREAS_AUTORIZADORES} />
                                </Column>
                            </Row>
                        </page.SectionList>
                    </Row>
                </page.SectionList>
                <page.SectionList
                    id={FLUJO_TRABAJO_NOTIFICADORES}
                    parent={FLUJO_TRABAJO}
                    level={1}
                    onSave={this.onSaveNotificadoresFlujoTrabajo}
                    style={{ paddingTop: 20 }}
                    icon="fas fa-bell"
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Tipo"}</Column>
                                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Notificador"}</Column>
                            </Row>
                        </div>}
                    size={[12, 12, 12, 12]}
                    items={createSuccessfulStoreObject([])}
                    addRemoveButton={true}
                    mapFormToEntity={(form: EditForm): any => {
                        return form
                            .addID()
                            .addVersion()
                            .addObject("TipoNotificador")
                            .addObject("Registro")
                            .addObject("TipoPuesto")
                            .addEstatus()
                            .toObject();
                    }}
                    formatter={(index: number, item: any) => {
                        return <Row>
                            <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                <span>{item.TipoNotificador.Nombre}</span>
                                {(item.TipoPuesto && item.TipoPuesto.Clave) ?
                                    <span className='badge badge-info'>{item.TipoPuesto.Nombre}</span>
                                    :
                                    null
                                }
                            </Column>
                            <Column size={[6, 6, 6, 6]} className="listItem-default-header">
                                {(item.Registro) ?
                                    <span>{item.Registro.Nombre}</span>
                                    :
                                    null
                                }
                            </Column>
                            <buttons.PopOver idParent={config.id} idForm={FLUJO_TRABAJO_NOTIFICADORES} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        </Row>;
                    }}>
                    <Row>
                        <Column size={[12, 12, 12, 12]} style={{ backgroundColor: "#f1f1f1", paddingBottom: 10 }}>
                            <TiposNotificadoresDDL id={"TipoNotificador"} idFormSection={FLUJO_TRABAJO_NOTIFICADORES} validations={[validations.required()]} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <MultiEditor id={"Registro"} formSection={FLUJO_TRABAJO_NOTIFICADORES} validations={[validations.required()]} />
                        </Column>
                    </Row>
                </page.SectionList>
            </FadeInColumn>
        };
    }

    let TiposNotificadoresDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TIPOSNOTIFICADORES,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            loadData: (): void => {
                dispatchAsync("load::TIPOSNOTIFICADORES", "catalogos/get(NOTIFICADORES)");
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TiposNotificador",
            items: createDefaultStoreObject([]),
            label: "Notificador",
            helpLabel: "Seleccione el tipo de notificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.loadData();
            }
        }
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = 0;
                nuevoItem['Nombre'] = 'Seleccione un Tipo de Notificador';
                nuevoItem['Clave'] = 'Seleccione un Tipo de Notificador';
                if (itemsModificados.data.length != 0) {
                    if (itemsModificados.data[0].ID != 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

    export let FlujoTrabajoEditar: any = ReactRedux.connect(FlujoTrabajo.props, FlujoTrabajo.dispatchs)(FlujoTrabajo);

    interface IMultiDropDrownListProps extends React.Props<any> {
        tipoNotificadorTareas?: any;
        tipoNotificadorFlujo?: any;
        formSection?: string;

    };

    const MultiEditor: any = global.connect(class extends React.Component<IMultiDropDrownListProps, IMultiDropDrownListProps>{
        constructor(props: IMultiDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            tipoNotificadorTareas: Forms.getValue("TipoNotificador", FLUJO_TRABAJO_TAREAS_AUTORIZADORES),
            tipoNotificadorFlujo: Forms.getValue("TipoNotificador", FLUJO_TRABAJO_NOTIFICADORES)
        });
        componentWillReceiveProps(nextProps: IMultiDropDrownListProps) {
            if (this.props.tipoNotificadorFlujo && nextProps.tipoNotificadorFlujo) {
                if (this.props.tipoNotificadorFlujo.Clave !== nextProps.tipoNotificadorFlujo.Clave) {
                    Forms.updateFormElement("TipoNotificador", "Value", null);
                };
            }
            else {
                Forms.updateFormElement(this.props.formSection, "Value", null);
            };
            ///
            if (this.props.tipoNotificadorTareas && nextProps.tipoNotificadorTareas) {
                if (this.props.tipoNotificadorTareas.Clave !== nextProps.tipoNotificadorTareas.Clave) {
                    Forms.updateFormElement("TipoNotificador", "Value", null);
                };
            }
            else {
                Forms.updateFormElement(this.props.formSection, "Value", null);
            };
        };
        render(): JSX.Element {
            let retValue: any = null;
            if (this.props.tipoNotificadorFlujo && this.props.tipoNotificadorFlujo.Clave && this.props.formSection === FLUJO_TRABAJO_NOTIFICADORES) {
                if (this.props.tipoNotificadorFlujo.Clave === "JEFEDIRECTO") {
                    retValue = <Column size={[12, 12, 12, 12]}><span>Se notificara a </span> <span className="badge badge-info">Jefe Directo</span></Column>
                } else if (this.props.tipoNotificadorFlujo.Clave === "PUESTO") {
                    retValue = <Row style={{ paddingLeft: 16 }}><PuestosDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                        <TiposPuestosDDL id={"TipoPuesto"} addNewItem={"SO"} idFormSection={this.props.formSection} validations={[validations.required()]} /></Row>
                } else if (this.props.tipoNotificadorFlujo.Clave === "POSICION") {
                    retValue = <ddl.PosicionesActivasDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]}/>
                } else if (this.props.tipoNotificadorFlujo.Clave === "GRUPO") {
                    retValue = <GruposDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                } else if (this.props.tipoNotificadorFlujo.Clave === "AREA") {
                    retValue = <AreasOrganizacionDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                };
            }
            else if (this.props.tipoNotificadorTareas && this.props.tipoNotificadorTareas.Clave && this.props.formSection === FLUJO_TRABAJO_TAREAS_AUTORIZADORES) {
                if (this.props.tipoNotificadorTareas.Clave === "JEFEDIRECTO") {
                    retValue = <Column size={[12, 12, 12, 12]}><span>Se notificara a </span> <span className="badge badge-info">Jefe Directo</span></Column>
                } else if (this.props.tipoNotificadorTareas.Clave === "PUESTO") {
                    retValue = <Row style={{ paddingLeft:16 }}><PuestosDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                        <TiposPuestosDDL id={"TipoPuesto"} idFormSection={this.props.formSection} validations={[validations.required()]} /></Row>
                } else if (this.props.tipoNotificadorTareas.Clave === "POSICION") {
                    retValue = <ddl.PosicionesActivasDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                } else if (this.props.tipoNotificadorTareas.Clave === "GRUPO") {
                    retValue = <GruposDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]}/>
                } else if (this.props.tipoNotificadorTareas.Clave === "AREA") {
                    retValue = <AreasOrganizacionDDL id={"Registro"} idFormSection={this.props.formSection} validations={[validations.required()]} />
                };
            }
            return retValue;
        };
    });



    let TiposPuestosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.NOTIFICADORTIPOPUESTO,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            loadData: (): void => {
                dispatchAsync("load::NOTIFICADORTIPOPUESTO", "catalogos/get(NOTIFICADORTIPOPUESTO)");
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoPuesto",
            items: createDefaultStoreObject([]),
            label: "Tipo Puesto",
            helpLabel: "Seleccione el tipo puesto",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.loadData();
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}  />;
        }
    });
}


