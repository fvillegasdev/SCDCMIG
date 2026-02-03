using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_PolizaFiniquito")]
    public interface IPolizaFiniquito : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int IdEstadoPoliza { get; set; }

        [m.Kontrol.Column()]
        int IdTipoProceso { get; set; }

        [m.Kontrol.Column()]
        string NumPoliza { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaPoliza { get; set; }


        // Excluidos
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Modificado", true)]
        new string Modificado { get; set; }

        [m.Kontrol.Column("IdEstatus", true)]
        new string IdEstatus { get; set; }

        [m.Kontrol.Column("IdModificadoPor", true)]
        new string IdModificadoPor { get; set; }

        // Propiedades adicionales 
        m.Kontrol.Interfaces.IItemGeneral EstadoPoliza { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }
        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }
        m.SCV.Interfaces.ITipoComercializacion TipoComercializacion { get; set; }
        m.SCV.Interfaces.ITiposDeProceso TipoProceso { get; set; }
        m.SCO.Interfaces.IPoliza Poliza { get; set; }

    }
}