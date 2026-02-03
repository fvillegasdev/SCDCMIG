//// A '.tsx' file enables JSX support in the TypeScript compiler, 
//// for more information see the following page on the TypeScript wiki:
//// https://github.com/Microsoft/TypeScript/wiki/JSX
//namespace EK.UX.Kontrol.Graficas {
//    "use strict";
//    var graficaObject: any = window;

//    export interface IEKGraficas extends React.Props<any> {
//        //data?: any[],
//        id?: string;
//        chart?: any;
//        tipoGrafica?: any;
//        style?: React.CSSProperties;
//        className?: string;
//        options?: any;
//        dataProvider?: any[];
//        width?: any;
//        height?: any;
//        onItemSelected?: (item: any, e?: any) => void;
//        versionDatos?: any; 
//    }

//    //export const PeridosComision: any = global.connect(class extends React.Component<IPeridosComisionProps, IPeridosComisionProps> {
//    export const EKGraficas: any = global.connect(class extends React.Component<IEKGraficas, IEKGraficas> {
//        constructor(props: IEKGraficas) {
//            super(props);
//            this.getType = this.getType.bind(this);
//            this.hasOwnKey = this.hasOwnKey.bind(this);
//            this.copyObject = this.copyObject.bind(this);
//            this.copyArray = this.copyArray.bind(this);
//            this.copy = this.copy.bind(this);
//            this.isNaN = this.isNaN.bind(this);
//            this.isNumberEqual = this.isNumberEqual.bind(this);
//            this.update = this.update.bind(this);
//            this.removeChartListeners = this.removeChartListeners.bind(this);
//            this.updateArray = this.updateArray.bind(this);
//            this.updateObject = this.updateObject.bind(this);
//            // this.generateData = this.generateData.bind(this);
//            this.graficaInit = this.graficaInit.bind(this);
//            this.onItemClick = this.onItemClick.bind(this);
//            this.getItems = this.getItems.bind(this);

//            let idGrafica: string = this.props.id;
//            if (!this.props.id) {
//                idGrafica = ["AmCharts_React_", new Date().getTime()].join("_");
//            } else {
//                idGrafica = "AmCharts_React_" + this.props.id;
//            };

//            this.state = {
//                id: idGrafica,
//                dataProvider: null
//            };
//        };


//        static props: any = (state: any) => ({
           
//        });

//        static defaultProps: IEKGraficas = {
//            dataProvider: [],
//            tipoGrafica:   "serial"  
//        };


//        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

//        });
//        refs: {
//            container: Element;
//        };


//        onItemClick(e: any, data: any): any {
//            if (this.props.onItemSelected) {
//                this.props.onItemSelected(data.node.data.item, e);
//            };
//        };



//        //generateData() {
//        //      var firstDate = new Date();

//        //      var datos = [];

//        //      for (var i = 0; i < 100; ++i) {
//        //          var date = new Date(firstDate.getTime());
//        //          date.setDate(i);
//        //          datos.push({
//        //              date: date,
//        //              value: Math.floor(Math.random() * 100)
//        //          });
//        //      }
//        //      //this.props.dataProvider = datos;
//        //      //return dataProvider;
//        //      this.setState({ dataProvider : datos });
//        //  }



//        shouldComponentUpdate(nextProps: IEKGraficas, nextState: IEKGraficas): boolean {

//            if (nextProps.dataProvider.length <= 0 || nextProps.dataProvider === undefined || nextProps.dataProvider === null) {
//                return false; 
//            }
//            if (nextProps.versionDatos === this.props.versionDatos) {
//                return false; 
//            }
//            return true; 
//        };

//        getType(x) {
//            // TODO make this faster ?
//            return {}.toString.call(x);
//        }

//        hasOwnKey(obj, key) {
//            return {}.hasOwnProperty.call(obj, key);
//        }


//        copyObject(x) {
//            var output = {};
//            // TODO use Object.keys ?
//            for (var key in x) {
//                if (this.hasOwnKey(x, key)) {
//                    output[key] = this.copy(x[key]);
//                }
//            }
//            return output;
//        }

//        copyArray(x) {
//            var length = x.length;
//            var output = new Array(length);
//            for (var i = 0; i < length; ++i) {
//                output[i] = this.copy(x[i]);
//            }
//            return output;
//        }

//        // TODO can this be made faster ?
//        // TODO what about regexps, etc. ?
//        copy(x) {
//            switch (this.getType(x)) {
//                case "[object Array]":
//                    return this.copyArray(x);

//                case "[object Object]":
//                    return this.copyObject(x);

//                // TODO is this necessary ?
//                case "[object Date]":
//                    return new Date(x.getTime());

//                default:
//                    return x;
//            }
//        }


//        isNaN(x) {
//            return x !== x;
//        }

//        isNumberEqual(x, y) {
//            return x === y || (isNaN(x) && isNaN(y));
//        }


//        removeChartListeners(chart, x, y) {
//            if (x !== y) {
//                // TODO is this necessary ?
//                if (x == null) {
//                    x = [];
//                }

