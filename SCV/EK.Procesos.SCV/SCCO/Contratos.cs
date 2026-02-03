using System;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections.Generic;
using miSCCO = EK.Modelo.SCCO.Interfaces;

namespace EK.Procesos.SCCO
{
    public class Contratos
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IContrato, d.SCCO.Interfaces.IContratos>, p.SCCO.Interfaces.IContratos
    {
        public Contratos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IContratos dao)
            : base(factory, dao, "scco_Contratos")
        {
        }

        public override async Task<m.SCCO.Interfaces.IContrato> Save(m.SCCO.Interfaces.IContrato item)
        {
            var bpConvenios = Get<p.SCCO.Interfaces.IConvenios>();
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {

                var convenio = Get<m.SCCO.Interfaces.IConvenio>();
                
                if (item != null && item.IdConvenio > 0)
                {
                    convenio = await bpConvenios.GetById(item.IdConvenio);
                }

                //var TipoConvenio = await bpCG.Get("TipoConvenio", "CONVENIO");

                convenio.Clave = item.Clave;
                convenio.Nombre = item.Nombre;
                convenio.Estatus = item.Estatus;
                convenio.IdEstatus = item.IdEstatus;
                //convenio.TipoConvenio = item.TipoConvenio;
                //convenio.IdTipoConvenio = item.TipoConvenio.ID.Value;
                    convenio.IdTipoConvenio = item.IdTipoConvenio;
                convenio.Monto = item.Monto;
                convenio.AditivaAutorizada = item.AditivaAutorizada;
                convenio.Iva = item.Iva;
                convenio.Descripcion = item.Descripcion;
                convenio.IdMoneda = item.IdMoneda;
                convenio.IdCompania = item.IdCompania;
                convenio.IdObra = item.IdObra;
                convenio.IdContratista = item.IdContratista;
                convenio.Direccion = item.Direccion;
                convenio.RepresentanteBitacora = item.RepresentanteBitacora;
                convenio.Atencion = item.Atencion;
                convenio.Telefono = item.Telefono;
                convenio.email = item.email;

                convenio = await bpConvenios.Save(convenio);

                var Bitacora = item.BitacoraAD;
                var AnticiposDeducciones = item.RegistroAnticipoRetencion;
                var TestigosContrato = item.TestigosContratos;


                item.IdConvenio = (int)convenio.ID;
                item = await base.saveModel(item);

                //Guarda Bitacora de Aditivas Deductivas
                if (Bitacora != null && Bitacora.Count > 0)
                {
                    foreach (var b in Bitacora)
                    {
                        var mBitacora = Get<m.SCCO.Interfaces.IBitacoraAD>();
                        var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var daoBitacora = Get<d.SCCO.Interfaces.IBitacoraAD>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        if (b.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            b.IdContrato = (int)item.ID;

                            b.Estatus = estatus;
                            b.IdEstatus = estatus.ID;
                            b.Modificado = DateTime.UtcNow;
                            b.IdModificadoPor = base.getUserId();

                            if (b.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                b.Creado = DateTime.UtcNow;
                                b.IdCreadoPor = base.getUserId();
                            }
                            if (b.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoBitacora.Delete(b.ID.Value);
                            }
                            else
                            {   
                                await daoBitacora.SaveEntity(b, true, true);
                            }
                        }
                    }
                }
                var daoBit = Get<d.SCCO.Interfaces.IBitacoraAD>();
                var parametros = new Dictionary<string, object>
                        {
                            { "IdContrato", item.ID }
                        };

                item.BitacoraAD = await daoBit.GetAll(parametros);

                ////Guarda Testigos del Contrato
                if (TestigosContrato != null && TestigosContrato.Count > 0)
                {
                    foreach (var t in TestigosContrato)
                    {
                        var mTestigo = Get<m.SCCO.Interfaces.ITestigoContrato>();
                        var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var daoTestigo = Get<d.SCCO.Interfaces.ITestigosContratos>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        if (t.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            t.IdContrato = (int)item.ID;

                            t.Estatus = estatus;
                            t.IdEstatus = estatus.ID;
                            t.Modificado = DateTime.UtcNow;
                            t.IdModificadoPor = base.getUserId();

                            if (t.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                t.Creado = DateTime.UtcNow;
                                t.IdCreadoPor = base.getUserId();
                            }
                            if (t.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoTestigo.Delete(t.ID.Value);
                            }
                            else
                            {
                                await daoTestigo.SaveEntity(t, true, true);
                            }
                        }
                    }
                }
                var daoT = Get<d.SCCO.Interfaces.ITestigosContratos>();
                var parametrosT = new Dictionary<string, object>
                        {
                            { "IdContrato", item.ID }
                        };

                item.TestigosContratos = await daoT.GetAll(parametrosT);

                //Guarda Anticipos Retenciones
                if (AnticiposDeducciones != null && AnticiposDeducciones.Count > 0)
                {
                    foreach (var a in AnticiposDeducciones)
                    {
                        var mAnticiposDeducciones = Get<m.SCCO.Interfaces.IRegistroAnticipoRetencion>();
                        var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var daoRAD = Get<d.SCCO.Interfaces.IRegistroAnticiposRetenciones>();
                        var estatus = await bpEstatus.Get("ESTATUS", "A");

                        if (a.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            a.IdContrato = (int)item.ID;

                            a.Estatus = estatus;
                            a.IdEstatus = estatus.ID;
                            a.Modificado = DateTime.UtcNow;
                            a.IdModificadoPor = base.getUserId();

                            if (a.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                a.Creado = DateTime.UtcNow;
                                a.IdCreadoPor = base.getUserId();
                            }
                            if (a.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoRAD.Delete(a.ID.Value);
                            }
                            else
                            {
                                await daoRAD.SaveEntity(a, true, true);
                            }
                        }
                    }
                }
                var daoAD = Get<d.SCCO.Interfaces.IRegistroAnticiposRetenciones>();
                var parametrosRAD = new Dictionary<string, object>
                        {
                            { "IdContrato", item.ID }
                        };

                item.RegistroAnticipoRetencion = await daoAD.GetAll(parametrosRAD);
             
                Commit();

            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }

        public override async Task<m.SCCO.Interfaces.IContrato> GetById(int id)
        {
            var entity = await base.GetById(id);
            var daoDet = Get<d.SCCO.Interfaces.IBitacoraAD>();

            var parametros = new Dictionary<string, object>
            {
                { "IdContrato", entity.ID },
            };

            entity.BitacoraAD = await daoDet.GetAll(parametros);

            //Get Registro Anticipos
            var daoAD = Get<d.SCCO.Interfaces.IRegistroAnticiposRetenciones>();
            var parametrosRAD = new Dictionary<string, object>
                        {
                            { "IdContrato", entity.ID }
                        };

            entity.RegistroAnticipoRetencion = await daoAD.GetAll(parametrosRAD);

            //Get Testigos Contactos
            var daoTes = Get<d.SCCO.Interfaces.ITestigosContratos>();
            var parametrosTes = new Dictionary<string, object>
                        {
                            { "IdContrato", entity.ID }
                        };

            entity.TestigosContratos = await daoTes.GetAll(parametrosTes);

            return entity;
        }

          }
}