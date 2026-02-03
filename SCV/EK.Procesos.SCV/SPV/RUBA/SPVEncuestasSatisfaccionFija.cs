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
    public class SPVEncuestasSatisfaccionFija
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija, d.SCV.Interfaces.ISPVEncuestasSatisfaccionFija>, p.SCV.Interfaces.ISPVEncuestasSatisfaccionFija

    {
        public SPVEncuestasSatisfaccionFija(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISPVEncuestasSatisfaccionFija dao)
            : base(factory, dao, "SPVEncuestasSatisfaccionFija")
        {
        }


        //public override async Task<ISPVEncuestaSatisfaccionFija> GetById(int id)
        //{
        //    //var retValue = await this.dao.GetById(id);
        //    //retValue = await this.afterGetItem(retValue);
        //    //return retValue;
        //    ISPVEncuestaSatisfaccionFija retValue;
        //    try
        //    {
        //        retValue = await this.dao.GetById(id);
        //        if (retValue == null)
        //        {




        //            //  item = await base.saveModel(item);

                
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        string Error = ex.ToString();
        //        Rollback();
        //        throw;
        //    }
        //    return retValue;
        //}


        public async Task<ISPVEncuestaSatisfaccionFija> GetIncuest(m.SCV.Interfaces.IReporteFalla item)
        {
            var retValue = Get<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija>();
            var retValueTMP = Get<m.SCV.Interfaces.ISPVEncuestaSatisfaccionFija>();
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            try
            {
                retValueTMP = await this.dao.GetByFolio((int)item.ID);
                if (retValueTMP == null)
                {
                    var estatus =     await bpCGV.Get("ESTATUS", "A");

                    retValue.IdFolio = (int)item.ID;
                    retValue.IdContratista = (int)item.IdContratista;
                    retValue.IdPlaza = item.Ubicacion.IdPlaza;
                    retValue.DesarrolloClave = item.Ubicacion.DesarrolloClave;
                    retValue.Fecha = DateTime.Now;
                    retValue.Observacion = "";

                    retValue.P1 = 0;
                    retValue.P2 = 0;
                    retValue.P3 = 0;
                    retValue.P4 = 0;
                    retValue.P5 = 0;
                    retValue.P6 = 0;
                    retValue.P7 = 0;
                    retValue.P8 = 0;
                    retValue.P9 = 0;

                    retValue.IndiceSatisfaccion = 0;
                    retValue.TotalCalidad = 0;
                    retValue.TotalLimpieza = 0;
                    retValue.TotalPuntualidad = 0;
                    retValue.TotalTipoAtencion = 0;

                    retValue.NoContesto = false;
                    retValue.NoEncontrado = false;
                    retValue.Cerrada = false;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                    retValue.IdEstatus = estatus.ID;
                    retValue.Estatus = estatus;

                    retValue = await dao.Save(retValue);
                }
                else
                {
                    retValue = retValueTMP; 
                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return retValue;
        }
    }
}