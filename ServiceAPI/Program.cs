using Microsoft.AspNetCore.Hosting;

namespace ServiceAPI
{
    class Program
    {
        static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel() //Integrated WebServer
                .UseStartup<Startup>() //Services and request pipeline configuration
                .Build();
            host.Run();
        }
    }
}
