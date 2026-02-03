namespace EK.Modules.SCV.Pages.PrototiposUbicacionesFallas {
    "use strict";
    let PAGE_ID = "prototipos";
    const SECCION_UBICACIONES_FALLAS_ASIGNADAS: any = PAGE_ID + "$UbicacionesFallasAsignadas";
    const SECCION_UBICACIONES_FALLAS_TODAS: any = PAGE_ID + "$UbicacionesFallasTodas";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [SECCION_UBICACIONES_FALLAS_ASIGNADAS, SECCION_UBICACIONES_FALLAS_TODAS]);

    const listHeaderUbicacionesFallasAsignadas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 7, 7]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    const listHeaderUbicacionesFallasTodas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[10, 10, 10, 10]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
            </Row>
        </Column>;

    export class Edicion extends page.Base {

        saveForm(props: page.IProps, item: EditForm): any {

            var ubicacionesFallasPrototipos = [];

            
            let model: any = item
                .addID()
                /*.addClave()
                .addNombre()
                .addObject("TipoCheckList")
                .addObject("CategoriaCheckList")
                .addBoolean("Obligatorio")*/
                .addObject('UbicacionesFallasPrototipo', SECCION_UBICACIONES_FALLAS_ASIGNADAS)
                /*.addEstatus()
                .addVersion()*/
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let datos: any = getData(props.entidad);
            let idPrototipo: any = getData(props.entidad).ID

            //Obtener las Ubicaciones Falla relacionada al prototipo
            if (idPrototipo < 0) {

            }
            else {
                let p: any = global.assign({
                    activos: 1,
                    idPrototipo: idPrototipo
                });
                dispatchAsyncPost("global-page-data", "base/kontrol/UbicacionesFallaPrototipos/GetBP/GetAll/", { parametros: p }, SECCION_UBICACIONES_FALLAS_ASIGNADAS);


            };

            //Obtener todas las ubicaciones falla
            let url: string = global.encodeAllURL("kontrol", "UbicacionesFalla", { activos: 1 });
            dispatchAsync("global-page-data", url, SECCION_UBICACIONES_FALLAS_TODAS);
        };

        onWillEntityLoad(id: any, props: page.IProps): void { };

        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                onSave={this.saveForm}
                onEntityLoaded={this.onEntityLoaded}
                allowDelete={false}
                allowEdit={true}
                allowNew={false}>
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
            this.agregarUbicacionFalla = this.agregarUbicacionFalla.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.tareas = state.global["catalogo$" + SECCION_UBICACIONES_FALLAS_TODAS];
            retValue.planAccion = state.global["catalogo$" + SECCION_UBICACIONES_FALLAS_ASIGNADAS];
            return retValue;
        };

        agregarUbicacionFalla(item: any, e: any): void {
            let newItem: any = getData(global.createSuccessfulStoreObject({}));
            let items: any[] = new Array();
            let receptor: any = Forms.getValue(SECCION_UBICACIONES_FALLAS_ASIGNADAS, config.id);
            
            let totalElementos: any = getData(receptor).length;
            items = getData(receptor);
            

            let yaEstaSeleccionada: any;
            items.forEach(function (val) {
                if (val._eliminado != true && val.UbicacionFalla.Clave === item.Clave) {
                    yaEstaSeleccionada = true;
                }
            });

            if (yaEstaSeleccionada === true) {
                EK.Global.info("La ubicación incidencia seleccionada ya se encuentra asignada");
                return
            } else {
                let prototipoForm: any = Forms.getForm();

                newItem._eliminado = false;
                newItem._nuevo = true;
                //newItem.IdPrototipo = EK.Store.getState().global.currentEntity.data.ID; //Pendiente
                newItem.IdPrototipo = prototipoForm.ID;
                newItem.IdUbicacionFalla = item.ID;
                newItem.ID = receptor.getNextLowerID();
                newItem.UbicacionFalla = { Clave: item.Clave, Nombre: item.Nombre };

                receptor.data.push(newItem);
                receptor.timestamp = receptor.timestamp + 1;
                Forms.updateFormElement(config.id, SECCION_UBICACIONES_FALLAS_ASIGNADAS, receptor)
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
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row style={{ marginTop: 20 }}>
                            <label.Clave size={[12, 12, 3, 3]} />
                            <label.Nombre size={[12, 12, 7, 7]} />
                        </Row>
                    </page.OptionSection>
                </Column>
                <page.SectionList
                    id={SECCION_UBICACIONES_FALLAS_TODAS}
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
                    listHeader={listHeaderUbicacionesFallasTodas}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                <i className="fas fa-plus-circle" title="Agregar" style={{ color: "blue", cursor: "pointer" }} onClick={(e) => this.agregarUbicacionFalla(item, e)}        ></i>
                            </Column>
                        </Row>;
                    }}>

                </page.SectionList>
                <page.SectionList
                    id={SECCION_UBICACIONES_FALLAS_ASIGNADAS}
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
                    listHeader={listHeaderUbicacionesFallasAsignadas}
                    
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 12, 7, 7]}>
                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.Clave}</span>
                                <span style={{ fontWeight: 300, fontSize: 10 }}>{item.UbicacionFalla.Nombre ? item.UbicacionFalla.Nombre.trim() : ""}</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                <buttons.PopOver idParent={config.id} idForm={SECCION_UBICACIONES_FALLAS_ASIGNADAS} info={item} extraData={[buttons.PopOver.remove]} />
                            </Column>
                        </Row>;
                    }}>
                    {/*<Row>
                        <label.Entidad id="PlanAccion" idForm={SECCION_UBICACIONES_FALLAS_ASIGNADAS} size={[12, 12, 12, 12]} />
                        <input.Integer id={"PlazoDias"} idFormSection={SECCION_UBICACIONES_FALLAS_ASIGNADAS} size={[3, 3, 3, 3]} required={true} maxLength={8} validations={[validations.isNumber()]} />
                        <ddl.PrioridadTarea id="Prioridad" idFormSection={SECCION_UBICACIONES_FALLAS_ASIGNADAS} size={[12, 4, 4, 4]} />
                        <input.Text id="Comentarios" idFormSection={SECCION_UBICACIONES_FALLAS_ASIGNADAS} />
                    </Row>*/}
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
            retValue.tareas = state.global["catalogo$" + SECCION_UBICACIONES_FALLAS_TODAS];
            return retValue;
        };


        shouldComponentUpdate(nextProps: IViewCheckListProps, { }): boolean {
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
                        </Row>
                    </page.OptionSection>
                </Column>
                <page.SectionList
                    id={SECCION_UBICACIONES_FALLAS_TODAS}
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
                    listHeader={listHeaderUbicacionesFallasTodas}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[10, 10, 10, 10]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                        </Row>;
                    }}>
                </page.SectionList>
                <page.SectionList
                    id={SECCION_UBICACIONES_FALLAS_ASIGNADAS}
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
                    listHeader={listHeaderUbicacionesFallasAsignadas}
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 12, 7, 7]}>
                                <span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.Clave}</span>
                                <span style={{ fontWeight: 300, fontSize: 10 }}>{item.UbicacionFalla.Nombre ? item.UbicacionFalla.Nombre.trim() : ""}</span>
                            </Column>
                            <Column size={[1, 1, 1, 1]} className="listItem-center-header"></Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </page.View>;
        };
    });

};


