namespace EK.Modules.SCV.Pages.ListaPrecios {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("listaPrecios", "scv");

    interface IListaPrecios extends page.IProps {
        desarrollo?: any;
        tipoComercializacion?: any;
        vigenteDesde?: any;
        item?: any;
    };

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        switch (type) {
            case "TipoComercializacion":
                dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/"+ filters);
                break;
            case "InicializarTipoComercializacion":
                global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                break;
            case "Catalogo":
                let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
                if (f != null) {
                    global.dispatchAsyncPost("global-current-catalogo", "base/kontrol/listaPrecios/GetBP/GetAll", { parametros: f });
                }
                break;
        }

    };
    export let Vista: any = global.connect(class extends React.Component<IListaPrecios, IListaPrecios> {
        constructor(props: IListaPrecios) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.item = state.global.currentEntity;
            retValue.id = config.id;
            retValue.config = page.props(state);
            retValue.desarrollo= Forms.getValue("Desarrollo", config.id + "$filters", state);
            retValue.vigenteDesde=Forms.getValue("VigenteDesde", config.id + "$filters", state);
            return retValue;
        };
        onFilter(props: any, filters: any, type?: string): any {
            let propiedades: any = global.assign(props, { onFilter: onPageFilter });
            page.applyFilter(propiedades, null, "Catalogo");
        };
        onNew(): void {
            let ml: any = $ml[config.id];
            let desarrollo: any = Forms.getValue("Desarrollo", config.id + "$filters");
            let tipoComercializacion: any = Forms.getValue("TipoOperacion", config.id + "$filters");

            if (desarrollo && desarrollo.ID && tipoComercializacion && tipoComercializacion.ID > 0) {
                let url: string = ["id?nuevo&", global.encodeParameters({ ID: -1, IdDesarrollo: desarrollo.ID, IdTipoOperacion: tipoComercializacion.ID })].join("");
                go(url, true);
            }
            else {
                warning(ml.mensajes.validacionFormulario);
            }

        }
        shouldComponentUpdate(nextProps: IListaPrecios, nextState: any): boolean {
            return hasChanged(this.props.item, nextProps.item);
        };
        componentDidMount() {
            Forms.updateFormElement(config.id + "$filters", "Vigente", true)
            let propiedades: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(propiedades, null, "Catalogo");

        }
        componentWillReceiveProps(nextProps: IListaPrecios, nextState: IListaPrecios): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {

                Forms.updateFormElement(config.id + "$filters", "TipoOperacion", { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" })

                if (nextProps.desarrollo && nextProps.desarrollo.ID > 0) {
                    onPageFilter(null, global.encodeParameters({ IdDesarrollo: nextProps.desarrollo.ID, TipoOperacion: 'Lista' }), "TipoComercializacion")
                }
                else if (nextProps.desarrollo && nextProps.desarrollo.ID == -1) {
                    onPageFilter(null,null, "InicializarTipoComercializacion")
                }
            };

        };
        render(): JSX.Element {

            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let desarrollo = row.Desarrollo ? "(" + row.Desarrollo.Clave + ") " + row.Desarrollo.Descripcion : "";
                return desarrollo;
            };
            let formatVersion: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let version = row.Vigente == true ? "<span class='badge badge-primary'>" + row.NVersion + "</span>" : "<span style='background-color:#d0c6c6;color:LightSlateGrey' class='badge badge-gray'>" + row.NVersion +"</span>";
                return version;
            };

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Desarrollo.Clave", width: 30, render: formatNombre })
                .add({ data: "TipoOperacion.Nombre", width: 20 })
                .add({ data: "NVersion", width: 15, render: formatVersion })
                .addDate({ data: "VigenteDesde", width: 10 })
                .addDate({ data: "VigenteHasta", width: 10 })
                .add({ data: "Estatus", width: 15, render: label.formatEstatusListaPrecios })
                .toArray();
            let entidadActual: any = getData(this.props.item);
            let eliminar: boolean = entidadActual.Estatus && entidadActual.Estatus.Clave == "D" ? true : false;


            return <page.Main {...config} pageMode={PageMode.Principal} allowDelete={eliminar} onNew={this.onNew} onFilter={this.onFilter}>
                <page.Filters>
                        <ddl.DesarrollosDDL id={"Desarrollo"} addNewItem={"VT"}  />
                        <TipoComercializacionDDL size={[12, 2, 2, 2]} id={"TipoOperacion"} addNewItem={"SO"}  cargarDatos={false}    />
                        <ddl.EstatusListaPreciosDDL size={[6, 6, 2, 2]} id={"Estatus"} addNewItem={"SO"} />
                        <Fechas idFormSection={config.id + "$filters"} />
                        <checkBox.CheckBox label="Vigente" id={"Vigente"} size={[6, 6, 1, 1]} />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });

    interface IAlerta extends page.IProps {
        mensaje?: any;
        permitirCerrar?: boolean;
        color?: string;
    };

    export let Alerta: any = global.connect(class extends React.Component<IAlerta, IAlerta> {
        constructor(props: IAlerta) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            return retValue;
        };
        static defaultProps: IAlerta = {
            permitirCerrar: false,
            color:"Amarillo"
        };
        onClick(): any {
            let idElemento: string = "validacionAlerta" + this.props.config.id;
            document.getElementById(idElemento).style.display = "none";
        };
        render(): JSX.Element {

            let colorRelleno: string = "";
            let colorBorde: string = "";
            let colorLetra: string = "";

            if (this.props.color == "Azul") {
                colorRelleno = "#E3F2FD";
                colorBorde = "#90CAF9";
                colorLetra = "#327ad5";

            }
            else if (this.props.color == "Rojo")
            {
                colorRelleno = "#f2dede";
                colorBorde = "#ebccd1";
                colorLetra = "#a94442";
            }
            else {
                colorRelleno = "#fff3cd"
                colorBorde = "#ffeeba"
                colorLetra = "#856404"
            }

            let idElemento: string = "validacionAlerta" + this.props.config.id;
            return <Row id={idElemento} className="ek-sombra" style={{ marginLeft: 16, marginRight: 16, marginBottom: 6, border: "solid 2px " + colorBorde, backgroundColor: colorRelleno }}>
                <Column size={[10, 11, 11, 11]} style={{ padding: "10px 15px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: colorLetra }}>
                        <i className={"fa fa-info"} style={{ marginRight: "5px" }}></i>
                        {this.props.mensaje}
                    </span>
                </Column>
                {this.props.permitirCerrar ?
                    <Column size={[2, 1, 1, 1]} style={{ height: 40, paddingTop: 12 }} className="text-right">
                        <Button className={"font-green"} style={{ fontSize: 18 }} icon="fa fa-close" iconOnly={true} onClick={() => { this.onClick(); }}></Button>
                    </Column>
                    : null
                }

            </Row>;
        }
    });

    interface IMensaje extends React.Props<any> {
        elemento: any;
        desarrollo: any;
        tipoComercializacion: any;
    };
    export let MensajeValidacion: any = global.connect(class extends React.Component<IMensaje, IMensaje> {
        constructor(props: IMensaje) {
            super(props);
        };
        static props: any = (state: any) => ({
            desarrollo: state.global.currentEntity$desarrollos,
            tipoComercializacion: state.global.currentEntity$validacionTipoComercializacion,
            elemento: state.global.currentEntity
        });
        render(): any {
            let desarrollo: any = getData(this.props.desarrollo);
            let tipoComercializacion: any = getData(this.props.tipoComercializacion);
            let tipoComercializacionR1 = tipoComercializacion.length > 0 ? tipoComercializacion[0] : null;

            if ((desarrollo && desarrollo.cantidadUbicaciones === 0) || (tipoComercializacion.length > 0 && tipoComercializacionR1.ID != getDataID(this.props.elemento))) {
                let ml: any = $ml["listaPrecios"];
                let mensaje: string = "";
                if (desarrollo && desarrollo.cantidadUbicaciones === 0) {
                    mensaje = ml.mensajes.validacionUbicacion;
                }
                if (tipoComercializacion.length > 0) {
                    mensaje = mensaje + " " + ml.mensajes.validacionEstatus;
                }
                return <Alerta mensaje={mensaje} />;
            }
            else {
                return null;
            };
        };
    });
};

