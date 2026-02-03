using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;

namespace EK.Procesos.SCV
{
    public class ExpedientesInstantaneas
        : p.Kontrol.BPBase<m.SCV.Interfaces.IExpedienteInstantanea, d.SCV.Interfaces.IExpedientesInstantaneas>,
        p.SCV.Interfaces.IExpedientesInstantaneas
    {
        public ExpedientesInstantaneas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IExpedientesInstantaneas dao)
            : base(factory, dao, "Expedientes_Instantaneas")
        {
        }

        public async Task<m.SCV.Interfaces.ISeguimientoEtapa> SaveInstantaneasAll(int idSeguimiento, int? orden, string claveProceso)
        {
            BeginTransaction(true);
            //int retValue = 0;
            var seguimientoEtapa = Get<m.SCV.Interfaces.ISeguimientoEtapa>();

            //{obtener seguimiento de expediente}
            var bpSeguimiento = Get<EK.Procesos.SCV.Interfaces.ISeguimientos>();
            var seguimiento = await bpSeguimiento.GetById(idSeguimiento);

            //{usuario responsable del seguimiento de expediente}
            int idUsuario = seguimiento.Posicion.IdUsuario ?? 0;
            if (idUsuario <= 0)
            {
                base.SetReturnInfo(1, "Error al generar registro para comisiones. La posición del Responsable del seguimiento no tiene un usuario asignado.");
                return null;
            }

            //{consultar tipo proceso FIN/INICIO etapa}
            var bpProcesos = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var proceso = await bpProcesos.Get("CONSIDERARFECHAVANCE", claveProceso);

            //{consultar estatus bitacora}
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //{obtener las etapas/nivel del seguimiento}
            var parametros = new Dictionary<string, object>();
            parametros.Add("IdSeguimiento", idSeguimiento);
            parametros.Add("Orden", orden);
            parametros.Add("ModificadoPor", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "CATALOGO_GENERAL");

            var daoSeguimientos = Get<d.SCV.Interfaces.ISeguimientos>();
            var daoInstantanea = Get<EK.Datos.SCV.Interfaces.IExpedientesInstantaneas>();
            var etapas = await daoSeguimientos.GetEtapas(parametros);

            try
            {
                if (etapas != null && etapas.Count > 0)
                {
                    //{obtener superiores del usuario responsable del seguimiento}
                    var bpPosiciones = Get<EK.Procesos.Kontrol.Interfaces.IPosicion>();
                    var superiores = await bpPosiciones.GetAscendientes(idUsuario);

                    foreach (var e in etapas)
                    {
                        seguimientoEtapa = e;
                        //{validar si el usuario responsable tiene un superior en la jerarquía}
                        if (superiores != null && superiores.Count > 0)
                        {
                            foreach (var s in superiores)
                            {
                                var inst = Get<EK.Modelo.SCV.Interfaces.IExpedienteInstantanea>();
                                inst = await Assign(inst);

                                inst.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                                inst.IdSeguimientoEtapa = e.ID;
                                inst.IdUsuario = s.IdUsuario;
                                inst.Proceso = proceso;
                                inst.IdProceso = proceso.ID;
                                inst.FechaCaptura = DateTime.UtcNow;
                                inst.Estatus = estatus;
                                inst.IdEstatus = estatus.ID;
                                inst.IdCategoria = s.Categoria.ID;

                                await daoInstantanea.Save(inst);
                            }
                        }


                        //{obtener colaboradores del expediente}
                        parametros.Clear();
                        parametros.Add("idExpediente", seguimiento.IdExpediente);
                        parametros.Add("comisionable", 1);
                        parametros.Add("activos", 1);

                        var colaboradoresDAO = Get<d.SCV.Interfaces.IExpedientesRelacionados>();
                        var colaboradores = await colaboradoresDAO.GetAll(parametros);

                        if (colaboradores != null && colaboradores.Count > 0)
                        {
                            foreach (var c in colaboradores)
                            {
                                var inst = Get<EK.Modelo.SCV.Interfaces.IExpedienteInstantanea>();
                                inst = await Assign(inst);

                                inst.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                                inst.IdSeguimientoEtapa = e.ID;
                                inst.IdUsuario = c.Posicion.IdUsuario;
                                inst.Proceso = proceso;
                                inst.IdProceso = proceso.ID;
                                inst.FechaCaptura = DateTime.UtcNow;
                                inst.Estatus = estatus;
                                inst.IdEstatus = estatus.ID;
                                inst.IdCategoria = c.Posicion.Categoria.ID.Value;


                                await daoInstantanea.Save(inst);
                            }
                        }



                        var daoOW = Get<d.SCV.Interfaces.IExpedientesOwners>();
                        var duenios = await daoOW.GetAll(parametros);

                        if (duenios != null && duenios.Count > 0)
                        {
                            foreach (var c in duenios)
                            {
                                var inst = Get<EK.Modelo.SCV.Interfaces.IExpedienteInstantanea>();
                                inst = await Assign(inst);

                                inst.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                                inst.IdSeguimientoEtapa = e.ID;
                                inst.IdUsuario = c.Posicion.IdUsuario;
                                inst.Proceso = proceso;
                                inst.IdProceso = proceso.ID;
                                inst.FechaCaptura = DateTime.UtcNow;
                                inst.Estatus = estatus;
                                inst.IdEstatus = estatus.ID;
                                inst.IdCategoria = c.Posicion.Categoria.ID;


                                await daoInstantanea.Save(inst);
                            }

                        }

                    }
                }
                Commit();
                //retValue = 1;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return seguimientoEtapa;
        }


        public async Task<List<m.Kontrol.Interfaces.IUsuario>> GetSuperiores(int idAgente)
        {
            return await this.dao.GetSuperiores(idAgente);
        }
    }
}