using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.IO;

namespace EK.Procesos.SCV
{
    public class ReconocimientosRuba : p.Kontrol.BPBase<m.SCV.Interfaces.IReconocimientosRuba, d.SCV.Interfaces.IReconocimientosRuba>, p.SCV.Interfaces.IReconocimientosRuba
    {
        public ReconocimientosRuba(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReconocimientosRuba dao)
          : base(factory, dao, "ReconocimientosRuba")
        {

        }
        public async Task<object[]> PRReconocimientos(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            var Result = await this.dao.PRReconocimiento(parametros);
            return Result;
        }

        public string GetPDF(Dictionary<string, object> parametros)
        {
            if (!parametros.ContainsKey("URL"))
            {
                Console.WriteLine("El diccionario no contiene la clave 'URL'.");
                return "";
            }

            string url = parametros["URL"].ToString();
            string filePath = url.Replace('/', '\\');
            string server = @"\\10.1.70.52\RepositorioEK10\";
            string fullpath = Path.Combine(server, filePath);

            try
            {
                
                    byte[] fileBytes = File.ReadAllBytes(fullpath);
                    return Convert.ToBase64String(fileBytes);
                //Console.WriteLine($"El archivo {fullpath} no existe.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al leer el archivo: {ex.Message}");
                return $"Error: {ex.Message}";
            }
        }
    }
}
