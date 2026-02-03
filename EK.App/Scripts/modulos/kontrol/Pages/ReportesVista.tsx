namespace EK.Modules.Kontrol.Pages.Reportes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("reportes", "kontrol");

    export class VistaReporte extends page.Base {
        constructor(props: page.IProps) {
            super(props);
        };
        //
        /*
            let displayKV10: boolean = false;
            let displayPBI: boolean = false;

            let tipoReporte: any = Forms.getValue("TipoReporte", config.id);
            let idReporte: any = Forms.getValue("ID", config.id);
            if (tipoReporte) {
                if (tipoReporte.Clave === "RKV10") {
                    displayKV10 = true;
                }
                else if (tipoReporte.Clave === "RPBI") {
                    displayPBI = true;
                };
            };


        <modal.ModalButton icon="icon-ek-128" className="btn btn-default-ek btn-sm white" url="kontrol/reportes/preview/?modal=1" onShowModal={this.printReport} />
        */
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} customPermission={() => true}>
                <VerPBIReport />
            </page.Main>;
        };
    };
    const VerPBIReport: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);

            this.onEntityLoaded = this.onEntityLoaded.bind(this);
            this.state = { id: ["rep", new Date().getTime()].join("_") };
        };
        //
        onEntityLoaded(props: page.IProps, state: page.IProps): any {
            let reporte: any = getData(props.entidad);
            let idReporte = getDataID(props.entidad);

            if (idReporte > 0) {
                let idIFrame: string = "iframe_" + state.id;
                let idEntity: number = global.getDataID(props.entidad);
                //
                let formName: string = "pdfDocument";
                let form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action", "kontrol/reportes/pbi/view/?modal=1");
                form.setAttribute("target", idIFrame);
                //
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = "data";
                input.value = global.encodeParameters({ ID: idEntity });
                form.appendChild(input);
                //
                document.body.appendChild(form);
                //
                form.submit();
                //
                document.body.removeChild(form);
            };
        };
        componentDidMount(): any {
        };
        componentWillReceiveProps(nextProps: page.IProps, nextState: page.IProps) {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                if (global.isSuccessful(nextProps.entidad)) {
                    this.onEntityLoaded(nextProps, this.state);
                };
            };
        };
        //
        render(): JSX.Element {
            return <iframe
                id={"iframe_" + this.state.id}
                name={"iframe_" + this.state.id}
                height="100%" width="100%"
                style={{ width: "100%", height: "100%", border: "none" }} />;
        };
    });
};