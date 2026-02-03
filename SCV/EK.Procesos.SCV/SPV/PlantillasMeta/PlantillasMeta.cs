using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using Newtonsoft.Json.Linq;

namespace EK.Procesos.SCV.SPV.PlantillasMeta
{
    public class PlantillasMeta : p.Kontrol.BPBase<m.SCV.Interfaces.PlantillasMeta.IPlantillaMeta, d.SCV.Interfaces.PlantillasMeta.IPlantillaMeta>, p.SCV.Interfaces.PlantillaMeta.IPlantillaMeta
    {
        public PlantillasMeta(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.PlantillasMeta.IPlantillaMeta dao)
       : base(factory, dao, "PlantillasMeta")
        {
        }

        public Task<object> saveEncuesta(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<object> saveOpcionPregunta(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public Task<object> savePantallaEncuesta(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<object> savePlantilla(Dictionary<string, object> parametros)
        {
            var idUsuario = base.getUserId();
            parametros.Add("id_usuario", idUsuario);
            dynamic plantilla = await this.dao.SavePlantilla(parametros);
            parametros.Add("id_plantilla", plantilla.id_plantilla);
            dynamic encuesta = await this.dao.SaveEncuesta(parametros);
            plantilla.encuesta = encuesta;
            var listaPantallas = toDictionaryList(parametros["pantallas"]);
            plantilla.encuesta.pantallas = new List<dynamic>();
            foreach(var p in listaPantallas)
            {
                p.Add("id_encuesta", encuesta.id_encuesta);
                dynamic _pantalla = await this.dao.SavePantalla(p);
               
                var preguntas = toDictionaryList(p["preguntas"]);
                if(preguntas.Count > 0)
                {
                    foreach(var pre in preguntas)
                    {
                        _pantalla.preguntas = new List<dynamic>();
                        pre.Add("id_pantalla", _pantalla.id_pantalla);
                        dynamic _pregunta = await this.dao.SavePregunta(pre);
                        
                        if(pre["tipoRespuesta"].ToString() != "TXT" && pre["tipoRespuesta"].ToString() != "")
                        {
                            _pregunta.opciones = new List<dynamic>();
                            var opciones = toDictionaryList(pre["opciones"]);
                            foreach(var op in opciones)
                            {
                                op.Add("id_pregunta", _pregunta.id_pregunta);
                                var _opcion = await this.dao.SaveOpcion(op);
                                _pregunta.opciones.Add(_opcion);
                            }
                        }
                        _pantalla.preguntas.Add(_pregunta);
                    }
                }
                plantilla.encuesta.pantallas.Add(_pantalla);
            }

            return plantilla;
            //throw new NotImplementedException();
        }

        List<Dictionary<string, object>> toDictionaryList(object data)
        {
            List<Dictionary<string, object>> listaDictionary = new List<Dictionary<string, object>>();
            JArray array = (JArray)data;
            List<dynamic> listaDinamica = array.ToObject<List<dynamic>>();
            foreach (var li in listaDinamica)
            {
               var itemDictionary = li.ToObject<Dictionary<string, object>>();
                listaDictionary.Add(itemDictionary);
            }

            return listaDictionary; 
        }

        public Task<object> savePreguntaEncuesta(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}
