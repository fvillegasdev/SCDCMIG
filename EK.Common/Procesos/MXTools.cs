using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Common.Procesos
{
    public static class MXTools
    {
        public static string GenerateRFC(string apPaterno, string apMaterno, string nombre, DateTime fechaNacimiento) {
            var retValue = new StringBuilder();

            nombre = string.IsNullOrEmpty(nombre) ? string.Empty : nombre.Trim().ToUpper();
            apPaterno = string.IsNullOrEmpty(apPaterno) ? string.Empty : apPaterno.Trim().ToUpper();
            apMaterno = string.IsNullOrEmpty(apMaterno) ? string.Empty : apMaterno.Trim().ToUpper();

            retValue.Append(GetPrimerSegmento(apPaterno, apMaterno, nombre));
            retValue.Append(GetSegundoSegmento(fechaNacimiento));
            retValue.Append(GetHomoclave(apPaterno, apMaterno, nombre));
            retValue.Append(GetDigitoVerificadorRFC(retValue.ToString()));

            return retValue.ToString();
        }

        public static string GenerateCURP(
            string apPaterno, 
            string apMaterno, 
            string nombre, 
            DateTime fechaNacimiento,
            string sexo,
            string entidadFederativa)
        {
            var retValue = new StringBuilder();

            nombre = string.IsNullOrEmpty(nombre) ? string.Empty : nombre.Trim().ToUpper();
            apPaterno = string.IsNullOrEmpty(apPaterno) ? string.Empty : apPaterno.Trim().ToUpper();
            apMaterno = string.IsNullOrEmpty(apMaterno) ? string.Empty : apMaterno.Trim().ToUpper();

            retValue.Append(GetPrimerSegmento(apPaterno, apMaterno, nombre));
            retValue.Append(GetSegundoSegmento(fechaNacimiento));
            retValue.Append(sexo);
            retValue.Append(entidadFederativa);
            retValue.Append(GetSegmentoConsonantes(apPaterno, apMaterno, nombre));
            retValue.Append(fechaNacimiento.Year >= 2000 ? "X" : "0");
            retValue.Append(GetDigitoVerificadorCURP(retValue.ToString()));

            return retValue.ToString();
        }

        private static string GetPrimerSegmento(string apPaterno, string apMaterno, string nombre)
        {
            var retValue = new StringBuilder();

            apPaterno = getNombreFiltrado(apPaterno);
            apMaterno = getNombreFiltrado(apMaterno);
            nombre = getNombreFiltrado(nombre);

            // primer letra (cualquiera que sea)
            // Cuando la letra inicial de los apellidos sea doble (CH o  LL) únicamente se tomará la primera letra C o L respectivamente
            //      -- no afecta
            var i = 1;
            var apCorto = apPaterno.Length <= 2;
            var amFaltante = string.IsNullOrEmpty(apMaterno);

            if (apPaterno.Length > 0)
            {
                retValue.Append(apPaterno.Substring(0, 1));

                if (!apCorto)
                {
                    // primera vocal de al apellido paterno
                    while (i < apPaterno.Length)
                    {
                        var c = apPaterno.Substring(i, 1);
                        if ("AEIOU".IndexOf(c) >= 0)
                        {
                            retValue.Append(c);

                            break;
                        }
                        i++;
                    }

                    // si no hay vocales, se toma la segunda letra
                    if (i >= apPaterno.Length)
                    {
                        retValue.Append(apPaterno.Substring(1, 1));
                    }
                }
            }

            if (apMaterno.Length > 0)
            {
                if (!amFaltante)
                {
                    // primera letra del apellido materno
                    retValue.Append(apMaterno.Substring(0, 1));
                }
            }

            // primera letra del nombre
            if (nombre.Length > 0)
            {
                retValue.Append(nombre.Substring(0, 1));

                if (apCorto || amFaltante)
                {
                    retValue.Append(nombre.Substring(1, 1));
                }
            }

            var prohibidas = "BUEI*BUEY*CACA*CACO*CAGA*CAGO*CAKA*CAKO*COGE*COJA*KOGE*KOJO*KAKA*KULO*MAME*MAMO*MEAR*MEAS*MEON*MION*COJE*COJI*COJO*CULO*FETO*GUEY*JOTO*KACA*KACO*KAGA*KAGO*MOCO*MULA*PEDA*PEDO*PENE*PUTA*PUTO*QULO*RATA*RUIN*";
            if (prohibidas.IndexOf(retValue.ToString()) >= 0) {
                if (retValue.Length > 0)
                {
                    retValue.Remove(retValue.Length - 1, 1);
                }
                retValue.Append("X");
            } 

            return retValue.ToString();
        }

        private static string GetSegundoSegmento(DateTime fechaNacimiento)
        {
            return string.Format("{0:yyMMdd}", fechaNacimiento);
        }

        private static string GetSegmentoConsonantes(string apPaterno, string apMaterno, string nombre) {
            var retValue = new StringBuilder();
            var vocales = "AEIOU";
            List<string> contraccion = new List<string> { "DA","DAS","DE","DEL","DER","DI","DIE","DD","EL","LA","LOS","LAS","LE","LES","MAC","MC","VAN","VON","Y" };
            if (apPaterno.Contains(" ")) {
                string[] vapP = apPaterno.Split(' ');
                foreach (string cadena in vapP) {
                    if (!contraccion.Contains(cadena)){
                        apPaterno = cadena;
                        break;
                    }
                }
            }
            for (var i = 1; i < apPaterno.Length; i++) {
                if (vocales.IndexOf(apPaterno[i]) == -1) {
                    retValue.Append(apPaterno[i]);

                    break;
                }
            }
            
            if (apMaterno.Contains(" ")){
              string[] vapM = apMaterno.Split(' ');
                foreach (string cadena in vapM){
                    if (!contraccion.Contains(cadena)){
                        apMaterno = cadena;
                        break;
                    }
                }
            }
            
            for (var i = 1; i < apMaterno.Length; i++)
            {
                if (vocales.IndexOf(apMaterno[i]) == -1)
                {
                    retValue.Append(apMaterno[i]);

                    break;
                }
            }

            for (var i = 1; i < nombre.Length; i++)
            {
                if (vocales.IndexOf(nombre[i]) == -1)
                {
                    retValue.Append(nombre[i]);

                    break;
                }
            }

            return retValue.ToString();
        }

        private static string GetHomoclave(string apPaterno, string apMaterno, string nombre) {
            var retValue = new StringBuilder();
            var cPermitidos = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
            var nombreCompleto = $"{apPaterno} {apMaterno} {nombre}";

            var cadena = new StringBuilder("0");
            for (var i = 0; i < nombreCompleto.Length; i++) {
                var c = nombreCompleto.Substring(i, 1);

                if (c == " " || c == "-")
                {
                    cadena.Append("00");
                }
                else if (c == "Ñ" || c == "Ü") {
                    cadena.Append("10");
                }
                else if ("ABCDEFGHI".IndexOf(c) >= 0)
                {
                    cadena.Append(Convert.ToInt32(c[0]) - 54);
                }
                else if ("JKLMNOPQR".IndexOf(c) >= 0)
                {
                    cadena.Append(Convert.ToInt32(c[0]) - 53);
                }
                else if ("STUVWXYZ".IndexOf(c) >= 0)
                {
                    cadena.Append(Convert.ToInt32(c[0]) - 51);
                }
                else if ("0123456789".IndexOf(c) >= 0)
                {
                    cadena.Append("00");
                }
            }

            var cadenaStr = cadena.ToString();
            var totalCadena = 0;
            for (var i = 0; i < cadena.Length - 1; i++) {
                var leftNumber = Convert.ToInt32(cadenaStr.Substring(i, 2));
                var rightNumber = Convert.ToInt32(cadenaStr.Substring(i + 1, 1));

                totalCadena += leftNumber * rightNumber;
            }

            // ocupamos los 3 últimos dígitos
            totalCadena = totalCadena % 1000;

            retValue.Append(cPermitidos.Substring(totalCadena / 34, 1));
            retValue.Append(cPermitidos.Substring(totalCadena % 34, 1));

            return retValue.ToString();
        }

        private static string GetDigitoVerificadorRFC(string rfc) {
            var retValue = string.Empty;

            var cPermitidos = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ*";
            var totalDV = 0;
            for (var i = 0; i < rfc.Length; i++) {
                var c = rfc.Substring(i, 1);

                if (c == " ")
                {
                    c = "*";
                }

                totalDV += cPermitidos.IndexOf(c) * (14 - i - 1);
            }

            if (totalDV % 11 == 0)
            {
                retValue = "0";
            }
            else {
                var intDV = 11 - (totalDV % 11);
                if (intDV > 9)
                {
                    retValue = "A";
                }
                else {
                    retValue = Convert.ToString(intDV);
                }
            }

            return retValue;
        }

        private static string GetDigitoVerificadorCURP(string rfc)
        {
            var retValue = string.Empty;

            var cPermitidos = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ*";
            var totalDV = 0;
            for (var i = 0; i < rfc.Length; i++)
            {
                var c = rfc.Substring(i, 1);

                if (c == " ")
                {
                    c = "*";
                }

                totalDV += cPermitidos.IndexOf(c) * (18 - i);
            }
            int vResidue= 10 - (totalDV % 10);
            
            if (vResidue == 10)
            {
                vResidue = 0;
            }
            retValue = Convert.ToString(vResidue);
            
            return retValue;
        }

        private static string Normalize(string texto) {
            var origen = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
            var destino = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
            var retValue = new StringBuilder();

            for (var i = 0; i < texto.Length; i++) {
                var p = origen.IndexOf(texto[i]);

                if (p == -1)
                {
                    retValue.Append(texto[i]);
                }
                else {
                    retValue.Append(destino[p]);
                }
            }

            return retValue.ToString();
        }

        private static string getNombreFiltrado(string nombre) {
            var retValue = nombre
                .Trim()
                .ToUpper()
                .Replace("D ", "")
                .Replace("DES ", "")
                .Replace("DU ", "")
                .Replace("DA ", "")
                .Replace("DE ", "")
                .Replace("LOS ", "")
                .Replace("LAS ", "")
                .Replace("LA ", "")
                .Replace("DEL ", "")
                .Replace("MC ", "")
                .Replace("MAC ", "")
                .Replace("VON ", "")
                .Replace("VAN ", "")
                .Replace("VANDEN ", "")
                .Replace("VANDER ", "")
                .Replace("Y ", "")
                .Trim();

            retValue = Normalize(retValue);

            var tmpRetValue = retValue
                .Replace("JOSE", "")
                .Replace("MARIA", "")
                .Trim();

            if (!string.IsNullOrEmpty(tmpRetValue)) {
                retValue = retValue
                    .Replace("JOSE ", "")
                    .Replace("MARIA ", "")
                    .Trim();
            }

            return retValue;
        }
    }
}
