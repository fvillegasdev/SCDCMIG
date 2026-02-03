using EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_prototipos")]
    public interface IPrototipo : IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }
        [m.Kontrol.Column()]
        decimal FrenteMinimo { get; set; }
        [m.Kontrol.Column()]
        decimal Construccion { get; set; }
        [m.Kontrol.Column()]
        int Recamaras { get; set; }

        //[m.Kontrol.Column()]
        //int IdRecamara { get; set; }

        //IItemGeneralValores Recamara { get; set; }
        //[m.Kontrol.Column()]
        //int IdSalaTV { get; set; }
        //[m.Kontrol.Column()]
        //int IdCuartoServicio { get; set; }
        [m.Kontrol.Column()]
        decimal Banios { get; set; }
        [m.Kontrol.Column()]
        int IdInmueble { get; set; }

        IItemGeneralValores Inmueble { get; set; }
        
        List<m.SCV.Interfaces.IUbicacionFallaPrototipo> UbicacionesFallasPrototipo { get; set; }
    }
}