using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using diSCV = EK.Datos.SCV.Interfaces;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using miSCV = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TiposCambio
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITiposCambio, d.SCV.Interfaces.ITiposCambio>,
        p.SCV.Interfaces.ITiposCambio
    {
        public TiposCambio(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITiposCambio dao)
            : base(factory, dao, "tiposcambio")
        {
        }
        public async Task<decimal?> GetTipoCambioAlDia(int idMonedaOrigen, int idMonedaDestino)
        {
            decimal? retValue = null;
            retValue = 1; // si la moneda Origen es Igual a la Destino el tipo de cambio es 1

            if (idMonedaOrigen != idMonedaDestino) { 
                List<miKontrol.ITipoCambio> tiposcambio = await this.dao.Get(idMonedaOrigen, idMonedaDestino, DateTime.UtcNow.Date);
                if (tiposcambio != null && tiposcambio.Count > 0)
                {
                    retValue = tiposcambio[0].Valor;
                }
            }
            return retValue;
        }
    }
}


//    {
//        private diSCV.ITiposCambio dao;
//        private const string catalogo = "tipocambio";

//        public TiposCambio(miKontrol.IContainerFactory factory, diSCV.ITiposCambio dao)
//               : base(factory)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }

//        #region Public Functions

//        public async Task<List<miKontrol.ITipoCambio>> GetAll( int activos)
//        {
//            return await this.dao.GetAll(activos);
//        }

//        public async Task<miKontrol.ITipoCambio> GetById(int id)
//        {
//            return await this.dao.GetById(id);
//        }

//        public async Task<decimal?> GetTipoCambioAlDia(int idMonedaOrigen, int idMonedaDestino)
//        {
//            decimal? retValue = null;
//            List<miKontrol.ITipoCambio> tiposCambio = await this.dao.Get(idMonedaOrigen, idMonedaDestino, DateTime.UtcNow.Date);

//            if (tiposCambio != null && tiposCambio.Count > 0) {
//                retValue = tiposCambio[0].Valor;
//            }

//            return retValue;
//        }

//        public async Task<miKontrol.ITipoCambio> GetByMonedaId(int idMoneda)
//        {
//            return await this.dao.GetByMonedaId(idMoneda);
//        }

//        public async Task<miKontrol.ITipoCambio> Save(miKontrol.ITipoCambio item)
//        {
          
//            var retValue = this.factory.GetInstance<miSCV.ITipoCambio>();
//            try
//            {
//                BeginTransaction();

//                var tipoCambioDAO = Get<diSCV.ITiposCambio>();

//                item.IdCreadoPor = base.getUserId();
//                item.IdModificadoPor = this.getUserId();

//                int id = await tipoCambioDAO.Save(item);

//                retValue = await tipoCambioDAO.GetById(id);

//                Commit();
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }
//          //  await this.Log(retValue);

//            return retValue;
//        }

//        #endregion Public Functions

//        #region Private Functions

//        private async Task Log(miKontrol.ITipoCambio obj)
//        {
//            dynamic entity = new ElasticEntity();

//            entity.ID = obj.ID;

//            entity.IdMoneda = obj.Moneda.ID;
//            entity.MonedaClave = obj.Moneda.Clave;
//            entity.MonedaNombre = obj.Moneda.Nombre;

//            entity.IdMonedaDestino = obj.MonedaDestino.ID;
//            entity.MonedaDestinoClave = obj.MonedaDestino.Clave;
//            entity.MonedaDestinoNombre = obj.MonedaDestino.Nombre;

//            entity.Fecha = obj.Fecha;
//            entity.FechaHasta = obj.FechaHasta;
//            entity.Valor = obj.Valor;

//            entity.IdEstatus = obj.Estatus.ID;
//            entity.EstatusClave = obj.Estatus.Clave;
//            entity.EstatusNombre = obj.Estatus.Nombre;

//            entity.RecordType = Convert.ToInt32(obj.Estado);
//            entity.RecordTypeName = obj.Estado.ToString();

//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

//            entity.Modificado = obj.Modificado;
//            entity.IdModificadoPor = obj.ModificadoPor.ID;
//            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

//            await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
//        }

//        #endregion Private Functions
//    }
//}
