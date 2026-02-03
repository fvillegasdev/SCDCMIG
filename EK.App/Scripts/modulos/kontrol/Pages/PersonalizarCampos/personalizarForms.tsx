namespace EK.Modules.Kontrol.Pages.PersonalizarForms {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("personalizarCamposOpciones", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let formatTipoCampo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let nombreTipoCampo: any = row.TipoCampo.Nombre; // ? ' <span class="badge badge-success pull-right ek-sombra" style="    font-size: 8px!important;">' + row.EstatusEtapa.Nombre : '';
                //return '<div><i class="' + EstatusDashBoardInfo.iconos[row.ClaveDashBoard] + '" style="color :' + EstatusDashBoardInfo.iconosColor[row.ClaveDashBoard] + '" ></i> ' + data + estatus_etapa + '</span></div>';
                return nombreTipoCampo; 
            };

            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
                .addNombre({ width: 30 })
                //.add({ data: "ID", title: "Tipo", width: 25, render: formatTipoCampo })
                //.addEstatusSoloActivo({ data: "Obligatorio", title: "Obligatorio", width: 10 })  
               // .addEstatusSoloActivo({ data: "TieneVencimiento", title: "Vencimiento",  width: 10 })  
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}  entity  >
                <dt.PageTable columns={columns} />
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
            </page.Main>;
        };
    };
};