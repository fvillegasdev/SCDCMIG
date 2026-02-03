using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_empresas")]

    public interface IEmpresa 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string RFC { get; set; }

        [m.Kontrol.Column()]
        string NRP { get; set; }

        [m.Kontrol.Column()]
        string Domicilio { get; set; }

        [m.Kontrol.Column()]
        int? IdLocalidad { get; set; }

        m.Kontrol.Interfaces.IAsentamiento Localidad { get; set; }


        [m.Kontrol.Column()]
        string Telefono { get; set; }

        [m.Kontrol.Column()]
        string Extension { get; set; }

        [m.Kontrol.Column()]
        string TitularRH { get; set; }
    }
}
