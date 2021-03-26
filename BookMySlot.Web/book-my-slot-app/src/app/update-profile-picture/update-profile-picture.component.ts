import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from '../services/customer.service';
import { FileService } from '../services/file.service';
import { FileConstants } from '../shared/constants/file-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';

@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.css']
})
export class UpdateProfilePictureComponent implements OnInit {

  uploadedFile: File;
  uploadedFileUrl = '';

  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();
  allowedImageFormats = FileConstants.ImageAllowedFormats;
  

  constructor(private customerService: CustomerService, private fileService: FileService, private modalService: BsModalService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.UpdateProfilePicture);
  }


  onFileSelected(event) {

    if (event.target.files && event.target.files[0]) {
      let file = <File>event.target.files[0];

      if (!this.fileService.IsImageValid(file)) {
        return;
      }
      this.uploadedFile = file;
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (event) => { 
        this.uploadedFileUrl = event.target.result as string;
      }
    }
  
  }


  onUpload() {
    if (!this.uploadedFile) {
      return;
    }

    let file = new FormData();
    file.append(FileConstants.Image, this.uploadedFile);

    this.customerService.updateProfilePicture(file)
      .subscribe(
        (data: boolean) => {
          let successModalComponent = this.modalComponent.getSuccessModalComponent();
          this.bsModalRef = this.modalService.show(ModalSuccessComponent);
          this.bsModalRef.content.title = successModalComponent.title;
          this.bsModalRef.content.bodyItems = successModalComponent.bodyItems;
          window.location.reload(true);
        },
        (err: any) => {
          let failureModalComponent = this.modalComponent.getFailureModalComponent();
          this.bsModalRef = this.modalService.show(ModalFailureComponent);
          this.bsModalRef.content.title = failureModalComponent.title;
          this.bsModalRef.content.bodyItems = err.errors;
        }
      );


  }

  
}
