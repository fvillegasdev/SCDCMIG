using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    [Table("sdc_dc_eventos")]
    public interface IEventosActividadesParam : IBaseKontrol
    {
        //string Clasificacion { get; set; }
        string Nombre { get; set; }
        string AlcanceEvento { get; set; }
        string TipoEvento { get; set; }
        int? Plaza { get; set; }
        int? TipoVivienda { get; set; }
        string Fraccionamiento { get; set; }
        DateTime? FechaProgramacion { get; set; }
        DateTime? FechaReProgramacion { get; set; }
        string MotivoReprogramacion { get; set; }
        int? MediosDifusion { get; set; }
        int? NumeroStaff { get; set; }
        int MetaAsistencia { get; set; }
        string Participantes { get; set; }
        string Empresas { get; set; }
        string Impacto { get; set; }
        string ClasificacionEvento { get; set; }
        int Usuario { get; set; }
        bool Volanteo { get; set; }
        bool Prensa { get; set; }
        bool Perifoneo { get; set; }
        bool RedesSociales { get; set; }
        bool CorreoElectronico { get; set; }
        bool MediosComunicacion { get; set; }
        List<IPosiblesAlianzas> PosiblesAlianzas { get; set; }
        List<IObservacionesRequerimientos> ObservacionesReq { get; set; }
        List<IPermisos> Permisos { get; set; }
        List<IInvitadosEspeciales> InvitadosEspeciales { get; set; }
    }
    public interface IPosiblesAlianzas : IBaseKontrol
    {
        int? IdEvento { get; set; }
        string Descripcion { get; set; }
        int Usuario { get; set; }
    }
    public interface IObservacionesRequerimientos : IBaseKontrol
    {
        int? IdEvento { get; set; }

        string DescripcionObsReq { get; set; }
        int Usuario { get; set; }
    }
    public interface IPermisos : IBaseKontrol
    {
        int? IdEvento { get; set; }

        string Permiso { get; set; }
        int Usuario { get; set; }
    }
    public interface IInvitadosEspeciales : IBaseKontrol
    {
        int? IdEvento { get; set; }
        string Nombre { get; set; }
        string ApellidoMaterno { get; set; }
        string ApellidoPaterno { get; set; }
        string Cargo { get; set; }
        bool Confirmo { get; set; }
        int Usuario { get; set; }
    }
}