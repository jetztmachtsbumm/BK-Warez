using Bytekontrol.BK_Warez.Core.Repositories;
using Bytekontrol.BK_Warez.Infrastructure.Persistence;
using Bytekontrol.BK_Warez.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bytekontrol.BK_Warez.Infrastructure
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(opt =>
            {
                var connectionString = configuration.GetConnectionString("WarezDb");
                opt.UseNpgsql(connectionString);
            });

            services.AddScoped<IDeviceRepository, DeviceRepository>();

            return services;
        }

    }
}
