namespace EK.Modules.Kontrol.Pages.PlantillasMeta {
    "use strict";

    const PLANTILLAMETA_ID: string = "FormPlantillasMeta";

    const config: page.IPageConfig = global.createPageConfig("plantillasmeta", "kontrol");

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                //.addAc
                //.addDescripcion()
                //.addString("Plantilla")
                //.addObject("Categoria")
                //.addObject("TipoPlantilla")
                .addObject("Activo")
                //.addObject("Privado")
                //.addEstatus()
                .addVersion()
                .toObject();

            let pantallas = EK.Store.getState().global.plantilla$pantallas ? EK.Store.getState().global.plantilla$pantallas.data : null; 
            let preguntas = EK.Store.getState().global.plantilla$preguntas ? EK.Store.getState().global.plantilla$preguntas.data : null; 
            console.log(model)
            //var index = 0;
            console.log(pantallas)
            for (let pi = 0; pi < pantallas.length;pi++) {
                var _screen = pantallas[pi];
                var _preguntas = preguntas.filter(x => x.idPantalla === _screen.ID);
                console.log(_preguntas)
                const sc = JSON.parse(JSON.stringify(_singleScreen)) //{ ..._singleScreen } 
               // sc.layout = {..._layout}
                //sc.layout.children[0].children = [];
                sc.id = _screen.ID;
                sc.title = _screen.nombre;
                if (pi === 0) {
                    sc.data = {}
                } else {
                    sc.data = pantallas[pi - 1].nextData;
                }
                let _payloadActions = {};
                var nextData = { ...sc.data };
                for (let i = 0; i < _preguntas.length; i++) {
                    //if (i === 0) {
                    //var _q = _preguntas[i];
                    sc.layout.children[0].children.push({ type: 'TextHeading', text: _preguntas[i].pregunta })
                    //} 
                        //else {
                        let tipoQ = '';
                        let labelQ = '';
                        let nameQ = '';
                        let typeNextData = 'string';
                        switch (_preguntas[i].tipoRespuesta) {
                            case 'OU':
                                tipoQ = 'RadioButtonsGroup';
                                labelQ = 'Seleccione una opcion';
                                break;
                            case 'OM':
                                tipoQ = 'CheckboxGroup';
                                labelQ = 'Seleccione una o varias opciones';
                                typeNextData = 'array';
                                break;
                            case 'LD':
                                tipoQ = 'DropDown';
                                labelQ = 'Seleccione de la lista';
                                break;
                            case 'TXT':
                                tipoQ = 'TextInput';
                                labelQ = 'Escribe tu respuesta';
                                break;
                        }
                        nameQ = labelQ.replace(/ /g, '_') + `_${pi}`;
                        var newItem = { type: tipoQ, label: labelQ, required: true, name: nameQ };
                        //sc.layout.children[0].children.push(newItem);

                        if (_preguntas[i].tipoRespuesta !== 'TXT') {
                            newItem['data-source'] = [];
                            for (let op = 0; op < _preguntas[i].opciones.length; op++) {
                                let _opcion = _preguntas[i].opciones[op].opcion;
                                let _idOpcion = `${pi}_` + _opcion.replace(/ /g, '_');
                                newItem['data-source'].push({ id: _idOpcion, title: _opcion });
                            }
                        }

                        let actionName = `screen_${pi}_${nameQ}`;
                        let actionform = "${form." + nameQ + "}";
                        //let dataInfo: any = {
                        //    [actionName]: {
                        //        type: typeNextData,
                        //        __example__: typeNextData === 'array' ? [] : 'Example'
                                
                        //    }
                        //}
                        //if (typeNextData === 'array' ) {
                        //    dataInfo[actionName].items = {type:'string'}
                        //}
                       
                        
                    //    nextData = {
                    //        ...dataInfo
                    //};
                        nextData[actionName] = {
                            type: typeNextData,
                            __example__: typeNextData === 'array' ? [] : 'Example'
                        }

                        if (typeNextData === 'array') {
                            nextData[actionName].items = { type: 'string' }
                        }

                    // Object.assign(nextData, dataInfo )

                        sc.layout.children[0].children.push(newItem)
                       
                        let action = { [actionName]: actionform}
                        _payloadActions = { ...action}
                    //}
                }
                pantallas[pi].nextData = nextData;
                let typeFooter = {}
                if (pi + 1 === pantallas.length) {
                    typeFooter = {
                        name: 'complete',
                        payload: _payloadActions
                    }
                } else {
                    typeFooter = {
                        name: 'navigate',
                        next: {
                            type: 'screen',
                            name: pantallas[pi + 1].ID
                        },
                        payload: _payloadActions
                    }
                }

                let footer = {
                    type: "Footer",
                    label: "Siguiente",
                    'on-click-action': typeFooter
                }
                sc.layout.children[0].children.push(footer);
                PlantillaFlujoBase.screens.push(sc)
               
            }

