// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.RUBA.Prereporte {
    "use strict";
    const w: any = window;
    const config: page.IPageConfig = global.createPageConfig("Prereportes", "scv");

    export var EstatusBGC: any = {
        "1": "#36c6d3",
        "2": "#ed6b75",
        "3": "#41c300"
    };

    export class EstatusReporteFilter extends React.Component<buttons.IButtonStatesProps, {}> {
        render(): JSX.Element {
            return <buttons.ButtonStates {...this.props} label="Estatus" id="activos" value={0} states={[
                { text: "Todos", value: 0, width: "25%", selectedStyle: { color: "#666", backgroundColor: "#E0E0E0", border: "none", fontSize: 14 } },
                { text: "Capturados", value: 1, width: "25%", selectedStyle: { color: "#fff", backgroundColor: "#36C6D3", border: "none", fontSize: 14 } },
                { text: "No Proceden", value: 2, width: "25%", selectedStyle: { color: "#fff", backgroundColor: "#ED6B75", border: "none", fontSize: 14 } },
                { text: "Reportados", value: 3, width: "25%", selectedStyle: { color: "#fff", backgroundColor: "#41C300", border: "none", fontSize: 14 } }
            ]} />;
        };
    };

    export const formatEstatusReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        return w.ReactDOMServer.renderToStaticMarkup(
            <span className="badge" style={{ backgroundColor: EstatusBGC[data.Clave] }} >{data.Nombre}</span>
        );
    };

    export const formatCalificacion: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
        let stars: number = data ? data : 0;
        let starsIcons: any[] = [];
        for (var i = 0; i < stars; i++) {
            starsIcons.push(<span key={"fas_star_" + i} style={{ color: "rgb(241, 196, 15)" }}><span className="fas fa-star"></span></span>);
        };
        for (var i = starsIcons.length; i < 5; i++) {
            starsIcons.push(<span key={"fas_star_" + i}><span className="far fa-star"></span></span>);
        };
        return w.ReactDOMServer.renderToStaticMarkup(<span style={{ fontSize: 14 }}>{starsIcons}</span>);
    };

    export const formatIDReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let valorIdReporte: any = row.IdReporte && row.IdReporte > 0 ? row.IdReporte: 0; 
        if (valorIdReporte > 0) {
            return w.ReactDOMServer.renderToStaticMarkup( 
                <span className="badge" style={{ backgroundColor: EstatusBGC[row.EstatusReporte.Clave] }} >{row.IdReporte}</span>
            );
        } else {
            return null;
        }
    };
    export const formatFechaReporte: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
        let valorIdReporte: any = row.IdReporte && row.IdReporte > 0 ? row.IdReporte : 0;
        if (valorIdReporte > 0) {
            return w.ReactDOMServer.renderToStaticMarkup(
                <span className="badge" style={{ backgroundColor: EstatusBGC[row.EstatusReporte.Clave] }} >{global.formatDateTimeDirect(row.FechaEntrega) ? global.formatDateTimeDirect(row.FechaEntrega) : " " }</span>
            );
        } else {
            return w.ReactDOMServer.renderToStaticMarkup(
                <span >{global.formatDateTimeDirect(row.FechaEntrega) ? global.formatDateTimeDirect(row.FechaEntrega) : " "}</span>
            );
        }
    };
    export class Vista extends page.Base {

        componentDidMount() {
            //console.log('loading');
            //dispatchAsyncPost('load::', 'base/scv/prereportes/all')
            this.GetPrereportes();
        }
        getPrereportesByStatus() {
            //Forms.getFormElement('rereportes')
            //this.GetPrereportes.bind(this)(estatus);
            //console.log(estatus);
        }
        GetPrereportes() {
            let columnas = [
                { caption: "No. Cliente", dataField: "IdCliente" },
                { caption: "ID", dataField: 'IdPrereporte',  },
                { caption: "Cliente", dataField: 'Cliente.Nombre' },
                { caption: "Ubicacion", dataField: "Ubicacion.ClaveFormato", alignment: "center" },
                { caption: "Plaza", dataField: "Ubicacion.Plaza.Nombre" },
                { caption: "Fecha Pre-reporte", dataField: "FechaCaptura", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: "Id Reporte", dataField: "IdReporte", alignment: "center" },
                { caption: "Fecha Entrega", dataField: "FechaEntrega", alignment: "center", dataType: 'date', format: 'dd/MM/yyyy' },
                {
                    caption: "Estatus", dataField: "EstatusReporte.Nombre",
                    encodeHtml: false, customizeText: (cellInfo) => {
                        let claseBadge = '';
                        let badgeStyle = '';
                        switch (cellInfo.value) {
                            case 'REPORTADO':
                                badgeStyle = 'style="background:#41C300"';
                                break;
                            case 'CAPTURADO':
                                badgeStyle = 'style="background:#36C6D3"';
                                break;
                            case 'NO PROCEDE':
                                badgeStyle = 'style="background:#ED6B75"';
                                break;
                        }
                        return `<span class='badge' ${badgeStyle}>${cellInfo.value}</span>`;
                    }
                },
                {
                    caption: "Calificación", dataField: "Calificacion", encodeHtml: false, customizeText: (cellInfo) => {
                        let max = 5;
                        let calificado = cellInfo.value ? cellInfo.value : 0;
                        let nocalificado = max - calificado;
                        let stars = '';
                        for (let i = 0; i < calificado; i++) {
                            stars += `<i class="fas fa-star" style="color:#F1C40F"></i>`;
                        }
                        for (let i = 0; i < nocalificado; i++) {
                            stars += `<i class="far fa-star"></i>`;
                        }
                        return stars;
                    }

                }
          
            ];
            let estatuspr = EK.Store.getState().forms.Prereportes$filters !== undefined ? EK.Store.getState().forms.Prereportes$filters.form.activos.value : 0;

            let params = {};
            if (estatuspr > 0) {
                params = { activos: estatuspr }
            }
            //let loader = document.getElementById('loading');  go("/scv/pv/prereportes/" + m.ID);
            //let loadedTable = document.getElementById('loadedData');
            global.asyncPost("base/scv/prereportes/all", params, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        //loader.style.display = 'none';
                        //loadedTable.style.display = 'inherit';
                        console.log(data);
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            onRowDblClick: (e) => {
                                let id = e.data.ID;
                                go("/scv/pv/prereportes/" + id);
                                //console.log(e)
                            },
                            //onExporting: function (e) {

                            //    e.cancel = true;
                               
                            //    e.cancel = false;
                            //    setTimeout(() => {
                            //        for (const d of data) {
                            //            d.EsHipotecaVerde = d.EsHipotecaVerde === 'SI' ? true : false
                            //            d.Procede = d.Procede === 'SI' ? true : false
                            //            d.MontoSeguro = d.MontoSeguro === 'SI' ? true : false
                            //        }
                            //    }, 200);

                            //},

                            searchPanel: {
                                visible: false
                            },
                            export: {
                                enabled: true,
                                fileName: "PreReporte_Fallas_" + fecha,
                                allowExportSelectedData: false
                            },
                            paging: {
                                pageSize: 15
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: false
                            },
                            columns: columnas,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: false,
                            rowAlternationEnabled: true
                        }).dxDataGrid("instance");
                        break;
                    case AsyncActionTypeEnum.loading:
                        //loader.style.display = 'block';
                        //loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        //loader.style.display = 'none';
                        //loadedTable.style.display = 'none';
                        break;
                }
            });
        }

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "IdCliente", width: 8 })
                .add({ data: "IdPrereporte", title: "ID",  width: 5 })
                .add({ data: "Cliente.Nombre", width: 25})
                .add({ data: "Ubicacion.ClaveFormato", width: 10 })
                .add({ data: "Ubicacion.Plaza.Nombre", width: 10 })
                //.addDateTime({ data: "FechaCaptura", title: "Fecha Pre-Reporte",  width: 13, order: "desc" }) <page.Main {...config} pageMode={PageMode.Principal} allowDelete={false} allowNew={false}>
                .addDate({ data: "FechaCaptura", title: "Fecha Pre-Reporte", width: 13, order: "desc" })
                .add({ data: "IdReporte", title: "Id Reporte", width: 10, render: formatIDReporte })
                .add({ data: "FechaEntrega", title: "Fecha Entrega", width: 11, order: "desc", render: formatFechaReporte })
                .add({ data: "EstatusReporte", width: 10, render: formatEstatusReporte })
                .add({ data: "Calificacion", width: 10, render: formatCalificacion })
                .toArray();
            let color = "white";
            let className = " btn-editing pull-right";
            //console.log(PageMode)
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowDelete={false} allowNew={false} style={{ background: '#fff' }}>
                <div className="row">
                   
                    <div className="col-sm-12" style={{ background: '#fff' }}>
                        <Button keyBtn={"btnSPVFiltrarInformacion"} onClick={this.GetPrereportes} className={className} color={color} iconOnly={true} icon="fa fa-search" style={{ marginRight: 5, color, background: 'red' }} />
                    </div>
                    </div>
                <page.Filters>
                        <EstatusReporteFilter size={[12, 12, 6, 6]} />
                </page.Filters>
                {/*<dt.PageTable columns={columns} />*/}
                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>
                </div>
                </page.Main>;
        };
    };
};

import prereportes = EK.Modules.SCV.Pages.postventa.RUBA.Prereporte;