//                // TODO is this necessary ?
//                if (y == null) {
//                    y = [];
//                }

//                var xLength = x.length;
//                var yLength = y.length;

//                for (var i = 0; i < xLength; ++i) {
//                    var xValue = x[i];

//                    var has = false;

//                    // TODO make this faster ?
//                    for (var j = 0; j < yLength; ++j) {
//                        var yValue = y[j];

//                        // TODO is this correct ?
//                        if (xValue.event === yValue.event &&
//                            xValue.method === yValue.method) {
//                            has = true;
//                            break;
//                        }
//                    }
//                    if (!has) {
//                        // TODO is this correct ?
//                        chart.removeListener(chart, xValue.event, xValue.method);
//                    }
//                }
//            }
//        }


//        updateArray(a, x, y) {
//            var didUpdate = false;

//            if (x !== y) {
//                var xLength = x.length;
//                var yLength = y.length;

//                if (xLength !== yLength) {
//                    a.length = yLength;
//                    didUpdate = true;
//                }

//                for (var i = 0; i < yLength; ++i) {
//                    if (i < xLength) {
//                        if (this.update(a, i, x[i], y[i])) {
//                            didUpdate = true;
//                        }
//                    } else {
//                        // TODO make this faster ?
//                        a[i] = this.copy(y[i]);
//                        // TODO is this necessary ?
//                        didUpdate = true;
//                    }
//                }
//            }

//            return didUpdate;
//        }


//        update(obj, key, x, y) {
//            var didUpdate = false;

//            if (x !== y) {
//                var xType = this.getType(x);
//                var yType = this.getType(y);

//                if (xType === yType) {
//                    switch (xType) {
//                        case "[object Array]":
//                            if (this.updateArray(obj[key], x, y)) {
//                                didUpdate = true;
//                            }
//                            break;

//                        case "[object Object]":
//                            if (this.updateObject(obj[key], x, y)) {
//                                didUpdate = true;
//                            }
//                            break;

//                        case "[object Date]":
//                            if (x.getTime() !== y.getTime()) {
//                                // TODO make this faster ?
//                                obj[key] = this.copy(y);
//                                didUpdate = true;
//                            }
//                            break;

//                        case "[object Number]":
//                            if (!this.isNumberEqual(x, y)) {
//                                // TODO is the copy necessary ?
//                                obj[key] = this.copy(y);
//                                didUpdate = true;
//                            }
//                            break;

//                        default:
//                            if (x !== y) {
//                                // TODO is the copy necessary ?
//                                obj[key] = this.copy(y);
//                                didUpdate = true;
//                            }
//                            break;
//                    }
//                    // TODO is this correct ?
//                } else {
//                    // TODO make this faster ?
//                    obj[key] = this.copy(y);
//                    didUpdate = true;
//                }
//            }

//            return didUpdate;
//        }

//        updateObject(chart, oldObj, newObj) {
//            var didUpdate = false;

//            if (oldObj !== newObj) {
//                // TODO use Object.keys ?
//                for (var key in newObj) {
//                    if (this.hasOwnKey(newObj, key)) {
//                        // TODO make this faster ?
//                        if (this.hasOwnKey(oldObj, key)) {
//                            // TODO should this count as an update ?
//                            if (key === "listeners") {
//                                // TODO make this faster ?
//                                this.removeChartListeners(chart, oldObj[key], newObj[key]);
//                            }

//                            if (this.update(chart, key, oldObj[key], newObj[key])) {
//                                didUpdate = true;
//                            }

//                        } else {
//                            // TODO make this faster ?
//                            chart[key] = this.copy(newObj[key]);
//                            didUpdate = true;
//                        }
//                    }
//                }

//                // TODO use Object.keys ?
//                for (var key in oldObj) {
//                    if (this.hasOwnKey(oldObj, key) && !this.hasOwnKey(newObj, key)) {
//                        if (key === "listeners") {
//                            this.removeChartListeners(chart, oldObj[key], []);
//                        }

//                        delete chart[key];
//                        didUpdate = true;
//                    }
//                }
//            }

//            return didUpdate;
//        }

//        componentWillReceiveProps(nextProps: IEKGraficas) {
//            //if (this.props.dataProvider.length > 0  != nextProps.dataProvider) {
//            if (nextProps.dataProvider.length > 0 ) {
//                this.graficaInit(nextProps.dataProvider);
//            }
//        }
//        graficaInit(datos: any[]): void {

//            let data: any[];
        
//            let grafica: any;
//            if (!datos) {

//            } else {
//               // "type": "serial",



//                var configuracionGrafica: any;


