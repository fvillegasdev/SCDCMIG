using System;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV.Interfaces
{
    [mk.Table("scv_Comision_Configuraciones")]
    public interface IComisionConfiguracion
        : mk.Interfaces.IBaseKontrol
    {

        [mk.Column("Clave", true)]
        new string Clave { get; set; }

        [mk.Column("Nombre",true)]
        new string Nombre { get; set; }

        [mk.Column()]
        string Descripcion { get; set; }

        [mk.Column()]
        decimal? Porcentaje { get; set; }

        [mk.Column()]
        decimal? Importe { get; set; }

        [mk.Column()]
        int? IdDesarrollo { get; set; }

        [mk.Column()]
        int? IdEsquema { get; set; }
        [mk.Column()]
        int? IdPrototipo { get; set; }

        [mk.Column()]
        int? IdCategoria { get; set; }

        [mk.Column()]
        int? IdUbicacion { get; set; }

        [mk.Column()]
        int IdFase { get; set; }

        m.Interfaces.IEsquema Esquema { get; set; }

        m.Interfaces.IUbicaciones Ubicacion { get; set; }
        m.Interfaces.IDesarrollos Desarrollo { get; set; }
        m.Interfaces.IPrototipo Prototipo { get; set; }

        m.Interfaces.IFaseExpediente Fase { get; set; }

        mk.Interfaces.ICategoria Categoria { get; set; }
    }
}