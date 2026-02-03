using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IGanttTask
    {
        int id { get; set; }
        string text { get; set; }
        string priority { get; set; }
        string assigned { get; set; }
        //string Ruta { get; set; }
        //string Summary { get; set; }
        //string Status { get; set; }
        string start_date { get; set; }
        //DateTime DTEnd { get; set; }
        int? duration { get; set; }
        int? parent { get; set; }
        int? Source { get; set; }
        int? Target { get; set; }
        decimal progress { get; set; }
        bool open { get; set; }
        string type { get; set; }
    }
}

namespace EK.Modelo.Kontrol.Interfaces
{
    public enum GanttTypeEnum
    {
        Project = 0,
        Milestone = 1
    }
}