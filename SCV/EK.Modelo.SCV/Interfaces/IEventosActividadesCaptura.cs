using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEventosActividadesCaptura : IBaseKontrol
    {
        int? IdEvento { get; set; }
        int? IdOrganizador { get; set; }
        string Antecedentes { get; set; }
        string ImpactoEsperado { get; set; }
        decimal GastosTotales { get; set; }
        decimal? Ruba { get; set; }
        decimal? Porcentaje { get; set; }
        int? HorasIntervencion { get; set; }
        int? MetaAsistencia { get; set; }
        int? NumeroAsistentes { get; set; }
        decimal? PorcentajeMeta { get; set; }
        bool PresenciaPrensa { get; set; }
        bool ProgramaRecomendados { get; set; }
        bool Imagen { get; set; }
        bool Integracion { get; set; }
        bool Servicios { get; set; }
        bool Sustentabilidad { get; set; }
        List<IPatrocinadoresPorcentaje> Patrocinadores { get; set; }
    }
    public interface IPatrocinadoresPorcentaje :IBaseKontrol
    {
        int? IdEvento { get; set; }
        int? IdPatrocinador { get; set; }
        string Patrocinador { get; set; }
        decimal? Cantidad { get; set; }
        decimal? Porcentaje { get; set; }
        bool Especie { get; set; }
        string TipoEspecie { get; set; }
    }
}
