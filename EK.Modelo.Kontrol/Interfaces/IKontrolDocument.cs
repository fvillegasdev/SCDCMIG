using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IKontrolDocument
    {
        string Nombre { get; set; }
        string Extension { get; set; }
        string ContentType { get; set; }
        Stream Content { get; set; }
        long Size { get; set; }
    }
}