using Bytekontrol.BK_Warez.App.CQRS.Commands;
using Bytekontrol.BK_Warez.App.CQRS.Queries;
using Bytekontrol.BK_Warez.Core.Common.DTOs;
using Bytekontrol.BK_Warez.Core.Common.Paging;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace Bytekontrol.BK_Warez.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController(ISender sender) : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetAllDevices([FromQuery] PageRequest pageRequest)
        {
            var query = new GetAllDevicesPagedQuery(pageRequest);
            return Ok(await sender.Send(query));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById([FromRoute] GetDeviceByIdQuery query)
        {
            return Ok(await sender.Send(query));
        }

        [HttpGet("nextId")]
        public async Task<IActionResult> GetNextAvailableId()
        {
            return Ok(await sender.Send(new GetNextAvailableIdQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> AddDevice(AddDeviceCommand command)
        {
            return Ok(await sender.Send(command));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDevice(UpdateDeviceCommand command)
        {
            return Ok(await sender.Send(command));
        }

    }
}
