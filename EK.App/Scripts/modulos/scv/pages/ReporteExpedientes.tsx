namespace EK.Modules.SCV.Pages.ReporteExpedientes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reporteexpedientes", "scv");

    interface IListaPrecios extends page.IProps {
        desarrollo?: any;
        tipoComercializacion?: any;
        vigenteDesde?: any;
        item?: any;
    };

    let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        switch (type) {
            case "TipoComercializacion":
                dispatchAsync("load::TIPOCOMERCIALIZACION", "base/scv/desarrollos/Get/GetDesarrolloTiposComercializacion/" + filters);
                break;
            case "InicializarTipoComercializacion":
                global.dispatchSuccessful("load::TIPOCOMERCIALIZACION", []);
                break;
            case "Catalogo":
                let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
                //console.log(f)
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
            retValue.desarrollo = Forms.getValue("Desarrollo", config.id + "$filters", state);
            retValue.vigenteDesde = Forms.getValue("VigenteDesde", config.id + "$filters", state);
            return retValue;
        };

        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            //  console.log(f)
            //if (f != null) {
            //f.IdFase = filters.FasesExpedienteDDL ? filters.FasesExpedienteDDL : undefined;
            //f.IdDesarrollo = filters.DesarrollosDDL ? filters.DesarrollosDDL : undefined;
            //f.IdComercializacion = filters.TipoComercializacionDDL ? filters.TipoComercializacionDDL : undefined;
            //f.IdEsquema = filters.SCVEsquemasSeguimientoL ? filters.SCVEsquemasSeguimientoL : undefined;
            //}

            //console.log(f)
            //console.log("----")
            props.config.dispatchCatalogoBasePost("base/scv/ReporteExpedientes/GetBP/GetReporteExpedientes", { parametros: f });
        };

        componentWillReceiveProps(nextProps: IListaPrecios, nextState: IListaPrecios): any {
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo)) {

                Forms.updateFormElement(config.id + "$filters", "Comercializacion", { ID: -1, Nombre: "Seleccione un Tipo de Comercialización" })

                //console.log(nextProps.desarrollo);

                if (nextProps.desarrollo && nextProps.desarrollo.ID > 0) {
                    onPageFilter(null, global.encodeParameters({ IdDesarrollo: nextProps.desarrollo.ID, TipoOperacion: 'Lista' }), "TipoComercializacion")
                }
                else if (nextProps.desarrollo && nextProps.desarrollo.ID == -1) {
                    onPageFilter(null, null, "InicializarTipoComercializacion")
                }
            };

        };
        render(): JSX.Element {
            //console.log("--")

            let ml: any = config.getML();

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);

            dtConfig.columns
                //.add({ data: "ClienteId", title: "ID", width: "150px" })
                .add({ data: "ClienteNombre", title: "Cliente", width: "600px", hidden: true })

                .add({ data: "Id", title: "Expediente", width: "150px" })
                .add({ data: "FaseNombre", title: "Fase", width: "250px" })
                .add({ data: "DesarrolloDescripcion", title: "Desarrollo", width: "250px" })
                .add({ data: "ComercializacionNombre", title: "Tipo de Comercializacion", width: "250px" })
                .add({ data: "EsquemaNombre", title: "Esquema de Seguimiento", width: "250px" })

                .toArray();
            dtConfig.groups
                .add({ data: "ClienteNombre" })

                .toArray();


            /*
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Id", title: "ID", width: "150px" })
                .add({ data: "ClienteNombre", title: "Cliente", width: "150px" })
                .add({ data: "DesarrolloDescripcion", title: "Desarrollo", width: "10px" })
                .toArray();
                idElement
            */


            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.FasesExpedienteDDL id="Fase" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />

                    <ddl.DesarrollosDDL addNewItem={"SO"} id="Desarrollo" size={[12, 12, 3, 3]} addNewItemText={"Seleccione un Desarrollo"} />
                    <TipoComercializacionDDL addNewItem={"SO"} id="Comercializacion" idFormSection={config.id} cargarDatos={false} agregarnuevoItem={"SO"} size={[12, 12, 3, 3]} />

                    <ddl.SCVEsquemasSeguimiento id="Esquema" idForm={config.id} size={[12, 12, 3, 3]} addNewItem={"SO"} />
                </page.Filters>


                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;

        };

    });

};