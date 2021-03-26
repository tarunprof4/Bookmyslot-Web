import { Injectable } from '@angular/core';
import { FileConstants } from '../shared/constants/file-constants';


@Injectable({
  providedIn: 'root'
})


export class FileService {

  



  constructor() { }

  IsImageSizeValid(file: File): boolean {
    var fileSize = file.size;
    if (fileSize > FileConstants.ImageMaxSizeInMB) {
      return false;
    }
    return true;
  }


  IsImageValid(file: File): boolean {
    let isImageValid = FileConstants.ImageAllowedFormats.includes(file.type);
    return isImageValid;
  }


}
