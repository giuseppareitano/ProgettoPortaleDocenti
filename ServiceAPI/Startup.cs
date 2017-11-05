using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ServiceAPI
{
    public class Startup
    {
        /* This method is called before the "Configure" method by the web host
         * and is used to add services to the services container 
         * that will be available to the application via dependency injection.*/
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        /* This method is used to specify how the application will respond to HTTP requests. */
        public void Configure(IApplicationBuilder app)
        {
            //This method adds the ASP.NET’s routing middleware
            app.UseMvcWithDefaultRoute();
        }
    }
}