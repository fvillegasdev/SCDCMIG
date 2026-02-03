
namespace EK.UX.Grids {
    "use strict";

    export enum HAlignmentEnum {
        left = 10,
        center = 11,
        right = 12
    };

    export enum VAlignmentEnum {
        top = 20,
        middle = 21,
        bottom = 22
    };

    export interface IGridSize {
        size: number;
        pull?: number;
        push?: number;
        hide?: boolean;
        type?: string;
        offset?: number;
    };

    export interface IColumn {
        hAlign?: HAlignmentEnum;
        vAlign?: VAlignmentEnum;
        size?: number[];
        xs?: number | IGridSize;
        sm?: number | IGridSize;
        md?: number | IGridSize;
        lg?: number | IGridSize;
    }

    export interface IColumnProps extends React.Props<any>, IColumn {
        style?: React.CSSProperties;
        className?: string;
    }

    interface IRowProps extends React.Props<any> {
        id?: string;
        style?: React.CSSProperties;
        className?: string;
        visible?: boolean;
    }

    export class Grid extends React.Component<{ className?: string;}, {}> {
        render(): JSX.Element {
            let className: string = ""; //"container-fluid";
            if (this.props.className) {
                className = className + " " + this.props.className;
            };
            return <div className={className}>{this.props.children}</div>;
        }
    }

    export class Row extends React.Component<IRowProps, {}> {
        static defaultProps: IRowProps = {
            visible: true
        };

        render(): JSX.Element {
            if (this.props.visible === false) {
                return null;
            };

            let id: string = this.props.id ? this.props.id : "row_" + Number(new Date());
            let classProperties: string = "row ";

            if (this.props.className) {
                classProperties += " " + this.props.className;
            }

            return <div id={id} className={classProperties} style={this.props.style}>{this.props.children}</div>;
        }
    }

    export class FullPageColumn extends React.Component<IColumnProps, {}> {
        render(): JSX.Element {
            let className: string = $.trim(this.props.className) + " full-page-row";
            let columnStyle: React.CSSProperties = this.props.style;
            if (!columnStyle) {
                columnStyle = {};
            };

            return <Row style={columnStyle} className={className}>
                <Column size={[12, 12, 12, 12]} className="full-page-column">
                    {this.props.children}
                </Column>
            </Row>;
        }
    }

    export class LeftColumn extends React.Component<IColumnProps, {}> {
        render(): JSX.Element {
            let className: string = this.props.className;
            let columnStyle: React.CSSProperties = this.props.style;
            if (!columnStyle) {
                columnStyle = {};
            };
            

            columnStyle.margin = 0;
            columnStyle.padding = "0px 20px 0px 20px";

            return <Column
                style={columnStyle}
                className={className}
                size={[12, 12, 8, 8]}>
                    <div>
                        {this.props.children}
                    </div>
            </Column>;
        }
    }

    export class RightColumn extends React.Component<IColumnProps, {}> {
        render(): JSX.Element {
            return <Column size={[12, 12, 4, 4]} style={{ marginTop: 10 }}>
                {this.props.children}
            </Column>;
        }
    }

    export class Column extends React.Component<IColumnProps, {}> {
        static defaultProps: IColumnProps = {
            hAlign: HAlignmentEnum.left,
            vAlign: VAlignmentEnum.top,
            size: [12,12,12,12]
        };

        selectColumnSize(op1: number, op2: number): string {
            if (op1) {
                return op1.toString();
            } else {
                if (op2) {
                    return op2.toString();
                }
            }

            // default full size
            return "12";
        }

        parseGridSize(type: string, size: IGridSize): string {
            let retValue: string = "";

            if (size) {
                if (size.hide) {
                    retValue = "hidden-" + type;
                } else {
                    if (size.size) {
                        retValue += " col-" + type + "-" + size.size;
                    }
                    if (size.pull) {
                        retValue += " col-" + type + "-pull-" + size.pull;
                    }
                    if (size.push) {
                        retValue += " col-" + type + "-push-" + size.push;
                    }
                    if (size.offset) {
                        retValue += " col-" + type + "-offset-" + size.offset;
                    }
                }
            }

            return retValue;
        };

