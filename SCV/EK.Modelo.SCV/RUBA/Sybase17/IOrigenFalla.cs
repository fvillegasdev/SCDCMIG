#if RUBA
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_Origen_Falla")]
    public interface IOrigenFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("desc_Origen")]
        string Descripcion { get; set; }

        [m.Kontrol.Column("clave_origen")]
        new int Clave { get; set; }

        [m.Kontrol.Column()]
        string Abreviatura { get; set; }

        [m.Kontrol.Column()]
        bool Procede { get; set; }
    }
}
#endif