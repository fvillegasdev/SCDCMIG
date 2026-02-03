using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class BitacoraClienteSPVAreasComunes : p.Kontrol.BPBase<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes, d.SCV.Interfaces.IBitacorasClienteSPVAreasComunes>, p.SCV.Interfaces.IBitacorasClienteSPVAreasComunes
    {
        public BitacoraClienteSPVAreasComunes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IBitacorasClienteSPVAreasComunes dao)
                   : base(factory, dao, "BitacoraClienteSPVAreasComunes")
        { }

        public async Task<string> printLogBook(int idCliente, string operacionEspecificaSP, string Opcion)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var daoCPV = Get<d.SCV.Interfaces.IClientesSPV>();
            var daouPV = Get<d.Kontrol.Interfaces.IUsuarios>();
            try
            {
                string retValue = null;
                var moneda = await bpMON.GetByClave("MXN");
                m.SCV.Interfaces.IClientesSPV Cliente = null;
                m.Kontrol.Interfaces.IUsuario Usuario = null;
                if(Opcion == "PorCliente" || Opcion == "Cliente")
                {
                    Cliente = await daoCPV.GetById(idCliente);
                }
                if(Opcion == "PorColaborador" || Opcion == "Colaborador")
                {
                    Usuario = await daouPV.GetById(idCliente);
                }

                using (MemoryStream ms = new MemoryStream())
                {
                    Drivers.Common.IKontrolFiles documento = null;
                    dynamic expando = new ExpandoObject();
                    if (Opcion == "PorCliente" || Opcion == "Cliente")
                    {
                        expando.Cliente = Cliente;
                    }
                    if (Opcion == "PorColaborador" || Opcion == "Colaborador")
                    {
                        expando.Usuario = Usuario;
                    }
                    if (Opcion == "PorAnonimo" || Opcion == "Anonimo")
                    {
                        expando.Anonimo = "Anonimo";
                    }
                    
                    var parametros = new Dictionary<string, object>();
                    parametros.Add("idCliente", idCliente);
                    parametros.Add("operacionEspecificaSP", operacionEspecificaSP);
                    expando.Bitacora = await this.GetAll(parametros);
                    //
                    dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                    Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("BITACORA-CLIENTE-AREASCOMUNES-SPV", obj, null, moneda);
                    documento = plantilla.GetDocument(false, plantilla, obj, this.factory, moneda);

                    if (documento != null)
                    {
                        documento.Content.Position = 0;
                        documento.Content.CopyTo(ms);
                    }
                    //
                    retValue = Convert.ToBase64String(ms.ToArray());
                }
                //
                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>> saveLogBook(m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes item)
        {
            List<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes> list = new List<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>();
            var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            try
            {
                var estatus = await bpCatalogoG.Get("ESTATUS", "A");
                //
                item.Descripcion = item.Comentarios;
                //
                item.IdUsuarioCompromiso = base.getUserId();
                item.IdUsuarioCreador = base.getUserId();
                //
                if (item.IdPartida == null)
                {
                    item.FechaHoraCompromiso = DateTime.UtcNow;
                    item.Fecha = DateTime.UtcNow;
                    item.IdEstatus = estatus.ID.Value;
                    item.FechaRealizado = null;
                    var parametrosPartidas = new Dictionary<string, object>
                        {
                            { "IdCliente", item.IdCliente},
                            { "OperacionEspecificaSP", "MaxPartidaCliente"}

                        };
                    var cantidadMaxPartida = await this.dao.GetMaxPartida(parametrosPartidas);
                    if (cantidadMaxPartida == 0)
                    {
                        cantidadMaxPartida = 1;
                    }
                    else
                    {
                        cantidadMaxPartida++;
                    }
                    item.IdPartida = cantidadMaxPartida;
                    item.Realizado = false;
                }

                item = await this.Save(item);
                var tipoBitacora = "BitacoraCompleta";
                var idConsulta = item.IdCliente;
                if (item.IdFolio != null && item.IdFolio > 0)
                {
                    tipoBitacora = "BitacoraSoloFolio";
                    idConsulta = item.IdFolio;
                }
                var parameters = new Dictionary<string, object>
                    {
                        { "IdCliente", idConsulta },
                        { "OperacionEspecificaSP", tipoBitacora}

                    };

                list = (List<m.SCV.Interfaces.IBitacoraClienteSPVAreasComunes>)await base.GetAll(parameters);

            }
            catch
            {
                Rollback();
                throw;
            }
            return list;
        }

    }
}
