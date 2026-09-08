using Bytekontrol.BK_Warez.Core.Common.DTOs;
using Bytekontrol.BK_Warez.Core.Repositories;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Commands
{
    public sealed record UpdateDeviceCommand(int Id, DeviceDTO Device) : IRequest<bool>;

    public sealed class UpdateDeviceCommandHandler(IDeviceRepository repository) : IRequestHandler<UpdateDeviceCommand, bool>
    {
        public async ValueTask<bool> Handle(UpdateDeviceCommand request, CancellationToken cancellationToken)
        {
            return await repository.UpdateDeviceAsync(request.Id, request.Device, cancellationToken);
        }
    }
}
