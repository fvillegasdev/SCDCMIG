using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.Sybase17
{
    public class SPVSupervisoresCat
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.ISVPSupervisoresCAT>, d.SCV.Interfaces.ISPVSupervisoresCAT
    {
    }
}
