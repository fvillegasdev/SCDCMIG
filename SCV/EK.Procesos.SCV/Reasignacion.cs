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
    public class Reasignacion
        :p.Kontrol.BPBase<m.SCV.Interfaces.IReasignacion,d.SCV.Interfaces.IReasignacion>,p.SCV.Interfaces.IReasignacion
    {
        public Reasignacion(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.IReasignacion dao)
            :base(factory,dao,"Reasignacion")
        {
        }

        public async Task<object> GetReasignacionProspecto(Dictionary<string,object> parametros)
        {
            object result = null;

            var daoRe = Get<d.SCV.Interfaces.IReasignacion>();

            if (parametros == null) {
                var p = new Dictionary<string, object>();
                p.Add("Agente",null);
                result = await daoRe.GetReasignacionProspectos(p);
                return result;
            }
            result = await daoRe.GetReasignacionProspectos(parametros);
            
            return result;
        }

        private async Task<List<m.SCV.Interfaces.IReasignacion>> obtenerReasignacionP(Dictionary<string,object>parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IReasignacion>();
            List<m.SCV.Interfaces.IReasignacion> Reasignacion = await daoRL.GetAll(parametros);
            return Reasignacion;
        }

        public async Task<List<m.SCV.Interfaces.IReasignacion>> ObtenerReasignacion(Dictionary<string, object> parametros)
        {
            List<m.SCV.Interfaces.IReasignacion> reasignacion = await obtenerReasignacionP(parametros);
            return reasignacion;
        }

        public async Task<object> GetReasignacionExpediente(Dictionary<string,object> parametros)
        {
            object result = null;
            var daoRe = Get<d.SCV.Interfaces.IReasignacion>();
            if (parametros ==null)
            {
                var p = new Dictionary<string, object>();
                p.Add("Agente",null);
                result = await daoRe.GetReasignacionExpedientes(p);
                return result;
            }
            result = await daoRe.GetReasignacionExpedientes(parametros);
            return result;
        }

        public async Task<m.Kontrol.Interfaces.IBitacoraEventos> GetEventoByClave(string Clave)
        {
            var daoBitacoraEventos = Get<EK.Datos.Kontrol.Interfaces.IBitacoraEventos>();
            return await daoBitacoraEventos.GetByClave(Clave);
        }

        public async Task<object> SaveReassigmentProspect(Dictionary<string, object> parametros)
        {
            var daoA = Get<d.Kontrol.Interfaces.IBitacora>();
            var retValue=Get<m.SCV.Interfaces.IReasignacion>();
            string AgenteOrigen = Convert.ToString(parametros["IdAgenteOrigen"]);
            string AgenteDestino = Convert.ToString(parametros["IdAgenteDestino"]);
            int IdCliente = Convert.ToInt32(parametros["IdCliente"]);
            int IdUsuario = Convert.ToInt32(parametros["IdUsuario"]);
            // object ResultProspect = null;
            BeginTransaction(true);
                var daoReasignacion = this.factory.GetInstance<d.SCV.Interfaces.IReasignacion>();

                if (IdCliente > 0)
                {
                    /*Metodo para Guardar Reasignacion Prospecto*/
                    var SendParameters = new Dictionary<string, object>
                    {
                        {"IdCliente",IdCliente },
                        {"IdUsuario",IdUsuario }
                    };
                    await daoReasignacion.GetSaveReassignmentProspects(SendParameters);
                    /*Registro en Bitacora por Reasignacion de Prospectos*/
                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Cambio de Agente titular de " + AgenteOrigen + " a " + AgenteDestino,
                                                              "scvclientes", "CATBT-SI-PCR", IdCliente, "scvclientes", IdCliente, null);
                    Commit();
                }
            return null;
        }
        public async Task<object> SaveReassignmentExp(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);
            var retValue = Get<m.SCV.Interfaces.IReasignacion>();
            //var retValBit = new p.Kontrol.WorkflowResult();
            string IdAgenteOrigen = Convert.ToString(parametros["AgenteOrigen"]);
            string IdAgenteDestino = Convert.ToString(parametros["AgenteDestino"]);
            int IdUsuario = Convert.ToInt32(parametros["IdUsuario"]);
            int IdExpediente = Convert.ToInt32(parametros["IdExpediente"]);

            var daoReasignacion = this.factory.GetInstance<d.SCV.Interfaces.IReasignacion>();
                if (IdExpediente > 0)
                {
                    /*Metodo Para Guardar Reasignacion Expediente*/
                    var SendParameters = new Dictionary<string, object>
                    {
                        {"IdExpediente",IdExpediente },
                        {"IdUsuario", IdUsuario }
                    };
                    await daoReasignacion.GetSaveReassignmentExpedients(SendParameters);
                
                    /*Registro Bitacora por Reasignacion de Expediente*/
                    var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
                    await bpBitacora.SaveBitacora("Reasignación del Responsable de " + IdAgenteOrigen + " a " + IdAgenteDestino, "Expediente", "CATBT-SI-ER", IdExpediente, "Expediente", IdExpediente, null);
                    Commit();
                }
            
            return null;
        }
    }
}
