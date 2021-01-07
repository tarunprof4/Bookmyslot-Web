import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpStatusConstants } from "./constants/http-status-constants";

export class ResolverError {
  errors: string[] = new Array();
  statusCode: number;


   handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    resolverError.statusCode = error.status;
    console.log(error);


    if (resolverError.statusCode == HttpStatusConstants.NotFound) {
      resolverError.errors.push("No records found");
    }

    else if (resolverError.statusCode == HttpStatusConstants.BadRequest) {
      resolverError.errors = error.error;
    }

    else if (resolverError.statusCode == HttpStatusConstants.InternalServerError) {
      resolverError.errors.push("Some issue with service please try later");
    }


    else if (resolverError.statusCode == HttpStatusConstants.GatewayTimeOut) {
      resolverError.errors.push("Some issue with service please try later");
    }

    return throwError(resolverError);
  }
}
