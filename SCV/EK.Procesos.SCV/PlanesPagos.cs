using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EK.Procesos.SCV
{
    public class PlanesPagos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IPlanPagos, d.SCV.Interfaces.IPlanesPagos>, p.SCV.Interfaces.IPlanesPagos
    {
        public PlanesPagos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPlanesPagos dao)
            : base(factory, dao, "planesPagos")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            
        }
        public async Task<IPlanPagosConceptoPago> GetListConceptosPagoById(int id)
        {
            return await this.dao.GetListConceptosPagoById(id);
        }

        public async Task<List<IPlanPagosConceptoPago>> GetConceptosPagoById(int id)
        {
            return await this.dao.GetConceptosPagoById(id);
        }

        public async Task<List<IPlanPagosConfiguracion>> GetListConfiguracionById(Dictionary<string, object> parametros)
        {
            var daoConfiguracion = Get<d.SCV.Interfaces.IPlanesPagosConfiguracion>();
            return await daoConfiguracion.GetAll(parametros);
        }

        public async Task<object> GetPlanesPago(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoPlanesPago = Get<d.SCV.Interfaces.IPlanesPagos>();
            if (parametros == null)
            {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoPlanesPago.GetAll(p);
                return retValue;
            }

            retValue = await daoPlanesPago.GetAll(parametros);
            return retValue;
        }

        public override async Task<m.SCV.Interfaces.IPlanPagos> Save(m.SCV.Interfaces.IPlanPagos item)
        {
            try
            {
                BeginTransaction(true);
                //Rescatando Valores
                var planesPagosConceptosPago = item.scv_Planes_Pagos_ConceptosPago;
                var planesPagosConfiguracion = item.Configuracion;
                //Guardardo elemento actual

                item = await base.saveModel(item);
                //Obteniendo Id
                int IdPlanPago= item.ID ?? 0;
                //Objetos Genericos
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                //EnridadesAdicionales

                var daoPlanes_Pagos = Get<d.SCV.Interfaces.IPlanPagosConceptosPago>();
                var daoPlanes_Pagos_Configuracion = Get<d.SCV.Interfaces.IPlanesPagosConfiguracion>();
                //Guardar Informacion Adicional
                if (planesPagosConceptosPago != null && planesPagosConceptosPago.Count > 0)
                {
                    foreach (var ppconcepto in planesPagosConceptosPago)
                    {
                        if (ppconcepto.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            ppconcepto.IdPlanPagos = IdPlanPago;
                            ppconcepto.Estatus = estatus;
                            ppconcepto.IdEstatus = estatus.ID;
                            ppconcepto.Modificado = DateTime.UtcNow;
                            ppconcepto.IdModificadoPor = base.getUserId();
                            if (ppconcepto.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                ppconcepto.Creado = DateTime.UtcNow;
                                ppconcepto.IdCreadoPor = base.getUserId();
                            }
                            if (ppconcepto.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoPlanes_Pagos.Delete(ppconcepto.ID.Value);
                            }
                            else
                            {
                                if (ppconcepto.PorcentajeTIF == null)
                                {
                                    ppconcepto.PorcentajeTIF = 0;
                                }
                                if (ppconcepto.PorcentajeTIM == null)
                                {
                                    ppconcepto.PorcentajeTIM = 0;
                                }
                                if (ppconcepto.NumeroPagos == null)
                                {
                                    ppconcepto.NumeroPagos = 1;
                                }
                                await daoPlanes_Pagos.SaveEntity(ppconcepto, false, true);
                            }
                        }
                    }
                }
                if (planesPagosConfiguracion != null && planesPagosConfiguracion.Count > 0)
                {
                    foreach (var PlanesPagosConfiguracion in planesPagosConfiguracion)
                    {
                        if(PlanesPagosConfiguracion.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            PlanesPagosConfiguracion.IdPlanPagos = IdPlanPago;
                            PlanesPagosConfiguracion.IdEstatus = estatus.ID;
                            PlanesPagosConfiguracion.Estatus = estatus;
                            PlanesPagosConfiguracion.Modificado = DateTime.UtcNow;
                            PlanesPagosConfiguracion.IdModificadoPor = base.getUserId();
                            if (PlanesPagosConfiguracion.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                PlanesPagosConfiguracion.Creado = DateTime.UtcNow;
                                PlanesPagosConfiguracion.IdCreadoPor = base.getUserId();
                            }
                            if (PlanesPagosConfiguracion.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {   
                                await daoPlanes_Pagos_Configuracion.Delete(PlanesPagosConfiguracion.ID.Value, "Id", "scv_Planes_Pagos_Configuracion");
                            }
                            else
                            {
                                await daoPlanes_Pagos_Configuracion.SaveEntity(PlanesPagosConfiguracion, false, true);
                            }
                        }
                    }
                }

                Commit();

                return item;
            }
            catch (Exception ex)
            {
                Rollback();

                throw new ApplicationException("BP Planes Pagos (Save)", ex);
            }
        }

        public async Task<object> GetPlanesPagos(Dictionary<string, object> parametros)
        {
            if (parametros == null)
            {
                parametros = new Dictionary<string, object>();
            }

            object retValue = null;
            var daoReporteBoletasProspeccion = Get<d.SCV.Interfaces.IPlanesPagos>();
            retValue = await daoReporteBoletasProspeccion.GetAllPlanesPagos(parametros);
            return retValue;
        }

    }
}
//using System;
 //using System.Collections.Generic;
 //using System.Linq;
 //using System.Text;
 //using System.Threading.Tasks;
 //using EK.Modelo.SCV.Interfaces;
 //using pKontrol = EK.Procesos.Kontrol;
 //using diSCV = EK.Datos.SCV.Interfaces;
 //using miKontrol = EK.Modelo.Kontrol.Interfaces;
 //using miSCV = EK.Modelo.SCV.Interfaces;
 //using EK.Drivers.Log;

