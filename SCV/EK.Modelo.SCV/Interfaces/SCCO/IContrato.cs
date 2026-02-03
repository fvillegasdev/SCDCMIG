using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Contratos")]
    public interface IContrato : m.SCCO.Interfaces.IBaseConvenio
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        DateTime? FechaInicio { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaFin { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaFirma { get; set; }

        [m.Kontrol.Column()]
        string Representante { get; set; }

        [m.Kontrol.Column()]
        int IdConvenio { get; set; }

        [m.Kontrol.Column()]
        decimal ImporteContrato { get; set; }

        List<IBitacoraAD> BitacoraAD { get; set; }

        List<ITestigoContrato> TestigosContratos { get; set; }

        List<IRegistroAnticipoRetencion> RegistroAnticipoRetencion { get; set; }




    }
}