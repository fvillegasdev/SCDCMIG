using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_wbs_nodos")]
    public interface IWBSNodo : m.SCCO.Interfaces.IWBSBase
    {
        [m.Kontrol.Column()]
        new string Descripcion { get; set; }

        [m.Kontrol.Column()]
        new int? IdPadre { get; set; }

        [m.Kontrol.Column()]
        new int IdEntidad { get; set; }

        [m.Kontrol.Column()]
        new int? Nivel { get; set; }

        [m.Kontrol.Column()]
        new string Codigo { get; set; }

        [m.Kontrol.Column()]
        new decimal Cantidad { get; set; }

        [m.Kontrol.Column()]
        new decimal Precio { get; set; }

        //[m.Kontrol.Column()]
        //new decimal PrecioMoneda { get; set; }

        [m.Kontrol.Column()]
        new decimal Importe { get; set; }

        [m.Kontrol.Column()]
        new bool Bloqueado { get; set; }

        //[m.Kontrol.Column()]
        //new decimal ImporteMoneda { get; set; }

        [m.Kontrol.Column()]
        new int IdTipoNodo { get; set; }
    }

    public interface IWBSBase : m.Kontrol.Interfaces.IBaseKontrol
    {
        string Descripcion { get; set; }
        int IdNodo { get; set; }
        int? IdPadre { get; set; }
        int IdEntidad { get; set; }
        int? Nivel { get; set; }
        string Codigo { get; set; }
        decimal Cantidad { get; set; }
        decimal Precio { get; set; }
        //decimal PrecioMoneda { get; set; }
        decimal Importe { get; set; }
        //decimal ImporteMoneda { get; set; }
        string Tipo { get; set; }
        int IdTipoNodo { get; set; }
        bool Bloqueado { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoNodo { get; set; }
    }
}