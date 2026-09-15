using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Infrastructure.Warranty
{
    internal sealed record LenovoWarranty
    (
        string? Id,
        string? Name,
        DateTime? Start,
        DateTime? End
    );
}
