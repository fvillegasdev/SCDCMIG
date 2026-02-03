using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections;


namespace EK.Procesos.SCV
{
    public class Regimen
        :p.Kontrol.BPBase<m.SCV.Interfaces.IRegimen,d.SCV.Interfaces.IRegimen>,
        p.SCV.Interfaces.IRegimen
    {
        public Regimen(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.IRegimen dao)
            :base(factory,dao,"Regimen")

        {

        }

        //public override async Task<m.SCV.Interfaces.IRegimen> Save(m.SCV.Interfaces.IRegimen item)
        //{
        //    var regimenComision = item.RegimenCCompania;
        //    var elementoRecibido = item;
        //    //Guardando Model Actual
        //    item = await base.saveModel(item);


        //    int idRegimen = item.ID ?? 0;

        //    var bpCCEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

        //    var estatus = await bpCCEstatus.Get("ESTATUS", "A");

        //    try
        //    {
        //        var daoRegimenCompania = Get<d.SCV.Interfaces.IRegimenCompania>();

        //        if (elementoRecibido != null)
        //        {
        //            foreach (var c in regimenComision)
        //            {
        //                if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
        //                {
        //                    c.Estatus = estatus;
        //                    c.IdEstatus = estatus.ID;
        //                    c.IdRegimen = idRegimen;
        //                    c.Modificado = DateTime.UtcNow;
        //                    c.IdModificadoPor = base.getUserId();
        //                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
        //                    {
        //                        c.Creado = DateTime.UtcNow;
        //                        c.IdCreadoPor = base.getUserId();
        //                    }
        //                    if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
        //                    {
        //                        await daoRegimenCompania.Delete(c.ID.Value, "RegimenCompania");
        //                    }
        //                    else
        //                    {
        //                        await daoRegimenCompania.SaveEntity(c, false, true);
        //                    }
        //                }
        //            }
        //        }

        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //    return item;
        //    //return base.Save(item);
        //}

        public override async Task<m.SCV.Interfaces.IRegimen> Save(m.SCV.Interfaces.IRegimen item)
        {
            //Obteniendo IdRegimen

            int IdRegimen= item.ID >= 1 ? Convert.ToInt32(item.ID) : 0;


            var elementoRecibido = item;

            //Guardardo elemento actual
            item = await base.saveModel(item);
            if (IdRegimen <= 0)
            {
                IdRegimen = Convert.ToInt32(item.ID);
            }
            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //EntidadesAdicionales
            try
            {
                //////Elimina Registros anteriores para ID Regimen en "scv_RegimenCompania"
                var daoRegimenCompanias = Get<d.SCV.Interfaces.IRegimenCompania>();

                var ConfiguracionRegimenCompania = Get<m.SCV.Interfaces.IRegimenCompania>();

                if (ConfiguracionRegimenCompania != null)
                {
                    //Informacion adicional Regimen para Compania
                    ConfiguracionRegimenCompania.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    ConfiguracionRegimenCompania.IdRegimen = IdRegimen;
                    ConfiguracionRegimenCompania.Estatus = estatus;
                    ConfiguracionRegimenCompania.IdEstatus = estatus.ID;
                    ConfiguracionRegimenCompania.Creado = DateTime.UtcNow;
                    ConfiguracionRegimenCompania.IdCreadoPor = base.getUserId();

                    if (elementoRecibido.RegimenCCompania != null)
                    {
                        for (var i = 0; i < elementoRecibido.RegimenCCompania.Count; i++)
                        {
                            var daoSeleccionarEstadoListaMkt = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                            int ID;
                            ID = elementoRecibido.RegimenCCompania[i].ID.Value;
                            
                            if (elementoRecibido.RegimenCCompania[i].Estado == m.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                continue;
                            }
                            if (elementoRecibido.RegimenCCompania[i].Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoRegimenCompanias.Delete(ID, "ID", "scv_RegimenCompania");
                                ConfiguracionRegimenCompania.IdCompania = elementoRecibido.RegimenCCompania[i].IdCompania;
                                ConfiguracionRegimenCompania.IdImpuesto = elementoRecibido.RegimenCCompania[i].IdImpuesto;
                                ConfiguracionRegimenCompania.Porcentaje = elementoRecibido.RegimenCCompania[i].Porcentaje;
                                await daoRegimenCompanias.SaveEntity(ConfiguracionRegimenCompania, false, true);
                            }
                            else
                            {
                                await daoRegimenCompanias.Delete(ID, "ID", "scv_RegimenCompania");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }
            return item;
        }

        public async Task<object> GetRegimen(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoRegimen = Get<d.SCV.Interfaces.IRegimen>();
            if (parametros ==null)
            {
                var p = new Dictionary<string,Object>();
                p.Add("activos",1);
                retValue = await daoRegimen.GetAllRegimen(p);
                return retValue;
            }
            retValue = await daoRegimen.GetAllRegimen(parametros);
            return retValue;
        }

        public async Task<object> GetAllRegimenCompania(Dictionary<string,object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IRegimenCompania>();
            return await daoRL.GetAllRegimenCompania(parametros);
        }
    }
}
