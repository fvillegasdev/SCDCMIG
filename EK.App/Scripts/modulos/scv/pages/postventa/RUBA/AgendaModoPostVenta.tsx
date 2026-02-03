namespace EK.Modules.SCV.Pages.postventa.RUBA.AgendaModoPostVenta {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Agenda", "kontrol");

    interface IPropsAgendaModoPostventa extends page.IProps {
        UserDashBoard?: any;
        RouteDashBoard?: any;
    }

    export const Vista: any = global.connect(class extends React.Component<IPropsAgendaModoPostventa, IPropsAgendaModoPostventa>{
        constructor(props: IPropsAgendaModoPostventa) {
            super(props);
        };

        componentWillMount(): any {
            dispatchSuccessful("load::funcionAgenda", { tipo: "PostVenta" });
            dispatchDefault("load::AgendaNewCalendasUser", null);
            global.dispatchSuccessful("global-page-data", [], "AgendaDetallesCitaResult");
            //global.dispatchSuccessful("load::UsuariosAgenda", []);
            //global.dispatchSuccessful("load::dashBoardAgendaIndicadoresEstados", null);
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

