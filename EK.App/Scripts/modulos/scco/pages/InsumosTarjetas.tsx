namespace EK.Modules.SCCO.Pages.InsumosTarjetas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("InsumosTarjetas", "scco");

    interface IFiltros extends page.IProps {
        Estatus?: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IFiltros, IFiltros> {
        constructor(props: IFiltros) {
            super(props);
        }
        onFilter(props: any, filters: any, type?: string): any {
            let activos: number = 0;
            let estatus: any = Forms.getValue("Estatus", config.id + "$filters")
            delete filters.Estatus;
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);

            if (estatus != undefined) {
                if (estatus.Clave === "B") {
                    activos = -1;
                    f.activos = activos;
                } else if (estatus.Clave === "A") {
                    activos = 1;
                    f.activos = activos;
               }
            }
             
            props.config.dispatchCatalogoBasePost("base/scco/InsumosTarjetas/allPost", f);
        };

        render(): JSX.Element {
            let ml: any = config.getML();
            let dtConfig: dt.DTConfig = dt.createConfig(ml);
            dtConfig.columns  
                .add({ data: "Obra.Nombre", width: "200px"})
                .add({ data: "TipoPresupuesto.Nombre", width: "120px", format: dt.formatBadgeInfo})
                .add({ data: "Tabulador.Nombre", width: "120px", format: dt.formatBadgeInfo})
                .addClave({ data: "Clave", width: "100px" })
                .add({ data: "Nombre", width: "200px" })
                .add({ data: "TipoTarjeta.Nombre", width: "120px", format: dt.formatBadgeInfo})
                .add({ data: "UnidadMedida.Nombre", width: "150px" })       
                .addMoneyFormat({ data: "CostoDirecto", width: "120px", align: "center" }) 
                .add({ data: "Estatus", width: "100px", format: dt.formatEstatus })
                .toArray();

            //dtConfig.groups
            //    .add({ data: "Tabulador.Nombre", dataType: "string" })
            //    .add({ data: "Obra.Nombre", dataType: "string" })
            //    .add({ data: "TipoPresupuesto.Nombre", dataType: "string" })
            //    .toArray();
                
            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.SCCO$ObrasDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <ddl.SCCOTiposPresupuestoDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <ddl.SCCOTabuladoresDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                     <ddl.EstatusDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                  </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
    
        };
    });
};