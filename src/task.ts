import { DialogService } from 'aurelia-dialog';
import { autoinject, bindable } from 'aurelia-framework';
import {ValidationController, ValidationControllerFactory, ValidationMessages} from 'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer';
import {ResetPrompt} from './reset-prompt';


@autoinject
export class Task {
  public heading = 'Task for Hahn Software';

  @bindable
  public asset = {
    assetName: "",
    department: "",
    emailOfDepartment: "",
    purchaseDate: ""
  }

  dialogService: DialogService;
  

  public reset(target){
    this.dialogService.open({ viewModel: ResetPrompt, model: 'Good or Bad?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.asset.assetName = "";
        this.asset.department = "";
        this.asset.emailOfDepartment = "";
        this.asset.purchaseDate = "";
        target.setAttribute('disabled', 'true');
      }
    });
  }
}
