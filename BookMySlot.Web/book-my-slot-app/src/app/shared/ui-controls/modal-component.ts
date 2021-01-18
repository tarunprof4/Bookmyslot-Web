export class ModalComponent {
  title: string;
  bodyItems: any[] = [];

  private success: string = "Success";
  private failure: string = "Failure";

  getSuccessModalComponent(): ModalComponent {
    let modalComponent = new ModalComponent();
    modalComponent.title = this.success;
    modalComponent.bodyItems = ['Saved Details Successfully'];
    return modalComponent;
  }


  getFailureModalComponent(): ModalComponent {
    let modalComponent = new ModalComponent();
    modalComponent.title = this.failure;
    return modalComponent;
  }


  


}
