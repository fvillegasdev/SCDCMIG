using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Obra")]
    public interface IObra : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string IdTipoObra { get; set; }
        [m.Kontrol.Column()]
        int? Contrato { get; set; }
        [m.Kontrol.Column()]
        string Direccion { get; set; }
        [m.Kontrol.Column()]
        string IdEstadoObra { get; set; }
        [m.Kontrol.Column()]
        string UbicacionObra { get; set; }
        [m.Kontrol.Column()]
        string Responsable { get; set; }
        [m.Kontrol.Column()]
        string IdCentroCosto { get; set; }
        [m.Kontrol.Column()]
        string IdDesarrollo { get; set; }
        [m.Kontrol.Column()]
        int? IdTipoFSR { get; set; }
        [m.Kontrol.Column()]
        decimal? FactorFSR { get; set; }
        [m.Kontrol.Column()]
        int? IdInsumoFSR { get; set; }
        [m.Kontrol.Column()]
        bool ValuacionActualizada { get; set; }
        [m.Kontrol.Column()]
        string Geolocalizacion { get; set; }
        [m.Kontrol.Column()]
        int? IdAsentamiento { get; set; }
        [m.Kontrol.Column()]
        int MinimoWBSNivel { get; set; }
        [m.Kontrol.Column()]
        int MaximoWBSNivel { get; set; }

        [m.Kontrol.Column()]
        bool ObraUniversal { get; set; }
        [m.Kontrol.Column()]
        bool AfectaObraUniversal { get; set; }
        [m.Kontrol.Column("IdObraUniversal")]
        int? IdObra { get; set; }
        [m.Kontrol.Column()]
        int? IdTabulador { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoFSR { get; set; }
        m.SCCO.Interfaces.IInsumo InsumoFSR { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Desarrollo { get; set; }
        m.SCCO.Interfaces.ITipoObra TipoObra { get; set; }
        m.Kontrol.Interfaces.ICentrosCosto CentroCosto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstadoObra { get; set; }
        m.Kontrol.Interfaces.IAsentamiento Asentamiento { get; set; }

        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.SCCO.Interfaces.ITabulador Tabulador { get; set; }

        List<m.SCCO.Interfaces.IObraIndirecto> ObraIndirectos { get; set; }
        List<m.SCCO.Interfaces.IObraValidacion> ObraValidaciones { get; set; }
        List<m.SCCO.Interfaces.IObraIndirectoTarjeta> ObraIndirectoTarjetas { get; set; }
        List<m.SCCO.Interfaces.IObraCompania> ObraCompanias { get; set; }
        List<m.SCCO.Interfaces.IObraNivel> ObraNiveles { get; set; }
    }
}