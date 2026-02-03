using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

using d = EK.Datos.SCV.Interfaces;
using m = EK.Modelo.SCV.Interfaces;
using dk = EK.Datos.Kontrol;
using dki = EK.Datos.Kontrol.Interfaces;
using mki = EK.Modelo.Kontrol.Interfaces;

namespace EK.Datos.SCV.MSSQL
{
    public class PuntosVenta
        : dk.DAOBaseGeneric<m.IPuntoVenta>, d.IPuntosVentas
    {
        private const string USP_SCV_PUNTOSVENTA_SELECT = "usp_scv_PuntosVenta_select";
        public PuntosVenta(mki.IContainerFactory factory, dki.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_SCV_PUNTOSVENTA_SELECT,
                  string.Empty,
                  "scv_PuntosVenta")
        { }

        //public override Task<m.IPuntoVenta> Save(m.IPuntoVenta model)
        //{
        //    var p = new Dictionary<string, object>();
        //    p.Add("Id", model.ID);
        //    p.Add("Nombre", model.Nombre);
        //    p.Add("Clave", model.Clave);
        //    p.Add("Direccion", model.Direccion);
        //    p.Add("CodigoPostal", model.CodigoPostal);
        //    p.Add("IdLocalidad", model.Asentamiento.ID);
        //    p.Add("Telefono1", model.Telefono1);
        //    p.Add("Telefono2", model.Telefono2);
        //    p.Add("IdEstatus", model.IdEstatus);
        //    p.Add("CreadoPor", model.IdModificadoPor);
        //    p.Add("ModificadoPor", model.IdModificadoPor);

        //    return base.BaseSave(this.defaultSave, p);
        //}
    }
}
