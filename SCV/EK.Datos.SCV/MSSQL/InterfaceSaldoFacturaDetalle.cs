using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class InterfaceSaldoFacturaDetalle
        : dk.DAOBaseGeneric<m.SCV.Interfaces.IInterfaceSaldoFacturaDetalle>, d.SCV.Interfaces.IInterfaceSaldoFacturaDetalle
    {
        private const string USP_INTERFACE_SALDOFACTURADETALLE_SELECT = "usp_Interface_SaldoFacturaDetalle_select";
        public InterfaceSaldoFacturaDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(factory, helper, USP_INTERFACE_SALDOFACTURADETALLE_SELECT, null, "InterfaceSaldoFacturaDetalle")
        { }

    }
}
