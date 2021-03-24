import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from '../services/file.service';
import { FileTypeConstants } from '../shared/constants/file-type-constants';
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

  selectedFile: File;
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  constructor(private fileService: FileService, private modalService: BsModalService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.up);
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      return this.upload();
    }
  }


  private upload() {
    const fd = new FormData();
    fd.append(FileTypeConstants.Image, this.selectedFile, this.selectedFile.name);

    this.fileService.updateProfilePicture(fd)
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
