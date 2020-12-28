﻿using System.Collections.Generic;

namespace BookMySlot.Web.Common.Contracts
{
    public class Response<T>
    {
        public T Result { get; set; }
        public ResultType ResultType { get; set; }
        public List<string> Messages { get; set; }

        public Response()
        {
            this.ResultType = ResultType.Success;
        }


        public bool HasResult
        {
            get
            {
                return this.Result != null;
            }
        }

        public static Response<T> Success(T result)
        {
            var response = new Response<T> { ResultType = ResultType.Success, Result = result };

            return response;
        }

        public static Response<T> Empty(List<string> errorMessage)
        {
            var response = new Response<T> { ResultType = ResultType.Empty, Messages = errorMessage };

            return response;
        }


        public static Response<T> Failed(List<string> errorMessages)
        {
            var response = new Response<T> { ResultType = ResultType.Error, Messages = errorMessages };

            return response;
        }

        public static Response<T> ValidationError(List<string> validationMessage)
        {
            var response = new Response<T>
            {
                ResultType = ResultType.ValidationError,
                Messages = validationMessage,
            };

            return response;
        }

    }
}
