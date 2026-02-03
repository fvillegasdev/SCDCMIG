using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Globalization;

namespace EK.Common.Utils
{
    public class ElasticObject
        : DynamicObject, IDictionary<string, object>
    {
        public ElasticObject()
        {
            this.Properties = new Dictionary<string, object>();
        }

        public ElasticObject(Dictionary<string, object> properties)
            : this()
        {
            foreach (var prop in properties)
            {
                this[prop.Key] = prop.Value;
            }
        }

        public IDictionary<string, object> Properties { get; private set; }

        public ICollection<string> Keys
        {
            get
            {
                return Properties.Keys;
            }
        }

        public ICollection<object> Values
        {
            get
            {
                return Properties.Values;
            }
        }

        public int Count
        {
            get
            {
                return Properties.Count;
            }
        }

        public bool IsReadOnly
        {
            get
            {
                return Properties.IsReadOnly;
            }
        }

        public object this[string key]
        {
            get
            {
                if (!this.Properties.ContainsKey(key))
                    this.Properties.Add(key, null);

                return this.Properties[key];
            }
            set
            {
                if (this.Properties.ContainsKey(key))
                    this.Properties[key] = value;
                else
                    this.Properties.Add(key, value);
            }
        }

        #region DynamicObject overrides

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            result = this[binder.Name];
            return true;
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            this[binder.Name] = value;
            return true;
        }

        public bool ContainsKey(string key)
        {
            return Properties.ContainsKey(key);
        }

        public void Add(string key, object value)
        {
            Properties.Add(key, value);
        }

        public bool Remove(string key)
        {
            return Properties.Remove(key);
        }

        public bool TryGetValue(string key, out object value)
        {
            return Properties.TryGetValue(key, out value);
        }

        public void Add(KeyValuePair<string, object> item)
        {
            Properties.Add(item);
        }

        public void Clear()
        {
            Properties.Clear();
        }

        public bool Contains(KeyValuePair<string, object> item)
        {
            return Properties.Contains(item);
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
            Properties.CopyTo(array, arrayIndex);
        }

        public bool Remove(KeyValuePair<string, object> item)
        {
            return Properties.Remove(item);
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return Properties.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Properties.GetEnumerator();
        }

        #endregion
    }
}
