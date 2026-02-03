namespace EK.UX.Tabs {
    "use strict";

    interface IAccionTabProps extends EK.UX.IPortletTabPaneProps {
        entidad?: any;
        claveOpcion?: any;
        actionState?: DataElement;
        pageMode?: page.PageMode;
    }

    class Resultados$Panel extends React.Component<IAccionTabProps, IAccionTabProps> {
        constructor(props: IAccionTabProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        };

        static defaultProps: IAccionTabProps = {
            data: {},
            icon: "fad fa-table",
            title: "Resultados"
        };

        onClick(item: any): any {
            let route: string = ReactRouter.hashHistory.getCurrentLocation().pathname;
            let routeParts: string[] = route.split("/");
            //
            let newRoute: string = "";
            //
            for (var i = routeParts.length - 1; i >= 0; i--) {
                let part: string = $.trim(routeParts[i]);

                if (part !== "") {
                    for (var j = 0; j < i; j++) {
                        newRoute += routeParts[j] + "/";
                    };
                    //
                    break;
                };
            };
            //
            newRoute += item.ID;
            //
            go(newRoute);
        };

        shouldComponentUpdate(nextProps: IAccionTabProps, nextState: IAccionTabProps): boolean {
            return hasChanged(this.props.currentCatalogo, nextProps.currentCatalogo);
        };

        componentWillMount() {

        };

        componentWillReceiveProps(nextProps: IAccionTabProps) {
        };

        render(): JSX.Element {
            if (this.props.pageMode !== page.PageMode.Edicion) {
                return null;
            };

            if (!global.isSuccessful(this.props.currentCatalogo)) {
                return null;
            };

            let items: any[] = global.getData(this.props.currentCatalogo);

            if (!items || items.length === 0) {
                return null;
            };

            return <ul style={{ listStyle: "none", padding: 10, margin: 0 }}>
                {items.map((value: any, index: number) => {
                    return <li key={index} style={{ padding: 5, borderBottom: "solid 1px #f1f1f1", height: 45 }}>
                        <div style={{ width: 240, float: "left" }}>
                            <div style={{ fontSize: 12, color:"#82B1FF"}}>{value.Clave}</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#78909C" }}>{value.Nombre}</div>
                        </div>
                        <div style={{ float: "right", width: 30, padding: 10, cursor: "pointer" }} onClick={() => this.onClick(value)}>
                            <i className="fad fa-external-link" style={{ fontSize: 14, color: "#AA00FF" }}></i>
                        </div>
                    </li>;
                })}
            </ul>;
        };
    };

    const resultadosProps: any = (state: any): any => {
        return {
            claveOpcion: state.global.page,
            entidad: state.global.currentEntity,
            actionState: state.global.currentActionState,
            currentEntityType: state.global.currentEntityType,
            currentCatalogo: state.global.currentCatalogo,
            config: global.getPageConfig(state.global.pageConfig)
        };
    };
    export let ResultadosPanel: any = ReactRedux.connect(resultadosProps, null)(Resultados$Panel);
}

import ResultadosTab = EK.UX.Tabs.ResultadosPanel;