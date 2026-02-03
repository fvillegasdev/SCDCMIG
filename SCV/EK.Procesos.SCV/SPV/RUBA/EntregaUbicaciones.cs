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
    public class EntregaUbicaciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.IEntregaUbicacion, d.SCV.Interfaces.IEntregaUbicaciones>, p.SCV.Interfaces.IEntregaUbicaciones

    {
        public EntregaUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEntregaUbicaciones dao)
            : base(factory, dao, "EntregaUbicaciones")
        {
        }


        public async Task<m.SCV.Interfaces.IEntregaUbicacion> SaveReversarEntrega(m.SCV.Interfaces.IEntregaUbicacion item)
        {
            var daoEU = Get<d.SCV.Interfaces.IEntregaUbicaciones>();
            try
            {
                BeginTransaction();
                item.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                var retornoEliSegEtapa = 0;
                var retornoActSegEtapa = 0;
                var retornoModSegEtapa = 0;
                var retornoModEntregaFolio = 0; 

                var idUsuario = getUserId(); 
                var parametrosCliente = new Dictionary<string, object>();
                parametrosCliente.Add("OperacionEspecificaSP", "EtapasSeguimiento");
                parametrosCliente.Add("IdUsuario", idUsuario);
                parametrosCliente.Add("IdCliente", item.IdCliente);
                var seguimiento = await daoEU.getSeguimientoEtapa(parametrosCliente);

                if (seguimiento != null)
                {
                    if (seguimiento.IdEtapa == 15)
                    {
                        switch (seguimiento.IdRelacion)
                        {
                            case 5:
                            case 6:
                                //actualizar etapa
                                parametrosCliente.Remove("IdEtapa");
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("IdEtapa", 15);
                                parametrosCliente.Add("OperacionEspecificaSP", "ActualizarEtapa");
                                retornoActSegEtapa = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);   
                                // modificar etapa
                                parametrosCliente.Remove("IdEtapa");
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("IdEtapa", 15);
                                parametrosCliente.Add("OperacionEspecificaSP", "ModificarEtapa");
                                retornoModSegEtapa = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);   
                                // modificar folio
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("OperacionEspecificaSP", "ActualizarFolioEntrega");
                                retornoModEntregaFolio = await daoEU.actualizarSeguimientoEtapa(parametrosCliente) ;
                                // Reversar entrega
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("OperacionEspecificaSP", "ReverseEntrega");
                                retornoModEntregaFolio = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);
                                break;
                            default:
                                //eliminar etapa
                                parametrosCliente.Remove("IdEtapa");
                                parametrosCliente.Add("IdEtapa", 15);
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("OperacionEspecificaSP", "EliminarEtapa");
                                retornoEliSegEtapa  =  await daoEU.actualizarSeguimientoEtapa(parametrosCliente);  
                                //actualizar etapa
                                parametrosCliente.Remove("IdEtapa");
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("IdEtapa", 19);
                                parametrosCliente.Add("OperacionEspecificaSP", "ActualizarEtapa");
                                retornoActSegEtapa = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);   
                                // modificar etapa
                                parametrosCliente.Remove("IdEtapa");
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("IdEtapa", 19);
                                parametrosCliente.Add("OperacionEspecificaSP", "ModificarEtapa");
                                retornoModSegEtapa = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);  
                                // modificar folio
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("OperacionEspecificaSP", "ModificarEntregaFolio");
                                retornoModEntregaFolio = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);
                                // Modificar datos del lote entregado
                                parametrosCliente.Remove("OperacionEspecificaSP");
                                parametrosCliente.Add("OperacionEspecificaSP", "ReverseEntrega");
                                retornoModEntregaFolio = await daoEU.actualizarSeguimientoEtapa(parametrosCliente);
                                break;
                        }
                    }
                    else
                    {
                        base.SetReturnInfo(2, "La operación no puede continuar, el Cliente no está en la Etapa de Entrega");
                        return null;
                    }
                }
                else
                {
                    base.SetReturnInfo(2, "La operación no puede continuar, el Cliente no fue encontrado en el seguimiento de las etapas.");
                    return null;
                }
                item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return item;
        }
    }
}