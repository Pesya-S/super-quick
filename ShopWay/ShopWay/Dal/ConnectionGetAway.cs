//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Dal
{
    using System;
    using System.Collections.Generic;
    
    public partial class ConnectionGetaway
    {
        public int Code { get; set; }
        public Nullable<int> CodeSource { get; set; }
        public Nullable<int> CodeDest { get; set; }
        public Nullable<double> Distance { get; set; }
        public Nullable<bool> Nearest { get; set; }
    
        public virtual Getaway Getaway { get; set; }
        public virtual Getaway Getaway1 { get; set; }
    }
}
