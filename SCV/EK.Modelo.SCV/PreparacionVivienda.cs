using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PreparacionVivienda")]
    public interface IPreparacionVivienda
        : IBaseKontrol
    {

        [m.Kontrol.Column()]
        string numcte { get; set; }
        [m.Kontrol.Column()]
        int IdUbicacionVenta { get; set; }
        [m.Kontrol.Column()]
        string plaza { get; set; }
        [m.Kontrol.Column()]
        string clave_tipo_vivienda { get; set; }
        [m.Kontrol.Column()]
        string hipoteca_verde { get; set; }
        [m.Kontrol.Column()]
        string clave_dcto { get; set; }
        [m.Kontrol.Column()]
        string ruta { get; set; }
        [m.Kontrol.Column()]
        string ProcesoImpresion { get; set; }
        int? IdExpediente { get; set; }
        new string TipoExt { get; set; }
        new string filename_download { get; set; }
    }
}
