using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("UbicacionCoordenadas")]
    public interface IUbicacionCoordenadas : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdUbicacion {get;set;}
        [m.Kontrol.Column()]
        string Coordenadas { get; set; }

        int IdUser { get; set; }
    }
}
