namespace EK.Modules.Kontrol.Pages.HomeEK {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("admin", "kontrol");

    interface IPropsDashBoards extends page.IProps {
        UserDashBoard?: any;
        RouteDashBoard?: any;
    }

    export const Vista: any = global.connect(class extends React.Component<IPropsDashBoards, IPropsDashBoards>{
        constructor(props: IPropsDashBoards) {
            super(props);
        };
        static props: any = (state: any): any => ({
            UserDashBoard: getData(EK.Store.getState().global.app)['Me'].IdDashBoard,
            RouteDashBoard: getData(EK.Store.getState().global.app)['Me'].RutaDashBoard
        });

        componentDidMount(): any {
            if (this.props.UserDashBoard > 0) {
                go(this.props.RouteDashBoard);
            } else {
                go('/kontrol/DashBoards');
            }
        };

        render(): JSX.Element {
            return null;
        };
    });
};