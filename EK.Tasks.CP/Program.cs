using System;
using System.Collections.Generic;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Tasks.CP
{
    class Program
    {
        static void Main(string[] args)
        {
            string path = args[0];
            string csText = args[1];
            //
            string sqlText = @"
                  IF NOT EXISTS(SELECT * FROM ASENTAMIENTOS (NOLOCK) WHERE CLAVE=@Clave) BEGIN	
	                INSERT INTO ASENTAMIENTOS (CP, Clave, Descripcion, IdLocalidad, IdEstatus, Creado, CreadoPor, Modificado, ModificadoPor)
	                VALUES (@CP, @Clave, @Descripcion, (SELECT ID FROM Localidades WHERE claveOrigen = @ClaveLocalidad), dbo.ufn_getEstatusActivo(), getutcdate(), 1, getutcdate(), 1)
                  END
            ";

            using (SqlConnection cn = new SqlConnection(csText)) {
                cn.Open();
                //
                using (SqlCommand cmd = new SqlCommand(sqlText, cn))
                {
                    cmd.Parameters.Add("@CP", SqlDbType.NVarChar, 6);
                    cmd.Parameters.Add("@Clave", SqlDbType.NVarChar, 25);
                    cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 250);
                    cmd.Parameters.Add("@ClaveLocalidad", SqlDbType.NVarChar, 25);
                    cmd.Prepare();

                    using (FileStream fs = File.Open(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {
                        using (BufferedStream bs = new BufferedStream(fs))
                        {
                            using (StreamReader sr = new StreamReader(bs))
                            {
                                string line;
                                while ((line = sr.ReadLine()) != null)
                                {
                                    string[] fields = line.Split('|');
                                    string claveAsentamiento = $"{fields[0].Trim()}{fields[12].Trim()}";
                                    string claveLocalidad = $"01{fields[7].Trim()}{fields[11].Trim()}";
                                    //                                    
                                    cmd.Parameters["@CP"].Value = fields[0].Trim();
                                    cmd.Parameters["@Clave"].Value = claveAsentamiento;
                                    cmd.Parameters["@Descripcion"].Value = fields[1].Trim(); 
                                    cmd.Parameters["@ClaveLocalidad"].Value = claveLocalidad;

                                    try
                                    {
                                        int retValue = cmd.ExecuteNonQuery();
                                        if (retValue > 0) {
                                            Console.WriteLine($"+ {fields[0].Trim()} {fields[1].Trim()} ... {retValue}");
                                        }
                                    }
                                    catch (Exception e) {
                                        Console.WriteLine($"+ {fields[0].Trim()} {fields[1].Trim()} ... {e.Message}");
                                    }
                                }
                            }
                        }
                    }

                    cmd.Dispose();
                }
                cn.Close();
                cn.Dispose();
            }

            Console.WriteLine("Completado");
            Console.Read();
        }
    }
}