//                switch (this.props.tipoGrafica.toUpperCase()) {
//                    case 'PIE': 
//                        configuracionGrafica = {
//                            "type": "pie",
//                            "theme": "light",
//                            "dataProvider": datos,
//                            "valueField": "valueField",
//                            "titleField": "categoryField",
//                            "outlineAlpha": 0.4,
//                            "depth3D": 15,
//                            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
//                            "angle": 30,
//                            "export": {
//                                "enabled": true
//                            }
//                        };
//                        break;
//                    default:
//                        configuracionGrafica = {
//                            "theme": "light",
//                            "type": "serial",
//                            "startDuration": 2,
//                            "fontSize": 8,
//                            "dataProvider": datos,
//                            "valueAxes": [{
//                                "position": "left",
//                                "axisAlpha": 0,
//                                "gridAlpha": 0
//                            }],
//                            "graphs": [{
//                                "balloonText": "<b> Etapa:</b> [[Nombre]] <br> <b>Fase: </b> [[NombreToolTips]]  <br> <b>Cantidad: </b> [[value]] ",
//                                "colorField": "color",
//                                "fillAlphas": 0.80,
//                                "fontSize": 10,
//                                "lineAlpha": 0.1,
//                                "type": "column",
//                                "topRadius": 1,
//                                "valueField": "valueField"
//                            }],
//                            "depth3D": 20,
//                            "angle": 20,
//                            "rotate": false,
//                            "startEffect": "elastic",
//                            "balloon": {
//                                "fontSize": 10,
//                                "textAlign": "left",
//                            },
//                            "chartCursor": {
//                                "categoryBalloonEnabled": true,
//                                "cursorAlpha": 100,
//                                "zoomable": false
//                            },
//                            "categoryField": "categoryField",
//                            "categoryAxis": {
//                                "gridPosition": "start",
//                                "axisAlpha": 0,
//                                "gridAlpha": 0,
//                                "listeners": [{
//                                    "event": "clickItem",
//                                    "method": function (e) {
//                                        alert("Clicked on " + e.value);
//                                    }
//                                }],
//                                "labelRotation": 25
//                            },
//                            "export": {
//                                "enabled": true
//                            },
//                            "listeners": [{
//                                "event": "init",
//                                "method": function (e) {
//                                    e.chart.chartDiv.addEventListener("click", function () {
//                                        var valor;
//                                        if (e.chart.lastCursorPosition !== undefined) {
//                                            // get date of the last known cursor position
//                                            valor = e.chart.dataProvider[e.chart.lastCursorPosition][e.chart.categoryField];
//                                        }
//                                        if (!isNaN(e.chart.lastCursorPosition)) {
//                                            console.log("clicked on " + e.chart.dataProvider[e.chart.lastCursorPosition].dataProvider);
//                                            var text = window.prompt("Enter annotation" + e.chart.categoryField, "");
//                                        }
//                                    })
//                                }
//                            }]
//                        };
//                        break;
//                }
                
                


//                var chart = grafica = graficaObject.AmCharts.makeChart(this.state.id, configuracionGrafica );



//               // grafica = graficaObject.AmCharts.makeChart(this.state.id, , 0);
//            }



//           // var props = this.copy(this.props);
//            this.setState({
//                chart: grafica //GraficaPlugin.makeChart(this.state.id, props)

//            });

//        }

//        getItems(data: any[]): any {
//            if (!data) {
//                return [];
//            };

//            let retValue: any[] = [];
           
//        };

//        componentDidMount() {
//            this.graficaInit(this.props.dataProvider); 
//        }

//        // TODO is this correct ? should this use componentWillUpdate instead ?
//        componentDidUpdate(prevProps: IEKGraficas, prevState: IEKGraficas): any {
//            //var didUpdate = updateObject(this.state.chart, oldProps, this.props);
//            var didUpdate = this.updateObject(this.state.chart, prevProps, this.props);
//            // TODO make this faster
//            if (didUpdate) {
//                this.state.chart.validateNow(true);
//            }
//        }

//        componentWillUpdate(nextProps: IEKGraficas, {}): void {
//            //if (isSuccessful(nextProps.agregarPeriodo)) {
//            //    if (nextProps.agregarPeriodo.returnCode === 4) {
//            //        dispatchDefault("scv-comisiones-guardar-config-periodo", {});
//            //    }
//            //}
//        }


//        componentWillUnmount(): void {
//            if (this.state.chart) {
//                this.state.chart.clear();
//            }
//        }




//        render(): JSX.Element {
//            //var configuracion = {
//            //    "type": "serial",
//            //    "theme": "light",
//            //    //    "graphs": [...],
//            //    "dataProvider": this.state.dataProvider
//            //};
//            var estilo = {
//              // "width": this.props.width ? this.props.width : "100px",
//                "height": this.props.height ? this.props.height : "225px",
//                "marginTop": "0px",
//                "marginBottom": "15px",
//                "paddingLeft": "0px"
//            };

//            let id: any = this.state.id;
//            return <div id={this.state.id}
//                style={{ height: '225px', paddingLeft: 0, marginTop: '0px', marginBottom: '15px', marginLeft: "30px" }}
//            ></div>;
//        };
//    })
//    export let EKGraficas2: any = ReactRedux.connect(EKGraficas.props, EKGraficas.dispatchs)(EKGraficas);
//}

//import EKGraficas2 = EK.UX.Kontrol.Graficas.EKGraficas;
