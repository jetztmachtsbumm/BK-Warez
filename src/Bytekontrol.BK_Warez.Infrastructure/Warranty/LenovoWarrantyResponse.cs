using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Infrastructure.Warranty
{
    internal sealed record LenovoWarrantyResponse
    (
        string? Product,
        List<LenovoWarranty> Warranty
    );
}
