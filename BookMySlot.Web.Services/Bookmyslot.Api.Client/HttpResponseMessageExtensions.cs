using BookMySlot.Web.Common.Contracts;
using Marvin.StreamExtensions;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services.Bookmyslot.Api.Client
{
    public static class HttpResponseMessageExtensions
    {
        public static async Task<Response<T>> HandleError<T>(this HttpResponseMessage httpResponseMessage)
        {
            var errorStream = await httpResponseMessage.Content.ReadAsStreamAsync();
            var errors = errorStream.ReadAndDeserializeFromJson<List<string>>();

            if (httpResponseMessage.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return Response<T>.Empty(errors);
            }

            else if (httpResponseMessage.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                return Response<T>.ValidationError(errors);
            }

            return Response<T>.Failed(errors);
        }
    }
}
