using BookMySlot.Web.Common.Contracts.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

namespace BookMySlot.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            Dictionary<string, string> appConfigurations = GetAppConfigurations();
            Injections.HttpFactoryInjections.WebInjections(services, appConfigurations);
            Injections.ProfileSettingsInjections.WebInjections(services);

            services.AddControllers();
        }

        private Dictionary<string, string> GetAppConfigurations()
        {
            Dictionary<string, string> appConfigurations = new Dictionary<string, string>();
            var customerApiUrl = Configuration.GetConnectionString(AppConfigurations.CustomerApiUrl);
            appConfigurations.Add(AppConfigurations.CustomerApiUrl, customerApiUrl);

            return appConfigurations;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.ConfigureGlobalExceptionHandler();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapGet("/", async context =>
            //    {
            //        await context.Response.WriteAsync("Hello World!");
            //    });
            //});
        }
    }
}
