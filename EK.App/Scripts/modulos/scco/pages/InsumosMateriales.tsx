namespace EK.Modules.SCCO.Pages.InsumosMateriales {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("InsumosMateriales", "scco");

    interface IFiltroInsumo extends page.IProps {
        EstadoEntidad: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IFiltroInsumo, IFiltroInsumo> {
        //KontrolController.cs: [Route("base/{modulo}/{bp}/allPost/{filtros?}")]
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/InsumosMateriales/allPost", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.DTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ClaveInsumo", width: "150px", fixed: true })
                .add({ data: "Nombre", width: "300px" })
                .add({ data: "UnidadMedida.Nombre", width: "150px" })
                .add({ data: "TipoInsumo.Nombre", width: "200px" })
                .add({ data: "GrupoInsumo.Nombre", width: "150px" })
                .add({ data: "Estatus", width: "96px", format: dt.formatEstatus })
                .add({ data: "ProductoTerminado", align: "center", width: "200px", format: dt.formatBoolean })
                .add({ data: "MateriaPrima", align: "center", width: "120px", format: dt.formatBoolean })
                .add({ data: "Facturable", align: "center", width: "120px", format: dt.formatBoolean })
                .add({ data: "NumeroEconomico", width: "200px" })
                .add({ data: "DiasPromedioE", align: "center", width: "200px" })
                .toArray();

            dtConfig.groups
                .add({ data: "TipoInsumo.Nombre", dataType: "string" })
                .add({ data: "GrupoInsumo.Nombre", dataType: "string" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter.bind(this)}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
        };
    });
};