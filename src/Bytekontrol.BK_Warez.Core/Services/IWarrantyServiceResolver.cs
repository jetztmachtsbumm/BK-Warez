using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Services
{
    public interface IWarrantyServiceResolver
    {
        IWarrantyService? Resolve(string manufacturer);
    }
}
