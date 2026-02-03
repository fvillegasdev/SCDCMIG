using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Insumo")]
    public interface IInsumo : IBaseInsumo
    {

        [m.Kontrol.Column("ClaveInsumo")]

        new string ClaveInsumo { get; set; }

        [m.Kontrol.Column("IdUnidadMedida")]
        new int? IdUnidadMedida { get; set; }


        [m.Kontrol.Column("IdClasificacion")]
        new int? IdClasificacion { get; set; }

    }

    public interface IBaseInsumo : m.Kontrol.Interfaces.IBaseKontrol
    {
        string ClaveInsumo { get; set; }

        int? IdUnidadMedida { get; set; }

        int? IdClasificacion { get; set; }

        m.Kontrol.Interfaces.IUnidadMedida UnidadMedida { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Clasificacion { get; set; }
    }
}