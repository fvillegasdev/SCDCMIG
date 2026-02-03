using mkontrol = EK.Modelo.Kontrol;
using EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;

namespace EK.Modelo.SCV
{
    public class UbicacionCoordenadas : mkontrol.BaseKontrol, IUbicacionCoordenadas
    {
       public int IdUbicacion { get; set; }
        public string Coordenadas { get; set; }

        public int IdUser { get; set; }
    }
}
