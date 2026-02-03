using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IEventosActividades : IBaseKontrol
    {
        string Clasificacion { get; set; }
        string ClaveClasificacion { get; set; }
        string ClasificacionNombre { get; set; }
        string Nombre { get; set; }
        string AlcanceEvento { get; set; }
        int IdAlcanceEvento { get; set; }
        string TipoEvento { get; set; }
        int IdTipoEvento { get; set; }
        int? IdPlaza { get; set; }
        string Plaza { get; set; }
        int? IdTipoVivienda { get; set; }
        string TipoVivienda { get; set; }
        string Fraccionamiento { get; set; }
        string IdFraccionamiento { get; set; }
        DateTime? FechaProgramacion { get; set; }
        DateTime? FechaReprogramacion { get; set; }
        string MotivoReprogramacion { get; set; }
        int? IdMediosDifusion { get; set; }
        string MedioDifusion { get; set; }
        int? NumeroStaff { get; set; }
        int MetaAsistencia { get; set; }
        bool Participantes { get; set; }
        bool Empresas { get; set; }
        bool Volanteo { get; set; }
        bool Prensa { get; set; }
        bool Perifoneo { get; set; }
        bool Redes { get; set; }
        bool Correo { get; set; }
        bool MediosComunicacion { get; set; }
        string ImpactoComunidad { get; set; }
        int? IdImpactoComunidad { get; set; }
        string ClasificacionEvento { get; set; }
        string IdClasificacionEventos { get; set; }
        List<IPosiblesAlianzas> PosiblesAlianzas { get; set; }
        List<IObservacionesRequerimientos> ObservacionesReq { get; set; }
        List<IPermisos> Permisos { get; set; }
        List<IInvitadosEspeciales> InvitadosEspeciales { get; set; }
    }
}