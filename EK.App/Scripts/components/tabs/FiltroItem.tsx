namespace EK.UX.Tabs {
    "use strict";

    interface IFiltroItemProps extends IPortletTabPaneProps {
        data?: any;       
    }

    export class FiltroItem extends React.Component<IFiltroItemProps, IFiltroItemProps> {
        constructor(props: IFiltroItemProps) {
            super(props);
            
        };
        
        static defaultProps: IFiltroItemProps = {
            data: {},
            icon: "fa fa-filter",
            title: "Filtros",

        };

        refs: {
            tabContainer: Element;
            tabTitle: Element;
        };

        shouldComponentUpdate(nextProps: IFiltroItemProps, nextState: IPortletTabPaneState): boolean {
            return getTimestamp(this.state) !== getTimestamp(nextState);
        };
        render(): JSX.Element {
           return <PortletTabPane 
                title={this.props.title}
                icon={this.props.icon}>
               {this.props.children}
            </PortletTabPane>;
        };
    };

    export interface IPageFilterProps extends global.props, page.IProps {
        onWillFilter?: (props: any, filters: any) => any;
        autoFilterProps?: string[];
        collapsed?: boolean;
        refreshIcon?: string;
    };
    export class PageFilter extends React.Component<IPageFilterProps, IPageFilterProps> {
        constructor(props: IPageFilterProps) {
            super(props);
            this.onWillFilter = this.onWillFilter.bind(this);
            this.onFilter = this.onFilter.bind(this);
        };
        static defaultProps: IPageFilterProps = {
            $displayName: "PageFilter",
            refreshIcon: "fas fa-sync-alt"
        };
        static props: IPageFilterProps = global.pageProps;
        onWillFilter(filters: any): any {
            let retValue: any = filters;
            if (this.props.onWillFilter) {
                retValue = this.props.onWillFilter(this.props, filters);
            };
            return retValue;
        };
        onFilter(filters: any): any {
            let retValue: any = filters;
            if (this.props.onFilter) {
                retValue = this.props.onFilter(this.props, filters);
            };
        };
        render(): JSX.Element {
            if (!this.props.config.id) {
                return null;
            };
            let idForm: string = [this.props.id, "$filters"].join("");
            let collapsed: boolean = (this.props.collapsed === undefined || this.props.collapsed === null) ? true : this.props.collapsed;
            return <page.OptionSection
                id={idForm}
                title="Búsqueda avanzada"
                icon="fas fa-search"
                level={1}
                collapsed={collapsed}
                hideCollapseButton={false}>
                <SectionButtons>
                    <buttons.RefreshFilterButton iconOnly={true} icon={this.props.refreshIcon} color="font-white" onWillFilter={this.props.onWillFilter} onFilter={this.props.onFilter} />
                </SectionButtons>
                <Row>
                    {Forms.cloneChildrenElements(this.props.children, (p: any) => {
                        p.idFormSection = idForm;
                        return p;
                    })}
                </Row>
                {/*<PageFilterAutoRefresh {...this.props} />*/}
            </page.OptionSection>;
        };
    };

    export class PageFilterV2 extends React.Component<IPageFilterProps, IPageFilterProps> {
        constructor(props: IPageFilterProps) {
            super(props);
            this.onWillFilter = this.onWillFilter.bind(this);
            this.onFilter = this.onFilter.bind(this);
        };
        static defaultProps: IPageFilterProps = {
            $displayName: "PageFilter",
            refreshIcon: "fas fa-sync-alt"
        };
        static props: IPageFilterProps = global.pageProps;
        onWillFilter(filters: any): any {
            let retValue: any = filters;
            if (this.props.onWillFilter) {
                retValue = this.props.onWillFilter(this.props, filters);
            };
            return retValue;
        };
        onFilter(filters: any): any {
            let retValue: any = filters;
            if (this.props.onFilter) {
                retValue = this.props.onFilter(this.props, filters);
            };
        };
        render(): JSX.Element {
            if (!this.props.config.id) {
                return null;
            };
            let idForm: string = [this.props.id, "$filters"].join("");
            let collapsed: boolean = (this.props.collapsed === undefined || this.props.collapsed === null) ? true : this.props.collapsed;
            return <page.OptionSection
                id={idForm}
                title="Filtros de busqueda"
                icon="fas fa-search"
                level={1}
                collapsed={collapsed}
                hideCollapseButton={false}>
                <SectionButtons>
                    <buttons.RefreshFilterButton iconOnly={true} icon={this.props.refreshIcon} color="font-white" onWillFilter={this.props.onWillFilter} onFilter={this.props.onFilter} />
                </SectionButtons>
                <Row>
                    {Forms.cloneChildrenElements(this.props.children, (p: any) => {
                        p.idFormSection = idForm;
                        return p;
                    })}
                </Row>

            </page.OptionSection>;
        };
    };
    export interface IPageFilterAutoRefreshProps extends IPageFilterProps {
        forms?: any;
    };
    export class Page$FilterAutoRefresh extends React.Component<IPageFilterAutoRefreshProps, IPageFilterAutoRefreshProps> {
        constructor(props: IPageFilterProps) {
            super(props);
        };
        static pageProps: any = (state: any) => {
            return {
                forms: state.forms
            };
        };
        componentWillReceiveProps(nextProps: IPageFilterAutoRefreshProps) {
            let af: string[] = this.props.autoFilterProps;
            let refresh: boolean = false;
            //
            if (af && af.length > 0) {
                let cForm: EditForm = EditForm.getForm(this.props.forms[this.props.config.idFilters]);
                let nForm: EditForm = EditForm.getForm(nextProps.forms[this.props.config.idFilters]);
                //
                for (var i = 0; i < af.length; i++) {
                    let p: string = af[i];
                    //
                    if (global.hasChanged(cForm[p], nForm[p])) {
                        refresh = true;
                        //
                        break;
                    };
                };
            };

            if (refresh) {
                page.applyFilter(nextProps);
            };
        };
        shouldComponentUpdate(nextProps: IPageFilterAutoRefreshProps, nextState: IPageFilterAutoRefreshProps): boolean {
            return false;
        };
        render(): JSX.Element {
            return null;
        };
    };
    export const PageFilterAutoRefresh: any = ReactRedux.connect(Page$FilterAutoRefresh.pageProps, null)(Page$FilterAutoRefresh);
};

import Filtro$Tab = EK.UX.Tabs.FiltroItem;
import PageFilter = EK.UX.Tabs.PageFilter;