using Bytekontrol.BK_Warez.Core.Services;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record WarrantyExpiredQuery(string SerialNumber) : IRequest<bool>;

    public sealed class WarrantyExpiredQueryHandler(IWarrantyService warrantyService) : IRequestHandler<WarrantyExpiredQuery, bool>
    {
        public async ValueTask<bool> Handle(WarrantyExpiredQuery request, CancellationToken cancellationToken)
        {
            return await warrantyService.IsWarrantyExpiredAsync(request.SerialNumber, cancellationToken);
        }
    }
}
