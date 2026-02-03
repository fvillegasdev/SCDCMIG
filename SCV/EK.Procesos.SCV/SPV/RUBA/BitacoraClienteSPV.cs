using System;
using System.Collections.Generic;
using System.Linq;
using System.Dynamic;
using System.Threading.Tasks;
using System.IO;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;
using System.Configuration;

namespace EK.Procesos.SCV
{
    public class BitacoraClienteSPV
        : p.Kontrol.BPBase<m.SCV.Interfaces.IBitacoraClienteSPV, d.SCV.Interfaces.IBitacorasClienteSPV>, p.SCV.Interfaces.IBitacorasClienteSPV
    {
        public BitacoraClienteSPV(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IBitacorasClienteSPV dao)
               : base(factory, dao, "bitacoraclientespv")
        { }


        public async Task<List<string>> GetB64EvidenciasBitacora(int idComentario)
        {
            var parametrosEvidencias = new Dictionary<string, object>
                    {
                        { "IdComentario", idComentario},
                        { "entityType", "BitacoraComentariosRF"}

                    };
            var rootPath = ConfigurationManager.AppSettings["drivers:filesystem:container"];
           
           
            var evidencias = await this.dao.GetEvidenciasBitacora(parametrosEvidencias);
            List<string> evidencias_bitacora = new List<string>();
            foreach(var e in evidencias)
            {
                byte[] imageArray = System.IO.File.ReadAllBytes($@"{rootPath}kontrolFiles\\{e.EntityType}\\{idComentario}\\{e.Tipo}\\{e.Uid}") ;
                //byte[] imageArray = System.IO.File.ReadAllBytes(@rootPath + "kontrolFiles\\" + e.EntityType + IdComentarioBitacora + "" );
                string base64Image = Convert.ToBase64String(imageArray);
                var b64Img = $"data:image/png;base64,{base64Image}";
                evidencias_bitacora.Add(b64Img);
            }

            return evidencias_bitacora;
        }

            public async Task<string> printLogBook(int idCliente, string operacionEspecificaSP)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpReporte = Get<p.SCV.Interfaces.IReportesFallas>();
            var daoCPV = Get<d.SCV.Interfaces.IClientesSPV>();
            try
            {
                string retValue = null;
                var moneda = await bpMON.GetByClave("MXN");
                var Cliente =  await daoCPV.GetById(idCliente);    
                using (MemoryStream ms = new MemoryStream())
                {
                    Drivers.Common.IKontrolFiles documento = null;
                    dynamic expando = new ExpandoObject();
                    expando.Cliente = Cliente;
                    expando.Ubicacion = await bpReporte.GetUbicacionById((int)Cliente.IdUbicacion);
                    var parametros = new Dictionary<string, object>();
                    parametros.Add("idCliente", idCliente);
                    parametros.Add("operacionEspecificaSP", operacionEspecificaSP);
                    expando.Bitacora = await this.GetAll(parametros);
                    //
                    dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                    Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("BITACORA-CLIENTE-SPV", obj, null, moneda);
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

        public async Task<string> printHistorialIncidencias(int idCliente)
        {
            var bpMON = Get<p.Kontrol.Interfaces.IMonedas>();
            var bpReporte = Get<p.SCV.Interfaces.IReportesFallas>();
            var daoCPV = Get<d.SCV.Interfaces.IClientesSPV>();
            try
            {
                string retValue = null;
                var moneda = await bpMON.GetByClave("MXN");
                var Cliente = await daoCPV.GetById(idCliente);
                var historialInc = await daoCPV.getHistorialIncidencias(idCliente);
                using (MemoryStream ms = new MemoryStream())
                {
                    Drivers.Common.IKontrolFiles documento = null;
                    dynamic expando = new ExpandoObject();
                    expando.Cliente = Cliente;
                    expando.Incidencias = historialInc;
                    //expando.Ubicacion = await bpReporte.GetUbicacionById((int)Cliente.IdUbicacion);
                    //var parametros = new Dictionary<string, object>();
                    //parametros.Add("idCliente", idCliente);
                    // parametros.Add("operacionEspecificaSP", operacionEspecificaSP);
                    //expando.Bitacora = await this.GetAll(parametros);
                    //

                    dynamic obj = Newtonsoft.Json.JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(expando));
                    Drivers.Emailing.Plantilla plantilla = await this.GetPlantilla("HISTORIAL-INCIDENCIAS-SPV", obj, null, moneda);
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

        public async Task<List<m.SCV.Interfaces.IBitacoraClienteSPV>> saveLogBook(m.SCV.Interfaces.IBitacoraClienteSPV item)
        {
            List<m.SCV.Interfaces.IBitacoraClienteSPV> list = new List<m.SCV.Interfaces.IBitacoraClienteSPV>();
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
                if (item.IdPartida == null) {
                    item.FechaHoraCompromiso = DateTime.UtcNow;
                    item.Fecha = DateTime.UtcNow;
                    item.IdEstatus = estatus.ID.Value;
                    item.FechaRealizado = null;
                    var parametrosPartidas = new Dictionary<string, object>
                    {
                        { "IdCliente", item.IdCliente},
                        { "OperacionEspecificaSP", "MaxPartidaCliente"}

                    };
                    var cantidadMaxPartida  = await this.dao.GetMaxPartida(parametrosPartidas);
                    if (cantidadMaxPartida == 0  )
                    {
                        cantidadMaxPartida =  1;
                    }
                    else
                    {
                        cantidadMaxPartida++ ;
                    }
                    item.IdPartida = cantidadMaxPartida;
                    item.Realizado = false;
                }

                item = await this.Save(item);
                var tipoBitacora = "BitacoraCompleta";
                var idConsulta = item.IdCliente; 
                if (item.IdFolio != null && item.IdFolio > 0 )
                {
                    tipoBitacora = "BitacoraSoloFolio";
                    idConsulta = item.IdFolio;
                }
                var parameters = new Dictionary<string, object>
                {
                    { "IdCliente", idConsulta },
                    { "OperacionEspecificaSP", tipoBitacora}

                };

                list = (List<m.SCV.Interfaces.IBitacoraClienteSPV>)await base.GetAll(parameters);

            }
            catch(Exception ex)
            {
                Rollback();
                throw;
            }
            return list;
        }

        public async Task<int> MarcarComentarioValidado(int idComentario)
        {
            var result = await this.dao.MarcarComentarioValidado(idComentario);
            return result;
        }
        public override async Task<m.SCV.Interfaces.IBitacoraClienteSPV> Save(m.SCV.Interfaces.IBitacoraClienteSPV item)
        {
            try
            {
                item = await base.saveModel(item);
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return item;
        }

    }
}