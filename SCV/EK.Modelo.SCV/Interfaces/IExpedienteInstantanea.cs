using System;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Expedientes_Categoria_Instantaneas")]
    public interface IExpedienteInstantanea
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdSeguimientoEtapa { get; set; }

        [m.Kontrol.Column()]
        int? IdCategoria { get; set; }

        [m.Kontrol.Column()]
        int? IdProceso { get; set; }


        [m.Kontrol.Column()]
        int? IdUsuario { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaCaptura { get; set; }

        int? IdFaseExpediente { get; set; }
        int? IdExpediente { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        m.SCV.Interfaces.IAgente Agente { get; set; }
        m.SCV.Interfaces.IFaseExpediente FaseExpediente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Proceso { get; set; }
    }
}