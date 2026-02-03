namespace EK.Modules.SCCO.Pages.Contratos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Contratos", "scco");

    interface IFiltroContrato extends page.IProps {
        EstadoEntidad: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IFiltroContrato, IFiltroContrato> {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/Contratos/allPost", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.DTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "TipoConvenio.Nombre", width: "200px" })
                .add({ data: "Contratista.Nombre", width: "200px" })
                .add({ data: "Obra.Nombre", width: "200px" })
                .addMoneyFormat({ data: "ImporteContrato", width: "150px", align: "center" }) 
                .addDateFormat({ data: "FechaInicio", width: "120px", format: dt.formatDate })
                .addDateFormat({ data: "FechaFin", width: "100px", format: dt.formatDate })
                .add({ data: "Estatus", width: "100px", align: "center", format: dt.formatEstatus })
                .toArray();

            dtConfig.groups
                .add({ data: "Obra.Nombre", dataType: "string"})
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
        };
    });
};