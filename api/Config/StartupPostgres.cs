using dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Config;

public static class StartupPostgres
{
    public static void ConfigurePostgres(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<Dbcontext>(builder => builder.UseNpgsql(
            configuration.GetConnectionString("DefaultConnection"),
            x =>
            {
                x.MigrationsHistoryTable(HistoryRepository.DefaultTableName, "Reggit");
                x.MigrationsAssembly("reggit.dal");
                x.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
            }));
    }

    public static void RunMigration<T>(this IServiceProvider services)
    {
        using (IServiceScope scope = services.CreateScope())
        {
            DbContext db = (DbContext)scope.ServiceProvider.GetRequiredService(typeof(T));
            db.Database.Migrate();
        }
    }
}





