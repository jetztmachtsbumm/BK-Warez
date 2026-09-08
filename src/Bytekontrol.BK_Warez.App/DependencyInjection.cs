using Microsoft.Extensions.DependencyInjection;
using Mediator;
using Bytekontrol.BK_Warez.App.CQRS.Commands;

namespace Bytekontrol.BK_Warez.App
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediator(options =>
            {
                options.ServiceLifetime = ServiceLifetime.Scoped;
            });

            return services;
        }
    }
}
