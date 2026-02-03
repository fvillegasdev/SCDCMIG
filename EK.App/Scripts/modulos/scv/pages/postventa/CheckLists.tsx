namespace EK.Modules.SCV.Pages.postventa.SPVCheckList {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("CheckList", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let retValue: any;
            let estatusCheckList: (data: any, row: any) => any = (data: any, row: any): any => {
                if (row.Estatus && row.Estatus.Clave) {
                    if (row.Estatus.Clave === 'A') {
                        retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                    else if (row.Estatus.Clave === 'B') {
                        retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                }
                return <div key={"estatus_" + row.ID}>
                    <div style={{ float: "left" }}>{(retValue)}</div>
                </div>;
            };
            let obligatorioCheckList: (data: any, row: any) => any = (data: any, row: any): any => {

                if (row.Obligatorio) {
                    if (row.Obligatorio === true) {
                        retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                    else if (row.Obligatorio === false) {
                        retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                            <span className="path1"></span><span className="path2"></span>
                        </span>;
                    }
                } else {
                    retValue = null; 
                }
                return <div key={"estatus_" + row.ID}>
                    <div style={{ float: "left" }}>{(retValue)}</div>
               </div>;
            };
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .addClave({ width: "200px", fixed: true })
                .addNombre({ width: "400px", fixed: true })
                .add({ data: "TipoCheckList.Nombre", width: "200px" })
                .add({ data: "CategoriaCheckList.Nombre", width: "250px" })
                .add({ data: "Obligatorio", width: "96px", format: obligatorioCheckList })
                .add({ data: "Estatus", width: "96px", format: estatusCheckList })
                .toArray();
            dtConfig.groups
                .add({ data: "TipoCheckList.Nombre" })
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