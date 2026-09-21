using Bytekontrol.BK_Warez.Core.Common.Warranty;
using Bytekontrol.BK_Warez.Core.Services;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record WarrantyExpiredQuery(string SerialNumber) : IRequest<DeviceWarranty>;

    public sealed class WarrantyExpiredQueryHandler(IWarrantyService warrantyService) : IRequestHandler<WarrantyExpiredQuery, DeviceWarranty>
    {
        public async ValueTask<DeviceWarranty> Handle(WarrantyExpiredQuery request, CancellationToken cancellationToken)
        {
            return await warrantyService.IsWarrantyExpiredAsync(request.SerialNumber, cancellationToken);
        }
    }
}
