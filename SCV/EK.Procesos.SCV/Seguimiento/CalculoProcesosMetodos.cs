using System.Collections.Generic;
using System.Threading.Tasks;
using p = EK.Procesos;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Procesos.SCV.Calculos
{
    public class CalculoProcesosMetodos
        : p.Kontrol.ProcesoBase, p.SCV.Interfaces.ICalculoProcesosMetodos
    {

        public CalculoProcesosMetodos(m.Kontrol.Interfaces.IContainerFactory factory)
        {
            this.factory = factory;
        }

        public async Task DoAvanceEtapa(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            try
            {
                BeginTransaction(true);
                //{obtener el seguimiento actual y la posición responsable}
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
                var seguimientoPrevio = await bpSeguimientos.GetById(item.IdSeguimiento);

                //{avanzar etapa si no hay procesos ni requisitos pendientes por cubrir}
                var parametros = new Dictionary<string, object>(){
                { "Id", item.IdSeguimientoEtapa },
                { "ModificadoPor", base.getUserId() },
                { "OperacionEspecificaSP", "CATALOGO_GENERAL" }
            };

                //{obtener información de la etapa a avanzar}
                var daoSeguimiento = Get<d.SCV.Interfaces.ISeguimientos>();
                var etapa = await daoSeguimiento.GetEtapa(parametros);

                //{avanzar etapa y fase de expediente}       
                var seguimientoEtapa = await bpSeguimientos.EnviarAutorizacion(etapa);
                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
           
        }

        public Task DoAvanceFase(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            return Task.FromResult(0);
        }

        public async Task DoCierreVenta(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            BeginTransaction(true);

            //{obtener el seguimiento actual y la posición responsable}
            var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();
            var daoSeguimiento = Get<d.SCV.Interfaces.ISeguimientos>();

            //{avanzar etapa si no hay procesos ni requisitos pendientes por cubrir}
            var parametros = new Dictionary<string, object>(){
                { "Id", item.IdSeguimientoEtapa },
                { "ModificadoPor", base.getUserId() },
                { "OperacionEspecificaSP", "CATALOGO_GENERAL" }
            };

            //{obtener información de la etapa a avanzar}
            var etapa = await daoSeguimiento.GetEtapa(parametros);

            //{avanzar etapa y fase de expediente}       
            await bpSeguimientos.EnviarAutorizacion(etapa);
            Commit();
            //*Marcar Ubicaciones como no disponibles*/

        }

        public Task DoDefault(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            return Task.FromResult(0);
        }

        public Task DoFiniquito(m.SCV.Interfaces.ISeguimientoProceso item)
        {
           return this.DoAvanceEtapa(item);
        }

        public Task DoSendEmail(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            return Task.FromResult(0);
        }

        public Task DoSendSMS(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            return Task.FromResult(0);
        }

        public async Task DoAsignacionEstatus(m.SCV.Interfaces.ISeguimientoProceso item)
        {
            BeginTransaction(true);
            /*Obtene Informacion del expediente*/

            var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
            var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();

            var daoVentas = Get<d.SCV.Interfaces.IVentas>();
            var bpVentas = Get<p.SCV.Interfaces.IVentas>();

            var bpUbicaciones = Get<p.SCV.Interfaces.IUbicaciones>();

            var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();

            int idExpediente = item.IdExpediente.Value;


            dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(item.Configuracion);

            int idEstatusDeUbicacion = obj.IdEstatusDeUbicacion;


            var expediente = await daoExpediente.GetById(idExpediente);
            var venta = await daoVentas.GetByExpedienteId(idExpediente);
            var currentVersion = await bpVentas.GetCurrentVersion(venta.ID ?? 0);


            var ventaUbicaciones = await daoVentas.GetUbicacionesById(venta.ID.Value, currentVersion.ID ?? 0);

            foreach (var ventaUbicacion in ventaUbicaciones)
            {
                var ubicacion = await daoUbicaciones.GetById(ventaUbicacion.Ubicacion.ID.Value);

                await bpUbicaciones.UpdateStatusLocation(ventaUbicacion.Ubicacion.ID.Value, idEstatusDeUbicacion);


            }

            Commit();
        }
    }
}