        render(): JSX.Element {
            let classProperties: string = "";            

            if (this.props.xs) {
                if (typeof this.props.xs === "object") {
                    classProperties += " " + this.parseGridSize("xs", this.props.xs);
                } else {
                    classProperties += " col-xs-" + this.selectColumnSize(this.props.xs, this.props.size[0]);
                }
            } else {
                if (this.props.size.length >= 0) {
                    classProperties += " col-xs-" + this.props.size[0];
                }
            };

            if (this.props.sm) {
                if (typeof this.props.sm === "object") {
                    classProperties += " " + this.parseGridSize("sm", this.props.sm);
                } else {
                    classProperties += " col-sm-" + this.selectColumnSize(this.props.sm, this.props.size[1]);
                }
            } else {
                if (this.props.size.length >= 1) {
                    classProperties += " col-sm-" + this.props.size[1];
                }
            };

            if (this.props.md) {
                if (typeof this.props.md === "object") {
                    classProperties += " " + this.parseGridSize("md", this.props.md);
                } else {
                    classProperties += " col-md-" + this.selectColumnSize(this.props.md, this.props.size[2]);
                }
            } else {
                if (this.props.size.length >= 2) {
                    classProperties += " col-md-" + this.props.size[2];
                }
            };

            if (this.props.lg) {
                if (typeof this.props.lg === "object") {
                    classProperties += " " + this.parseGridSize("lg", this.props.lg);
                } else {
                    classProperties += " col-lg-" + this.selectColumnSize(this.props.lg, this.props.size[3]);
                }
            } else {
                if (this.props.size.length >= 3) {
                    classProperties += " col-lg-" + this.props.size[3];
                }
            };

            if (this.props.className) {
                classProperties += " " + this.props.className;
            }

            return <div className={classProperties} style={this.props.style}>{this.props.children}</div>;
        }
    }

    export class FadeInColumn extends React.Component<grid.IColumnProps, {}> {
        static defaultProps: grid.IColumnProps = {
            size: []
        };

        render(): JSX.Element {
            let props: any = EK.Global.assign({}, this.props);
            props.className = [this.props.className, "ek-fadein-box"].join(" ");

            return <Column {...props} />;
        }
    }

    export interface FadeInUpdateColumnProps extends React.Props<any> {
        text?: string;
        size?: number;
        top?: number;
        bottom?: number;
        info?: any;
        className?: string;
    };

    export class FadeInUpdateColumn extends React.Component<FadeInUpdateColumnProps, {}> {
        static defaultProps: LeftPanelUpdateProps = {
            text: ""
        };

        render(): any {
            if (isDefault(this.props.info)) {
                return <FadeInColumn className={this.props.className}>{this.props.children}</FadeInColumn>;
            } else if (hasFailed(this.props.info)) {
                return <FadeInColumn className={this.props.className}><Updating text="error..." size={this.props.size} top={this.props.top} bottom={this.props.bottom} /></FadeInColumn>;
            } else if (isLoading(this.props.info)) {
                return <FadeInColumn className={this.props.className}><Updating text={this.props.text} size={this.props.size} top={this.props.top} bottom={this.props.bottom} /></FadeInColumn>;
            } else if (isUpdating(this.props.info)) {
                return <FadeInColumn className={this.props.className}><Updating text={this.props.text} size={this.props.size} top={this.props.top} bottom={this.props.bottom} /></FadeInColumn>;
            } else if (isSuccessful(this.props.info)) {
                return <FadeInColumn className={this.props.className}>{this.props.children}</FadeInColumn>;
            } else {
                return null;
            };
        };
    };
    export class EditButton extends React.Component<buttons.IButtonProps, buttons.IButtonProps> {
        render(): any {
            return <Column size={[1, 1, 1, 1]}>
                <Button className="btn-default-ek" onClick={this.props.onClick} info={this.props.info} icon="icon-pencil"></Button>
            </Column>;
        };
    };
    interface EstatusColumnProps extends IColumnProps {
        item: any;
    };
    export class EstatusColumn extends React.Component<EstatusColumnProps, EstatusColumnProps> {
        render(): any {
            return <Column size={[2, 3, 1, 1]}>{EK.UX.Labels.badgeEstatus(this.props.item)}</Column>;
        };
    };
    interface IItemRowProps extends IRowProps {
        item: any;
    };
    export class ItemRow extends React.Component<IItemRowProps, IItemRowProps> {
        render(): any {
            return React.Children.map(this.props.children, (child: React.ReactChild, index: number) => {
                //let newChild: any = React.cloneElement(child, {});
            }); 
        };
    };
};

import grid = EK.UX.Grids;

import UpdateColumn = EK.UX.Grids.FadeInUpdateColumn;
import FadeInColumn = EK.UX.Grids.FadeInColumn;
import LeftColumn = EK.UX.Grids.LeftColumn;
import RightColumn = EK.UX.Grids.RightColumn;
import FullPageColumn = EK.UX.Grids.FullPageColumn;
import Column = EK.UX.Grids.Column;
import Row = EK.UX.Grids.Row;
import Grid = EK.UX.Grids.Grid;