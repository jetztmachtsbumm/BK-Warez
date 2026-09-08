using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Entities
{
    public record Device
    (
        int? Id,
        DateOnly CreatedAt,
        string Category,
        string Name,
        string Details,
        string SerialNumber,
        string Remarks
    );
}
