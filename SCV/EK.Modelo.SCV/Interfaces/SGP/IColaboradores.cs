using m = EK.Modelo;

namespace EK.Modelo.SGP.Interfaces
{
    [m.Kontrol.Table("sgp_proyectoColaboradores")]

    public interface IColaboradores 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        int IdProyecto { get; set; }

        [m.Kontrol.Column()]
        int IdGrupo { get; set; }

        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

        m.SGP.Interfaces.IProyectos Proyecto { get; set; }
        m.Kontrol.Interfaces.IGruposUsuario Grupo { get; set; }


        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        bool _eliminado { get; set; }


    }
}
