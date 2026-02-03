using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TF_Institucion_Detalle")]
    public interface IInstitucionDetalle : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int Orden { get; set; }

        [m.Kontrol.Column()]
        int IdTFInstitucion { get; set; }

        [m.Kontrol.Column()]
        int IdConcepto { get; set; }
        IConceptosCredito Concepto { get; set; }

        [m.Kontrol.Column()]
        bool Credito { get; set; }

        [m.Kontrol.Column()]
        bool Impresion { get; set; }
    }
}