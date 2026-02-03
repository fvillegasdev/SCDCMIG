namespace EK.Modules.Kontrol.Pages.TiposFlujo {
    "use strict";
    const FLUJOTRABAJO: string = "flujoAutorizacion";
    let PAGE_ID = "Tipos de Autorización";

    const config: page.IPageConfig = global.createPageConfig("tipoFlujo", "kontrol", [FLUJOTRABAJO]);




    const Header_AuthFlow: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">Clave</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">Nombre</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>

            </Row>
        </div>;


    export class Edicion extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject(FLUJOTRABAJO)
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let parametros: any = global.assign({ idTipo: getDataID(props.entidad)});
            props.config.dispatchCatalogoBase("base/kontrol/flujoAutorizacion/Get/GetFlujoTrabajo/", parametros, FLUJOTRABAJO);
            global.dispatchSuccessful("global-page-data", [], "AutorizadoresTareas");
        };
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { idTipo: getDataID(props.entidad) });
            //config.dispatch(f, FLUJOTRABAJO);
            props.config.dispatchCatalogoBase("base/kontrol/flujoAutorizacion/Get/GetFlujoTrabajo/", f, FLUJOTRABAJO);
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}
                onFilter={this.onFilter}
                allowNew={false}
                onEntityLoaded={this.onEntityLoaded}
                onSave={this.saveForm}>
                <View />
                <Edit/>
            </page.Main>;
        };
    }; 

    interface ITipoFlujoProps extends page.IProps {
        autorizadores?: any;
    };

    export const View: any = global.connect(class extends React.Component<ITipoFlujoProps, ITipoFlujoProps> {
        static props: any = (state: any) => ({
            autorizadores: state.global.catalogo$AutorizadoresTareas, 
        });
        shouldComponentUpdate(nextProps: ITipoFlujoProps, nextState: ITipoFlujoProps): boolean {
            return hasChanged(this.props.autorizadores, nextProps.autorizadores);
        };
        componentWillReceiveProps(nextProps: ITipoFlujoProps, nextState: ITipoFlujoProps): any {
            if (global.hasChanged(this.props.autorizadores, nextProps.autorizadores)) {
                if (global.isSuccessful(nextProps.autorizadores)) {
                    Forms.updateFormElement(config.id, "flujoAutorizacion", global.getData(nextProps.autorizadores));
                };
            };
        };
        render(): JSX.Element {
            const formatLabel: (valor: string, titulo: string) => any = (valor: string, titulo: string): any => {
                var retValue: string = "<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'>" +
                    "<div class='form-group'><div id=" + titulo + " class='label-text' style='padding:5px; font-weight:bolder; font-size:11px; text-transform:uppercase; '>" + titulo + "</div>" +
                    "<div class=label-value' id=" + titulo +"_value"+ ">" + valor + "</div></div></div>";
                return retValue;
            };
          
            let detalleTarea: any = (elemento: any) => {
                //EK.Global.dispatchFullSuccessful("global-page-data", elemento.Autorizadores, "AutorizadoresTareas", 0, "");
                let ml: any = $ml[config.id];

                //Construir Cuerpo Modal
                let contenido: string = "<div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
                //contenido = contenido + formatLabel(elemento.Clave, "Clave") + "</br>";

                let autorizadores: string = contenido+"<h5><span class='fa fa-check-circle-o'></span> " + ml.sections.Autorizadores.title + "</h5>";
                autorizadores = autorizadores + "<div class='col-xs-12 col-sm-5 col-md-5 col-lg-5 list-default-header' style='font-size:12px'>Tipo</div>" +
                    "<div class=' col-xs-12 col-sm-7 col-md-7 col-lg-7 list-default-header' style='font-size:12px'>Autorizador</div>";
                if (elemento.Autorizadores != null) {
                    elemento.Autorizadores.forEach((value: any, index: number) => {

                        autorizadores = autorizadores + "<div style='padding-bottom:1%;' class='col-xs-12 col-sm-5 col-md-5 col-lg-5 listItem-default-item'><span>" + value.TipoNotificador.Nombre + "</span>";
                        if (value.TipoPuesto && value.TipoPuesto.Clave) {
                            autorizadores = autorizadores + " <span>" + value.TipoPuesto.Nombre + "</span>";
                        }
                        autorizadores = autorizadores + "</div>";
                        if (value.Registro) {
                            autorizadores = autorizadores + "<div style='padding-bottom:1%;' class='col-xs-12 col-sm-7 col-md-7 col-lg-7 listItem-default-item'> <span class='badge badge-info'>" + value.Registro.Nombre + "</div>";
                        }
                    });
                }
                autorizadores = autorizadores + "</div></div>";
                //Abrir Modal
                let titulo: string = ml.sections.detalleTareas ? ml.sections.detalleTareas.title : "Detalle Tarea";
                var bb: any = window["bootbox"];
                var dialog = bb.dialog({
                    title: "<span class='fa fa-tasks'> "+ titulo+" </span>",
                    message: autorizadores,
                    buttons: {
                        ok: {
                            label: "Aceptar",
                            className: 'btn-info',
                            callback: function () {
                                //Example.show('Custom OK clicked');
                            }
                        }
                    }
                });
                //Fin Modal

            };
            let autorizadores = getData(this.props.autorizadores);
            return <page.View>
                <Row>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                       id={PAGE_ID}
                        level={"main"}
                        subTitle={PAGE_ID}
                        icon="fas fa-random" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 10, 10]} />
                        </Row>
                        <page.SectionList
                            id={FLUJOTRABAJO}
                            parent={config.id}
                            level={1}
                            hideNewButton={true}
                            style={{ paddingTop: 20 }}
                            icon="fas fa-exchange-alt" 
                            size={[12, 12, 12, 12]}
                            listHeader={Header_AuthFlow}
                            items={createSuccessfulStoreObject([])}
                            readonly={false}
                            addRemoveButton={false}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addClave()
                                    .addNombre()
                                    .addVersion()
                                    .addObject("Tareas")
                                    .addObject("Notificadores")
                                    .addEstatus()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                    return <Row id={"row_ubicacion_" + item.ID} className="panel-collapsed" >
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton
                                                        idElement={"row_ubicacion_" + item.ID}
                                                        className="button-panel-plus"
                                                        collapsedClass="panel-collapsed"
                                                        inverse={true}
                                                        collapsedUpIcon="fas fa-caret-up"
                                                        collapsedDownIcon="fas fa-caret-down" style={{}} collapsed={true} iconOnly={true} />
                                            </Column>
                                            <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                <span>{item.Clave}</span>
                                            </Column>
                                            <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                               <span>{item.Nombre}</span>
                                            </Column>
                                        </Row>
                                    </Column>
                                    <Row>
                                        <Column
                                            xs={{ size: 10 }}
                                            sm={{ size: 10, offset: 1 }}
                                            md={{ size: 10, offset: 1 }}
                                            lg={{ size: 10, offset: 1 }}
                                            className="panel-detail well well-sm">
                                                <Column size={[12, 12, 6, 6]}>
                                                    <List
                                                        id={this.props.id + "_list"}
                                                        items={global.createSuccessfulStoreObject(item.Tareas)}
                                                        readonly={true}
                                                        listHeader={
                                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                                <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Tareas"}</Column>
                                                                </Row>
                                                            </div>}
                                                        addRemoveButton={false}
                                                        formatter={(index_c: number, item_c: any): any => {
                                                            let estatus: boolean = item_c.Estatus.Clave === "B" ? true : false;
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <div className="dd3-content" style={{ padding: 5, height: "auto", border: "none", backgroundColor: "#EEEEEE" }}>
                                                                    <Row style={{ padding: 0, margin: 0 }} >
                                                                        <Column size={[12, 12, 12, 12]} style={{ fontWeight: 400 }}>
                                                                            <Column size={[2, 2, 2, 2]}>
                                                                                <div style={{ paddingBottom: 2 }} className={"tarea-list"}>{item_c.Orden}</div>
                                                                            </Column>
                                                                            <Column size={[8, 8, 8, 8]} >
                                                                                <h6 className="uppercase" style={{ fontWeight: 600 }}>
                                                                                    <Link info={item_c} onClick={detalleTarea} text={item_c.Nombre} />
                                                                                    {(estatus) ?
                                                                                        <span className="badge badge-danger ek-sombra" style={{ float: "right" }}>INACTIVA</span>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </h6>
                                                                            </Column>
                                                                        </Column>

                                                                    </Row>
                                                                </div>
                                                            </Row>
                                                        }} />
                                                </Column>
                                                <Column size={[12, 12, 6, 6]}>
                                                    <List
                                                        id={this.props.id + "_list"}
                                                        items={global.createSuccessfulStoreObject(item.Notificadores)}
                                                        readonly={true}
                                                        listHeader={
                                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                                <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Notificadores"}</Column>
                                                                </Row>
                                                            </div>}
                                                        addRemoveButton={false}
                                                        formatter={(index_c: number, item_c: any): any => {
                                                            return <Row>
                                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                                    <span>{item_c.TipoNotificador.Nombre}</span>
                                                                    {(item_c.TipoPuesto && item_c.TipoPuesto.Clave) ?
                                                                        <span className='badge badge-info'>{item_c.TipoPuesto.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                                    {(item_c.Registro) ?
                                                                        <span>{item_c.Registro.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                            </Row>;
                                                        }} />
                                                </Column>
                                        </Column>
                                    </Row>
                                </Row>
                            }}>
                        </page.SectionList>
                    </page.OptionSection>
                </Column>
                </Row>
            </page.View>;
        };
    });

    class Edit extends page.Base {
        render(): JSX.Element {

          let editElement: any = {
              icon: "icon-pencil",
              action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                dispatchSuccessful("load::FlujoTrabajo_Tarea", { item });
                Forms.remove(id);
                Forms.updateFormElements(id, item);
                config.setState({ viewMode: false }, id);
            }
        };

            return <page.Edit>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            level="main"
                            subTitle={PAGE_ID}
                            icon="fas fa-random" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <label.Clave size={[12, 12, 2, 2]} />
                                <input.Nombre size={[12, 12, 10, 10]} maxLength={150}/>
                            </Row>

                            <page.SectionList
                                id={FLUJOTRABAJO}
                                parent={config.id}
                                level={1}
                                hideNewButton={true}
                                style={{ paddingTop: 20 }}
                                icon="fas fa-exchange-alt" 
                                size={[12, 12, 12, 12]}
                                listHeader={Header_AuthFlow} readonly={false}
                                items={createSuccessfulStoreObject([])}
                                addRemoveButton={true}
                                mapFormToEntity={(form: EditForm): any => {
                                    return form
                                        .addID()
                                        .addClave()
                                        .addNombre()
                                        .addObject("Tareas")
                                        .addObject("Notificadores")
                                        .addVersion()
                                        .addEstatus()
                                        .toObject();
                                }}
                                formatter={(index: number, item: any) => {
                                    return <Row id={"row_ubicacion_" + item.ID} className="panel-collapsed" >
                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                            <Row>
                                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                    <CollapseButton idElement={"row_ubicacion_" + item.ID}
                                                        className="button-panel-plus"
                                                        collapsedClass="panel-collapsed"
                                                        collapsedUpIcon="fas fa-caret-up"
                                                        inverse={true}
                                                        collapsedDownIcon="fas fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                </Column>
                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                    <span>{item.Clave}</span>
                                                </Column>
                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                    <span>{item.Nombre}</span>
                                                </Column>
                                                <buttons.PopOver idParent={config.id} idForm={FLUJOTRABAJO} info={item}
                                                    extraData={[editElement]} />
                                            </Row>
                                        </Column>
                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm">
                                                <Column size={[6, 6, 6, 6]}>
                                                    <List
                                                        id={this.props.id + "_list"}
                                                        items={global.createSuccessfulStoreObject(item.Tareas)}
                                                        readonly={true}
                                                        listHeader={
                                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                                <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Tareas"}</Column>
                                                                </Row>
                                                            </div>}
                                                        addRemoveButton={false}
                                                        formatter={(index_c: number, item_c: any): any => {
                                                            let estatus: boolean = item_c.Estatus.Clave === "B" ? true : false;
                                                            return <Row id={"row_ubicacion" + index_c}>
                                                                <div className="dd3-content" style={{ padding: 5, height: "auto", border: "none", backgroundColor: "#EEEEEE" }}>
                                                                    <Row style={{ padding: 0, margin: 0 }} >
                                                                        <Column size={[12, 12, 12, 12]} style={{ fontWeight: 400 }}>
                                                                            <Column size={[2, 2, 2, 2]}>
                                                                                <div style={{ paddingBottom: 2 }} className={"tarea-list"}>{item_c.Orden}</div>
                                                                            </Column>
                                                                            <Column size={[8, 8, 8, 8]}>
                                                                                <h6 className="uppercase" style={{ fontWeight: 600 }}>
                                                                                    <Link info={item_c} text={item_c.Nombre} />
                                                                                    {(estatus) ?
                                                                                        <span className="badge badge-danger ek-sombra" style={{ float: "right" }}>INACTIVA</span>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </h6>
                                                                            </Column>
                                                                        </Column>
                                                                    </Row>
                                                                </div>
                                                            </Row>
                                                        }} />
                                                </Column>
                                                <Column size={[6, 6, 6, 6]}>
                                                    <List
                                                        id={this.props.id + "_list"}
                                                        items={global.createSuccessfulStoreObject(item.Notificadores)}
                                                        readonly={true}
                                                        listHeader={
                                                            <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                                                <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="list-default-header">{"Notificadores"}</Column>
                                                                </Row>
                                                            </div>}
                                                        addRemoveButton={false}
                                                        formatter={(index_c: number, item_c: any): any => {
                                                            return <Row>
                                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                                    <span>{item_c.TipoNotificador.Nombre}</span>
                                                                    {(item_c.TipoPuesto && item_c.TipoPuesto.Clave) ?
                                                                        <span className='badge badge-info'>{item_c.TipoPuesto.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                                <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                                                                    {(item_c.Registro) ?
                                                                        <span>{item_c.Registro.Nombre}</span>
                                                                        :
                                                                        null
                                                                    }
                                                                </Column>
                                                                
                                                            </Row>;
                                                        }}
                                                    />
                                                </Column>
                                            </Column>
                                        </Row>
                                    </Row>
                                }}>
                                <Row>
                                    <EK.Modules.Kontrol.Pages.TiposFlujo.FlujoTrabajoEditar idFormSection={FLUJOTRABAJO} />
                                </Row>
                            </page.SectionList>
                        </page.OptionSection>
                    </Column>

                </Row>
            </page.Edit>;
        };
    };
};

