using Microsoft.AspNetCore.Cors;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
        });

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors();
        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
