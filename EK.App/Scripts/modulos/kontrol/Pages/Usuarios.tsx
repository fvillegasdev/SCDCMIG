namespace EK.Modules.Kontrol.Pages.Usuarios {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("usuarios", "kontrol");
    const w: any = window;
    export class EstatusUsuario {
        static iconos: any = {
            'A': "glyphicon glyphicon-play",   //ACTIVO
            'W': "fas fa-exclamation-triangle",              //POR VENCER
            'V': "fa fa-times-circle",         //VENCIDO
            'S': "glyphicon glyphicon-pause",  //SUSPENDIDO
            'SINMARCA': ""                     //SIN MARCA
        };
        static iconosColor: any = {
            'A': "#8bc780",                   //ACTIVO
            'W': "#ff8f00",                   //POR VENCER
            'V': "#df0707",                   //VENCIDO
            'S': "",                          //SUSPENDIDO
            'SINMARCA': ""                    //REQUISITO VENCIDO
        };
    }
    const listHeaderUsuarios: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Email"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Posicion"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Area"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Estatus"}</Column>
            </Row>
        </Column>
    interface IFiltroUsuario extends page.IProps {
        EstadoEntidad: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IFiltroUsuario, IFiltroUsuario> {

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            if (f != null) {
                props.config.dispatchCatalogoBasePost("base/kontrol/usuarios/GetBP/GetUsuario", { parametros: f });
            }

        };

        componentDidMount(): void {
            let currentCatalogoArray = EK.Store.getState().global.currentCatalogo.data
            if (currentCatalogoArray === undefined) {
                this.props.config.dispatchCatalogoBasePost("base/kontrol/usuarios/GetBP/GetUsuario", { parametros: { IdGrupo: -2 } })
            }
        }
        render(): JSX.Element {
            let ml: any = config.getML();
            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return row.Nombre + " " + row.Apellidos;
            };
            let retValue: any;
            let Valor: any;

            let EstatusUsuario: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let bloqueado: any = row.Bloqueado ? <span className="badge badge-danger pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Bloqueado</span> : null;
                if (row.Estatus && row.Estatus.Clave) {
                    if (row.Estatus.Clave === 'A') {
                        retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                    else if (row.Estatus.Clave === 'B') {
                        retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                }
                Valor = <div> retValue + bloqueado </div>
                return w.ReactDOMServer.renderToStaticMarkup(
                    <div style={{ width: "100%", fontSize: "11px", lineHeight: "1.42857", textAlign: "center" }}>
                        <div style={{ float: "left", width: "50%", texAlign: "center", border: "0px ", borderRight: "none" }}>{(retValue)}</div>

                        <div style={{ float: "left", width: "50%", textAlign: "center", border: "0px ", borderRight: "none" }}>{(bloqueado)}
                        </div>
                    </div>
                );
            };

            let estatusUsuario: (data: any, row: any) => any = (data: any, row: any): any => {
                let bloqueado: any = row.Bloqueado
                    ? <span className="badge badge-danger pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Bloqueado</span>
                    : null;
                //
                if (row.Estatus && row.Estatus.Clave) {
                    if (row.Estatus.Clave === 'A') {
                        retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                    else if (row.Estatus.Clave === 'B') {
                        retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                }
                return <div key={"estatus_" + row.ID}>
                    <div style={{ float: "left" }}>{(retValue)}</div>
                    <div style={{ float: "right" }}>{(bloqueado)}</div>
                </div>;
            };
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                //.addSelect()
                .addClave({ width: "200px", fixed: true })
                .add({ data: "Nombre", width: "400px", render: formatNombre })
                .add({ data: "Email", width: "300px" })
                .add({ data: "Posicion.Nombre", width: "300px" })
                .add({ data: "AreaOrganizacion.Nombre", width: "200px" })
                .add({ data: "Estatus", width: "96px", format: estatusUsuario })
                .toArray();
           /* dtConfig.groups
                .add({ data: "AreaOrganizacion.Nombre" })
                .toArray();*/
            return <page.Main {...config} pageMode={PageMode.Principal} allowNew="false"
                onFilter={this.onFilter}>
                <page.Filters>

                    <GruposDDL size={[6, 6, 2, 2]} addNewItem={"SO"} />
                    <DatePicker size={[6, 6, 3, 3]} id={"VigenciaInicio"} />
                    <DatePicker size={[6, 6, 3, 3]} id={"VigenciaFin"} />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} id={"Agente"} />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} label="Bloqueado" id={"Bloqueado"} />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} id={"Comisionable"} />
                    <ddl.EstatusDDL size={[2, 2, 2, 2]} id={"activos"} addNewItem={"VT"} />

                </page.Filters>

                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
        };
    });

    let GruposDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.GRUPOSUSUARIO,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            loadData: (): void => {
                let url: any = global.encodeAllURL("kontrol", "GruposUsuario", { activos: 1 });
                dispatchAsync("load::GRUPOSUSUARIO", url);
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "Grupo",
            items: createDefaultStoreObject([]),
            label: "Seleccione el grupo",
            helpLabel: "Seleccione un grupo",
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
            Forms.updateFormElement(config.id, "Grupo", { ID: -1, Clave: 'Seleccione una opción' });
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.loadData();
            }
        }
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -2;
                nuevoItem['Nombre'] = 'Ver Todos';
                nuevoItem['Clave'] = 'VT';
                if (itemsModificados.data.length > 0) {
                    let existe = false;
                    let elementos: any = itemsModificados.data;
                    elementos.forEach((Value: any, index: number) => {
                        if (Value.Clave === "VT")
                            existe = true;
                    });
                    if (existe == false) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            //return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

};
