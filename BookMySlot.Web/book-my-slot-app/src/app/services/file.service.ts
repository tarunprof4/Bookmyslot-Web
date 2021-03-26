import { Injectable } from '@angular/core';
import { FileConstants } from '../shared/constants/file-constants';


@Injectable({
  providedIn: 'root'
})


export class FileService {

  constructor() { }

  private isImageSizeValid(file: File): boolean {
    var fileSize = file.size;
    if (fileSize > FileConstants.ImageMaxSizeInMB) {
      return false;
    }
    return true;
  }


  private isImageFormatValid(file: File): boolean {
    let isImageValid = FileConstants.ImageAllowedFormats.includes(file.type);
    return isImageValid;
  }

  IsImageValid(file: File): boolean {
    return this.isImageFormatValid(file) && this.isImageSizeValid(file);
  }
}
