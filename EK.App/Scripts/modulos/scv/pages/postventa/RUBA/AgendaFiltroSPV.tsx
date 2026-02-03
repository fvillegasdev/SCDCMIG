namespace EK.Modules.SCV.Pages.postventa.RUBA.FiltrosEntregaVivienda {
    //Entrega Paquetes
   // const config: page.IPageConfig = global.createPageConfig("FiltrosAgendaSPV", "scv");
  //  const config: page.IPageConfig = global.createPageConfig("Agenda", "kontrol");

    const PAGE_filtro_ID: string = "AgendaFILTRO$EntregaViviendaSPV";
    //const SECTION_CONCEPTO_ID: string = "ConsultaVE";


    interface IFiltroEntregaVivienda extends  page.IProps {
        //EntregaPaquetesResult?: DataElement;
        //bloqueado?: any;
    };

    export const FiltrosEntregaVivienda: any = global.connect(class extends React.Component<IFiltroEntregaVivienda, IFiltroEntregaVivienda> {

        constructor(props: IFiltroEntregaVivienda) {
            super(props);


        };

        static props: any = (state: any) => ({


        });


        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({


        });


    

        render(): JSX.Element {
            return <div>
                  <page.OptionSection
                    icon="fa fa-users"
                    level={1}
                    id={PAGE_filtro_ID}
                    collapsed={false}>
                    <PlazasDDL id={"PlazaInicial"} size={[4, 4, 4, 4]} label={"PLAZA"}  idFormSection={PAGE_filtro_ID}  validations={[validations.required()]} required={true} />
                    <select.Fraccionamientos id={"FraccInicial"} label={"FRACCIONAMIENTOS"}  idFormSection={PAGE_filtro_ID}  size={[4, 4, 4, 4]} />
                    <PersonaEntregaVDDL size={[4, 4, 4, 4]} id="PersonaEntregaV" idFormSection={PAGE_filtro_ID} validations={[validations.required()]} required={true}  />
                </page.OptionSection>
            </div>;

        }
    });


   
};

import FiltroAgendaEntregaViviendaPV = EK.Modules.SCV.Pages.postventa.RUBA.FiltrosEntregaVivienda