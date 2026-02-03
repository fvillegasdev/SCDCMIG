namespace EK.Modules.Kontrol.Pages.TareasManuales {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tareasManuales", "kontrol");

    interface IEdicionProps extends page.IProps {
        prioridades: DataElement;
        estatus: DataElement;
        expediente: DataElement;
    };
    interface IEdicion extends React.Props<any> {
        expediente: DataElement;
    };

    export const Edicion: any = global.connect(class extends React.Component<IEdicionProps, IEdicionProps> {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            prioridades: state.global.PRIORIDADTAREA,
            estatus: state.global.ESTADOTAREA
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addNombre()
                .addObject("Tipo")
                .addDate("FechaInicio")
                .addDate("FechaFin")
                .addNumber("Completado")
                .addObject("Estatus")
                .addObject("Prioridad")
                .addObject("Asignado")
                .addString("Comentarios")
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): any {
        };
        componentWillReceiveProps(nextProps: IEdicionProps) {
            let tarea: any = global.getData(this.props.entidad);

            if (global.hasChanged(this.props.entidad, nextProps.entidad) && global.isSuccessful(nextProps.entidad)) {
                if (tarea.ID === -1) {
                    Forms.updateFormElement(config.id, "Completado", 0);
                };
            };

            if (global.hasChanged(this.props.prioridades, nextProps.prioridades)
                && global.isSuccessful(nextProps.prioridades)) {
                if (tarea.ID === -1) {
                    let data: any[] = global.getData(nextProps.prioridades);
                    data.forEach((value: any, index: number): any => {
                        if (value.Clave === "N") {
                            Forms.updateFormElement(config.id, "Prioridad", value);
                        };
                    });
                };
            };

            if (global.hasChanged(this.props.estatus, nextProps.estatus)
                && global.isSuccessful(nextProps.estatus)) {
                if (tarea.ID === -1) {
                    let data: any[] = global.getData(nextProps.estatus);
                    data.forEach((value: any, index: number): any => {
                        if (value.Clave === "NC") {
                            Forms.updateFormElement(config.id, "Estatus", value);
                        };
                    });
                };
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    const Edit: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        render(): JSX.Element {
            return <page.Edit>
                <Column size={ [12, 12, 12, 12] }>  
                    <page.OptionSection
                        id={config.id}
                        subTitle={"Tareas Manuales"}
                        icon="fa fa-calendar-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <select.Usuarios id="Asignado" size={[12, 6, 3, 3]} validations={[validations.required()]}/>
                            <TipoCitasDDL id="Tipo" size={[12, 3, 3, 3]} validations={[validations.required()]} addNewItem={"SO"} />
                            <DatePicker id={"FechaInicio"} type="datetime" size={[12, 2, 2, 2]} validations={[validations.required()]} />
                            <DatePicker id={"FechaFin"} type="datetime" size={[12, 2, 2, 2]} validations={[validations.required(), validations.greaterThan("FechaInicio", "")]} />
                            <ddl.EstatusTarea size={[12, 2, 2, 2]} />
                            <input.Integer id="Completado" size={[2, 2, 2, 2]} />
                            <ddl.PrioridadTarea size={[12, 4, 4, 4]} />
                            <input.Nombre size={[12, 6, 6, 6]} maxLength={250} />
                            <Column style={{ marginTop: 20 }}>
                                <page.OptionSection id="Comentarios" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                    <Row>
                                        <input.RichText id="Comentarios" placeholder={"Comentarios"} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>; 
        };
    });

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={ [12, 12, 12, 12] }>
                    <page.OptionSection
                        id={config.id}
                        subTitle = {"Tareas Manuales"}
                        icon = "fa fa-calendar-o" collapsed= { false} hideCollapseButton= { true}>
                        <Row>
                            <label.General id="Asignado" size={[12, 6, 3, 3]} />
                            <label.General id={"Tipo"} size={[12, 3, 3, 3]} />
                            <label.FechaHora id="FechaInicio" size= { [12, 2, 2, 2]} />
                            <label.FechaHora id="FechaFin" size={[12, 2, 2, 2]} />
                            <label.General id="Estatus" size={[12, 2, 2, 2]} />

                            <label.Label id="Completado" size={[12, 2, 2, 2]} />
                            <label.General id="Prioridad" label="Prioridad" size={[12, 4, 4, 4]} />
                            <Label id={"Nombre"} size={[12, 6, 6, 6]} />

                            <Column style={{ marginTop: 20 }}>
                                <page.OptionSection id="Comentarios" subTitle={""} level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                    <Row>
                                        <label.HTML id={"Comentarios"} isHTML={true} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    };

    export const TareasRapidas: any = global.connect(class extends React.Component<IEdicion, IEdicion> {
        static props: any = (state: any) => ({
            expediente: state.global.currentEntity$expediente,
        });
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addNombre()
                .addObject("Tipo")
                .addDate("FechaInicio")
                .addDate("FechaFin")
                .addNumber("Completado")
                .addObject("Estatus")
                .addObject("Prioridad")
                .addObject("Asignado")
                .addObject("Cliente")
                .addObject("Expediente")
                .addString("Comentarios")
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let entidad: any = global.getData(props.entidad);
            if (entidad) {
                if (entidad.IdExpedienteREF) {
                    let actionUrl: string = "base/scv/expedientes/id/";
                    dispatchAsyncPost("global-current-entity", actionUrl, { id: entidad.IdExpedienteREF }, "expediente");
                    Forms.updateFormElement(config.id, "fromREFE", true);
                }
            };
            //Inicializar valores
            let parametros: any = global.encodeParameters({ clave: 'N', clavecatalogo: 'PRIORIDADTAREA' });
            global.asyncGet("base/kontrol/CatalogosGeneralesValores/Get/GetAll/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    Forms.updateFormElement(config.id, "Prioridad", { ID: data[0].ID, Nombre: 'Normal' });
                }
            });
            parametros = global.encodeParameters({ clave: 'NC', clavecatalogo: 'ESTADOTAREA' });
            global.asyncGet("base/kontrol/CatalogosGeneralesValores/Get/GetAll/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    Forms.updateFormElement(config.id, "Estatus", { ID: data[0].ID, Nombre: 'No comenzada' });
                }
            });
        };
        onEntitySaved() {
            //go("kontrol/tareasRapidas/id?nuevo");
        }
        componentWillReceiveProps(nextProps: IEdicion, nextState: IEdicion): any {
            if (global.hasChanged(this.props.expediente, nextProps.expediente)) {
                if (global.isSuccessful(nextProps.expediente)) {
                    let expediente: any = global.getData(nextProps.expediente);
                    Forms.updateFormElement(config.id, "Expediente", expediente);
                    Forms.updateFormElement(config.id, "Cliente", expediente.Cliente);
                };
            };
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                onSave={this.saveForm}
                allowEdit={false}
                onEntityLoaded={this.onEntityLoaded}>
                <ViewRapida />
                <EditTareaRapida />
            </page.Main>;
        };
    });
    const EditTareaRapida: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        render(): JSX.Element {
           
            let aplicarFiltro: any = () => {
                let props: any = global.assign(this.props, { onFilter: onPageFilter });
                page.applyFilter(props, null, "Catalogo");
            }
            return <page.Edit>
                <page.OptionSection
                    id={"tareasManuales$filters"}
                    title="Búsqueda avanzada"
                    icon="fa fa-filter"
                    level={2}
                    collapsed={true}
                    hideCollapseButton={false}>
                    <SectionButtons>
                        <buttons.RefreshFilterButton iconOnly={true} color="font-white" onWillFilter={this.props.onWillFilter} onFilter={aplicarFiltro} />
                    </SectionButtons>
                    <Row>
                        <TipoCitasDDL id="tipoCita" idFormSection={"tareasManuales$filters"} label="Tipo" size={[12, 6, 3, 3]} addNewItem={"SO"} />
                        <ddl.PrioridadTarea id="prioridad" idFormSection={"tareasManuales$filters"} size={[12, 6, 3, 3]} addNewItem={"SO"} />
                        <ddl.EstatusTarea id="Estatus" size={[12, 6, 3, 3]} idFormSection={"tareasManuales$filters"} addNewItem={"SO"} />
                        <SeleccionTipoVista tipoVistaDefinido={"Calendario"} marginTop={"2%"} />
                    </Row>
                </page.OptionSection>
               
                <Column size={[12, 12, 12, 12]}>
                    <Column size={[12, 12, 4, 4]}>
                        <page.OptionSection
                            id={config.id}
                            subTitle="Nueva Tarea"
                            style={{ marginLeft: "0%", paddingLeft: "0%" }}
                            icon="glyphicon glyphicon-list-alt"
                            level={0}
                            collapsed={false}
                            hideCollapseButton={false}>
                            {Forms.getValue("fromREFE", config.id) === true ?
                                <div>
                                    <label.Cliente id="Cliente" size={[12, 12, 12, 12]} />
                                </div>
                                : null}
                            {Forms.getValue("fromREFE", config.id) === true ?
                                <label.Expediente id="Expediente" size={[12, 12, 12, 12]} />
                                : null}
                                <select.Usuarios id="Asignado" label="Asignado" size={[12, 12, 12, 12]} validations={[validations.required()]} />
                                <input.Nombre size={[12, 12, 12, 12]} label="Descripcion" maxLength={250} />
                                <TipoCitasDDL id="Tipo" size={[12, 12, 12, 12]} label="Tipo" addNewItem={"SO"} />
                                <ddl.EstatusTarea size={[12, 12, 12, 12]} />
                                <ddl.PrioridadTarea size={[12, 12, 12, 12]} />
                                <DatePicker id={"FechaInicio"}  type="datetime" size={[12, 12, 12, 12]} />
                                <DatePicker id={"FechaFin"} type="datetime" size={[12, 12, 12, 12]} validations={[validations.greaterThan("FechaInicio", "")]} />
                        </page.OptionSection>
                    </Column>
                    <Column size={[12, 12, 8, 8]}>
                        <TipoVistaTareas tipoVistaDefinido={"Calendario"} />
                    </Column>
                </Column>
            </page.Edit>;
        };
    });

    class ViewRapida extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>

                    <Column size={[12, 12, 4, 4]}>
                        <page.OptionSection
                            id={config.id}
                            subTitle="Nueva Tarea"
                            style={{ marginLeft: "0%", paddingLeft: "0%" }}
                            icon="glyphicon glyphicon-list-alt"
                            level={0}
                            collapsed={false}
                            hideCollapseButton={false}>
                            <label.General id="Asignado" size={[12, 12, 12, 12]} />
                            <Label id={"Nombre"} size={[12, 6, 6, 6]} />

                            <label.General id={"Tipo"} size={[12, 12, 12, 12]} />
                            <label.General id="Estatus" size={[12, 12, 12, 12]} />
                            <label.General id="Prioridad" label="Prioridad" size={[12, 12, 12, 12]} />

                            <label.FechaHora id="FechaInicio" size={[12, 12, 12, 12]} />
                            <label.FechaHora id="FechaFin" size={[12, 12, 12, 12]}/>
                        </page.OptionSection>
                    </Column>
                </Column>
            </page.View>;
        }
    };

};

