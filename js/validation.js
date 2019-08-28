const MIN_LENGTH = 1;
const MAX_LENGTH = 255;

let validationFields = []; 
const validation={
    init: function(arr){
        validationFields=arr;
        this.generate();
    },
    generate: function(){
        for (const field of validationFields) {
            const fieldElement = this.getElement(field.selector);
            fieldElement.onfocus=function(){
                this.classList.remove('error');
            }
            const that = this;
            fieldElement.onblur = function() {
                that.checkFieldError(field);
            }
            const messageWrap = document.createElement('p');
            messageWrap.className = 'input-message';
            const message = this.getMessage(field);
            const messageNode = document.createTextNode(message);
            messageWrap.appendChild(messageNode);
            fieldElement.parentElement.appendChild(messageWrap);

        }
    },
    getElement: function(selector) {
        const element = document.querySelector(selector);
        return element;
    },
    checkAllError: function() {
        let isError = false; 
        for (const field of validationFields) {
          this.checkFieldError(field) && (isError = true);
        }
        return isError;
      },
    checkFieldError: function(field) {
        const fieldElement = this.getElement(field.selector);
        const valid = this[field.type](fieldElement.value, field.min, field.max);
        console.log(valid);
        if (!valid) {
          fieldElement.classList.add('error');
          return true;
        }
        fieldElement.classList.remove('error');
        return false;
    },
    noError: function() {
        const haveError = this.checkAllError();
        return !haveError;
      },
    text: function (value, min = MIN_LENGTH, max = MAX_LENGTH) {
        const length = value.length;
        return length >= min && length <= max;
    },
    number: function(value, min = MIN_LENGTH, max = MAX_LENGTH) {
        const isNumber = !!value && !isNaN(value);
        const length = value.length;
        return isNumber && length >= min && length <= max;
    },
    email: function(value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    getMessage: function(field) {
        let message = 'Enter your ' + field.name; 
        if (field.type === 'number') {
          message += ', numbers only';
        }
        if (field.min) {
          message += ', minimum ' + field.min + ' charactors';
        }
        if (field.max) {
          message += ', maximum ' + field.max + ' charactors';
        }
        return message;
    }
}