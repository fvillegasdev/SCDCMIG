using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Tabulador")]
    public interface ITabuladores
        : m.Kontrol.Interfaces.IBaseKontrol
    {       
        [m.Kontrol.Column()]
        bool UsaPorcentaje { get; set; }

        [m.Kontrol.Column()]
        bool Complementaria { get; set; }

        [m.Kontrol.Column()]
        int MontoBase { get; set; }

        [m.Kontrol.Column()]
        int IdIndicador { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int? IdMoneda { get; set; }

        [m.Kontrol.Column()]
        int IdTipoComision { get; set; }


        [m.Kontrol.Column()]
        int IdFase { get; set; }

        [m.Kontrol.Column()]
        int? IdPlaza { get; set; }

        [m.Kontrol.Column()]
        int IdCategoria { get; set; }

        [m.Kontrol.Column()]
        int IdPeriodicidad { get; set; }

        IPlaza Plaza { get; set; }
        IDesarrollos Desarrollo { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
        IIndicadores Indicador { get; set; }
        m.SCV.Interfaces.ITmComisiones TipoComision { get; set; }
        ICategoria Categoria { get; set; }
        IFaseExpediente Fase { get; set; }
        IPeriodicidad Periodicidad { get; set; }
        List<ITabuladoresConfiguracion> Configuracion { get; set; }
    }
}
