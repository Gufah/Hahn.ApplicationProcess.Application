import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class BootstrapFormRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // add the is-invalid bootstrap class to the enclosing form-group div
    formGroup.classList.add('is-invalid');

    // add class invalid-feedback to a new div
    const feed = document.createElement('div');
    feed.className = 'invalid-feedback';
    feed.id = 'validation-feedback';
    formGroup.appendChild(feed);

    // add help-block
    const message = document.createElement('span');
    message.className = 'help-block validation-message';
    message.textContent = result.message;
    message.id = `validation-message-${result.id}`;
    feed.appendChild(message);
  }

  remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    // remove help-block
    const message = formGroup.querySelector(`#validation-feedback`);
    if (message) {
      formGroup.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
        formGroup.classList.remove('has-error');
      }
    }
  }
}
