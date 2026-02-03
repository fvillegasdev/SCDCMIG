using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using d = EK.Datos;

namespace EK.Datos.SCV.Interfaces
{
    public interface IConfigViviendaEntregable
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.SCV.Interfaces.IConfigViviendaEntregable>
    {

        Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> GetConfigViviendaEntregable(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> SaveConfigViv(int numcte, DateTime fecha_programacion, int num_entrega_viv, string lugar_hora_entrega, string bit_detalles);
        Task<List<m.Kontrol.Interfaces.IPreparacionVivienda>> GetDocumentoImpresion(m.Kontrol.Interfaces.IPreparacionVivienda item);
        Task<m.SCV.Interfaces.IPreparacionViviendaDocs> GetInformacionCte(int idUbicacionVenta);
        Task<int> UpdateResponsableEntViv(Dictionary<string, object> parametros);
        Task<int> EncuestaVivienddaEntregable(Dictionary<string, object> parametros);

    }
}
