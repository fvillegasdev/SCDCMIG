namespace EK.Modules.Kontrol.Pages.CentroCosto {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("centrocosto", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {

            let estatusCC: (data: any, row: any) => any = (data: any, row: any): any => {
                let estatus: any;
                let clasificadores: any;
                let styleEstatus: React.CSSProperties;
                //
                if (row.Estatus) {
                    styleEstatus = {};
                    if (row.Estatus.Clave === "A") {
                        styleEstatus.color = "#00C853";
                    }
                    else if (row.Estatus.Clave === "B") {
                        styleEstatus.color = "#CFD8DC";
                    }
                    styleEstatus.width = "50%";
                    styleEstatus.textAlign = "center";
                    styleEstatus.float = "right";
                    styleEstatus.fontSize = 14;
                    //
                    estatus = <div style={styleEstatus}><i className="fas fa-check"></i></div>;
                    //
                    styleEstatus = {};
                    if (row.TotalClasificadores > 0) {
                        styleEstatus.color = "#FF6D00";
                    }
                    else {
                        styleEstatus.color = "#CFD8DC";
                    }
                    styleEstatus.width = "50%";
                    styleEstatus.textAlign = "center";
                    styleEstatus.float = "left";
                    styleEstatus.fontSize = 11;
                    //
                    clasificadores = <div style={styleEstatus}><i className="fas fa-tags"></i></div>;
                }
                // <i class="fas fa-tags"></i>
                return <div key={"estatus_" + row.ID}>
                    {clasificadores}
                    {estatus}
                </div>;
            };

            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addClave({ width: "100px" })
                .addNombre({ width: "400px" })
                .add({ data: "ValidacionPresupuesto.Nombre", width: "400px" })
                .add({ data: "Estatus", width: "96px", format: estatusCC })
                .toArray();

            //let columns: dt.IDTColumn[] = dt.createColumns(ml)
            //    .addClave({ width: 20 })
            //    .addNombre({ width: 70 })
            //    .add({ data: "ValidacionPresupuesto.Nombre", title: "Validacion Presupuesto", width: 20 })
            //    .addEstatus({ width: 10 })
            //    .toArray();
            // <dt.PageTable columns={columns} />
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.DataTableExtended dtConfig={dtConfig} />
            </page.Main>;
        };
    };
};