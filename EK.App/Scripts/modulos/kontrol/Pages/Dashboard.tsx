namespace EK.Modules.Kontrol.Pages {
    "use strict";

    const PAGE_ID: string = "ENK000";

    interface IDashboardProps extends React.Props<any> {}

    export class PageDashboard extends React.Component<IDashboardProps, IDashboardProps> {
        constructor(props: IDashboardProps) {
            super(props);
        };

        render(): JSX.Element {
            let bc: any = [
                { text: "EK", link: "/" },
                { text: "Dashboard", link: "/" }
            ];

            let page: JSX.Element =
                <PageV2 id={PAGE_ID} title={"Dashboard"} breadcrumb={bc}>
                    <Clasificadores$Perfil$Tab panel={true} perfil={true} />
                    <Favoritos$Tab panel={true} />
                </PageV2>;

            return page;
        }
    }

    //
    // map props
    //
    export class $dashboardPage {
        static getProps(state: any): any { return {}; };
        static dispatchs: any = {};
        static getDispatchs(): any { return $dashboardPage.dispatchs; };
    };

    // 
    // connect
    // 
    export let DashboardPage: any = ReactRedux.connect($dashboardPage.getProps, $dashboardPage.getDispatchs)(PageDashboard);
}