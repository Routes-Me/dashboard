using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Client
{
    public class CustomHttpClient
    {
        private readonly HttpClient _client;
        private string _guidy;

        public CustomHttpClient(HttpClient client)
        {
            _client = client;
            _guidy = Guid.NewGuid().ToString();
            _client.DefaultRequestHeaders.Add("StartupHeader", Guid.NewGuid().ToString());
        }


        public Task<string> Login()
        {
            return _client.GetStringAsync($"v1/signin{Guid.NewGuid()}");
        }


    }
}
