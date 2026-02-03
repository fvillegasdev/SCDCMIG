using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    //[m.Kontrol.Table("sv_reporte")]
    public interface IListaCatsCorreo : m.Kontrol.Interfaces.IBaseKontrol
    {
        int IdResponsableDictamen { get; set; }
        string FoliosTerminados { get; set; }
        string NombreCat { get; set; }
        string CorreoCat { get; set; }
        DateTime? UltimoEnvio { get; set; }
    }
}
