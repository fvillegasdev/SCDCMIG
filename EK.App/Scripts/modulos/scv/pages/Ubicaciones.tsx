//// A '.tsx' file enables JSX support in the TypeScript compiler, 
//// for more information see the following page on the TypeScript wiki:
//// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Ubicaciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("ubicaciones", "scv");
    interface IUbicaciones extends page.IProps {
        prototipo?: any;
        desarrollo?: any;
        formatoClave?: any;
    };
    interface IUbicacionesProps extends IDropDrownListProps {
        Desarrollo?: any;
        cargaDatos?: (idDesarrollo?: any) => void;
    }
    export let Vista: any = global.connect(class extends React.Component<IUbicaciones, IUbicaciones> {
        constructor(props: IUbicaciones) {
            super(props);
        }
        static props: any = (state: any) => ({
            prototipo: Forms.getValue("Prototipo", config.id + "$filters", state),
            desarrollo: Forms.getValue("Desarrollo", config.id + "$filters", state),
            formatoClave: state.global.FormatoClave
        });
        onFilter(props: any, filters: any, type?: string): any {
            let IdDesarrolloPrototipo: any  = global.getCurrentContext().location.query.IdPD;
            let f: any = global.getFilters(filters);

            if (IdDesarrolloPrototipo != undefined && (f.IdDesarrollo == 0 || f.IdDesarrollo == undefined)){
                var DesarrolloPrototipo = IdDesarrolloPrototipo.split('/');
                f = global.assign({ idPrototipo: DesarrolloPrototipo[0], idDesarrollo: DesarrolloPrototipo[1] });
                let encodedFilters: string = global.encodeObject(f);
                let url: string = ["base/scv/ubicaciones/all/", encodedFilters].join("");
                global.dispatchAsync("global-current-catalogo", url);
            }
            else if (f.IdDesarrollo > 0) {
                //let encodedFilters: string = global.encodeObject(filters);
                //let url: string = ["base/scv/ubicaciones/all/", encodedFilters].join("");

                let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
                if (f != null) {
                    props.config.dispatchCatalogoBasePost( "base/scv/ubicaciones/GetBP/GetUbicacion", { parametros: f });
                }
                //global.dispatchAsync("global-current-catalogo", url);
            }
            else {
                global.dispatchSuccessful("global-current-catalogo", []);
                Forms.updateFormElement(config.id, "ubicaciones", null);
            }
        };
        onNew(): void {
            let ml: any = $ml[config.id];
            let desarrollo: any = Forms.getValue("Desarrollo", config.id + "$filters");
            if (desarrollo && desarrollo.ID && desarrollo.ID>0) {
                let url: string = ["id?nuevo&", global.encodeParameters({ ID: -1, IdDesarrollo: desarrollo.ID})].join("");
                go(url, true);
            }
            else {
                warning(ml.validaciones.desarrollo);
            }
        }
        componentWillReceiveProps(nextProps: IUbicaciones, nextState: IUbicaciones): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {
                Forms.updateFormElement(config.id + "$filters", "Prototipo", { ID: -1, Nombre: "Ver Todos" })
                if (nextProps.desarrollo && nextProps.desarrollo.ID && nextProps.desarrollo.ID > 0) {
                    //Actualizar Prototipos
                    let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: nextProps.desarrollo.ID  });
                    dispatchAsync("load::PROTOTIPOS", url);

                    url = global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: nextProps.desarrollo.ID, ClaveTipoCentrosCosto: 'CCCONSTRUCCION' });
                    dispatchAsync("load::CCCONSTRUCCION", url);

                    url = global.encodeAllURL("scv", "CENTROCOSTO", { idDesarrollo: nextProps.desarrollo.ID, ClaveTipoCentrosCosto: 'CCINGRESO' });
                    dispatchAsync("load::CCINGRESO", url);

                    let parametros: any = global.encodeParameters({ id: nextProps.desarrollo.ID });
                    global.dispatchAsync("load::FormatoClave", "base/kontrol/Desarrollos/Get/GetByIdDesarrolloFormatoClave/" + parametros, "FormatoClave");
                }
                else if (nextProps.desarrollo && nextProps.desarrollo.ID == -1) {
                    global.dispatchSuccessful("load::PROTOTIPOS", []);

                    global.dispatchSuccessful("load::FormatoClave", []);
                }
            };
        };
        render(): JSX.Element {
           
            let formatClaveUbicacion: (data: any, type: any, row: any) => any = (data: any, type: any, row: any) => {
                let mascaraClave: string = "";
                let desarrollo: any = getData(this.props.formatoClave);
                if (desarrollo && desarrollo.FormatoClave) {
                    let formato: any[] = desarrollo.FormatoClave;
                    if (formato && formato.length > 0) {
                        formato.forEach((value: any, index: number) => {
                            if (mascaraClave.length > 0) {
                                mascaraClave += "-";
                            }
                            mascaraClave += "[A|9]{" + value.Longitud + "}";
                        });
                    };
                };
                let clave = global.formatMask(row.Clave, mascaraClave);
                return "<span>" + clave + "</span>";
            };

            let ml: any = config.getML();

            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "ClaveFormato", width: 10 })
                .addNombre({ width: 13 })
                .add({ data: "Desarrollo.Descripcion", width: 12 })
                .add({ data: "Prototipo.Nombre", width: 10 })
                .add({ width: 10, title: "Estatus de Ubicación", data: "EstatusDeUbicacion", render: label.formatBadgeEstatusUbicaciones })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onNew={this.onNew}>
                <page.Filters>
                    <ddl.DesarrollosDDL size={[6, 6, 4, 4]} id={"Desarrollo"} addNewItem={"SO"}  />
                    <ddl.PrototiposDDl id={"Prototipo"} size={[6, 6, 3, 3]} cargarDatos={false} addNewItem={"VT"} />
                    <ddl.TipoUbicacionDDL id={"TipoUbicacion"} size={[6, 6, 3, 3]}  addNewItem={"VT"} />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} label="Activos" id={"activos"} />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} label="Disponible" id={"idEstatusUbicacion"} />
                    <CCCONSTRUCCIONDDL id={"CentroCostoConstruccion"} size={[12, 6, 4, 4]}   addNewItem={"VT"}   />
                    <CCINGRESODDL id={"CentroCosto"} size={[12, 6, 3, 3]} addNewItem={"VT"}  />
                    <ddl.SegmentosDDL id={"Segmentos"} size={[12, 6, 3, 3]}  addNewItem={"VT"}  />
                    <checkBox.CheckBox size={[2, 2, 1, 1]} id={"IdDtu"}/>
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
    let CCINGRESODDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CCINGRESO,
            Desarrollo: state.desarrollos.catalogo,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idDesarrollo?: any): void => {
                global.dispatchSuccessful("load::CCINGRESO", []);
            }
        });
        static defaultProps: IUbicacionesProps = {
            id: "CCINGRESO",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo de Ingresos",
            helpLabel: "Seleccione el Centro de Costo de Ingresos",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 4, 4, 4]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.cargaDatos();
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Nombre'] = 'Seleccione un Centro de Costo';
                nuevoItem['Clave'] = '';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].ID != -1) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

    let CCCONSTRUCCIONDDL: any = global.connect(class extends React.Component<IUbicacionesProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.CCCONSTRUCCION,
            Desarrollo: state.desarrollos.catalogo,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idDesarrollo?: any): void => {
                global.dispatchSuccessful("load::CCCONSTRUCCION", []);
            }
        });
        static defaultProps: IUbicacionesProps = {
            id: "CCCONSTRUCCION",
            items: createDefaultStoreObject([]),
            label: "Centro de Costo de Construcción",
            helpLabel: "Seleccione el Centro de Costo de Construcción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 4, 4, 4]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.cargaDatos();
            }
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -1;
                nuevoItem['Nombre'] = 'Seleccione un Centro de Costo';
                nuevoItem['Clave'] = '';
                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].ID != -1) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }

    });

}
