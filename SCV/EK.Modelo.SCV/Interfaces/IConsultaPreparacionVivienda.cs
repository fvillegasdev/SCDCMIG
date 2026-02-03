using System;
using System.Collections.Generic;
using EK.Modelo.Kontrol.Interfaces;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
#if MSSQL
    [m.Kontrol.Table("usuariosEK")]
#endif
#if SYBASE17
    [m.Kontrol.Table("usuariosEK")]
#endif
    public interface IConsultaPreparacionVivienda
         : m.Kontrol.Interfaces.IBaseKontrol
    {

    }
}
