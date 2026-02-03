using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Planes_Pagos")]
    public interface IPlanPagos : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }
        [m.Kontrol.Column()]
        DateTime VigenciaInicio { get; set; }
        [m.Kontrol.Column()]
        DateTime VigenciaFin { get; set; }
        [m.Kontrol.Column()]
        int IdMoneda { get; set; }
        IMoneda Moneda { get; set; }
        List<IPlanPagosConceptoPago> ConceptoPago { get; set; }
        IPlanPagos PlanPagos { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        List<IPlanPagosConceptoPago> scv_Planes_Pagos_ConceptosPago { get; set; }

        List<IPlanPagosConfiguracion> Configuracion { get; set; }
    }
}
