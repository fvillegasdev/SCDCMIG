using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_analisis_comunidades")]
    public interface IReporteAnalisisComunidades : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("AC")]
        int AC { get; set; }

        [m.Kontrol.Column("Anotaciones")]
        string Anotaciones { get; set; }

        [m.Kontrol.Column("ComiteVecinal")]
        int ComiteVecinal { get; set; }

        [m.Kontrol.Column("EntregaAdministracion")]
        int EntregaAdministracion { get; set; }

        [m.Kontrol.Column("EntregaAreasComunes")]
        int EntregaAreasComunes { get; set; }

        [m.Kontrol.Column("FondoEntregado")]
        int FondoEntregado { get; set; }

        [m.Kontrol.Column("Fraccionamiento")]
        string Fraccionamiento { get; set; }

        [m.Kontrol.Column("Plaza")]
        string Plaza { get; set; }

        int totalLotes { get; set; }
        int totalLotesEnt { get; set; }
        decimal porVivEntregada { get; set; }
        
        decimal fondoConvive { get; set; }
        
        int cantFoliosAbiertosAC { get; set; }
        
        int cantFoliosAbiertos { get; set; }
        int diasDesde51 { get; set; }
        string s_ComiteVecinal { get; set; } 
        string s_AC { get; set; } 
        string s_EntregaAreasComunes { get; set; } 
        string s_FondoEntregado { get; set; } 
        string s_EntregaAdmin { get; set; } 
        DateTime? fecha51 { get; set; }
    }
}
