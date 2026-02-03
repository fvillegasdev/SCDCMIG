namespace EK.Modules.SCV.Pages.postventa.SPVCheckList {
    "use strict";
    let PAGE_ID = "CheckList";
    const SECCION_PLAN_ACCION_ASIGNADO: any = PAGE_ID + "$PlanAccionAsignado"; 
    const SECCION_TAREAS_NO_ASIGNADAS: any = PAGE_ID + "$TareasNoAsignadas"; 
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECCION_PLAN_ACCION_ASIGNADO, SECCION_TAREAS_NO_ASIGNADAS]);

    const listHeaderPlanAccionAsignado: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Prioridad"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Plazo"}</Column>
                <Column size={[12,12, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    const listHeaderTareasNoAsignadas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    export class Edicion extends page.Base {

        saveForm(props: page.IProps, item: EditForm): any {

            let planAccion: any[] = global.getData(Forms.getValue(SECCION_PLAN_ACCION_ASIGNADO, config.id), []);
            let planAccionIsValid: boolean = true;

            planAccion.forEach((value: any, index:number ) => {
                if (value.PlazoDias < 0) {
                    warning("Los  días de Plazo no pueder ser menor a (0) para el item # " + (index  + 1).toString());
                    planAccionIsValid = false;
                }
                if (!value.Prioridad || value.Prioridad.ID === null || value.Prioridad.ID === undefined) {
                    warning("Debe indicar la prioridad del Plan de Acción para el item # " + (index + 1).toString());
                    planAccionIsValid = false;
                }
            });

            if (!planAccionIsValid) {
                return null;
            };

            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("TipoCheckList")
                .addObject("CategoriaCheckList")
                .addBoolean("Obligatorio")
                .addObject("FlujoAutorizacion")
                .addObject('PlanAccion', SECCION_PLAN_ACCION_ASIGNADO)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let datos: any = getData(props.entidad);
            let idCheckList: any = getData(props.entidad).ID

            if (idCheckList < 0) {
           
            }
            else {
                let p: any = global.assign({
                    activos: 1,
                    IdCheckList: idCheckList
                });
                dispatchAsyncPost("global-page-data", "base/kontrol/CheckList/GetBP/GetCheckListPlanAccion/", { parametros: p }, SECCION_PLAN_ACCION_ASIGNADO);
            };

            let url: string = global.encodeAllURL("kontrol", "tipoCitas", { activos: 1 });
            dispatchAsync("global-page-data" ,  url  ,  SECCION_TAREAS_NO_ASIGNADAS);
        };

        onWillEntityLoad(id: any, props: page.IProps): void {     };
 
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} >
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IEditCheckListProps extends page.IProps {
        tareas?: global.DataElement;
        planAccion?: global.DataElement;

    };

    let Edit: any = global.connect(class extends React.Component<IEditCheckListProps, IEditCheckListProps> {
        constructor(props: IEditCheckListProps) {
            super(props);
            this.agregartareaElemento = this.agregartareaElemento.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tareas = state.global["catalogo$" + SECCION_TAREAS_NO_ASIGNADAS];
            retValue.planAccion = state.global["catalogo$" + SECCION_PLAN_ACCION_ASIGNADO];
            return retValue;
        };

        agregartareaElemento(item: any, e: any): void {
            let newItem: any = getData(global.createSuccessfulStoreObject(item));
            let items: any[] = new Array();
            let receptor: any = Forms.getValue(SECCION_PLAN_ACCION_ASIGNADO, config.id); 

            let posicion: any;
            let totalElementos: any = getData(receptor).length;
            items = getData(receptor);
            for (var i = 0; i < totalElementos; i++) {
                if (items[i]._eliminado != true) {
                    if (items[i].Clave === newItem.Clave) {
                        posicion = i;
                        break;
                    }
                }
            }
            if (posicion >= 0 && posicion != undefined) {
                EK.Global.info("La tarea seleccionada ya se encuentra en el Plan de Acción");
                return
            } else {
                newItem._eliminado = false;
                newItem._nuevo = true;
                newItem.IdPlanAccion = newItem.ID; 
                newItem.Prioridad = { BGColor: null, Color: null, Clave: null, Nombre: null }; 
                newItem.PlanAccion = { ID: newItem.ID, Clave: newItem.Clave, Nombre: newItem.Nombre }; 
                newItem.ID = receptor.getNextLowerID(); 
                newItem.PlazoDias = 0; 
                receptor.data.push(newItem);
                receptor.timestamp = receptor.timestamp + 1;
                Forms.updateFormElement(config.id, SECCION_PLAN_ACCION_ASIGNADO, receptor)
            }
        }

        render(): JSX.Element {
            let $page: any = config.getML();
            let entidad: any = this.props.entidad;
            let model: any = global.getData(this.props.planAccion);


            const listHeaderInmueble: JSX.Element =
                <div key="listHeaderInmueble" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">Ubicación</Column>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">Garantía</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ marginTop: 20 }}>
                            <input.Clave size={[12, 12, 3, 3]} maxLength={50} />
                            <input.Nombre size={[12, 12, 7, 7]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                            <ddl.TiposCheckListsDDL  validations={[validations.required()]} size={[12, 12, 5, 5]} />
                            <ddl.CategoriasCheckListsDDL validations={[validations.required()]} size={[12, 12, 5, 5]} />
                            <checkBox.CheckBox id="Obligatorio" size={[12, 12, 2, 2]} />
                            <ddl.WorkflowsDDL id="FlujoAutorizacion" size={[12, 5, 5, 5]} claveTipo={"WF-CHECKLIST"} addNewItem={"SO"} label="Flujo de Autorización" />
                        </Row>
                    </page.OptionSection>
                </Column>
                <page.SectionList
                    id={SECCION_TAREAS_NO_ASIGNADAS}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                    size={[12, 12, 3, 3]}
                    level={1}
                    horizontalScrolling={true}
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderTareasNoAsignadas}
                    formatter={(index: number, item: any) => {
                        return <Row  style={{ padding: "0px 10px" }}>
                            <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                <i className="fas fa-plus-circle" title="Agregar" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.agregartareaElemento(item, e)}        ></i>
                            </Column>
                        </Row>;
                    }}>

                </page.SectionList>
                <page.SectionList
                    id={SECCION_PLAN_ACCION_ASIGNADO}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                    size={[12, 12, 9, 9]}
                    level={1}
                    horizontalScrolling={true}
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderPlanAccionAsignado}
                    mapFormToEntity={(form: EditForm, items?: any[]): any => {
                        let retValue: any = form
                            .addID()
                            .addObject("Prioridad")
                            .addString("Comentarios")
                            .addNumber("PlazoDias")
                            .addVersion()
                            .toObject();
                        return retValue;
                    }}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 12, 7, 7]}>
                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>
                                <span style={{ fontWeight: 300, fontSize: 10 }}>{item.Nombre ? item.Nombre.trim() : ""}</span>
                                <div style={{ fontWeight: 300, fontSize: 9, fontStyle: "italic" }}>{item.Comentarios ? item.Comentarios.trim() : ""}</div>
                            </Column>
                            <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5, background: item.Prioridad.BGColor }}>{item.Prioridad.Clave}</span>{item.Prioridad.Nombre}</Column>
                            <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">{item.PlazoDias}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                <buttons.PopOver idParent={config.id} idForm={SECCION_PLAN_ACCION_ASIGNADO} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                            </Column>
                           </Row>;
                    }}>
                    <Row>
                        <label.Entidad id="PlanAccion" idForm={SECCION_PLAN_ACCION_ASIGNADO} size={[12, 12, 12, 12]}  />
                        <input.Integer id={"PlazoDias"} idFormSection={SECCION_PLAN_ACCION_ASIGNADO}  size={[3, 3, 3, 3]} required={true} maxLength={8} validations={[validations.isNumber() ]} />
                        <ddl.PrioridadTarea id="Prioridad" idFormSection={SECCION_PLAN_ACCION_ASIGNADO} size={[12, 4, 4, 4]} />
                        <input.Text id="Comentarios" idFormSection={SECCION_PLAN_ACCION_ASIGNADO}  />
                    </Row>
                </page.SectionList>
            </page.Edit>;
        };
    });


    interface IViewCheckListProps extends page.IProps {
        tareas?: global.DataElement;

    };

    let View: any = global.connect(class extends React.Component<IViewCheckListProps, IViewCheckListProps> {
        constructor(props: IViewCheckListProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tareas = state.global["catalogo$" + SECCION_TAREAS_NO_ASIGNADAS];
            return retValue;
        };
  

        shouldComponentUpdate(nextProps: IViewCheckListProps, {}): boolean {
            return hasChanged(this.props.tareas, nextProps.tareas);
        };

        render(): JSX.Element {
            const listHeaderInmueble: JSX.Element =
                <div key="listHeaderInmueble" style={{ padding: "0px 10px" }}>
                    <Row>
                        <Column size={[6, 6, 6, 6]} className="list-default-header">Ubicación</Column>
                        <Column size={[5, 5, 5, 5]} className="list-default-header">Garantía</Column>
                        <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                    </Row>
                </div>;

            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ marginTop: 20 }}>
                            <label.Clave size={[12, 12, 3, 3]} />
                            <label.Nombre size={[12, 12, 7, 7]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <label.Entidad id="TipoCheckList" size={[12, 12, 5, 5]} />
                            <label.Entidad id="CategoriaCheckList" size={[12, 12, 5, 5]} />
                            <label.Boolean id="Obligatorio" size={[12, 12, 2, 2]} />
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <label.Entidad id="FlujoAutorizacion" size={[12, 5, 5, 5]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <page.SectionList
                    id={SECCION_TAREAS_NO_ASIGNADAS}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                    size={[12, 12, 3, 3]}
                    level={1}
                    horizontalScrolling={true}
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderTareasNoAsignadas}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                        </Row>;
                    }}>
                </page.SectionList>
                <page.SectionList
                    id={SECCION_PLAN_ACCION_ASIGNADO}
                    parent={config.id}
                    subTitle={(data: any): any => { return <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>; }} icon={"fa fa-cog"}
                    size={[12, 12, 9, 9]}
                    level={1}
                    horizontalScrolling={true}
                    height={"450px"}
                    drawOddLine={true}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={listHeaderPlanAccionAsignado}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 12, 7, 7]}>
                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>
                                <span style={{ fontWeight: 300, fontSize: 10 }}>{item.Nombre ? item.Nombre.trim() : ""}</span>
                                <div style={{ fontWeight: 300, fontSize: 9, fontStyle: "italic" }}>{item.Comentarios ? item.Comentarios.trim() : ""}</div>
                            </Column>
                            <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5, background: item.Prioridad.BGColor }}>{item.Prioridad.Clave}</span>{item.Prioridad.Nombre}</Column>
                            <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">{item.PlazoDias}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </page.View>;
        };
    });

};


