// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.Kontrol {
    "use strict";

    const BITACORASECTION: string = "Bitacora$Global";
    

    interface IListaBitacoraView extends page.IProps {
        item?: DataElement;
        config?: page.IPageConfig;

    };


    interface IKontrolLogBookManagerProps extends page.IProps {
        item?: DataElement;
        config?: page.IPageConfig;
        subTitle?: string;
        title?: string;
        icon?: string;
        currentEntity?: global.DataElement;
        currentEntityType?: global.DataElement;
        permiso?: number;
        viewMode?: boolean;
        readOnly?: boolean;
        idEntidadPadre?: number;
        claveEntidadPadre?: string;
        collapsed?: boolean;
        saveViewMode?: boolean;
    };

    class KontrolLogBookManager extends React.Component<IKontrolLogBookManagerProps, IKontrolLogBookManagerProps> {
        constructor(props: IKontrolLogBookManagerProps) {
            super(props);
            this.onSave = this.onSave.bind(this);
            this.onFilter = this.onFilter.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IKontrolLogBookManagerProps = {
            subTitle: "Bitácora",
            title: "Bitácora",
            icon: "fa fa-sticky-note",
            permiso: 0,
            idEntidadPadre: 0,
            claveEntidadPadre: null,
            collapsed: true,
            saveViewMode: true,
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        onSave(): void {
            let item: EditForm = Forms.getForm(BITACORASECTION);
            let entidades: DataElement = this.props.config.getCatalogo(BITACORASECTION);

            let idRegistro: any = getDataID(this.props.item);

            let model: any = item
                .addID()
                .addObject("Comentarios")
                .addObject("Evento")
                .addVersion()
                .toObject();


            if (idRegistro < 0 || idRegistro == undefined) {
                warning("no hay un Registro asociado");
                return;
            }
            if (item["Evento"].ID < 0 || item["Evento"].ID == undefined) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            }

            if (item["ID"] < 0 || item["ID"] == undefined) {
                if (!(item["ID"])) {
                    model["ID"] = entidades.getNextLowerID();
                }
            }
            else {
                model._modificado = true;
                model["ID"] = item["ID"];
            }


            model["IdEntidad"] = idRegistro;
            model["Modulo"] = this.props.modulo;
            model["IdEntidadPadre"] = this.props.idEntidadPadre;

            dispatchAsyncPut("global-page-data", "base/kontrol/bitacora/Get/GuardarBitacora", model, BITACORASECTION);
            this.props.config.setState({ viewMode: true }, BITACORASECTION);

            Forms.updateFormElement(BITACORASECTION, "Evento", { ID: -1, Clave: 'Seleccione una opción' });
            Forms.updateFormElement(BITACORASECTION, "Comentarios", null);

        }
        componentDidMount(): void {
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let slots: any[] = config.slots;
           
           
            let Modulo: string = this.props.modulo;
            //
            if (!config.hasSlot(BITACORASECTION)) {
                if (!slots) {
                    slots = [];
                };

                slots.push(BITACORASECTION);

                global.setPageConfig({
                    id: config.id,
                    modulo: Modulo,
                    slots, idML:
                    config.idML
                });
            };
           
        };
        onFilter(): void {
            let claveEntidadPadre: any = this.props.claveEntidadPadre;
            let idEntidadPadre: any = this.props.idEntidadPadre;
            let Evento: any = Forms.getValue("Evento", this.props.config.id);
            let Comentarios: any = Forms.getValue("comentarios", this.props.config.id);
            Evento.ID > 0 ? Evento.ID : Evento.ID = null;
            let parametros: any = global.assign({ claveEntidadPadre: claveEntidadPadre, idEntidadPadre: idEntidadPadre, IdEvento: Evento.ID, comentarios: Comentarios });
            this.props.config.dispatchCatalogoBase("base/kontrol/bitacora/Get/GetAll/", parametros, BITACORASECTION);
        }
        render(): JSX.Element {
            let config: page.IPageConfig = global.assign({}, this.props.config);
            let buttonActions: any[];

            let permiso: number = getOptionPermissionValue(this.props.modulo + "$" + BITACORASECTION);
           
            let readOnly: boolean = false;//lo usamos en local

            let faseCerrada: boolean = this.props.readOnly;

            let estadoEntidad: boolean = EK.Store.getState().global.currentEntityState.data.viewMode;
            let idRegistro: any = getDataID(this.props.item);
            if ((permiso === null || permiso === EK.UX.Auth.NONE_PERMISSION) ||
                (!config.hasSlot(BITACORASECTION)) ||
                (idRegistro <= 0 && this.props.idEntidadPadre <0)) {
                return null;
            };

            if (permiso === EK.UX.Auth.READ_PERMISSION || faseCerrada) { //Validar Permisos
                estadoEntidad = readOnly = true;
            }
            else {
            if (permiso >= EK.UX.Auth.WRITE_PERMISSION) {
                readOnly = false;
                buttonActions=[buttons.PopOver.edit];
            }
            if (permiso >= EK.UX.Auth.DELETE_PERMISSION) {
                buttonActions = [buttons.PopOver.edit, buttons.PopOver.remove];
            }
            }
            return <page.SectionList
                id={BITACORASECTION}
                    autonomo={true}
                    parent={this.props.config.id}
                    subTitle={this.props.subTitle}
                title={this.props.title}
                onSave={this.onSave}
                icon={this.props.icon}
                level={1}
                iconSave="fas fa-cloud-upload-alt"
                viewMode={estadoEntidad}
                //editButtons={
                //    (this.props.saveViewMode && permiso >= EK.UX.Auth.WRITE_PERMISSION) ?
                //        <buttons.Button
                //            icon="fas fa-cloud-upload-alt"
                //            color="white"
                //            iconOnly={true}
                //            className="btn-ico-ek"
                //            info={null} onClick={this.onSave} />
                //        :
                //        null
                //    }
                    viewButtons={
                        <buttons.Button
                            icon="fas fa-sync-alt"
                            color="white"
                            iconOnly={true}
                            className="btn-ico-ek"
                            info={null} onClick={this.onFilter} />
                    }
                    size={[12, 12, 12, 12]}
                    //dispatchFilter="base/kontrol/bitacora/Get/GetAll/"
                    dispatchFilter="base/kontrol/bitacora/GetBP/GetAll"
                    customFilters={() => {
                    return {
                            claveEntidadPadre: this.props.claveEntidadPadre,
                            idEntidadPadre: this.props.idEntidadPadre,
                        };
                    }}
                    listHeader={<div >
                        <Row>
                            <ddl.EventosBitacoraTodos id="Evento" size={[12, 4, 4, 4]} idFormSection={this.props.config.id} addNewItem={"SO"} />,
                            <input.Text id="comentarios" label="Comentarios" size={[12, 4, 4, 4]} idFormSection={this.props.config.id} />
                        </Row>
                        <Row className="list-fixed-header">
                            <Column size={[12, 4, 4, 4]} className="list-default-header">Evento</Column>
                            <Column size={[12, 4, 4, 4]} className="list-default-header">Comentarios</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">Fecha</Column>
                            <Column size={[12, 2, 2, 2]} className="list-default-header">Creado por</Column>
                        </Row>
                    </div>
                    }
                    readonly={true}
                    collapsed={this.props.collapsed}
                    hideCollapseButton={false}
                    mapFormToEntity={(form: EditForm): any => {
                        return form
                            .addID()
                            .addString("Comentarios")
                            .addObject("Evento")
                            .addVersion()
                            .addEstatus()
                            .toObject();
                    }}
                    formatter={(index: number, item: any) => {
                        let creadoPor: any = item.CreadoPor ? item.CreadoPor.Nombre + " " + item.CreadoPor.Apellidos : "";
                        let creado: any = item.Creado ? item.Creado : "";
                        let origen: any = item.Evento.Origen.Clave == "GS" ? "S" : "U";

                        return <Row>

                            <Column size={[12, 4, 4, 4]} className="listItem-default-item">
                                <span className={item.Evento.Icono} style={{ color: item.Evento.Color, fontSize: "10px", margin: "0px 5px" }} />
                                <span style={{ margin: "0px 5px" }} className="badge badge-primary">{origen}</span> 
                                <span>{item.Evento.Nombre}</span>
                            </Column>

                            <Column size={[12, 4, 4, 4]} className="listItem-default-item"><span>{item.Comentarios}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item"><span>{global.formatDateTime(creado)}</span></Column>
                            <Column size={[12, 2, 2, 2]} className="listItem-default-item">
                                {(permiso >= EK.UX.Auth.WRITE_PERMISSION && origen == "U") ?
                                 <div>
                                        <span>{creadoPor}</span>
                                        <div style={{ float:"right" }}>
                                            <buttons.PopOver idParent={this.props.config.id} idForm={BITACORASECTION} info={item}
                                                extraData={buttonActions} />
                                        </div>
                                       
                                 </div>
                                    :
                                    <span>{creadoPor}</span>
                                }
                            </Column>
                        </Row>;
                    }}>
                <Row>
                    <ddl.EventosBitacora size={[12, 4, 4, 4]} addNewItem={"SO"} idFormSection={BITACORASECTION} validations={[validations.required()]}/>
                    <input.Text validations={[validations.required()]}  id="Comentarios" label="Comentarios" idFormSection={BITACORASECTION} size={[12, 8, 8, 8]} />
                 </Row>
                </page.SectionList>            
              
        };

    }
    
    export let KontrolLogBook: any = ReactRedux.connect(KontrolLogBookManager.props, KontrolLogBookManager.dispatchs)(KontrolLogBookManager);
}


import KontrolLogBookManager = EK.UX.Kontrol.KontrolLogBook;