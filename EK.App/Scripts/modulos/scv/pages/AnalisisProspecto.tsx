namespace EK.Modules.SCV.Pages.AnalisisProspecto {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("AnalisisProspecto", "scv");
  
    
    export class Vista extends page.Base
    {
        constructor(props: page.IProps)
        {
            super(props);
        };
        componentWillUnmount()
        {
        }
        onFilter(props: page.IProps, filters: any): any {

            if (filters && filters.TipoVista)
            {
                let fi: any = global.isEmpty(filters) ? null : global.getFilters(filters);

                if (filters.TipoVista.Clave == "DES")
                {
                    props.config.dispatchCatalogoBasePost("base/scv/analisisprospecto/GetBP/GetAll", { parametros: fi });
                }
                else if (filters.TipoVista.Clave == "JER")
                {
                    props.config.dispatchCatalogoBasePost("base/scv/analisisprospecto/GetBP/GetReporteJerarquico", { parametros: fi });
                }
            }

        };
        render(): JSX.Element {
            let ml: any = config.getML();


            let formatCantidadExpedientes: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                var ruta = row.CantidadExpedientes == 0 ? "/#/scv/clientes" : "../#/scv/expedientes?cliente=" + row.ID;
                return "<div class='btn green-meadow btn-circle  btn-xs col-md-4'> <a style='color:white'  href='" + ruta + "' >" + row.CantidadExpedientes + "</a></div>";
            };
            let formatNombreAgente: (data: any, row: any) => any = (data: any, row: any) => {

                let nombre = "";

                if (row.Posiciones && row.Posiciones.Clave) {
                    nombre = row.Posiciones.Nombre;
                }
                let nombreTitular: string = row.Titular ? row.Titular.Nombre ? row.Titular.Nombre + " " + row.Titular.Apellidos : "" : "";
                return [nombreTitular, nombre].join(" ");

            };

          
        
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}
                allowDelete={false}
                allowEdit={false}
                allowNew={false}
                allowView={false}>
                <page.Filters>
                    <TipoVistaDDL size={[12, 3, 3, 3]} addNewItem={"SO"}/>
                    <ddl.DesarrollosDDL size={[12, 12, 4, 4]} addNewItem={"VT"} />
                    <ddl.UsuariosDescendientesDDL size={[12, 12, 4, 4]} id={"Usuario"} addNewItem={"VT"} label="Titular" />
                    <ddl.EstatusDDL size={[12, 4, 2, 2]} addNewItem={"VT"} />
                    <ddl.EstatusClienteDDL size={[12, 4, 2, 2]} addNewItem={"VT"} label="Estatus Prospección" />

                    <input.Date id={"CreadoDesde"} type="date" size={[12, 2, 2, 2]} label="Fecha Inicio"
                        validations={[
                            validations.lessEqualThan("CreadoHasta", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")]} />

                    <input.Date id={"CreadoHasta"} type="date" size={[12, 2, 2, 2]} label="Fecha Fin"
                        validations={[
                            validations.greaterEqualThan("CreadoDesde", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")]} />


                </page.Filters>

                <Grid/>

            </page.Main>;
        };
    };



    interface IGrid extends page.IProps {
        tipoVista: any;
        data: any;
    };

    export let Grid: any = global.connect(class extends React.Component<IGrid, IGrid> {
        constructor(props: IGrid) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        };
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.tipoVista = Forms.getValue("TipoVista", config.id + "$filters");
            retValue.data = state.global.currentCatalogo;
            return retValue;
        };
        onRowDoubleClick(item: any): any
        {
            if (item && item.Cliente && item.Cliente.ID > 0)
            {
                go("scv/clientes/" + item.Cliente.ID);
            }
        };
        shouldComponentUpdate(nextProps: IGrid, nextState: any): boolean {
            return hasChanged(this.props.data, nextProps.data) ||
                   hasChanged(this.props.tipoVista, nextProps.tipoVista);
        };
        render(): JSX.Element {
            let tipoVista: any = this.props.tipoVista;


            let formatCantidadExpedientes: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                var ruta = row.CantidadExpedientes == 0 ? "/#/scv/clientes" : "../#/scv/expedientes?cliente=" + row.ID;
                return "<div class='btn green-meadow btn-circle  btn-xs col-md-4'> <a style='color:white'  href='" + ruta + "' >" + row.CantidadExpedientes + "</a></div>";
            };


            let ml: any = config.getML();

            if (tipoVista && tipoVista.Clave && isSuccessful(this.props.data))
            {
                if (tipoVista.Clave == "JER")
                {

                    let formatNombreCliente: (data: any, row: any) => any = (data: any, row: any) => {

                        if (row.Cliente && row.Cliente.ID > 0) {
                            return row.Cliente.Nombre + " " + row.Cliente.ApellidoPaterno + " " + row.Cliente.ApellidoMaterno;
                        }
                        return null;
                    };
                    let info: any = getData(this.props.data)[0];
                    let columns: any[] = [];
                    for (const prop in info) {
                        let columna: string = prop;
                        let isColumn: number = columna.indexOf("a")

                        let isColumnName: number = columna.indexOf("Nombre")

                        if (isColumn == 0 && isColumnName > -1) {
                            columns.push(prop);
                        }

                    }

                    let dtConfig: dt.IDTConfig = dt.createConfig(ml);

                    for (var i = 0; i < columns.length; i++) {
                        dtConfig.columns
                            .add({ data: columns[i], width: "150px" })
                            .toArray();
                    }  

                    dtConfig.columns
                        .add({ data: "Cliente.ID", width: "150px" })
                        .add({ data: "Cliente.Nombre", width: "150px", format: formatNombreCliente })
                        .add({ data: "Cliente.TipoPersona.Nombre", width: "150px" })
                        .add({ data: "Cliente.RFC", width: "150px" })
                        .addDateFormat({ data: "Cliente.Creado", width: "150px" })
                        .add({ data: "CantidadExpedientes", width: "150px", render: formatCantidadExpedientes })
                        .add({ data: "Estatus", width: "96px", format: dt.formatEstatus })
                        //.add({ data:"a1Nombre" })
                        .toArray();
                    //dtConfig.groups
                    //        .add({ data: "a1Nombre" })
                    //        .toArray();

                    

                    for (var i = 0; i < columns.length; i++) {

                        dtConfig.groups
                            .add({ data: columns[i] })
                            .toArray();
                    }


                    return <dt.DataTableExtended dtConfig={dtConfig} onRowDoubleClick={this.onRowDoubleClick} key={tipoVista.Clave} />
                }
                else if (tipoVista && tipoVista.Clave=="DES")
                {
                    let claveTipoVista: string = tipoVista && tipoVista.Clave == "JER" ? tipoVista.Clave : "DES";
                    let formatNombreAgente: (data: any, row: any) => any = (data: any, row: any) => {

                        let nombre = "";

                        if (row.Posiciones && row.Posiciones.Clave) {
                            nombre = row.Posiciones.Nombre;
                        }
                        let nombreTitular: string = row.Titular ? row.Titular.Nombre ? row.Titular.Nombre + " " + row.Titular.Apellidos : "" : "";
                        return [nombreTitular, nombre].join(" ");

                    };

                    let dtCpnfiguracion: dt.DTConfig = dt.createConfig(ml);
                    dtCpnfiguracion.columns
                        .addID({ width: "100px" })
                        .add({ data: "TipoPersona.Nombre", width: "150px" })
                        .add({ data: "RFC", width: "150px" })
                        .addNombreCompletoCliente({ data: "Nombre", width: "200px" })
                        .add({ title: "Desarrollo", data: "Desarrollo.Nombre", width: "200px" })
                        .add({ data: "PosicionUsuario.Nombre", width: "200px" })
                        .add({ title: "Agente", data: "Agente", width: "300px", format: formatNombreAgente })
                        .addDateFormat({ title: "F. Registro", data: "Creado", width: "150px" })
                        .add({ data: "CantidadExpedientes", width: "150px", render: formatCantidadExpedientes })
                        .add({ data: "Estatus", width: "96px", format: dt.formatEstatus })
                        .toArray();
                    dtCpnfiguracion.groups
                        .add({ data: "Desarrollo.Nombre" })
                        .add({ data: "PosicionUsuario.Nombre" })
                        .toArray();

                    return <dt.DataTableExtended dtConfig={dtCpnfiguracion} key={claveTipoVista} />
                }
            }

            return null;
        }
    });


    export let TipoVistaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TipoVistaReporteAnalisisP
        });
        static defaultProps: IDropDrownListProps = {
            id: "TipoVista",
            items: createDefaultStoreObject([]),
            label: "TipoVista",
            helpLabel: "Seleccione un Tipo de vista",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::TipoVistaReporteAnalisisP", "catalogos/get(TipoVistaReporteAnalisisP)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });



};
