using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Common.Warranty
{
    public record DeviceWarranty
    (
        DateTime Start,
        DateTime End,
        bool Expired
    );
}
