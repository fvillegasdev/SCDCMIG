namespace EK.UX.Kontrol.HorizontalTimeLine {
    "use strict";
    declare var initTimeLines: () => any
    export interface IHorizontalTimeLine extends React.Props<any> {
        items?: any[] | DataElement;
        onClickElementHorizontal?: (item: any) => void;
        page: any;
        tipoPresentacion: any;
        desactivarFondo?: boolean; 
        customScroll?: boolean;
        desactivarNavegacion?: boolean;
        idSeleccionado?: any; 
    }

    export class cHorizontalTimeLine extends React.Component<IHorizontalTimeLine, {}> {
        constructor(props: IHorizontalTimeLine) {
            super(props);
            this.onClickEH = this.onClickEH.bind(this);
        };
        static props: any = (state: any) => ({

        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });

        refs: {
            timeLine: Element;
        };

        onClickEH(item: any): any {

            if (this.props.onClickElementHorizontal) {
                this.props.onClickElementHorizontal(item);
            }

        }

        shouldComponentUpdate(nextProps: IHorizontalTimeLine, nextState: IHorizontalTimeLine): boolean {
            return hasChanged(this.props.items, nextProps.items);
        };

        componentDidMount(): void {
            initTimeLines();
        }

        componentWillUnmount(): void {
        }

        componentWillUpdate(nextProps: IHorizontalTimeLine, nextState: any) {
        }

        componentDidUpdate(): void {
        }

        render(): JSX.Element {
            let items: any;
            let $page: any = this.props.page;
            let Items: any = this.props.items;
            let listData: any[] = Items && Items.data ? Items.data : this.props.items;
            let hasData: boolean = listData != undefined && listData.length > 0;
            let fechaActual: Date;

            if (hasData) {
                if (this.props.tipoPresentacion === 1) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                return <li key={itemKey} >
                                    <HorizontalTimeModelo1
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }
                // diseño 2
                if (this.props.tipoPresentacion === 2) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let simboloEstadistica: any = '0';
                        let monto: number = 0;
                        let monto1: number = 0;
                        let monto2: number = 0;
                        let total_operacion: number = 0;
                        let total_pagado: number = 0;
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                ////// esto es para pruebas falta la consulta que extrae los valores
                                simboloEstadistica = '-';
                                monto1 = Math.floor((Math.random() * 100) + 1);
                                monto2 = Math.floor((Math.random() * 100) + 1);
                                monto = Math.floor((Math.random() * (monto1 - monto2)) + 1);
                                simboloEstadistica = '+';
                                if (monto === 0) {
                                    simboloEstadistica = '0';
                                } else {
                                    if (monto <= 0) {
                                        simboloEstadistica = '-';
                                    }
                                }
                                total_operacion = Math.floor((Math.random() * 1800000) + 1);
                                total_pagado = Math.floor((Math.random() * total_operacion) + 1);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo2
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }
                if (this.props.tipoPresentacion === 3) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo3
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }


                if (this.props.tipoPresentacion === 4) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo4
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 5) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                //console.log(item)
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo5
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 6) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo6
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        idSeleccionado={this.props.idSeleccionado === undefined || this.props.idSeleccionado === null ? undefined : this.props.idSeleccionado} 
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }
                if (this.props.tipoPresentacion === 7) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo6
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 8) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date()
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);

                                return <li key={itemKey} >
                                    <HorizontalTimeModelo8
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={item.Clave} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 9) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date();
                                //
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                //
                                return <li key={itemKey} >
                                    <HorizontalTimeModelo9
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={global.getNestedProp(item, "Fase.Clave")} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                //OHSS
                if (this.props.tipoPresentacion === 10) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date();
                                //
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                //
                                return <li key={itemKey} >
                                    <HorizontalTimeModelo10
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={global.getNestedProp(item, "Desarrollo.Clave")} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                //OHSS
                if (this.props.tipoPresentacion === 11) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date(item.DTStart);
                                //
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                //fechaActual.setDate(fechaActual.getDate() + i);
                                //
                                return <li key={itemKey}  >
                                    <HorizontalTimeModelo11
                                        fechaTimeLine={EK.UX.Labels.formatDate(item.DTStart)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={global.getNestedProp(item, "Desarrollo.Clave")} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 12) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date();
                                //
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                //
                                return <li key={itemKey} >
                                    <HorizontalTimeModelo12
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={global.getNestedProp(item, "Desarrollo.Clave")} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

                if (this.props.tipoPresentacion === 13) {
                    let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                        let retValue: any = (items === undefined || items === null) ? null :
                            items.map((item: any, i: number): any => {
                                fechaActual = new Date();
                                //
                                let itemKey: string = "list-item-key-" + (item.ID !== undefined && item.ID !== null ? item.ID : i);
                                fechaActual.setDate(fechaActual.getDate() + i);
                                //
                                return <li key={itemKey} >
                                    <HorizontalTimeModelo13
                                        fechaTimeLine={EK.UX.Labels.formatDate(fechaActual)}
                                        idElement={i}
                                        item={item}
                                        onItemClick={this.onClickEH}
                                        clave={global.getNestedProp(item, "Desarrollo.Clave")} />
                                </li>;
                            });
                        return retValue;
                    };
                    items = fnCreateList(listData);
                }

            }

            if (hasData) {
                let dataSpacing: number = 50;
                let withContent: number = 220;
                let onCustomScroll: any = (target: number) => {
                    let wrapper: any = $(".events-wrapper");
                    if (wrapper.size() === 1) {
                        wrapper.animate({ scrollLeft: wrapper[0].scrollLeft + (400 * target)}, 500);
                    };
                };
                let estiloActivarFondo: React.CSSProperties = this.props.desactivarFondo ? {
                    height: "160%",
                    background: "none",
                    border: "0"
                } :
                {
                    height: "160%",
                    margin: "0px 10px 0px 14px"
                };

                if (this.props.customScroll === true) {
                    if (this.props.tipoPresentacion === 9) {
                        dataSpacing = 50;
                        withContent = 220;
                    } else if (this.props.tipoPresentacion === 11) {
                        dataSpacing = 60;
                        withContent = 380;
                    }
                    else {
                        dataSpacing = 20;
                        withContent = 170;
                    }
                    if (this.props.tipoPresentacion === 11) {
                        estiloActivarFondo.overflow = "scroll";
                        estiloActivarFondo.overflowY = "hidden";
                        estiloActivarFondo.height = 120;
                    }
                    else {
                        estiloActivarFondo.overflow = "scroll";
                        estiloActivarFondo.overflowY = "hidden";
                        estiloActivarFondo.height = 130;
                    }
                };

                //$(".events-wrapper").animate({ scrollLeft: $(".events-wrapper")[0].scrollLeft + -400 }, 500)
                   return <div>
                       <div className="cd-horizontal-timeline mt-timeline-horizontal" data-spacing={dataSpacing} data-ek_with_content={withContent}>
                        <div className="timeline mt-timeline-square">
                               <div className="events-wrapper" style={ estiloActivarFondo }>
                                <div className="events" style={{ transform: "translateX(0px)" }}>
                                    <ol>
                                        {items}
                                    </ol>
                                    <span className="filling-line bg-blue" aria-hidden="true" style={{ transform: "scaleX(0.0841556)" }}></span>
                                </div>
                               </div>
                               {this.props.desactivarNavegacion === true ? null :
                                   this.props.customScroll === true ? 
                                   <ul className="cd-timeline-navigation mt-ht-nav-icon">
                                       <li>
                                        <a className="btn blue md-skip inactive " style={{ height: 28, width: 28, cursor: "pointer", left: 0 }} onClick={() => { onCustomScroll(-1); }}>
                                            <i className="fa fa-chevron-left" style={{ width: 6 }}></i>
                                          </a>
                                       </li>
                                       <li>
                                               <a className="btn blue md-skip" style={{ height: 28, width: 28, cursor: "pointer", right: 0 }} onClick={() => { onCustomScroll(1); }}>
                                                <i className="fa fa-chevron-right" style={{ width: 6 }}></i>
                                           </a>
                                       </li>
                                   </ul>
                                   :
                                   <ul className="cd-timeline-navigation mt-ht-nav-icon">
                                       <li>
                                           <a className="prev btn blue md-skip inactive ">
                                               <i className="fa fa-chevron-left"></i>
                                           </a>
                                       </li>
                                       <li>
                                           <a className="next btn blue md-skip">
                                               <i className="fa fa-chevron-right"></i>
                                           </a>
                                       </li>
                                       </ul> 
                                   }
                        </div>
                    </div>
                </div>;
            } else {
                return <div>

                </div>;
            }


        }
    }

    interface IHorizontalTimeDetalleProps extends React.Props<any> {
        clave?: any;
        item: any;
        idElement: number;
        fechaTimeLine?: any;
        indicadorEstadistico?: any;
        onItemClick?: (item: any) => void;
        /////////////// esto es temporal
        totalPagado?: any;
        totalOperacion?: any;
        idSeleccionado?: any; 
    };

    class HorizontalTimeModelo1 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        onClick(item: any, e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(item);
            }
        }
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let valorEstatus: any;
            valorEstatus = EK.UX.Labels.badgeEstatus(this.props.item.Estatus);
            return (
                <a data-spacing="50" data-ek_with_content="200" className={"border-after-blue ek-bg-after-blue  " + seleccion} href="#" onClick={(e) => this.onClick(this.props.item, e)} style={{ top: "-40px", border: "1px solid #e7ecf1", marginBottom: "-80px", height: "123px" }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" >
                        <div className="display" style={{ textAlign: "left" }}>
                            <div className="number">
                                <h3 className={""}>
                                    <span data-value="1349" data-counter="counterup">&nbsp; </span>
                                </h3>
                                <small style={{ color: "rgb(25, 118, 210)" }}>{this.props.clave}</small>
                            </div>

                        </div>
                    </div>
                </a>
            );

        }
    }



    class HorizontalTimeModelo2 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        onClick(item: any, e: any): any {
            if (this.props.onItemClick) {
                this.props.onItemClick(item);
            }
        }
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';

            let indicadorEstadisitico: any = this.props.indicadorEstadistico ? this.props.indicadorEstadistico : '0';
            let total_x_pagar: number = this.props.totalOperacion - this.props.totalPagado;
            let porcentaje_x_pagar: number = 100 - ((total_x_pagar / this.props.totalOperacion) * 100);

            let iconos_estadistica: any = {};
            let color_estadistica: any = {};
            let icono_tipo_requisito: any = {};
            //
            iconos_estadistica['-'] = "fa fa-arrow-circle-down";
            iconos_estadistica['+'] = "fa fa-arrow-circle-up";
            iconos_estadistica['0'] = " ";
            //
            color_estadistica['-'] = "font-red-haze";
            color_estadistica['+'] = "font-green-haze";
            color_estadistica['0'] = "font-default-haze";

            let valorEstatus: any;
            valorEstatus = EK.UX.Labels.badgeEstatus(this.props.item.Estatus);


            return (
                <a data-spacing="50" data-ek_with_content="200" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={(e) => this.onClick(this.props.item, e)} style={{ top: "-40px", border: "1px solid #e7ecf1", marginBottom: "-80px", height: "130px" }} data-date={this.props.fechaTimeLine} >


                    <div className="dashboard-stat2" >
                        <div className="display" >
                            <div className="number" style={{ float: "right" }}>
                                <span style={{ textAlign: "right" }}>
                                    <h3 className={""} style={{ color: "darkgrey", fontWeight: "bold" }}>
                                        <span data-value="1349" data-counter="counterup">{this.props.item.Periodo}-{this.props.clave}</span>
                                    </h3>
                                </span>
                                <div style={{ marginTop: "-11px", fontSize: "x-small", fontStyle: "oblique", color: "darkgrey", textAlign: "right" }}><h6>{EK.UX.Labels.formatDate(this.props.item.FechaInicio)}</h6></div>
                                <div style={{ marginTop: "-11px", fontSize: "x-small", fontStyle: "oblique", color: "darkgrey", textAlign: "right" }}><h6>{EK.UX.Labels.formatDate(this.props.item.FechaFin)}</h6></div>

                            </div>
                        </div>
                        <div className="progress-info" style={{ marginTop: "-22px" }}>
                            <div className="progress">
                                <span className="progress-bar progress-bar-success red-haze" style={{ width: EK.UX.Labels.formatDecimal(porcentaje_x_pagar) + "%" }}>
                                    <span className="sr-only"></span>
                                </span>
                            </div>
                            <div className="status">
                                <div className="status-title"> </div>
                                <div className="status-number"> </div>
                            </div>
                        </div>
                    </div>
                </a>
            );

        }
    }



    class HorizontalTimeModelo3 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusActiveClick = this.onEstatusActiveClick.bind(this);
            this.onEstatusWarningClick = this.onEstatusWarningClick.bind(this);
            this.onEstatusExpiredClick = this.onEstatusExpiredClick.bind(this);
            this.onEstatusSuspendedClick = this.onEstatusSuspendedClick.bind(this);
            this.onEstatusRepClick = this.onEstatusRepClick.bind(this);
            this.onEstatusAteClick = this.onEstatusAteClick.bind(this);
        };
        onEstatusActiveClick(e: any) {
            this.onEstatusClick(e, "ACT");
        };
        onEstatusWarningClick(e: any) {
            this.onEstatusClick(e, "W");
        };
        onEstatusExpiredClick(e: any) {
            this.onEstatusClick(e, "V");
        };
        onEstatusSuspendedClick(e: any) {
            this.onEstatusClick(e, "SUS");
        };
        onEstatusRepClick(e: any) {
            this.onEstatusClick(e, "REP");
        };
        onEstatusAteClick(e: any) {
            this.onEstatusClick(e, "ATE");
        };
        onEstatusClick(e: any, estatus?: String): any {
            e.stopPropagation();
            let valor: number; 
            valor = 0; 
            if (estatus === "ACT"){
                valor = this.props.item.CantidadActivas;
            }
            if (estatus === "W") {
                valor = this.props.item.CantidadPorVencer;
            }
            if (estatus === "V") {
                valor = this.props.item.CantidadVencidas;
            }
            if (estatus === "SUS") {
                valor = this.props.item.CantidadSuspendidas;
            }
            if (estatus === "REP") {
                valor = this.props.item.CantidadReprogramadas;
            }
            if (estatus === "ATE") {
                valor = this.props.item.CantidadAtendidas;
            }

            
            //
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }
          
            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus=== undefined ) && valor === 0) ){
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175  }} data-date={this.props.fechaTimeLine} >
                    {this.props.item.Usuario && this.props.item.Usuario
                        ?
                        <img alt="" className="img-circle" src={this.props.item.Usuario.Foto} style={{ width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: 200 }} />
                        : null}
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: 90 }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px" }}>
                            <h6  >
                                <span data-value="1349" data-counter="counterup"> {this.props.clave}</span>
                            </h6>
                        </div>
                        
                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px", height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop: "-2px" }}>
                                <div className="mt-icon btn active" title={"A tiempo"} onClick={this.onEstatusActiveClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadActivas ? this.props.item.CantidadActivas : '' }<br />
                                    <i className="fa fa-circle" style={{ color: "#8bc780", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn warning" title={"Por Vencer"} onClick={this.onEstatusWarningClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadPorVencer ? this.props.item.CantidadPorVencer : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff8f00", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" title={"Vencidas"}  onClick={this.onEstatusExpiredClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadVencidas ? this.props.item.CantidadVencidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#df0707", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn suspended" title={"Suspendidas"}  onClick={this.onEstatusSuspendedClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadSuspendidas ?  this.props.item.CantidadSuspendidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#337ab6", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn reprogrammed" title={"Reprogramadas"}  onClick={this.onEstatusRepClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadReprogramadas ? this.props.item.CantidadReprogramadas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#d6d3d3", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn attended" title={"Atendidas"}  onClick={this.onEstatusAteClick} style={{ fontSize: "10px" }}>
                                    {this.props.item.CantidadAtendidas ? this.props.item.CantidadAtendidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#d6d3d3", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    }


    interface IHTExpediente extends IHorizontalTimeDetalleProps {
        onEstatusClick?: (e: any) => any;
    };
    class HorizontalTimeModelo4 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusActiveClick = this.onEstatusActiveClick.bind(this);
            this.onEstatusWarningClick = this.onEstatusWarningClick.bind(this);
            this.onEstatusExpiredClick = this.onEstatusExpiredClick.bind(this);
            this.onEstatusSuspendedClick = this.onEstatusSuspendedClick.bind(this);
        };
        onEstatusActiveClick(e: any) {
            this.onEstatusClick(e, 1);
        };
        onEstatusWarningClick(e: any) {
            this.onEstatusClick(e, 2);
        };
        onEstatusExpiredClick(e: any) {
            this.onEstatusClick(e, 3);
        };
        onEstatusSuspendedClick(e: any) {
            this.onEstatusClick(e, 4);
        };
        onEstatusClick(e: any, estatus?: number): any {
            e.stopPropagation();
            //
            $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
            if (estatus > 0) {
                $(e.currentTarget).addClass("selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                this.props.onItemClick(it);
                Forms.updateFormElement("expedientes$filters", "IdEtapaEstatus", null);
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let cantidad: number = this.props.item.CantidadActivos +
                this.props.item.CantidadPorVencer +
                this.props.item.CantidadVencidos +
                this.props.item.CantidadSuspendidos;

            return (
                <a data-spacing="25" data-ek_with_content="175" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick}
                    style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ padding: "5px 10px", height: 90, marginBottom: 0 }}>
                        <div className="display">
                            <div style={{ position: "absolute", top: -6, right: -10 }}>
                                <span className="badge badge-success ek-sombra bold">
                                    {cantidad}
                                </span>
                            </div>
                            <div className="number bold" style={{ position: "absolute", left: 10, top: 3, fontSize: 11, color: "#999", width: 150, textAlign: "left" }}>
                                {this.props.item && this.props.item.Etapa ? this.props.item.Etapa.Nombre : this.props.clave}
                                <div style={{ fontSize: 11, color: "#333", textAlign: "left" }}>
                                    {this.props.item && this.props.item.Fase ? this.props.item.Fase.Nombre : this.props.item.Nombre}
                                </div>
                            </div>
                        </div>
                        <div className="mt-body-actions-icons" style={{ position: "absolute", top: 45, left: 5, right: 5 }}>
                            <div className="btn-group btn-group btn-group-justified">
                                <div className="mt-icon btn active" onClick={this.onEstatusActiveClick}>
                                    {this.props.item.CantidadActivos}<br />
                                    <i className="fa fa-circle" style={{ color: "#8bc780", fontSize: "12px" }}></i>
                                </div>
                                <div className="mt-icon btn warning" onClick={this.onEstatusWarningClick}>
                                    {this.props.item.CantidadPorVencer}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff8f00", fontSize: "12px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" onClick={this.onEstatusExpiredClick}>
                                    {this.props.item.CantidadVencidos}<br />
                                    <i className="fa fa-circle" style={{ color: "#df0707", fontSize: "12px" }}></i>
                                </div>
                                <div className="mt-icon btn suspended" onClick={this.onEstatusSuspendedClick}>
                                    {this.props.item.CantidadSuspendidos}<br />
                                    <i className="fa fa-circle" style={{ color: "#337ab6", fontSize: "12px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };



    class HorizontalTimeModelo5 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusActiveClick = this.onEstatusActiveClick.bind(this);
            this.onEstatusWarningClick = this.onEstatusWarningClick.bind(this);
            this.onEstatusExpiredClick = this.onEstatusExpiredClick.bind(this);
            this.onEstatusSuspendedClick = this.onEstatusSuspendedClick.bind(this);
            this.onEstatusRepClick = this.onEstatusRepClick.bind(this);
            this.onEstatusAteClick = this.onEstatusAteClick.bind(this);
        };
        onEstatusActiveClick(e: any) {
            this.onEstatusClick(e, "ACT");
        };
        onEstatusWarningClick(e: any) {
            this.onEstatusClick(e, "W");
        };
        onEstatusExpiredClick(e: any) {
            this.onEstatusClick(e, "V");
        };
        onEstatusSuspendedClick(e: any) {
            this.onEstatusClick(e, "SUS");
        };
        onEstatusRepClick(e: any) {
            this.onEstatusClick(e, "REP");
        };
        onEstatusAteClick(e: any) {
            this.onEstatusClick(e, "ATE");
        };
        onEstatusClick(e: any, estatus?: String): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            if (estatus === "ACT") {
                valor = this.props.item.CantidadActivas;
            }
            if (estatus === "W") {
                valor = this.props.item.CantidadPorVencer;
            }
            if (estatus === "V") {
                valor = this.props.item.CantidadVencidas;
            }
            if (estatus === "SUS") {
                valor = this.props.item.CantidadSuspendidas;
            }
            if (estatus === "REP") {
                valor = this.props.item.CantidadReprogramadas;
            }
            if (estatus === "ATE") {
                valor = this.props.item.CantidadAtendidas;
            }


            //
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    {this.props.item.Usuario && this.props.item.Usuario
                        ?
                        <img alt="" className="img-circle" src={this.props.item.Usuario.Foto} style={{ width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: 200 }} />
                        : null}
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "90px" }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px" }}>
                            <h6 >
                                <span data-value="1349" data-counter="counterup">{this.props.item.ID ? this.props.item.ID + " - " : ''}  {this.props.clave}</span>
                            </h6>
                        </div>

                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px", height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop: "-2px" }}>
                                <div className="mt-icon btn WithoutAttention" title={"Sin Atención"} onClick={this.onEstatusRepClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadReprogramadas ? this.props.item.CantidadReprogramadas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#fbf647", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn active" title={"A tiempo"} onClick={this.onEstatusActiveClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActivas ? this.props.item.CantidadActivas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#8bc780", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn warning" title={"Por Vencer"} onClick={this.onEstatusWarningClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadPorVencer ? this.props.item.CantidadPorVencer : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff8f00", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" title={"Vencidos"} onClick={this.onEstatusExpiredClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadVencidas ? this.props.item.CantidadVencidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#df0707", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn suspended" title={"Suspendidos"} onClick={this.onEstatusSuspendedClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadSuspendidas ? this.props.item.CantidadSuspendidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#337ab6", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn attended" title={"Atendidos"} onClick={this.onEstatusAteClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadAtendidas ? this.props.item.CantidadAtendidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#d6d3d3", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    }

    class HorizontalTimeModelo6 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
        };
     
        onEstatusClick(e: any, estatus?: String): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            //let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let seleccion: any; 
            if (this.props.idSeleccionado === undefined || this.props.idSeleccionado === null) {
                seleccion = this.props.idElement === 0 ? 'selected' : '';
            } else {
                if (this.props.idSeleccionado === 0) {
                    seleccion = this.props.idElement === 0 ? 'selected' : '';
                } else {
                    seleccion = this.props.item.ID === this.props.idSeleccionado ? 'selected' : '';
                }
            }
            
            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 116 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "110px" }}>
                        <div style={{ textAlign: "right", height: "41px" }}>
                            <h6 className={"resaltar"}> 
                                {/*  <div data-value="1349" data-counter="counterup" > {this.props.clave}</div>*/}
                                <span className="badge badge-success" style={{ marginLeft: "5px" }}><div data-value="1350" data-counter="counterup"> {this.props.item.Nombre}</div></span>
                            </h6>
                        </div>

                        <div className="dashboard-stat2 " style={{ height: "0px", position: "absolute" }}>
                            <div className="display" title="Responsable de Entrega" >
                                <div className="icon" title="Responsable de Entrega">
                                    <span className="badge badge-info" style={{position: "absolute", marginLeft: "26px", marginTop: "-11px", float: "left", background:"#4cd964" }}>{this.props.item.Cantidad}</span>
                                    <i className="icon-user"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </a>
            );
        };
    }
    class HorizontalTimeModelo7 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
        };

        onEstatusClick(e: any, estatus?: String): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;

            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';

            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 116 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "110px" }}>
                        <div style={{ textAlign: "right", height: "41px" }}>
                            <h6 className={"resaltar"}>
                                <div data-value="1349" data-counter="counterup" > {this.props.clave}</div>
                                <div data-value="1350" data-counter="counterup"> {this.props.item.Nombre}</div>
                            </h6>
                        </div>
                        <div className="dashboard-stat2 " style={{ height: "0px", position: "absolute" }}>
                            <div className="display" title="Responsable de Entrega" >
                                <div className="icon" title="Responsable de Entrega">
                                    <span className="badge badge-info" style={{ position: "absolute", marginLeft: "26px", marginTop: "-11px", float: "left", background: "#4cd964" }}>{this.props.item.Cantidad}</span>
                                    <i className="icon-user"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </a>
            );
        };
    }

    class HorizontalTimeModelo8 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusActiveClick = this.onEstatusActiveClick.bind(this);
            this.onEstatusWarningClick = this.onEstatusWarningClick.bind(this);
            this.onEstatusExpiredClick = this.onEstatusExpiredClick.bind(this);
            this.onEstatusCancelClick = this.onEstatusCancelClick.bind(this);
            this.onEstatusFinishClick = this.onEstatusFinishClick.bind(this);
        };
        onEstatusActiveClick(e: any) {
            this.onEstatusClick(e, 1);
        };
        onEstatusWarningClick(e: any) {
            this.onEstatusClick(e, 2);
        };
        onEstatusExpiredClick(e: any) {
            this.onEstatusClick(e, 3);
        };
        onEstatusCancelClick(e: any) {
            this.onEstatusClick(e, 4);
        };
        onEstatusFinishClick(e: any) {
            this.onEstatusClick(e, 5);
        };
        onEstatusClick(e: any, estatus?: any): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            if (estatus === 1) {
                valor = this.props.item.CantidadActivas;
            }
            if (estatus === 2) {
                valor = this.props.item.CantidadPorVencer;
            }
            if (estatus === 3) {
                valor = this.props.item.CantidadVencidas;
            }
            if (estatus === 4) {
                valor = this.props.item.CantidadCanceladas;
            }
            if (estatus === 5) {
                valor = this.props.item.CantidadFinalizadas;
            }
           
            //
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let cantidad: number = this.props.item.CantidadActivas +
                this.props.item.CantidadPorVencer +
                this.props.item.CantidadVencidas +
                this.props.item.CantidadCanceladas +
                this.props.item.CantidadFinalizadas;

            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick}  style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    {this.props.item.Usuario && this.props.item.Usuario
                        ?
                        <img alt="" className="img-circle" src={this.props.item.Usuario.Foto} style={{ width: "30px", height: "30px", float: "left", marginTop: "10px", marginLeft: "10px", position: "relative", zIndex: 200 }} />
                        : null}
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "90px" }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px"}}>
                            <h6  className={"resaltar"}>
                                <span data-value="1349" data-counter="counterup">{this.props.item.ID && this.props.item.ID != -2 ? this.props.item.ID + " - " : ''} { this.props.item.Nombre} </span>
                            </h6>
                        </div>

                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px" , height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop:"-2px" }}>
                                <div className="mt-icon btn active" title={"Tickets a Tiempo"} onClick={this.onEstatusActiveClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActivas ? this.props.item.CantidadActivas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#8bc780", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn warning" title={"Tickets por Vencer"} onClick={this.onEstatusWarningClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadPorVencer ? this.props.item.CantidadPorVencer : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff8f00", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" title={"Tickets Vencidos"} onClick={this.onEstatusExpiredClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadVencidas ? this.props.item.CantidadVencidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#df0707", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn WithoutAttention" title={"Tickets Cancelados"} onClick={this.onEstatusCancelClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadCanceladas ? this.props.item.CantidadCanceladas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#fbf647", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn attended" title={"Tickets Finalizados"} onClick={this.onEstatusFinishClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadFinalizadas ? this.props.item.CantidadFinalizadas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#d6d3d3", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };


    class HorizontalTimeModelo9 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            //
            this.onEstatusClick = this.onEstatusClick.bind(this);
        };
        onEstatusClick(e: any, estatus?: number): any {
            e.stopPropagation();
            //
            $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
            if (estatus > 0) {
                $(e.currentTarget).addClass("selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                this.props.onItemClick(it);
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';

            return (
                <a data-spacing="50" data-ek_with_content="225" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick}
                    style={{ top: "-40px", border: "1px solid #e7ecf1", height: 120, width: 225 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ padding: "5px 10px", height: 115, marginBottom: 0 }}>
                        <div className="display">
                            <div style={{ position: "absolute", top: -6, right: -10 }}>
                                
                            </div>
                            <div style={{ position: "absolute", left: 10, top: 3, fontSize: 11, color: "#999", width: 200, textAlign: "left" }}>
                                <div className="textNumber">{this.props.item.Fase.Orden}</div>
                                <div className="textTitle">
                                    {this.props.item && this.props.item.Fase ? this.props.item.Fase.Nombre : this.props.item.Nombre}
                                </div>
                                <div className="textPB">
                                    <div className="textPBEstatus">
                                        {this.props.item.EstatusSeguimiento.Nombre}
                                        <span className="badge badge-primary bold ek-sombra " style={{ marginLeft: 5, fontSize: 10 }}>
                                            {this.props.item.CANTIDAD_ORDEN_AVANZADA + "%"}
                                        </span>
                                    </div>
                                    <div className="progress" style={{ margin: 0, marginTop: 4, height: 4 }}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"
                                            style={{ width: this.props.item.CANTIDAD_ORDEN_AVANZADA + "%", fontSize: "8px", textAlign: "right", background: "#33b752", opacity: 0.75 }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };


    class HorizontalTimeModelo10 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusActiveClick = this.onEstatusActiveClick.bind(this);
            this.onEstatusWarningClick = this.onEstatusWarningClick.bind(this);
            this.onEstatusExpiredClick = this.onEstatusExpiredClick.bind(this);
            this.onEstatusCancelClick = this.onEstatusCancelClick.bind(this);
            this.onEstatusFinishClick = this.onEstatusFinishClick.bind(this);
        };
        onEstatusActiveClick(e: any) {
            this.onEstatusClick(e, 1);
        };
        onEstatusWarningClick(e: any) {
            this.onEstatusClick(e, 2);
        };
        onEstatusExpiredClick(e: any) {
            this.onEstatusClick(e, 3);
        };
        onEstatusCancelClick(e: any) {
            this.onEstatusClick(e, 4);
        };
        onEstatusFinishClick(e: any) {
            this.onEstatusClick(e, 5);
        };
        onEstatusClick(e: any, estatus?: any): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            if (estatus === 1) {
                valor = this.props.item.CantidadActivas;
            }
            if (estatus === 2) {
                valor = this.props.item.CantidadPorVencer;
            }
            if (estatus === 3) {
                valor = this.props.item.CantidadVencidas;
            }
            if (estatus === 4) {
                valor = this.props.item.CantidadCanceladas;
            }
            if (estatus === 5) {
                valor = this.props.item.CantidadFinalizadas;
            }

            //
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let cantidad: number = this.props.item.CantidadActivas +
                this.props.item.CantidadPorVencer +
                this.props.item.CantidadVencidas +
                this.props.item.CantidadCanceladas +
                this.props.item.CantidadFinalizadas;

            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "90px" }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px" }}>
                            <h6 className={"resaltar"}>
                                <span data-value="1349" data-counter="counterup">{this.props.item.ID && this.props.item.ID != -2 ? this.props.item.ID + " - " : ''} {this.props.item.Nombre} </span>
                            </h6>
                        </div>

                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px", height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop: "-2px" }}>
                                <div className="mt-icon btn active" title={"0 a 10 Días"} onClick={this.onEstatusActiveClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActivas ? this.props.item.CantidadActivas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#8bc780", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn WithoutAttention " title={"10 a 20 Días"} onClick={this.onEstatusWarningClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadPorVencer ? this.props.item.CantidadPorVencer : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#fbf647", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn warning " title={"20 a 30 Días"} onClick={this.onEstatusExpiredClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadVencidas ? this.props.item.CantidadVencidas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff8f00", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" title={"Mas de 30 Días"} onClick={this.onEstatusCancelClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadCanceladas ? this.props.item.CantidadCanceladas : ''}<br />
                                    <i className="fa fa-circle" style={{ color: "#df0707", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };

    class HorizontalTimeModelo11 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
        };

        onEstatusClick(e: any, estatus?: String): any {
            e.stopPropagation();

            let valor: number;
            valor = 0;

            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".border-after-blue").removeClass("selected")
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".border-after-blue").removeClass("selectedSPV")
                $(e.currentTarget).addClass("selectedSPV")
            }

            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected selectedSPV' : '';
            let item: any = this.props.item;
            var clase = "";
            var claseA = "";
            var claseB = "";
            var claseC = "";
            if (item.EstatusPlanificacionDet != undefined) {
                claseA = item.EstatusPlanificacionDet.Clave == "ACTENP" ? "badge badge-success" : "";
                claseB = item.EstatusPlanificacionDet.Clave == "ACTATN" ? "badge badge-Secondary" : "";
                claseC = item.EstatusPlanificacionDet.Clave == "ACTREP" ? "badge badge-danger" : "";
            }
            if (claseA != "") { clase = claseA; }
            else if (claseB != "") { clase = claseB; }
            else { clase = claseC; }

            return (
                <a data-spacing="100" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-50px", height: 116}} data-date={this.props.fechaTimeLine} >
                    <div style={{ borderLeft: "2px solid #ebedf2", padding: "0 0 30px 40px", position: "absolute", margin: "0 0px 0 30px" }}>
                        <div style={{ position: "absolute", top: "0", left: "-22.5px" }}>
                            {this.props.item.FotoRecurso === "" ?
                                <div className="img-circle" style={{ background: "#1e7145", color: "white", width: "35px", height: "35px", float: "left", marginTop: "10px", marginLeft: "0px", position: "absolute", zIndex: (300), display: "inline-flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}   >
                                    <p>{"Foto"}</p>
                                </div>
                                :
                                <img alt="" title={""} className="img-circle" src={this.props.item.FotoRecurso} style={{ verticalAlign: "middle", maxWidth: "55px", maxHeight: "55px", width: "45px", height: "45px", background: "beige", zIndex: (300), textAlign: "center" }} />
                            }
                            <div style={{ width: "0px", height: "0px", borderBottom: "20px solid transparent", borderTop: "20px solid transparent", borderRight: "20px solid #F7F8FC", fontSize: "0px", lineHeight: "0px", float: "right", marginLeft: "5px", marginTop: "1px" }}></div>
                        </div>
                        <div style={{ backgroundColor: "#F7F8FC", padding: "0.5rem 1rem 1rem 1.5rem", borderTopLeftRadius: " 4px !important", borderBottomRightRadius: "4px !important" }}>
                            <Row>
                                <span style={{ color: "#74788d", fontWeight: "bold", paddingLeft: "1rem", display: "flex", fontSize: "15px" }} >{global.formatDate(this.props.item.DTStart)}</span>
                                <div style={{ fontSize: "13px", fontWeight: "bold", lineHeight: "1.5", textAlign: "left", alignItems: "center", justifyContent: "space-between", display: "flex", padding: "5px 20px 2px 10px" }}>
                                    <span className="badge badge-info" style={{ color: "white", paddingRight: "1rem", paddingLeft: "1rem", display: "flex", marginRight: 30 }} >{global.formatTimePlanificacionSPV(this.props.item.DTStart) + " - " + global.formatTimePlanificacionSPV(this.props.item.DTEnd)}</span>
                                    <span className={clase} style={{ height: "auto", width: "auto", padding: "0.5rem", fontWeight: "normal", display: "flex" }}>{this.props.item.EstatusPlanificacionDet ? this.props.item.EstatusPlanificacionDet.Nombre : ""}</span>
                                </div>
                            </Row>
                            <span style={{ color: "#74788d", fontWeight: "normal", paddingRight: "1rem", paddingTop: "0.5rem", display: "block", textAlign: "left" }}>Observaciones:  {this.props.item.Observaciones != null ? "\n" + this.props.item.Observaciones : "\n\n\n Sin observaciones"}</span>
                        </div>
                    </div>
                </a>
            );
        };
    };

    class HorizontalTimeModelo12 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);
            this.onEstatusReprogramadasClick = this.onEstatusReprogramadasClick.bind(this);
            this.onEstatusAtendidasClick = this.onEstatusAtendidasClick.bind(this);
            this.onEstatusVencidasClick = this.onEstatusVencidasClick.bind(this);
            this.onEstatusPorVencerClick = this.onEstatusPorVencerClick.bind(this);
            this.onEstatusATiempoClick = this.onEstatusATiempoClick.bind(this);
            this.onEstatusSuspendidasClick = this.onEstatusSuspendidasClick.bind(this);
        };
        onEstatusReprogramadasClick(e: any) {
            this.onEstatusClick(e, "ACTREP");
        };
        onEstatusAtendidasClick(e: any) {
            this.onEstatusClick(e, "ACTATN");
        };
        onEstatusVencidasClick(e: any) {
            this.onEstatusClick(e, "ACTVEN");
        };
        onEstatusPorVencerClick(e: any) {
            this.onEstatusClick(e, "ACTPVE");
        };
        onEstatusATiempoClick(e: any) {
            this.onEstatusClick(e, "ACTATM");
        };
        onEstatusSuspendidasClick(e: any) {
            this.onEstatusClick(e, "ACTSUS");
        };

        onEstatusClick(e: any, estatus?: any): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            if (estatus === "ACTREP") {
                valor = this.props.item.CantidadActReprogramadas;
            }
            if (estatus === "ACTATN") {
                valor = this.props.item.CantidadActAtendidas;
            }
            if (estatus === "ACTVEN") {
                valor = this.props.item.CantidadActEnProcesoVencidas;
            }
            if (estatus === "ACTPVE") {
                valor = this.props.item.CantidadActEnProcesoPorVencer;
            }
            if (estatus === "ACTATM") {
                valor = this.props.item.CantidadActEnProcesoATiempo;
            }
            if (estatus === "ACTSUS") {
                valor = this.props.item.CantidadActSuspendidas;
            }
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            let cantidad: number = this.props.item.CantidadActReprogramadas +
                this.props.item.CantidadActAtendidas +
                this.props.item.CantidadActEnProcesoVencidas+
                this.props.item.CantidadActEnProcesoPorVencer+
                this.props.item.CantidadActEnProcesoATiempo+
                this.props.item.CantidadActSuspendidas;

            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "90px" }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px" }}>
                            <h6 className={"resaltar"}>
                                <span data-value="1349" data-counter="counterup">{this.props.item.ID && this.props.item.ID != -2 ? this.props.item.ID + " - " : ''} {this.props.item.Recurso ? this.props.item.Recurso.Nombre : this.props.item.Nombre} </span>
                            </h6>
                        </div>

                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px", height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop: "-2px" }}>
                                <div className="mt-icon btn active" title={"A tiempo"} onClick={this.onEstatusATiempoClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActEnProcesoATiempo ? this.props.item.CantidadActEnProcesoATiempo : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#c8e6c9", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn warning" title={"Por vencer"} onClick={this.onEstatusPorVencerClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActEnProcesoPorVencer ? this.props.item.CantidadActEnProcesoPorVencer : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#ffb74d ", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn expired" title={"Vencidas"} onClick={this.onEstatusVencidasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActEnProcesoVencidas ? this.props.item.CantidadActEnProcesoVencidas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#ed6b75", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn suspended" title={"Suspendidas"} onClick={this.onEstatusSuspendidasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActSuspendidas ? this.props.item.CantidadActSuspendidas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#337ab6", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn reprogrammed" title={"Reprogramadas"} onClick={this.onEstatusReprogramadasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActReprogramadas ? this.props.item.CantidadActReprogramadas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#7ac4e8", fontSize: "10px" }}></i>
                                </div>
                                <div className="mt-icon btn attended" title={"Atendidas"} onClick={this.onEstatusAtendidasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadActAtendidas ? this.props.item.CantidadActAtendidas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#777777", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };


    class HorizontalTimeModelo13 extends React.Component<IHorizontalTimeDetalleProps, IHorizontalTimeDetalleProps> {
        constructor(props: IHorizontalTimeDetalleProps) {
            super(props);
            this.onEstatusClick = this.onEstatusClick.bind(this);

            this.onEstatusSinAsignarClick = this.onEstatusSinAsignarClick.bind(this);
            this.onEstatusATiempoClick = this.onEstatusATiempoClick.bind(this);
            this.onEstatusSinInicializarClick = this.onEstatusSinInicializarClick.bind(this);
            this.onEstatusVencidasClick = this.onEstatusVencidasClick.bind(this);
            this.onEstatusAtrasadasClick = this.onEstatusAtrasadasClick.bind(this);
            this.onEstatusPausadasClick = this.onEstatusPausadasClick.bind(this);
            this.onEstatusCompletadasClick = this.onEstatusCompletadasClick.bind(this);
        };
        onEstatusSinAsignarClick(e: any) {
            this.onEstatusClick(e, "SinAsignar");
        };
        onEstatusATiempoClick(e: any) {
            this.onEstatusClick(e, "ATiempo");
        };
        onEstatusSinInicializarClick(e: any) {
            this.onEstatusClick(e, "SinInicializar");
        };
        onEstatusVencidasClick(e: any) {
            this.onEstatusClick(e, "Vencidas");
        };
        onEstatusAtrasadasClick(e: any) {
            this.onEstatusClick(e, "Atrasadas");
        };
        onEstatusPausadasClick(e: any) {
            this.onEstatusClick(e, "Pausadas");
        };

        onEstatusCompletadasClick(e: any) {
            this.onEstatusClick(e, "Completadas");
        };


        onEstatusClick(e: any, estatus?: any): any {
            e.stopPropagation();
            let valor: number;
            valor = 0;
            if (estatus === "SinAsignar") {
                valor = this.props.item.CantidadSinAsignar;
            }
            if (estatus === "ATiempo") {
                valor = this.props.item.CantidadATiempo;
            }
            if (estatus === "SinInicializar") {
                valor = this.props.item.CantidadSinInicializar;
            }
            if (estatus === "Vencidas") {
                valor = this.props.item.CantidadVencidas;
            }
            if (estatus === "Atrasadas") {
                valor = this.props.item.CantidadAtrasadas;
            }
            if (estatus === "Pausadas") {
                valor = this.props.item.CantidadPausadas;
            }
            if (estatus === "Completadas") {
                valor = this.props.item.CantidadCompletadas;
            }
            if (estatus === undefined) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected")
            }

            if (estatus && (estatus != null || estatus != undefined) && valor > 0) {
                $(e.currentTarget).closest(".cd-horizontal-timeline").find(".mt-icon").removeClass("selected");
                $(e.currentTarget).addClass(" selected");
            };
            //
            if (this.props.onItemClick) {
                let it: any = global.assign(this.props.item, { _action: estatus });
                //
                if (valor > 0 || ((estatus === null || estatus === undefined) && valor === 0)) {
                    this.props.onItemClick(it);
                }
            };
        };
        componentDidMount(): void {
            initTimeLines();
        }
        render() {
            let seleccion: any = this.props.idElement === 0 ? 'selected' : '';
            //let cantidad: number = this.props.item.CantidadActReprogramadas +
            //    this.props.item.CantidadActAtendidas +
            //    this.props.item.CantidadActEnProcesoVencidas +
            //    this.props.item.CantidadActEnProcesoPorVencer +
            //    this.props.item.CantidadActEnProcesoATiempo +
            //    this.props.item.CantidadActSuspendidas;

            return (
                <a data-spacing="50" data-ek_with_content="198" className={"border-after-blue ek-bg-after-blue " + seleccion} href="#" onClick={this.onEstatusClick} style={{ top: "-40px", border: "1px solid #e7ecf1", height: 95, width: 175 }} data-date={this.props.fechaTimeLine} >
                    <div className="dashboard-stat2" style={{ marginBottom: "20px", borderBottomWidth: "2px", paddingBottom: "10px", height: "90px" }}>
                        <div style={{ textAlign: "right", height: "41px", marginTop: "-15px" }}>
                            <h6 className={"resaltar"}>
                                <span data-value="1349" data-counter="counterup">{this.props.item.ID && this.props.item.ID != -2 ? this.props.item.ID + " - " : ''} {this.props.item.Recurso ? this.props.item.Recurso.Nombre : this.props.item.Nombre} </span>
                            </h6>
                        </div>

                        <div className="mt-body-actions-icons" style={{ paddingTop: "-8px", height: "30px !important" }}>
                            <div className="btn-group btn-group btn-group-justified" style={{ marginTop: "-2px" }}>

                                <div className="mt-icon btn inactive" title={"Sin Asignar"} onClick={this.onEstatusSinAsignarClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadSinAsignar ? this.props.item.CantidadSinAsignar : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#c4c5c7", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn active" title={"Sin Inicializar"} onClick={this.onEstatusSinInicializarClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadSinInicializar ? this.props.item.CantidadSinInicializar : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#e5ef58 ", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn active" title={"A Tiempo"} onClick={this.onEstatusATiempoClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadATiempo ? this.props.item.CantidadATiempo : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#92c794", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn warning" title={"Vencidas"} onClick={this.onEstatusVencidasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadVencidas ? this.props.item.CantidadVencidas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#ed6b75", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn expired" title={"Atrasadas"} onClick={this.onEstatusAtrasadasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadAtrasadas ? this.props.item.CantidadAtrasadas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#ff6b2c", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn suspended" title={"Pausadas"} onClick={this.onEstatusPausadasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadPausadas ? this.props.item.CantidadPausadas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#337ab6", fontSize: "10px" }}></i>
                                </div>

                                <div className="mt-icon btn attended" title={"Completadas"} onClick={this.onEstatusCompletadasClick} style={{ fontSize: "8px" }}>
                                    {this.props.item.CantidadCompletadas ? this.props.item.CantidadCompletadas : '0'}<br />
                                    <i className="fa fa-circle" style={{ color: "#777777", fontSize: "10px" }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };
    };



    export let EKHorizontalTimeLine: any = ReactRedux.connect(cHorizontalTimeLine.props, cHorizontalTimeLine.dispatchs)(cHorizontalTimeLine);
};

import EKHorizontalTimeLine = EK.UX.Kontrol.HorizontalTimeLine.EKHorizontalTimeLine;
