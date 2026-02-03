namespace EK.Modules.SDC.Pages.Dasboard {
    "use strict";
    const ESTADO_CUENTA: string = "EstadoCuenta";
    const BLOG_POST: string = "blogPost";
    const TICKETS: string = "TicketsClientes";

    const config: page.IPageConfig = global.createPageConfig("dashboardDesarrolloComunitario", "sdc", [ESTADO_CUENTA, TICKETS, BLOG_POST ]);

    interface IDasboardDesarrolloComunitario extends page.Base  {
        ubicacion: any;
        anio: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IDasboardDesarrolloComunitario, IDasboardDesarrolloComunitario> {
        constructor(props: IDasboardDesarrolloComunitario) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicacion = Forms.getValue("Ubicacion", config.id, state);
            retValue.anio = Forms.getValue("Anios", ESTADO_CUENTA, state);
            return retValue;
        };
        onFilter(): any {
        };
        obtenerEstadoDeCuenta(idUbicacion: number, idAnio: number) {
            if (idUbicacion > 0) {
                dispatchAsync("global-page-data", "base/sdc/estadoCuenta/Get/GetAll/" + global.encodeParameters({idUbicacion, idAnio }), ESTADO_CUENTA);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], ESTADO_CUENTA);
            }
        }
        obtenerBlog(idDesarrollo: number) {
            if (idDesarrollo > 0) {
                dispatchAsync("global-page-data", "base/kontrol/blogPost/Get/GetAll/" + global.encodeParameters({ idEntidad: idDesarrollo, claveTipoEntidad:"desarrollos"}), BLOG_POST);
            }
            else {
                global.dispatchSuccessful("global-page-data", [], BLOG_POST);
            }
        }
        componentDidMount() {

            dispatchSuccessful("load::currentEntityState", { viewMode: false })

            let idUbicacion: any = this.props.ubicacion && this.props.ubicacion.ID ? this.props.ubicacion.ID : 0;
            let idAnio: any = this.props.anio && this.props.anio.ID ? this.props.anio.ID : 0;
            this.obtenerEstadoDeCuenta(idUbicacion, idAnio);
            this.obtenerBlog(this.props.ubicacion && this.props.ubicacion.ID > 0 ? this.props.ubicacion.Desarrollo.ID : 0);
        }
        componentWillReceiveProps(nextProps: IDasboardDesarrolloComunitario, nextState: IDasboardDesarrolloComunitario): any {

            if (global.hasChanged(this.props.ubicacion, nextProps.ubicacion)) {
                let ubicacion: any = nextProps.ubicacion;
                let anio: any = this.props.anio;
                this.obtenerEstadoDeCuenta(ubicacion.ID, anio && anio.ID ? anio.ID : 0);
                this.obtenerBlog(ubicacion && ubicacion.ID>0 ? ubicacion.Desarrollo.ID:0);

            };

            if (global.hasChanged(this.props.anio, nextProps.anio)) {
                let anio: any = nextProps.anio;
                let ubicacion: any = this.props.ubicacion;
                this.obtenerEstadoDeCuenta(ubicacion.ID, anio.ID);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowNew={false}>

                <Column size={[12, 12, 12, 12]}>
                    <Column size={[12, 12, 12, 12]}>
                        <UbicacionesDDl style={{ paddingBottom: "1%" }} />
                    </Column>
                    <EK.Modules.SDC.Pages.EstadoCuenta.EstadoCuenta />
                    <EK.Modules.SDC.Pages.TicketsClientes.TicketsClientes />

                </Column>

                <Column size={[12, 12, 12, 12]}>
                    <EK.Modules.Kontrol.Pages.Citas.CitasSectionList />
                    <EK.Modules.Kontrol.Pages.BlogPost.blogPost />
                </Column>
            </page.Main>;
        };
    });


    let UbicacionesDDl: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.UBICACIONESCLIENTE,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Ubicacion",
            items: createDefaultStoreObject([]),
            label: "Ubicación",
            helpLabel: "Seleccione una Ubicación",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 6, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    if (item.ID < 1)
                        return $([
                            "<span>", item.Nombre, "</span> ",
                        ].join(""));

                    return $([
                        "<div class='bold' style='font-size:11px'>",
                        " " + item.Clave + " " + (item.Descripcion === null || item.Descripcion === undefined ? '' :item.Descripcion ) + " ",
                        "</div>",
                        "<span style='font-size: 10px; font-style: italic'>", " N° E ", "</span>", "<span class='badge badge-success' style='font-size: 9px'> ", item.NumeroExterior, "</span>",
                        "<div style='font-size:10px; font-style: italic'>", "<span>", item.Desarrollo.Descripcion, "</span> ", " <span>", item.Desarrollo.Nombre, "</span>", "<span class='badge badge-success' style='font-size: 9px'> ", item.Desarrollo.Clave, "</span>","</div>",
                        "<span style='font-size:10px; font-style: italic'>", item.Desarrollo.Localidad.CP, "</span>",
                        "<span style='font-size:10px; font-style: italic'>", item.Desarrollo.Localidad.Descripcion, "</span>",
                        "<span style='font-size:10px; font-style: italic'>", " ", item.Desarrollo.Localidad.Nombre, "</span>",
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                if (item.ID < 1)
                    return $([
                        "<span>", item.Nombre, "</span> ",
                    ].join(""));

                return $([
                    "<span>", item.Calle, "</span> ",
                    "<span style='font-size: 90%'>", " N° E ", item.NumeroExterior, ", ", "</span>",
                    "<span class='badge badge-success' style='font-size: 90%'>", item.Desarrollo.Localidad.CP, "</span>",
                    "<span style='font-size: 90%'>", item.Desarrollo.Localidad.Descripcion, "</span>",
                    "<span style='font-size: 90%'>", " ", item.Desarrollo.Localidad.Nombre, "</span>",
                ].join(""));
            }
        };
        componentDidMount(): void {
            dispatchAsync("load::UBICACIONESCLIENTE", "base/sdc/estadoCuenta/Get/GetUbicaciones/");
        };
        componentWillMount(): void {
            Forms.updateFormElement(config.id, "Ubicacion", { ID: -1, Clave: 'VT' });
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            let cantidad: number = getData(this.props.items).length;
            if (cantidad > 1)
            {
                if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -2;
                nuevoItem['Nombre'] = 'Seleccione una ubicación';
                nuevoItem['Clave'] = 'SO';
                if (itemsModificados.data.length > 0) {
                    let existe = false;
                    let elementos: any = itemsModificados.data;
                    elementos.forEach((Value: any, index: number) => {
                        if (Value.Clave === "SO")
                            existe = true;
                    });
                    if (existe == false) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            }
            
          
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

};
