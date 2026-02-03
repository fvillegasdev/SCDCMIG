using System;
using System.Collections.Generic;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sm_cliente")]
    public interface IClientesSPV
        : m.Kontrol.Interfaces.IBaseKontrolMM
    {
        [m.Kontrol.Column("IdEntity", true)]
        int? IdEntity { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("lote_id")]
        int? IdUbicacion { get; set; }

        [m.Kontrol.Column("tel_casa")]
        string TelefonoCasa { get; set; }

        [m.Kontrol.Column("tel_oficina")]
        string TelefonoOficina { get; set; }

        [m.Kontrol.Column("tel_otros")]
        string TelefonoOtros { get; set; }

        [m.Kontrol.Column("dir_email")]
        string CorreoElectronico { get; set; }

        [m.Kontrol.Column("fec_nac")]
        DateTime FechaNacimiento { get; set; }

        [m.Kontrol.Column("rfc_cte")]
        string RFC { get; set; }

        [m.Kontrol.Column("dir_casa")]
        string Direccion { get; set; }

        [m.Kontrol.Column("colonia")]
        string Colonia { get; set; }

        [m.Kontrol.Column("ciudad")]
        string Ciudad { get; set; }

        [m.Kontrol.Column("municipio")]
        string Municipio { get; set; }

        [m.Kontrol.Column("edo")]
        string EntidadFederal { get; set; }

        [m.Kontrol.Column("pais")]
        string Pais { get; set; }

        [m.Kontrol.Column("cp")]
        string CodigoPostal { get; set; }

        string UbicacionClave { get; set; }

        string UbicacionClaveFormato { get; set; }
        string Calle { get; set; }
        string Interior { get; set; }
        string Exterior { get; set; }

        int? IdCoordinador { get; set; }

        int? IdSupervisor { get; set; }

        int Antiguedad { get; set; }
        string SuperManzana { get; set; }
        string Manzana { get; set; }
        string Lote { get; set; }

        bool HipotecaVerde { get; set; }

        string Vendedor { get; set; }
        int VendedorID { get; set; }

        string Notario { get; set; }
        int NotarioID { get; set; }
        string Nivel { get; set; }
        string Edificio { get; set; }
        m.SCV.Interfaces.IFraccionamientos Desarrollo { get; set; }

        List<m.SCV.Interfaces.IClienteContactos> ClienteTelefonoContactos { get; set; }
        string NombreCte { get; set; }

    }
}