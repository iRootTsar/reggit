using dal.repositories;

namespace api.Config;

public static class StartupInjection
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<VisitorRepository>();
    }
}