            console.log(PlantillaFlujoBase)
            console.log(JSON.stringify(PlantillaFlujoBase))
            //console.log(pantallas)
            //console.log(preguntas)
            //var params = {
            //    action: 'savePlantilla',
            //    pantallas, tipo_platilla: 'ENC',
            //    activo: model.Activo,
            //    clave: model.Clave,
            //    nombre: model.Nombre, 
            //    id: model.ID
            //};

            //console.log(params)
            //let res = document.getElementById("resultSection");
            //let load = document.getElementById("loading");
            //global.asyncPost('kontrol/PlantillasMeta/handlePlantilla', params, (status: AsyncActionTypeEnum, data: any) => {
            //    switch (status) {
            //        case AsyncActionTypeEnum.successful:
            //            console.log(data);
            //            res.style.display = "inherit";
            //            load.style.display = "none";
            //            if (data && data.id_plantilla && data.id_plantilla > 0) {
            //                global.success('Plantilla guardada correctamente')
            //            }
            //            //if (data.length > 0) {
            //            //    dispatchSuccessful('load::HasPreReportes', true);
            //            //} else {
            //            //    dispatchSuccessful('load::HasPreReportes', false);
            //            //}
            //            break;
            //        case AsyncActionTypeEnum.loading:
            //            res.style.display = "none";
            //            load.style.display = "inherit";
            //            break;
            //        case AsyncActionTypeEnum.failed:
            //            res.style.display = "inherit";
            //            load.style.display = "none";
            //            break;
            //    }
            //});

            return ;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IEditProps extends page.IProps {
        newPantalla?: boolean;
        newPregunta?: boolean;
        newRespuesta?: boolean;
        pantallas?: DataElement;
        preguntas?: DataElement;
        currentPantalla?: DataElement;
        currentPregunta?: DataElement;
       
    };

    let PlantillaFlujoBase: any = {
        version: '7.0',
        screens: []
    }

    let _layout: any = {
        type: 'SingleColumnLayout',
        children: [
            {
                type: 'Form',
                name: 'form',
                children: []
            }
        ]
    }

