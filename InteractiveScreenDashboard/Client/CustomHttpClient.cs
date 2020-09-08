using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Json;

namespace InteractiveScreenDashboard.Client
{
    public class CustomHttpClient
    {
        private readonly HttpClient _client;

        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private string _guidy;

        public CustomHttpClient(HttpClient client)
        {
            _client = client;
            _guidy = Guid.NewGuid().ToString();
            _client.DefaultRequestHeaders.Add("StartupHeader", Guid.NewGuid().ToString());
        }


        public Task<HttpResponseMessage> Login(Authenticate user)
        {
            //var userObj = new StringContent(System.Text.Json.JsonSerializer.Serialize(user, _jsonSerializerOptions), Encoding.UTF8, "application/json");
            return _client.PostAsJsonAsync($"v1/signin{_guidy}", user);
        }




    }
}