//namespace EK.Procesos.SCV
//{
//    public class PlanesPagos : pKontrol.ProcesoBase, Interfaces.IPlanesPagos
//    {
//        private diSCV.IPlanesPagos dao;
//        private const string catalogo = "planesPagos";

//        public PlanesPagos(miKontrol.IContainerFactory factory, diSCV.IPlanesPagos dao) : base(factory)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }

//        public async Task<object[]> GetAll(int activos)
//        {
//            return await this.dao.GetAll(activos);
//        }

//        public async Task<object[]> GetByDesarrollo(int idDesarrollo) {
//            return await this.dao.GetByDesarrollo(idDesarrollo);
//        }

//        public async Task<IPlanPagos> GetById(int id)
//        {
//            var retValue = await this.dao.GetById(id);
//            retValue.ConceptosPago = await this.dao.GetConceptosPagoById(id);
//            return retValue;
//        }

//        public async Task<IPlanPagos> Save(IPlanPagos item)
//        {
//            var retValue = this.factory.GetInstance<miSCV.IPlanPagos>();
//            var retPPConVentas = this.factory.GetInstance<miSCV.IVentaPP>();

//            try
//            {
//                BeginTransaction();

//                var planPagosDAO = Get<diSCV.IPlanesPagos>();
//                var VentasPPDAO = Get<diSCV.IVentas>();

//                item.IdCreadoPor = base.getUserId();
//                item.IdModificadoPor = this.getUserId();

//                //Obtenemos el Id del Plan de pagos
//                int idPlanPago= await planPagosDAO.Save(item);

//                //Guardamos PP Ventas
//                await VentasPPDAO.SavePP(retPPConVentas, idPlanPago);

//                //Obtenemos los Conceptos Plan de Pago
//                var Conceptos = await planPagosDAO.GetConceptosPagoById(idPlanPago);

//                retValue = await planPagosDAO.GetById(
//                    (item.PlanPagos.ID == null) || (item.PlanPagos.ID == 0) ? idPlanPago : (int)item.PlanPagos.ID);

//                if (Conceptos != null && Conceptos.Count > 0)
//                {
//                    foreach (var c in Conceptos)
//                    {
//                        if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
//                        {
//                            await dao.DeleteRelacion((int)c.ID);
//                        }
//                        else
//                        {
//                            c.IdCreadoPor = base.getUserId();
//                            c.IdModificadoPor = base.getUserId();

//                            await planPagosDAO.SaveConceptosPago((item.ID == null) || (item.ID == 0) ? idPlanPago : item.ID, c);
//                        }
//                    }
//                }

//                retValue.ConceptosPago = await planPagosDAO.GetConceptosPagoById((int)retValue.ID);

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

//        public async Task<List<IPlanPagosConceptoPago>> GetConceptosPagoById(int id)
//        {
//            return await this.dao.GetConceptosPagoById(id);
//        }

//        public async Task Log(IPlanPagos obj)
//        {
//            dynamic entity = new Drivers.Log.ElasticEntity();

//            try
//            {
//                entity.ID = obj.ID;
//                entity.Clave = obj.Clave;
//                entity.Descripcion = obj.Descripcion;
//                entity.VigenciaInicio = obj.VigenciaInicio;
//                entity.VigenciaFin = obj.VigenciaFin;

//                entity.IdMoneda = obj.Moneda.ID;
//                entity.IdMonedaClave = obj.Moneda.Clave;
//                entity.IdMonedaNombre = obj.Moneda.Nombre;

//                entity.IdEstatus = obj.Estatus.ID;
//                entity.IdEstatusClave = obj.Estatus.Clave;
//                entity.IdEstatusNombre = obj.Estatus.Nombre;

//                entity.RecordType = Convert.ToInt32(obj.Estado);
//                entity.RecordTypeName = obj.Estado.ToString();

//                entity.Creado = obj.Creado;
//                entity.IdCreadoPor = obj.CreadoPor.ID;
//                entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

//                entity.Modificado = obj.Modificado;
//                entity.IdModificadoPor = obj.ModificadoPor.ID;
//                entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

//                await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
//            }
//            catch
//            {
//                throw;
//            }
//        }
//    }
//}
