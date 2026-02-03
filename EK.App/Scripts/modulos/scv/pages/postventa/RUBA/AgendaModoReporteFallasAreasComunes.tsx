namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaModoReporteFallaAreasComunes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Agenda", "kontrol");

    interface IPropsAgendaModoReporteFalla extends page.IProps {
        UserDashBoard?: any;
        RouteDashBoard?: any;
    }

    export const Vista: any = global.connect(class extends React.Component<IPropsAgendaModoReporteFalla, IPropsAgendaModoReporteFalla>{
        constructor(props: IPropsAgendaModoReporteFalla) {
            super(props);
        };

        componentWillMount(): any {
            dispatchSuccessful("load::funcionAgenda", { tipo: "ContratistaAreasComunes" });
            dispatchDefault("load::AgendaNewCalendasUser", null);
            global.dispatchSuccessful("global-page-data", [], "AgendaDetallesCitaResult");
        };

        componentWillUnmount(): any {
            dispatchDefault("load::AgendaNewCalendasUser", null);
            global.dispatchSuccessful("global-page-data", [], "AgendaDetallesCitaResult");
        };

        render(): JSX.Element {
            return <EK.Modules.SCV.Pages.postventa.RUBA.Agenda.Agenda.Vista />
        };
    });
};

