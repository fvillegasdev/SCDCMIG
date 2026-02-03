using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using p = EK.Procesos;
using d = EK.Datos;
using m = EK.Modelo;
using Newtonsoft.Json.Linq;

namespace EK.Procesos.SCV
{
    public class UbicacionCoordenadas : p.Kontrol.BPBase<m.SCV.Interfaces.IUbicacionCoordenadas,d.SCV.Interfaces.IUbicacionCoordenadas>, p.SCV.Interfaces.IUbicacionCoordenadas
    {
        public UbicacionCoordenadas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicacionCoordenadas dao)
               : base(factory, dao, "ubicacionCoordenadas")
        {
        }

        public async Task<object[]> GetById(Dictionary<string, object> parametros)
        {
            return await this.dao.GetById(parametros);// helper.CreateEntitiesAsync(usp_ubicacionCoordenadas_Select, CommandType.StoredProcedure, parametros);
        }

        public async Task<object[]> Save(IList<m.SCV.Interfaces.IUbicacionCoordenadas> elementos)
        {
            int user = getUserId(); 
            foreach (var s in elementos)
            {
                s.Nombre = s.Clave;
                byte[] arrClave = System.Text.ASCIIEncoding.ASCII.GetBytes(s.Coordenadas);
                s.Clave = System.Convert.ToBase64String(arrClave);
                s.IdUser = user;
                await dao.Save(s);
            }

            return await this.GetById(new Dictionary<string, object>() { });
        }

        public async Task<object[]> SaveCoord(string GeoJsonFile)
        {
            var ubElement = Get<m.SCV.Interfaces.IUbicacionCoordenadas>();
            var listCoordenadas = new List<m.SCV.Interfaces.IUbicacionCoordenadas>();
            JObject jobj = JObject.Parse(GeoJsonFile);
            JToken jt = jobj["features"];
            bool isPolygon = false;
            if(jt != null)
            {
                foreach (dynamic s in jt)
                {
                    ubElement = Get<m.SCV.Interfaces.IUbicacionCoordenadas>();
                    isPolygon = false;
                    if (s.properties.Clave != null)
                    {
                        if (s.geometry.type == "Polygon")
                        {
                            if (s.geometry.coordinates != null)
                            {
                                ubElement.Clave = s.properties.Clave;
                                ubElement.Coordenadas = Newtonsoft.Json.JsonConvert.SerializeObject(s.geometry.coordinates);
                                isPolygon = true;
                            }
                        }
                    }
                   
                    if (isPolygon)
                        listCoordenadas.Add(ubElement);
                }
            }
            
            return await this.Save(listCoordenadas);
        }
    }
}
