using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol
{
    public class TableAttribute : Attribute {
        private string dbName;
        public TableAttribute(string name) {
            this.dbName = name;
        }

        public override object TypeId
        {
            get
            {
                return "EK.Table";
            }
        }

        public override string ToString()
        {
            return this.dbName;
        }
    }
    public class ColumnAttribute : Attribute
    {
        private string dbName;
        private bool exclude;
        
        public ColumnAttribute()
        {
            this.dbName = string.Empty;
            this.exclude = false;
        }
        public ColumnAttribute(string name)
            : this()
        {
            this.dbName = name;
        }
        public ColumnAttribute(string name, bool exclude)
            : this(name)
        {
            this.exclude = exclude;
        }
        public override object TypeId
        {
            get
            {
                return "EK.Column";
            }
        }
        public bool Exclude {
            get {
                return this.exclude;
            }
        }
        public override string ToString()
        {
            return this.dbName;
        }
    }
    public class MapIDAttribute : Attribute
    {
        public override object TypeId
        {
            get
            {
                return "EK.MapID";
            }
        }
        private string propName;
        public MapIDAttribute(string name)
        {
            this.propName = name;
        }
        public override string ToString()
        {
            return this.propName;
        }
    }
}
