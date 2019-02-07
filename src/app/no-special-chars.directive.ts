import { Directive } from '@angular/core';

// Agregar un validador personalizado a una forma basada en plantillas es un poco más complicado que en una forma reactiva. Se trata de crear una costumbre Directive. Abra un indicador de comando o terminal y apúntelo en la advanced_angularcarpeta de su proyecto. A continuación, escriba el comando ng generate directive no-special-chars. Deberías ver el siguiente resultado:
// A continuación tenemos que importar los Validator, FormControly NG_VALIDATORSobjetos de @angular/forms. El NG_VALIDATORSobjeto contiene todas las directivas de validación, y esta directiva se registrará con él para que se pueda utilizar en un formulario.

import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNoSpecialChars]',
  // A continuación, debajo del selectoratributo en el @Directivedecorador tenemos que seguir adelante y agregar una providersentrada, que registrará la directiva con el NG_VALIDATORSobjeto.
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpecialCharsDirective, multi: true}]
})
export class NoSpecialCharsDirective {
  // Ahora necesitamos implementar la Validatorinterfaz en nuestro NoSpecialCharsDirective.
  constructor() { }

  // Una función `validate` dentro de un` Validator` se ejecuta después de la validación del formulario, y devolverá un objeto del tipo `ValidationErrors`, que contendrá` null` para una respuesta válida o un mensaje que indique que la entrada no es válida.
  validate(c: FormControl): ValidationErrors {
    const hasSpecialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(c.value);
    const message = {
      'hasSpecialChars': {
        'message': 'No Special Characters Allowed'
      }
    };
    return hasSpecialChars ? message : null;
  }

}
