using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class Obra
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IObra, d.SCCO.Interfaces.IObra>, p.SCCO.Interfaces.IObra
    {
        public Obra(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IObra dao)
            : base(factory, dao, "scco_Obra")
        {
        }

        public override async Task<m.SCCO.Interfaces.IObra> GetById(int id)
        {
            var retValue = await this.dao.GetById(id);
            var daoOI = Get<d.SCCO.Interfaces.IObraIndirecto>();
            var daoOV = Get<d.SCCO.Interfaces.IObraValidacion>();
            var daoIT = Get<d.SCCO.Interfaces.IObraIndirectoTarjeta>();
            var daoCo = Get<d.SCCO.Interfaces.IObraCompania>();
            var daoNi = Get<d.SCCO.Interfaces.IObraNivel>();

            retValue.ObraIndirectos = await daoOI.GetAll(new Dictionary<string, object> { { "idObra", id } });
            retValue.ObraValidaciones = await daoOV.GetAll(new Dictionary<string, object> { { "idObra", id } });
            retValue.ObraIndirectoTarjetas = await daoIT.GetAll(new Dictionary<string, object> { { "idObra", id } });
            retValue.ObraCompanias = await daoCo.GetAll(new Dictionary<string, object> { { "idObra", id } });
            retValue.ObraNiveles = await daoNi.GetAll(new Dictionary<string, object> { { "idObra", id } });

            retValue = await this.afterGetItem(retValue);
            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IObra> FillObra(int idCurrentItem, int idObraUniversal, int idObraTabulador)
        {
            m.SCCO.Interfaces.IObra retValue = null;

            try
            {
                var daoOI = Get<d.SCCO.Interfaces.IObraIndirecto>();
                var daoOV = Get<d.SCCO.Interfaces.IObraValidacion>();
                var daoIT = Get<d.SCCO.Interfaces.IObraIndirectoTarjeta>();
                var daoOC = Get<d.SCCO.Interfaces.IObraCompania>();
                var daoON = Get<d.SCCO.Interfaces.IObraNivel>();
                var daoTB = Get<d.SCCO.Interfaces.ITabuladores>();
                var bpObras = Get<p.SCCO.Interfaces.IObra>();
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                var obraModelo = await this.GetById(idObraUniversal);

                retValue = await bpObras.GetNewEntity();
                retValue = await this.Assign(retValue);
                retValue.IdObra = idObraUniversal;
                retValue.Obra = obraModelo;
                retValue.Clave = string.Empty;
                retValue.Nombre = obraModelo.Nombre;
                retValue.Sistema = obraModelo.Sistema;
                retValue.IdTipoObra = obraModelo.IdTipoObra;
                retValue.TipoObra = obraModelo.TipoObra;
                retValue.Contrato = obraModelo.Contrato;
                retValue.Direccion = obraModelo.Direccion;
                retValue.IdEstadoObra = obraModelo.IdEstadoObra;
                retValue.EstadoObra = obraModelo.EstadoObra;
                retValue.UbicacionObra = obraModelo.UbicacionObra;
                retValue.Responsable = obraModelo.Responsable;
                retValue.IdCentroCosto = obraModelo.IdCentroCosto;
                retValue.CentroCosto = obraModelo.CentroCosto;
                retValue.IdDesarrollo = obraModelo.IdDesarrollo;
                retValue.Desarrollo = obraModelo.Desarrollo;
                retValue.IdTipoFSR = obraModelo.IdTipoFSR;
                retValue.TipoFSR = obraModelo.TipoFSR;
                retValue.FactorFSR = obraModelo.FactorFSR;
                retValue.IdInsumoFSR = obraModelo.IdInsumoFSR;
                retValue.InsumoFSR = obraModelo.InsumoFSR;
                retValue.ValuacionActualizada = obraModelo.ValuacionActualizada;
                retValue.Geolocalizacion = obraModelo.Geolocalizacion;
                retValue.IdAsentamiento = obraModelo.IdAsentamiento;
                retValue.Asentamiento = obraModelo.Asentamiento;
                retValue.MinimoWBSNivel = obraModelo.MinimoWBSNivel;
                retValue.MaximoWBSNivel = obraModelo.MaximoWBSNivel;
                retValue.ObraUniversal = false;
                retValue.AfectaObraUniversal = false;
                //
                if (idObraTabulador > 0)
                {
                    var tabulador = await daoTB.GetById(idObraTabulador);
                    if (tabulador != null)
                    {
                        retValue.IdTabulador = idObraTabulador;
                        retValue.Tabulador = tabulador;
                    }
                }
                //
                retValue.ObraIndirectos = obraModelo.ObraIndirectos;
                retValue.ObraValidaciones = obraModelo.ObraValidaciones;
                retValue.ObraIndirectoTarjetas = obraModelo.ObraIndirectoTarjetas;
                retValue.ObraCompanias = obraModelo.ObraCompanias;
                retValue.ObraNiveles = obraModelo.ObraNiveles;
                //
                int index = 0;
                //
                foreach (var o in retValue.ObraIndirectos)
                {
                    o.ID = --index;
                    o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    o.IdObra = idCurrentItem;
                    o.IdEstatus = estatus.ID;
                    o.Estatus = estatus;
                    o.Modificado = DateTime.UtcNow;
                    o.IdModificadoPor = base.getUserId();
                    o.Version = "0";
                }
                //
                index = 0;
                //
                foreach (var o in retValue.ObraValidaciones)
                {
                    o.ID = --index;
                    o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    o.IdObra = idCurrentItem;
                    o.IdEstatus = estatus.ID;
                    o.Estatus = estatus;
                    o.Modificado = DateTime.UtcNow;
                    o.IdModificadoPor = base.getUserId();
                    o.Version = "0";
                }
                //
                index = 0;
                //
                foreach (var o in retValue.ObraIndirectoTarjetas)
                {
                    o.ID = --index;
                    o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    o.IdObra = idCurrentItem;
                    o.IdEstatus = estatus.ID;
                    o.Estatus = estatus;
                    o.Modificado = DateTime.UtcNow;
                    o.IdModificadoPor = base.getUserId();
                    o.Version = "0";
                }
                //
                index = 0;
                //
                foreach (var o in retValue.ObraCompanias)
                {
                    o.ID = --index;
                    o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    o.IdObra = idCurrentItem;
                    o.IdEstatus = estatus.ID;
                    o.Estatus = estatus;
                    o.Modificado = DateTime.UtcNow;
                    o.IdModificadoPor = base.getUserId();
                    o.Version = "0";
                }
                //
                index = 0;
                //
                foreach (var o in retValue.ObraNiveles)
                {
                    o.ID = --index;
                    o.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                    o.IdObra = idCurrentItem;
                    o.IdEstatus = estatus.ID;
                    o.Estatus = estatus;
                    o.Modificado = DateTime.UtcNow;
                    o.IdModificadoPor = base.getUserId();
                    o.Version = "0";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public override async Task<m.SCCO.Interfaces.IObra> Save(m.SCCO.Interfaces.IObra item)
        {
            try
            {
                BeginTransaction();

                var obrasIndirectos = item.ObraIndirectos;
                var obrasValidaciones = item.ObraValidaciones;
                var obrasIndirectoTarjetas = item.ObraIndirectoTarjetas;
                var obraCompanias = item.ObraCompanias;
                var obraNiveles = item.ObraNiveles;

                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                var daoOI = Get<d.SCCO.Interfaces.IObraIndirecto>();
                var daoOV = Get<d.SCCO.Interfaces.IObraValidacion>();
                var daoIT = Get<d.SCCO.Interfaces.IObraIndirectoTarjeta>();
                var daoCo = Get<d.SCCO.Interfaces.IObraCompania>();
                var daoNi = Get<d.SCCO.Interfaces.IObraNivel>();

                item = await base.saveModel(item);
                
                int idObra = item.ID ?? -1;
                if (idObra <= 0)
                {
                    throw new Exception("Error al guardar la obra");
                }

                if (obrasIndirectos != null && obrasIndirectos.Count > 0)
                {
                    foreach (var o in obrasIndirectos)
                    {
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdObra = idObra;
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();
                            o.Estado = o.ID == null || o.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoOI.Delete(o.ID.Value);
                            }
                            else
                            {
                                await daoOI.SaveEntity(o, false, true);
                            }
                        }
                    }
                }
                //
                if (obrasValidaciones != null && obrasValidaciones.Count > 0)
                {
                    foreach (var o in obrasValidaciones)
                    {
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdObra = idObra;
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();
                            o.Estado = o.ID == null || o.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoOV.Delete(o.ID.Value);
                            }
                            else
                            {
                                await daoOV.SaveEntity(o, false, true);
                            }
                        }
                    }
                }
                //
                if (obrasIndirectoTarjetas != null && obrasIndirectoTarjetas.Count > 0)
                {
                    foreach (var o in obrasIndirectoTarjetas)
                    {
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdObra = idObra;
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();
                            o.Estado = o.ID == null || o.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoIT.Delete(o.ID.Value);
                            }
                            else
                            {
                                await daoIT.SaveEntity(o, false, true);
                            }
                        }
                    }
                }
                //
                if (obraCompanias != null && obraCompanias.Count > 0)
                {
                    foreach (var o in obraCompanias)
                    {
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdObra = idObra;
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();
                            o.Estado = o.ID == null || o.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCo.Delete(o.ID.Value);
                            }
                            else
                            {
                                await daoCo.SaveEntity(o, false, true);
                            }
                        }
                    }
                }
                //
                if (obraNiveles != null && obraNiveles.Count > 0)
                {
                    foreach (var o in obraNiveles)
                    {
                        if (o.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdObra = idObra;
                            o.Estatus = estatus;
                            o.IdEstatus = estatus.ID;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();
                            o.Estado = o.ID == null || o.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoNi.Delete(o.ID.Value);
                            }
                            else
                            {
                                await daoNi.SaveEntity(o, false, true);
                            }
                        }
                    }
                }

                item = await this.GetById(item.ID.Value);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }

            return item;
        }

        public override async Task<m.SCCO.Interfaces.IObra> Delete(int id)
        {
            var daoOI = Get<d.SCCO.Interfaces.IObraIndirecto>();
            var daoOV = Get<d.SCCO.Interfaces.IObraValidacion>();
            var daoIT = Get<d.SCCO.Interfaces.IObraIndirectoTarjeta>();
            var daoOC = Get<d.SCCO.Interfaces.IObraCompania>();
            var daoON = Get<d.SCCO.Interfaces.IObraNivel>();
            //
            var obraIndirectos = await daoOI.GetAll(new Dictionary<string, object> { { "idObra", id } });
            if (obraIndirectos != null)
            {
                foreach (var o in obraIndirectos)
                {
                    await daoOI.Delete((int)o.ID);
                }
            }
            //
            var obraValidaciones = await daoOV.GetAll(new Dictionary<string, object> { { "idObra", id } });
            if (obraValidaciones != null)
            {
                foreach (var o in obraValidaciones)
                {
                    await daoOV.Delete((int)o.ID);
                }
            }
            //
            var obraIndirectoTarjetas = await daoIT.GetAll(new Dictionary<string, object> { { "idObra", id } });
            if (obraIndirectoTarjetas != null)
            {
                foreach (var o in obraIndirectoTarjetas)
                {
                    await daoIT.Delete((int)o.ID);
                }
            }
            //
            var obraCompanias = await daoOC.GetAll(new Dictionary<string, object> { { "idObra", id } });
            if (obraCompanias != null)
            {
                foreach (var o in obraCompanias)
                {
                    await daoOC.Delete((int)o.ID);
                }
            }
            //
            var obraNiveles = await daoON.GetAll(new Dictionary<string, object> { { "idObra", id } });
            if (obraNiveles != null)
            {
                foreach (var o in obraNiveles)
                {
                    await daoON.Delete((int)o.ID);
                }
            }

            return await base.Delete(id);
        }
    }
}