using BookMySlot.Web.Common.Contracts.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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


            services.AddOpenApiDocument(config =>
            {
                config.PostProcess = document =>
                {
                    document.Info.Version = "v1";
                    document.Info.Title = "Bookmyslot";
                    document.Info.Description = "Bookmyslot";
                    document.Info.TermsOfService = "None";
                    document.Info.Contact = new NSwag.OpenApiContact
                    {
                        Name = "Tarun Aggarwal",
                        Email = string.Empty,
                        //Url = "https://twitter.com/spboyer"
                    };
                    document.Info.License = new NSwag.OpenApiLicense
                    {
                        //Name = "Use under LICX",
                        //Url = "https://example.com/license"
                    };
                };
            });


            services.AddMvc()
        .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
        .ConfigureApiBehaviorOptions(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var problems = new BadRequestExceptionHandler(context);
                return new BadRequestObjectResult(problems.ErrorMessages);
            };
        });


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

            app.UseOpenApi();
            app.UseSwaggerUi3();


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
