using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Bitacora_AditivasDeductivas")]
    public interface IBitacoraAD
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        /** base excluded **/
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        /** base excluded **/

        [m.Kontrol.Column()]
        int IdContrato { get; set; }

        [m.Kontrol.Column()]
        decimal Importe { get; set; }

        [m.Kontrol.Column()]
        int? IdBitacoraConvenio { get; set; }

        m.Kontrol.Interfaces.IItemGeneral BitacoraConvenio { get; set; }
    }
}