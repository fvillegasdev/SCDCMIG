using System.Threading.Tasks;
using miSCV = EK.Modelo.SCV.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using System.Collections.Generic;
using System.Data;
using System;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using mk = EK.Modelo.Kontrol;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("ConfigViviendaEntregable")]

    public interface IConfigViviendaEntregable
        : p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IConfigViviendaEntregable>
    {
        
        Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> GetConfigViviendaEntregable(Dictionary<string, object> parametros);
        Task<List<m.SCV.Interfaces.IConfigViviendaEntregable>> SaveConfigViv(int numcte, DateTime fecha_programacion, int num_entrega_viv, string lugar_hora_entrega, String bit_detalles);
        //Task<mk.Interfaces.IKontrolFile> GetDocsImpresion(m.SCV.Interfaces.ISeguimientoDocumento item);
        Task<m.SCV.Interfaces.IConfigViviendaEntregable> GetDocumentoImpresion(m.SCV.Interfaces.IConfigViviendaEntregable model);
    }


}