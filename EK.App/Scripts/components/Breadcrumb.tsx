namespace EK.UX {
    "use strict";

    export interface IBreadcrumbProps extends React.Props<any> {
        data?: IBreadcrumbItem[];
        idPage?: string;
        idModulo?: string;
        item?: DataElement;
        state?: DataElement;
        pageLink?: DataElement;
        pageMode?: PageMode;
    };
    export interface IBreadcrumbItem {
        text: string;
        href?: string;
        link?: string;
        icon?: string;
    };
    export interface IBreadcrumbItemProps extends IBreadcrumbItem, React.Props<any> {
    }
    class Breadcrumb$base extends React.Component<IBreadcrumbProps, {}> {
        constructor(props:IBreadcrumbItemProps) {
            super(props);
        };
        //
        static props: any = (state: any) => ({
            item: state.global.currentEntity,
            state: state.global.currentEntityState,
            pageLink: state.global.currentLink
        });
        //
        public static defaultProps: IBreadcrumbProps = {
            data: null
        };

        render(): JSX.Element {
            let bc: IBreadcrumbItem[] = [];

            if ((!this.props.data || this.props.data === null) && (this.props.idPage && this.props.idModulo)) {
                let $page: any = $ml[this.props.idPage];
                let $bc: any = $ml.bc;

                if (this.props.pageMode === PageMode.Edicion) {
                    let isNew: boolean = false;

                    try {
                        bc = [$bc.global.ek, $bc[this.props.idModulo].cg, $page.bc];
                    }
                    catch(e){
                        bc = [];
                    };

                    if (isSuccessful(this.props.state)) {
                        let state: any = getData(this.props.state);

                        if (state.isNew === true) {
                            isNew = true;
                        };
                    };

                    if (isNew) {
                        bc.push($bc.global.nuevo);
                    }
                    else {
                        if (isSuccessful(this.props.item)) {
                            bc.push($bc.global.edicion);
                        };
                    };
                } else {
                    bc = [$bc.global.ek, $bc[this.props.idModulo].cg, $page.bc];
                };
            }
            else {
                bc = this.props.data;
            };

            var items: JSX.Element[] = [];
            var itemCount: number = bc.length;

            bc.forEach((item: IBreadcrumbItem, i: number) => {
                let key: string = "bc-" + i.toString();

                if (i === itemCount - 1) {
                    // if last item, the icon is not displayed
                    items.push(<BreadcrumbItem key={key} text={item.text} link={item.link} href={item.href} icon="" />);
                } else {
                    if (item.icon != null) {
                        // if the item icon was set, display it
                        items.push(<BreadcrumbItem key={key} text={item.text} link={item.link} href={item.href} icon={item.icon} />);
                    } else {
                        // no icon, display default
                        items.push(<BreadcrumbItem key={key} text={item.text} link={item.link} href={item.href} />);
                    }
                }
            });

            return <ul className="page-breadcrumb">
                {items}
            </ul>;
        }
    }
    export class BreadcrumbItem extends React.Component<IBreadcrumbItemProps, {}> {
        public static defaultProps: IBreadcrumbItemProps =
        {
            text: "",
            href: "",
            icon: "fa fa-angle-right"
        };

        constructor(props: IBreadcrumbItemProps) {
            super(props);
        }

        render(): JSX.Element {
            return <li>
                {
                    this.props.href !== ""
                    ?
                    <a href={this.props.href}>{this.props.text}</a>
                    :
                    <ReactRouter.Link to={this.props.link}>{this.props.text}</ReactRouter.Link>
                }
                <Icon icon={this.props.icon} />
            </li>;
        }
    }

    export let Breadcrumb: any = ReactRedux.connect(Breadcrumb$base.props, null)(Breadcrumb$base);
}

import Breadcrumb = EK.UX.Breadcrumb;