    let _singleScreen: any = {
        id: '',
        title: '',
        data: '',
        layout: { ..._layout }
    }

    

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.pantallas = state.global["plantilla$pantallas"];
            retValue.preguntas = state.global["plantilla$preguntas"];
            retValue.currentPantalla = state.global["plantilla$pantallasel"];
            retValue.currentPregunta = state.global["plantilla$preguntasel"];
            return retValue;
        };

        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.pantallas, nextProps.pantallas) ||
                hasChanged(this.props.preguntas, nextProps.preguntas) || 
                hasChanged(this.props.currentPantalla, nextProps.currentPantalla) || 
                hasChanged(this.props.currentPregunta, nextProps.currentPregunta) 
        };

        getSelectedItem(key) {
            let s = EK.Store.getState().global[key];
            s = s && s.data ? s.data : null;
            return s;
        }

        generateRandomID(tipo): string {
            var num = Math.floor(Math.random() * 9999) + 1;
            return `${tipo}${num}`;
        }


        selectItem(item, propName, iddoc) {
            //var docs: any = document.getElementsByClassName('seletectableRow');
            const elementos: any = document.querySelectorAll('.seletectableRow');
            elementos.forEach(el => {
                el.classList.remove('selectedCurrentScreen');
            });
            const elementoSeleccionado = document.getElementById(iddoc);
            if (elementoSeleccionado) {
                elementoSeleccionado.classList.add('selectedCurrentScreen');
            }
            dispatchSuccessful(`load::${propName}`, item);
        }

        addScreen() {
            let nuevoID = this.generateRandomID('SC');
            let l = this.getPantallas()
            let p = { nombre: '', ID: nuevoID, stored: false};
            l.push(p);
            dispatchSuccessful('load::plantilla$pantallas', l);
        }

        storageScreen(item) {
            let l = this.getPantallas();
            let index = l.findIndex(x => x.ID === item.ID);
            if (index > -1) {
                let input: any = document.getElementById(`screeninput-${item.ID}`);
                console.log(input)
                l[index].nombre = input.value;
                l[index].stored = true;
                dispatchSuccessful('load::plantilla$pantallas', l);
                setTimeout(() => {
                    this.selectItem(l[index], 'plantilla$pantallasel', `screenRow-${item.ID}`)
                }, 100)
            }
        }

        updateScreen(item) {
            let l = this.getPantallas();
            let index = l.findIndex(x => x.ID === item.ID);
            if (index > -1) {
                l[index].stored = false;
                dispatchSuccessful('load::plantilla$pantallas', l);
                setTimeout(() => {
                    this.selectItem(l[index], 'plantilla$pantallasel', `screenRow-${item.ID}`)
                }, 100)
            }
        }

        removeScreen(index) {
            let pantallas = this.getPantallas();
            let l = this.getAllPreguntas();
            let pantalla = pantallas[index];
            if (l.length > 0) {
             //   
                l = l.filter(x => x.idPantalla !== pantalla.ID);
            }
            pantallas.splice(index, 1);
            //'plantilla$pantallasel'
            //this.selectItem(null, 'load::plantilla$pantallasel', 'nd' )
            //delete EK.Store.getState().global.plantilla$pantallasel;
            setTimeout(() => {
                dispatchSuccessful('load::plantilla$pantallasel', {});
            }, 100)
            dispatchSuccessful('load::plantilla$pantallas', pantallas);
            dispatchSuccessful('load::plantilla$preguntas', l);
            
           
            //console.log(l)
        }

        getPantallas() {
            let l = EK.Store.getState().global.plantilla$pantallas;
            l = l && l.data ? l.data : [];
            return l;
        }

        getAllPreguntas() {
            let l = EK.Store.getState().global.plantilla$preguntas;
            l = l && l.data ? l.data : [];
            return l;
        }


        addQuestion() {
            let nuevoID = this.generateRandomID('QT');
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getAllPreguntas();//this.getPreguntasDePantalla(pantalla)
            let p = { pregunta: '', ID: nuevoID, stored: false, idPantalla:pantalla.ID, tipoRespuesta:'NONE', opciones:[]};
            l.push(p);
            dispatchSuccessful('load::plantilla$preguntas', l);
        }

        storageQuestion(item) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getAllPreguntas(); //this.getPreguntasDePantalla(pantalla);
            let index = l.findIndex(x => x.ID === item.ID);
            if (index > -1) {
                let input: any = document.getElementById(`questioninput-${item.ID}`);
                l[index].pregunta = input.value;
                l[index].stored = true;
                dispatchSuccessful('load::plantilla$preguntas', l);
            }
        }

        updateQuestion(item) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getAllPreguntas(); //this.getPreguntasDePantalla(pantalla);
            let index = l.findIndex(x => x.ID === item.ID);
            if (index > -1) {
                l[index].stored = false;
                dispatchSuccessful('load::plantilla$preguntas', l);
            }
        }

        removeQuestion(item) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getAllPreguntas(); //this.getPreguntasDePantalla(pantalla);
            let index = l.findIndex(x => x.ID === item.ID);
            if (index > -1) {
                l.splice(index, 1);
                dispatchSuccessful('load::plantilla$preguntas', l);
            }
        }

        getPreguntasDePantalla(pantalla) {
            let l = EK.Store.getState().global.plantilla$preguntas;
            l = l && l.data ? l.data : [];
            if (pantalla) {
                l = l.filter(x => x.idPantalla === pantalla.ID);
            }
            return l;
        }

        changeTipoRespuesta(pregunta, pantalla, id) {
            console.log('cmabiar tipo')
            let preguntas = this.getPreguntasDePantalla(null);
            let index = preguntas.findIndex(x => x.ID === pregunta.ID && x.idPantalla === pantalla.ID);
            if (index > -1) {
                let el: any = document.getElementById(id);
                if (el.value !== null && el.value !== '' && el.value !== '0') {
                    preguntas[index].tipoRespuesta = el.value;
                    dispatchSuccessful('load::plantilla$preguntas', preguntas);
                }
                console.log(el.value);    
            }
        }

        getTipos() {
            let estatus = [];
            estatus.push({ ID: -4, Clave: '1', Nombre: 'Opcion unica' });
            estatus.push({ ID: -5, Clave: '2', Nombre: 'Opcion multiple' });
            estatus.push({ ID: -6, Clave: '3', Nombre: 'Lista desplegable' });
            estatus.push({ ID: -7, Clave: '4', Nombre: 'Texto' });
            return estatus;
        }

        AddOpcion(pregunta) {
            let nuevoID = this.generateRandomID('OP');
            let preguntas = this.getPreguntasDePantalla(null);
            let index = preguntas.findIndex(x => x.ID === pregunta.ID && x.idPantalla === pregunta.idPantalla);
            if (index > -1) {
                let size = preguntas[index].opciones.length;
                let opcion = { ID: nuevoID, opcion: '', stored: false }
                preguntas[index].opciones.push(opcion);
                dispatchSuccessful('load::plantilla$preguntas', preguntas);

            };
        }

        storageOpcion(pregunta, opcion, indexOp) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getPreguntasDePantalla(null);
            let index = l.findIndex(x => x.ID === pregunta.ID);
            if (index > -1) {
                let input: any = document.getElementById(`questioninputOp-${pregunta.ID}-${opcion.ID}`);

                l[index].opciones[indexOp].opcion = input.value;
                l[index].opciones[indexOp].stored = true;
                dispatchSuccessful('load::plantilla$preguntas', l);

            }
        }

        updateOpcion(pregunta, opcion, indexOp) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getPreguntasDePantalla(null);
            let index = l.findIndex(x => x.ID === pregunta.ID);
            if (index > -1) {
                l[index].opciones[indexOp].stored = false;
                dispatchSuccessful('load::plantilla$preguntas', l);
            }
        }

        removeOption(pregunta, indexOp) {
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
            let l = this.getPreguntasDePantalla(null);
            let index = l.findIndex(x => x.ID === pregunta.ID);
            if (index > -1) {
                l[index].opciones.splice(indexOp, 1)
                dispatchSuccessful('load::plantilla$preguntas', l);
            }
        }
       // storageOpcion(pregunta) {
           // let preguntas = this.getPreguntas(null);
            //let index = preguntas.findIndex(x => x.ID === pregunta.ID && x.idPantalla === pregunta.idPantalla);
            //if (index > -1) {
            //    let size = preguntas[index].opciones.length;
            //    let opcion = { ID: size + 1, nombre: '', stored: false }
            //    preguntas[index].opciones.push(opcion);
            //    dispatchSuccessful('load::plantilla$preguntas', l);

            //}
            //let pantalla = this.getSelectedItem('plantilla$pantallasel');
            //let l = this.getPreguntas(pantalla)
            //let p = { nombre: '', ID: l.length + 1, nuevo: true, idPantalla: pantalla.ID, tipoRespuesta: null, opciones: [] };
            //l.push(p);
        //}
        changeToNextPage() {
            let l = this.getPantallas();
            let pantalla = this.getSelectedItem('plantilla$pantallasel');
        }

        render(): JSX.Element {
            //let displayFile: boolean = false;
            //let displayCode: boolean = false;
            //let displayPrivate: boolean = false;
            //let CreadoPor: any;
            //let CurrentUser: any;
            //let tipoPlantilla: any = Forms.getValue("TipoPlantilla", config.id);

            let Entidad: any = global.getData(this.props.entidad);
            let listaPantallas: any[] = this.getPantallas();
            let selectedPantalla = this.getSelectedItem('plantilla$pantallasel');
            let listaPreguntas: any[] = this.getPreguntasDePantalla(selectedPantalla);
            let listaRespuestas: any[] = [];
            let tipos = this.getTipos();
            //CurrentUser = global.getCurrentUser();

           
            console.log(selectedPantalla)
            //if (Entidad) {
            //    CreadoPor = Entidad.CreadoPor;
            //};
            //if (CreadoPor) {
            //    if (CreadoPor.ID === CurrentUser.ID) {
            //        displayPrivate = true;
            //    }
            //};
            //if (tipoPlantilla) {
            //    if (tipoPlantilla.Clave === "HTMLF" || tipoPlantilla.Clave === "WORDF") {
            //        displayFile = true;
            //    }
            //    else if (tipoPlantilla.Clave === "HTMLE") {
            //        displayCode = true;
            //    };
            //}; cambiar el input clave por uno generico


            return <page.Edit>
                <page.OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level="main">
                    <Row>
                        <input.Text id="Clave" maxLength={255} idForm={config.id} required={true} validations={[validations.required()]} size={[12, 4, 4, 4]} />
                        <input.Nombre size={[12, 6, 6, 6]} idFormSection={config.id} validations={[validations.required()]} />
                        <checkBox.Status size={[12, 2, 2, 2]} id="Activo" idForm={config.id} />
                        {/*<ddl.CategoriasPlantillaDDL size={[12, 4, 4, 4]} /> 
                         <input.Clave size={[12, 4, 4, 4]} validations={[validations.required()]} />
                         */}
                        <ddl.IdiomasDDL size={[12, 3, 3, 3]} />
                    </Row>
                    <hr />
                    <div id="loading" style={{ display: 'none' }}>
                        <Updating text="" />
                    </div>
                    <Row id="resultSection" style={{display:'inherit'}} >
                        
                        <Column style={{ borderRight: '1px solid #b2bec3'}} size={[12, 3, 3, 3]}>
                                <h5>Pantallas</h5>
                            {listaPantallas.map((pantalla: any, i: number) => (
                                <div key={`cln1-mainrow${pantalla.ID}`} onClick={() => pantalla.stored? this.selectItem(pantalla, 'plantilla$pantallasel', `screenRow-${pantalla.ID}`):null}>
                                    <Row className="pm-label-screen seletectableRow" key={`screenRow-${pantalla.ID}`} id={`screenRow-${pantalla.ID}`}>
                                            <Column size={[12, 9, 9, 9]} key={`screenColumn1-${pantalla.ID}`}>
                                                {!pantalla.stored
                                                    ? <input
                                                        style={{marginTop: '5px', caretColor:'#000', color:'#000'}}
                                                        key={`screeninput-${pantalla.ID}`}
                                                        type="text"
                                                        className="input-screen"
                                                        id={`screeninput-${pantalla.ID}`}
                                                        ref="input" />

                                                    : <div style={{ marginTop: '5px'}}> <span key={`cln1-text${pantalla.ID}`} style={{ fontWeight: 500, fontSize: '14px'}}>{pantalla.nombre}</span>
                                                     </div>
                                                }
                                            </Column>
                                            <Column style={{ textAlign: 'left' }} size={[12, 3, 3, 3]} key={`screenColumn2-${pantalla.ID}`}>
                                                { !pantalla.stored
                                                ?<button className="pm-btn-add-screen successtext dline" onClick={() => this.storageScreen(pantalla)} >
                                                    <i className="fas fa-check" key={`screenIconSave-${pantalla.ID}`} />
                                                </button>
                                                :<button className="pm-btn-add-screen successtext dline" onClick={() => this.updateScreen(pantalla)} >
                                                    <i className="fas fa-edit" key={`screenIconSave-${pantalla.ID}`} />
                                                </button>
                                                }
                                                <button className="pm-btn-add-screen errotext dline" onClick={() => this.removeScreen(i)} >
                                                    <i className="fas fa-times" key={`screenIconDelete-${pantalla.ID}`} />
                                                </button>
                                            </Column>
                                    </Row>
                                    </div>
                                ))}
                                <Row>
                                    <button className="pm-btn-add-screen addtext" onClick={() => this.addScreen()} >  <i className="fas fa-plus" />&nbsp; Agregar nueva </button>
                                </Row>                            
                        </Column>
                        {selectedPantalla && selectedPantalla.ID
                            ? <Column style={{ borderRight: '1px solid #b2bec3'}} size={[12, 4, 4, 4]}>
                                <h5>Preguntas</h5>
                                { listaPreguntas.map((pregunta: any, i: number) => (
                                    <Row className="pm-label-screen bg-screen-added questionAdded" key={`questionRow-${pregunta.ID}`} style={{ width:'96%', margin:'auto', marginBottom:'5px ',}}>
                                        <Column size={[12, 9, 9, 9]} key={`questionColumn1-${selectedPantalla.ID}-${pregunta.ID}`}>
                                            {!pregunta.stored
                                                ? <input
                                                    style={{ marginTop: '5px', caretColor: '#000' }}
                                                    key={`questioninput-${pregunta.ID}`}
                                                    type="text"
                                                    className="input-screen"
                                                    id={`questioninput-${pregunta.ID}`}
                                                    ref="input" />
                                                : <div style={{ marginTop: '5px' }}> <span key={`cln2-text${pregunta.ID}`} style={{ fontWeight: 500, fontSize: '14px' }}>
                                                    {pregunta.pregunta}</span>
                                                </div>
                                            }
                                        </Column>
                                        <Column style={{ textAlign: 'left' }} size={[12, 3, 3, 3]} key={`questionColumn2-${pregunta.ID}`}>
                                            {!pregunta.stored
                                                ? <button className="pm-btn-add-screen successtext dline" onClick={() => this.storageQuestion(pregunta)} >
                                                    <i className="fas fa-check" key={`questionIconSave-${selectedPantalla.ID}-${pregunta.ID}`} />
                                                </button>
                                                : <button className="pm-btn-add-screen successtext dline" onClick={() => this.updateQuestion(pregunta)} >
                                                    <i className="fas fa-edit" key={`questionIconSave-${selectedPantalla.ID}-${pregunta.ID}`} />
                                                </button>
                                            }
                                            <button className="pm-btn-add-screen errotext dline" key={`questionButtonDelete-${selectedPantalla.ID}-${pregunta.ID}`} onClick={() => this.removeQuestion(pregunta)} >
                                                <i className="fas fa-times" key={`questionIconDelete-${selectedPantalla.ID}-${pregunta.ID}`} />
                                            </button>
                                        </Column>
                                        {pregunta.stored
                                            ?< Column style={{  }} size={[12, 12, 12, 12]} key={`questionColumn3-${pregunta.ID}`}>
                                                <select className="ddlTipoRespuesta" defaultValue={pregunta.tipoRespuesta} style={{ background: '#95a5a6' }} id={`questionPPDdl-${selectedPantalla.ID}-${pregunta.ID}`} key={`questionPPDdl-${selectedPantalla.ID}-${pregunta.ID}`} onChange={() => this.changeTipoRespuesta(pregunta, selectedPantalla, `questionPPDdl-${selectedPantalla.ID}-${pregunta.ID}`)}>
                                                <option value='NONE'> Seleccione un tipo de respuesta </option>
                                                <option value='OU'> Opcion unica </option>
                                                <option value='OM'> Opcion multiple </option>
                                                <option value='LD'> Lista desplegable </option>
                                                <option value='TXT'> Texto </option>
                                            </select>
                                        </Column>:null}
                                        
                                        {pregunta.tipoRespuesta === 'OU' || pregunta.tipoRespuesta === 'OM' || pregunta.tipoRespuesta === 'LD' ?
                                            <div>
                                                {pregunta.opciones.map((op: any, indexOp: number) => (
                                                    <div>
                                                        <Row className="pm-label-question" style={{ width: '100%', margin: 'auto', borderBottom:'1px solid #bdc3c7 '}} key={`questionRow-${pregunta.ID}-${op.ID}`}>
                                                           <div className="dline w5">&nbsp;</div>
                                                            <div className="dline w80">
                                                                {op.stored

                                                                    ? <div style={{ marginTop: '5px' }}> <span key={`cln2-text${pregunta.ID}-${op.ID}`} style={{ fontWeight: 500, fontSize: '13px' }}> {op.opcion}</span></div>
                                                                    : <input
                                                                        style={{ marginTop: '10px' }}
                                                                        key={`questioninputOp-${pregunta.ID}-${op.ID}`}
                                                                        type="text"
                                                                        className="input-screen"
                                                                        id={`questioninputOp-${pregunta.ID}-${op.ID}`}
                                                                        ref="input" />}
                                                            </div>
                                                            <div className="dline w15">
                                                                {!op.stored
                                                                    ? <button className="pm-btn-add-screen successtext dline" key={`optionButtonSave-${pregunta.ID}-${op.ID}`} onClick={() => this.storageOpcion(pregunta, op, indexOp)} >
                                                                        <i className="fas fa-check" key={`optionIconSave-${pregunta.ID}-${op.ID}`} />
                                                                    </button>
                                                                    : <button className="pm-btn-add-screen successtext dline" onClick={() => this.updateOpcion(pregunta, op, indexOp)} >
                                                                        <i className="fas fa-edit" key={`optionIconSave-${pregunta.ID}-${op.ID}`} />
                                                                    </button>
                                                                }
                                                                <button className="pm-btn-add-screen errotext dline" key={`optionnButtonDelete-${pregunta.ID}-${op.ID}`} onClick={() => this.removeOption(pregunta, indexOp)} >
                                                                    <i className="fas fa-times" key={`optionIconDelete-${pregunta.ID}-${op.ID}`} />
                                                                </button>
                                                            </div>
                                                        </Row>
                                                    </div>

                                                ))}
                                                <button className="pm-btn-add-screen addtext" onClick={() => this.AddOpcion(pregunta)} >  <i className="fas fa-plus" />&nbsp; Agregar opcion </button>

                                            </div>
                                            : null
                                        }
                                    </Row>
                                ))}
                                <Row>
                                    <button className="pm-btn-add-screen addtext" onClick={() => this.addQuestion()} >  <i className="fas fa-plus" />&nbsp; Agregar pregunta </button>
                                </Row>
                            </Column>
                            : null}
                        <Column size={[12, 4, 4, 4]}>
                            preview
                            <div className="prevEncuesta">
                                <div className="prevEncuestaHeader">
                                    {selectedPantalla ? selectedPantalla.nombre:null}
                                </div>
                                <div className="prevEncuestaBody">
                                    {listaPreguntas.map((pregunta: any, i: number) => (
                                        <Row>
                                            <div className="questionFont">{pregunta.pregunta}</div>
                                            { pregunta.tipoRespuesta === 'OU'
                                                    ? <div> {pregunta.opciones.map((op: any, indexOp: number) => (
                                                        <div>
                                                            <Row className="pm-label-question" style={{ width: '90%', margin: 'auto', borderBottom: '1px solid #bdc3c7 ' }} key={`questionRow-${pregunta.ID}-${op.ID}`}>
                                                                <div className="dline w5">
                                                                    {indexOp === 0 ? <i className="fas fa-circle" /> : <i className="far fa-circle" />}
                                                                </div>
                                                                <div className="dline w80">
                                                                    {op.stored

                                                                        ? <div style={{ marginTop: '5px' }}> <span key={`cln2-text${pregunta.ID}-${op.ID}`} style={{ fontWeight: 500, fontSize: '13px' }}> {op.opcion}</span></div>
                                                                        : null}
                                                                </div>

                                                            </Row>
                                                        </div>

                                                    ))}
                                                    </div>
                                                    : null
                                            }
                                            {pregunta.tipoRespuesta === 'OM'
                                                ? <div> {pregunta.opciones.map((op: any, indexOp: number) => (
                                                    <div>
                                                        <Row className="pm-label-question" style={{ width: '90%', margin: 'auto', borderBottom: '1px solid #bdc3c7 ' }} key={`questionRow-${pregunta.ID}-${op.ID}`}>
                                                            <div className="dline w5">
                                                                {indexOp < 2 ? <i className="fas fa-check-square" /> : <i className="far fa-square" />}
                                                            </div>
                                                            <div className="dline w80">
                                                                {op.stored

                                                                    ? <div style={{ marginTop: '5px' }}> <span key={`cln2-text${pregunta.ID}-${op.ID}`} style={{ fontWeight: 500, fontSize: '13px' }}> {op.opcion}</span></div>
                                                                    : null}
                                                            </div>

                                                        </Row>
                                                    </div>

                                                ))}
                                                </div>
                                                : null
                                            }
                                            {pregunta.tipoRespuesta === 'LD'
                                                ? <div className="bradius" style={{ width: '80%', margin: 'auto', border: '1px solid #bdc3c7 ',  }}>
                                                    <div style={{ borderBottom: '1px solid #bdc3c7 ' }}>
                                                        Seleccione una opcion
                                                         <i style={{marginLeft:'40px'}} className="fas fa-chevron-down" key={`tipoopcionld-${pregunta.ID}`} />
                                                    </div>
                                                    {pregunta.opciones.map((op: any, indexOp: number) => (
                                                    <div>
                                                        <Row className="pm-label-question" style={{ width: '90%', margin: 'auto' }} key={`questionRow-${pregunta.ID}-${op.ID}`}>
                                                           
                                                            <div className="dline w80">
                                                                {op.stored

                                                                    ? <div style={{ marginTop: '5px' }}> <span key={`cln2-text${pregunta.ID}-${op.ID}`} style={{ fontWeight: 500, fontSize: '13px' }}> {op.opcion}</span></div>
                                                                    : null}
                                                            </div>

                                                        </Row>
                                                    </div>

                                                ))}
                                                </div>
                                                : null
                                            }
                                            {pregunta.tipoRespuesta === 'TXT'
                                                ? <div className="" style={{ width: '80%', margin: 'auto', border: '1px solid #bdc3c7 ', }}>
                                                    Ingresa tu respuesta
                                                    <TextArea id={`cln2-text${pregunta.ID}-resp-text`}  key={`cln2-text${pregunta.ID}-resp-text`} rows={2} idForm={config.id} size={[12, 12, 12, 12]} /> 

                                                </div>
                                                : null
                                            }
                                        </Row>
                                    ))}
                                   
                                </div>
                                <div className="prevEncuestaFooter">
                                    <button className="prevbutton"> Siguiente </button>
                                </div>
                            </div>
                        </Column>
                    </Row>
                </page.OptionSection>
                {/*<div className="modal-backdrop" id="customModalR"><ddl.PreguntaRespuestaDDL label="Tipo respuesta" />
                    <div className="modal-container">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                    <Row style={{background:'blue'}}>
                        <page.OptionSection style={{ background: 'red' }}>
                            <input.Text />
                        </page.OptionSection>
                    </Row>
                </div>*/}
            </page.Edit>;

        };
    });

    const View: any = page.connect(class extends page.Base {
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity
        });
        render(): JSX.Element {
            let displayFile: boolean = false;
            let displayCode: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                let tipoPlantilla: any = global.getData(this.props.entidad).TipoPlantilla;
                if (tipoPlantilla) {
                    if (tipoPlantilla.Clave === "HTMLF" || tipoPlantilla.Clave === "WORDF") {
                        displayFile = true;
                    }
                    else if (tipoPlantilla.Clave === "HTMLE") {
                        displayCode = true;
                    };
                };
            };

            return <page.View>
                <page.OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false} level="main">
                    <Row style={{ wordWrap: "break-word" }}>
                        <label.Clave size={[12, 4, 4, 4]} />
                        <label.Nombre size={[12, 6, 6, 6]} />
                        <label.Estatus size={[12, 2, 2, 2]} />
                        <label.Entidad id="Categoria" size={[12, 4, 4, 4]} />
                        <label.Entidad id="Idioma" size={[12, 3, 3, 3]} />
                        <label.Entidad id="TipoPlantilla" size={[12, 3, 3, 3]} />
                        <label.Privado size={[12, 2, 2, 2]} />
                        {displayFile === true ? <Column size={[12, 12, 12, 12]} style={{ marginTop: 15 }}>
                            <KontrolFileManager modulo={config.id} viewMode={true} multiple={false} />
                        </Column> : null}
                        {displayCode === true ? <Column style={{ marginTop: 20 }}>
                            <page.OptionSection id="Plantilla" level={1} icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <label.HTML id="Plantilla" />
                                </Row>
                            </page.OptionSection>
                        </Column> : null}
                    </Row>
                </page.OptionSection>
            </page.View>;
        };
    });
};