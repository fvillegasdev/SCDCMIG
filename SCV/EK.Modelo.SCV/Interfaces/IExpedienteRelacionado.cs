using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Expedientes_Posiciones_Relacionados")]

    public interface IExpedienteRelacionado : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdExpediente { get; set; }

        [m.Kontrol.Column()]
        int? IdPosicion { get; set; }
        m.Kontrol.Interfaces.IPosicion Posicion { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        bool? Comisionable { get; set; }
    }
}