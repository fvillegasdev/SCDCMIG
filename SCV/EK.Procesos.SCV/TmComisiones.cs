using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class TMComisiones
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITmComisiones, d.SCV.Interfaces.ITmComisiones>,
            p.SCV.Interfaces.ITmComisiones
    {
        public TMComisiones(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.ITmComisiones dao)
                : base(factory, dao, "TMComisiones")
        {

        }
        public override async Task<m.SCV.Interfaces.ITmComisiones> Save(m.SCV.Interfaces.ITmComisiones item)
        {
            try
            {
                var companias = item.ComisionCCompania;
                item = await base.saveModel(item);

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoTMCompanias = Get<d.SCV.Interfaces.IComisionCompania>();

                var estatus = await bpEstatus.Get("ESTATUS", "A");


                if (companias != null)
                {
                    foreach (var element in companias)
                    {
                        if (element.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            element.Modificado = DateTime.UtcNow;
                            element.IdModificadoPor = base.getUserId();

                            if (element.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                element.IdComision = item.ID.Value;
                                element.Estatus = estatus;
                                element.IdEstatus = estatus.ID;
                                element.Creado = DateTime.UtcNow;
                                element.IdCreadoPor = base.getUserId();
                            }
                            if (element.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {

                                await daoTMCompanias.Delete(element.ID.Value);
                            }
                            else
                            {
                                await daoTMCompanias.Save(element);
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
        public async Task<object> GetAllComisionCompania(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IComisionCompania>();
            return await daoRL.GetAllComisionCompania(parametros);
        }

       

    }



}
