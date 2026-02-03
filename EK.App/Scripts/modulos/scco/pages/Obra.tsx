namespace EK.Modules.SCCO.Pages.Obra {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Obra", "scco");

    export let Vista: any = global.connect(class extends page.Base {
        onFilter(props: any, filters: any, type?: string): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/obra/allPost", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();

            let dtConfig: dt.DTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "TipoObra.Nombre", width: 20 })
                .add({ data: "EstadoObra.Nombre", width: 20 })
                .add({ data: "ObraUniversal", width: 15, format: dt.formatBoolean, title: "Obra Universal", align: 'center' })
                .addClave({ width: 15 })
                .addNombre({ width: 30 })
                .add({ data: "Desarrollo.Nombre", width: 20 })
                .add({ data: "CentroCosto.Nombre", width: 20 })
                .add({ data: "Estatus", width: "100px", format: dt.formatEstatus })
                .toArray();
            dtConfig.groups
                .add({ data: "TipoObra.Nombre", dataType: 'string' })
                .add({ data: "EstadoObra.Nombre", dataType: 'string' })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />            
            </page.Main>;
        };
    });
};