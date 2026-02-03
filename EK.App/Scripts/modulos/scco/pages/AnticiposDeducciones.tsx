namespace EK.Modules.SCCO.Pages.AnticiposDeducciones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("AnticiposDeducciones", "scco");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.DTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "Clave", width: "150px", fixed: true })
                .add({ data: "Nombre", width: "300px" })
                .add({ data: "TipoConcepto.Nombre", width: "200px" })
                .add({ data: "Insumo.Nombre", width: "200px" })
                .add({ data: "TipoMovimiento.Nombre", width: "200px" })
                .add({ data: "AfectaFacturacion", align: "center", width: "150px", format: dt.formatBoolean })
                .add({ data: "AfectaOc", align: "center", width: "150px", format: dt.formatBoolean })
                .add({ data: "AplicaIva", align: "center", width: "150px", format: dt.formatBoolean })
                .add({ data: "Estatus", width: "100px", format: dt.formatEstatus })
                .toArray();

            dtConfig.groups
                .add({ data: "TipoConcepto.Nombre", dataType: "string" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
        };
    };
};