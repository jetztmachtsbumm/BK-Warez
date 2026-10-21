using Bytekontrol.BK_Warez.Core.Common.Warranty;
using Bytekontrol.BK_Warez.Core.Services;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record WarrantyExpiredQuery(string Manufacturer, string SerialNumber) : IRequest<DeviceWarranty?>;

    public sealed class WarrantyExpiredQueryHandler(IWarrantyServiceResolver warrantyServiceResolver) : IRequestHandler<WarrantyExpiredQuery, DeviceWarranty?>
    {
        public async ValueTask<DeviceWarranty?> Handle(WarrantyExpiredQuery request, CancellationToken cancellationToken)
        {
            var service = warrantyServiceResolver.Resolve(request.Manufacturer);

            if(service is null)
            {
                return null;
            }

            return await service.IsWarrantyExpiredAsync(request.SerialNumber, cancellationToken);
        }
    }
}
