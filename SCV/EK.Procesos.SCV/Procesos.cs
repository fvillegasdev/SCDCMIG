using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Procesos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IProceso, d.SCV.Interfaces.IProcesos>,
        p.SCV.Interfaces.IProcesos
    {
        public Procesos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IProcesos dao)
            : base(factory, dao, "procesos")
        {
        }
        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.IdAccionProceso = obj.AccionProceso.ID;
            entity.IdAccionProcesoClave = obj.AccionProceso.Clave;
            entity.IdAccionProcesoNombre = obj.AccionProceso.Nombre;
            entity.Responsable = obj.Responsable;
            entity.Evento = obj.Evento;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;
            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
        }

        public async Task<object> GetPRocesos(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }

            object retValue = null;
            var daoReporteBoletasProspeccion = Get<d.SCV.Interfaces.IProcesos>();
            retValue = await daoReporteBoletasProspeccion.GetAllProcesos(parametros);
            return retValue;
        }

        public Task<object> GetProcesos(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}


//using System;
//using System.Threading.Tasks;
//using EK.Modelo.SCV.Interfaces;
//using pKontrol = EK.Procesos.Kontrol;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using EK.Drivers.Log;

//namespace EK.Procesos.SCV
//{
//    //nota EK.Procesos.SCV es el nombre de Namespace y casualidad que el nombre de la clase es procesos, pero la clase puede tener otro nombre
//    public class Procesos : pKontrol.ProcesoBase, Interfaces.IProcesos
//    {
//        private const string catalogo = "Procesos";
//        private diSCV.IProcesos dao;

//        public Procesos(miKontrol.IContainerFactory factory, diSCV.IProcesos dao) : base(factory)
//        {
//            base.factory = factory;
//            this.dao = dao;
//        }

//        public async Task<object[]> GetAll(int activos)
//        {
//            return await this.dao.GetAll(activos);
//        }

//        public async Task<IProceso> GetById(int id)
//        {
//            return await this.dao.GetById(id);
//        }

//        public async Task<IProceso> Save(IProceso item)
//        {
//            var retValue = this.factory.GetInstance<miSCV.IProceso>();
//            try
//            {
//                BeginTransaction();

//                var procesosDAO = Get<diSCV.IProcesos>();

//                item.IdCreadoPor = base.getUserId();
//                item.IdModificadoPor = this.getUserId();

//                int id = await procesosDAO.Save(item);

//                retValue = await procesosDAO.GetById(
//                    (item.ID == null) || (item.ID == 0) ? id : (int)item.ID);

//                Commit();
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }
//            await this.Log(retValue);

//            return retValue;
//        }

//        public async Task Log(IProceso obj)
//        {
//            dynamic entity = new ElasticEntity();

//            entity.ID = obj.ID;
//            entity.Clave = obj.Clave;
//            entity.Nombre = obj.Nombre;
//            entity.IdAccionProceso = obj.AccionProceso.ID;
//            entity.IdAccionProcesoClave = obj.AccionProceso.Clave;
//            entity.IdAccionProcesoNombre = obj.AccionProceso.Nombre;
//            entity.Responsable = obj.Responsable;
//            entity.Evento = obj.Evento;
//            entity.IdEstatus = obj.Estatus.ID;
//            entity.IdEstatusClave = obj.Estatus.Clave;
//            entity.IdEstatusNombre = obj.Estatus.Nombre;
//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
//            entity.Modificado = obj.Modificado;
//            entity.IdModificadoPor = obj.ModificadoPor.ID;
//            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

//            await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
//        }
//    }
//}
