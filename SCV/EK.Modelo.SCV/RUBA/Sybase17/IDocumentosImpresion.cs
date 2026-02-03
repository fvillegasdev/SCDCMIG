#if RUBA
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_dcto_impresion")]
    public interface IDocumentosImpresion
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("descripcion_dcto")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("clave_dcto")]
        new string Clave { get; set; }

        [m.Kontrol.Column()]
        string ruta { get; set; }
    }
}
#endif