using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;
using d = EK.Datos;


namespace EK.Datos.SCV.Interfaces
{
    public interface IPreparacionVivienda
        : d.Kontrol.Interfaces.IDAOBaseGeneric<m.Kontrol.Interfaces.IPreparacionVivienda>
    {
        Task<int> GetDocumentoImpresion(m.Kontrol.Interfaces.IPreparacionVivienda item);
    }
}
