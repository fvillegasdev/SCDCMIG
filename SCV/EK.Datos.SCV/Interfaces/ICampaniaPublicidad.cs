using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Text;
using d = EK.Datos;
using m = EK.Modelo;



namespace EK.Datos.SCV.Interfaces
{
    public interface ICampaniaPublicidad
         : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.ICampaniaPublicidad>
    {
        Task<m.SCV.Interfaces.ICampaniaPublicidad> GetByCampaniaPublicidadId(Dictionary<string, object> parametros);

        //Campaña Publicidad por Usuario QUICKSIDEBAR
        Task<List<m.SCV.Interfaces.ICampaniaPublicidad>> SelectCampaniaPublicidadUser(Dictionary<string, object> parametros);
    }
}