// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX {
    const w: any = window;
    //var template = ['<div class="popover">',
    //  '<div class="arrow"></div>',
    //  '<h3 class="popover-title"></h3>',
    //  '<div class="popover-content"></div>',
    //  '<div class="popover-footer"></div>',
    //  '</div>'].join('');

    interface IPopover extends React.Props<any> {
        title?: string;
        label?: string;
        style?: React.CSSProperties;
        className?: string;
        content?: any;
        trigger?: string;
        placement?: string;
    }

    export class Popover extends React.Component<IPopover, IPopover> {
        constructor(props: IPopover) {
            super(props);
            this.onPopover = this.onPopover.bind(this);
        }
        static defaultProps: IPopover = {
            title: "",
            label: "",
            className: "",
            content: <div>&nbsp;</div>,
            trigger: "manual",
            placement: "right"
        }
        refs: {
            link: Element;
        };
        onPopover(): void {
            let content: any = w.ReactDOMServer.renderToStaticMarkup(this.props.content);
            let title: string = this.props.title ? this.props.title : "";
            let trigger: string = this.props.trigger ? this.props.trigger : "";
            let placement: string = this.props.placement ? this.props.placement : "";
            let link: any = $(this.refs.link);

            link.popover({
                trigger: trigger,
                html: true,
                content: content,
                title: title,
                container: 'body',
                placement: placement
            }).on("mouseenter", function () {
                link.popover("show");
            }).on("mouseleave", function () {
                link.popover("hide");
            }).on("show.bs.popover", function () {
                $(this).data("bs.popover").tip().css("max-width", "600px");
            });
        }
        onMouseEnter(): void {
            this.onPopover();
        }
        render(): JSX.Element {
            let className: string = "popovers ";

            if (this.props.className) {
                className = className + this.props.className;
            }

            return <span
                ref="link"
                role="button"
                data-toggle="popover"
                className={className}
                style={this.props.style}
                onMouseEnter={this.onMouseEnter.bind(this)}>
                {this.props.label}
                {this.props.children}
            </span>
        }
    }

    export class HoverCard extends React.Component<IPopover, IPopover> {
        constructor(props: IPopover) {
            super(props);
            this.onPopover = this.onPopover.bind(this);
        }
        static defaultProps: IPopover = {
            title: "",
            label: "",
            className: "",
            content: <div>&nbsp;</div>,
            trigger: "manual",
            placement: "right"
        }
        refs: {
            link: Element;
        };
        onPopover(): void {
            let content: any = this.props.content;
            let title: string = this.props.title ? this.props.title : "";
            let trigger: string = this.props.trigger ? this.props.trigger : "";
            let placement: string = this.props.placement ? this.props.placement : "";
            let link: any = $(this.refs.link);

            link.popover({
                offset: 10,
                trigger: trigger,
                html: true,
                content: content,
                title: title,
                container: 'body',
                placement: placement
            }).on("mouseenter", function () {
                link.popover("show");
                $(".popover").on("mouseleave", function () {
                    link.popover('hide');
                });
            }).on("mouseleave", function () {
                setTimeout(function () {
                    if (!$(".popover:hover").length) {
                        link.popover("hide");
                    }
                }, 100);
            }).on("show.bs.popover", function () {
                $(this).data("bs.popover").tip().css("max-width", "600px");
                $(this).data('bs.popover').options.content = content;
            });
        }
        componentDidMount(): void {
            //this.onPopover();
        }
        onMouseEnter(e): void {
            this.onPopover();
        }
        render(): JSX.Element {
            let className: string = "popovers ";
            if (this.props.className) {
                className = className + this.props.className;
            }

            return <span
                ref="link"
                role="button"
                data-toggle="popover"
                className={className}
                style={this.props.style}
                onMouseEnter={this.onMouseEnter.bind(this)}>
                {this.props.label}
                {this.props.children}
            </span>
        }
    }
}