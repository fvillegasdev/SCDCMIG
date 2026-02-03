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
    public class Interface
        :p.Kontrol.BPBase<m.SCV.Interfaces.IInterface,d.SCV.Interfaces.IInterface>,p.SCV.Interfaces.IInterface
    {
        public Interface(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.IInterface dao)
           :base(factory,dao,"Interface")
        {
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IInterface>();
            return await daoRL.GetAllInterface(parametros);
        }
        public  async Task<object> GetAllISFDetalle(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IInterface>();
            return await daoRL.GetAllISFDetalles(parametros);
        }
        //public async Task<object> SaveUpdateInterface(Dictionary<string, object> parametros) {
        //    var daoInterface =this.factory.GetInstance<d.SCV.Interfaces.IInterface>();
        //    await daoInterface.GetSaveUpdateInterface(parametros);
        //    return null;
        //}

        public async Task<m.SCV.Interfaces.IInterface> SaveInterface(m.SCV.Interfaces.IInterface item)
        {
            var retValue = Get<m.SCV.Interfaces.IInterface>();
            var daoInterface = this.factory.GetInstance<d.SCV.Interfaces.IInterface>();
            var interfaceDetalle = Get<d.SCV.Interfaces.IInterfaceDetalle>();
            try
            {
                BeginTransaction();
                //validaciones
                var detalles = item.Detalles;
                foreach (var det in detalles)
                {
                    var detalle = Get<m.SCV.Interfaces.IInterfaceDetalle>();
                    detalle.ID = det.ID;
                    detalle.EstatusRegistro = item.Accion.Clave;
                    detalle.numcte_ek = det.numcte_ek;
                    detalle.IdInterface = item.Interface.Clave;
                    var obj = new Dictionary<string, object>();
                    obj.Add("Id",detalle.ID);
                    obj.Add("IdInterface",detalle.IdInterface);
                    obj.Add("EstatusRegistro",detalle.EstatusRegistro);
                    obj.Add("numcte_ek",detalle.numcte_ek);
                    await daoInterface.GetSaveUpdateInterface(obj);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IInterfaceSaldoFacturaDetalle> SaveISFDetalle(m.SCV.Interfaces.IInterfaceSaldoFacturaDetalle item)
        {
            
            var daointerfaceDetalle = Get<d.SCV.Interfaces.IInterfaceSaldoFacturaDetalle>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            try
            {
                //BeginTransaction();
                /*Validaciones*/
                   var ISFdetalle = Get<m.SCV.Interfaces.IInterfaceSaldoFacturaDetalle>();

                   ISFdetalle.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                   ISFdetalle.Num_documento = item.Num_documento;
                   ISFdetalle.Factura = item.Factura;
                   ISFdetalle.Importe = item.Importe;
                   ISFdetalle.IdCreadoPor = this.getUserId();
                   ISFdetalle.Creado = DateTime.UtcNow;
                   ISFdetalle.IdEstatus = estatus.ID.Value;
                await daointerfaceDetalle.SaveEntity(ISFdetalle);
                return null;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
