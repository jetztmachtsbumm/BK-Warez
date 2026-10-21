using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Common.DTOs
{
    public record DeviceDTO
    (
        DateOnly CreatedAt,
        string Category,
        string Name,
        string Manufacturer,
        string Details,
        string SerialNumber,
        string Remarks,
        bool Delivered,
        DateOnly? DeliveryDate,
        bool Archived
    );
}
