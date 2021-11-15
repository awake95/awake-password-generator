class AwakePassGen {
  constructor ( selector ) {
    this.$block = document.querySelector( selector );

    if ( this.$block ) {
      this.$passwordStrength = null;
      this.$dot = null;
      this.$optionCheckboxes = null;
      this.$lengthInput = null;
      this.$lengthVal = 1;
      this.$lengthMax = 50;
      this.$lengthMin = 1;
      this.$rangeWidth = 100;
      this.$dotWidth = 15;
      this.$generatedInput = null;
      this.$generatedPass = null;

      this.$options = {
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      };

      this.#init();
    }
  }

  #init () {
    this.$block.innerHTML = this.getTemplate();
    let _this = this;

    setTimeout( function () {
      _this.$lengthInput = document.querySelector( 'input[data-type="val-number"]' );
      _this.$generatedInput = document.querySelector( 'input[data-type="gen-value"]' );
      _this.$dot = document.querySelector( 'button[data-type="dot"]' );
      _this.$dotRange = document.querySelector( 'div[data-type="dot-range"]' );
      _this.$dotLine = document.querySelector( 'div[data-type="dot-line"]' );
      _this.$optionCheckboxes = document.querySelectorAll( 'div[data-type="options-checkboxes"] input[type="checkbox"]' );

      if ( _this.$dot && _this.$dotRange && _this.$dotLine && _this.$lengthInput && _this.$generatedInput ) {
        _this.$lengthVal = _this.$lengthInput.value;
        _this.$generatedInput.value = _this.generatePassword();
        _this.$lengthMax = +_this.$lengthInput.getAttribute( 'max' ) ?? 50;
        _this.$lengthMin = +_this.$lengthInput.getAttribute( 'min' ) ?? 1;
        _this.$rangeWidth = _this.$dotRange.getBoundingClientRect().width;
        _this.$dotWidth = _this.$dot.getBoundingClientRect().width;

        console.log( _this.$rangeWidth );

      }

      _this.#assign();
    }, 50 );
  }

  #assign () {

    if ( this.$dot && this.$dotRange && this.$lengthInput ) {
      this.inputLengthValueHandler = this.inputLengthValueHandler.bind( this );
      this.onMouseDown = this.onMouseDown.bind( this );
      this.onMouseUp = this.onMouseUp.bind( this );
      this.checkboxOptionsHandler = this.checkboxOptionsHandler.bind( this );

      this.$lengthInput.addEventListener( 'change', this.inputLengthValueHandler );
      this.$dotRange.addEventListener( 'mousedown', this.onMouseDown );
      this.$dotRange.addEventListener( 'mouseup', this.onMouseUp );
      document.addEventListener( 'mouseup', this.onMouseUp );

      this.$optionCheckboxes.forEach( item => item.addEventListener( 'change', this.checkboxOptionsHandler ) );
    }
  }

  shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  generatePassword () {
    let stringLowercase = 'abcdefghijklmnopqrstuvwxyz',
      stringUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numeric = '0123456789',
      symbols = '!@#$%^&*()_+~`|}{[]:\\;?><,./-=';
    
    let lowAndUpCase = this.shuffle((stringLowercase + stringUpperCase).split('')).join(''),
      numericAndLowerCase = this.shuffle((stringLowercase + numeric).split('')).join(''),
      numericAndUpperCase = this.shuffle((stringUpperCase + numeric).split('')).join(''),
      numericAndLowAndUpCase = this.shuffle((lowAndUpCase + numeric).split('')).join(''),

      symbolsAndLowerCase = this.shuffle((stringLowercase + symbols).split('')).join(''),
      symbolsAndUpperCase = this.shuffle((stringUpperCase + symbols).split('')).join(''),
      symbolsAndLowAndUpCase = this.shuffle((lowAndUpCase + symbols).split('')).join(''),

      numericAndSymbols = this.shuffle((symbols + numeric).split('')).join(''),
      numericAndSymbolsAndLowCase = this.shuffle((symbolsAndLowerCase + numeric).split('')).join(''),
      numericAndSymbolsAndUpCase = this.shuffle((symbolsAndUpperCase + numeric).split('')).join(''),

      allChar = this.shuffle((symbolsAndLowerCase + numericAndSymbols).split('')).join(''),

      password = '';

    for ( let i = 0; i < +this.$lengthVal; i++ ) {

      if ( this.$options.uppercase && this.$options.numbers && this.$options.symbols && this.$options.lowercase ) {
        password += allChar.charAt( Math.floor( Math.random() * allChar.length ) );
      } else if ( this.$options.uppercase && !this.$options.lowercase && !this.$options.numbers && !this.$options.symbols ) {
        password += stringUpperCase.charAt( Math.floor( Math.random() * stringUpperCase.length ) );
      } else if ( this.$options.lowercase && !this.$options.uppercase && !this.$options.numbers && !this.$options.symbols ) {
        password += stringLowercase.charAt( Math.floor( Math.random() * stringLowercase.length ) );
      } else if ( this.$options.numbers && !this.$options.uppercase && !this.$options.lowercase && !this.$options.symbols ) {
        password += numeric.charAt( Math.floor( Math.random() * numeric.length ) );
      } else if ( this.$options.symbols && !this.$options.uppercase && !this.$options.lowercase && !this.$options.numbers ) {
        password += symbols.charAt( Math.floor( Math.random() * symbols.length ) );
      } else if ( this.$options.uppercase && this.$options.lowercase && !this.$options.numbers && !this.$options.symbols ) {
        password += lowAndUpCase.charAt( Math.floor( Math.random() * lowAndUpCase.length ) );
      } else if ( this.$options.numbers && this.$options.lowercase && !this.$options.uppercase && !this.$options.symbols ) {
        password += numericAndLowerCase.charAt( Math.floor( Math.random() * numericAndLowerCase.length ) );
      } else if ( this.$options.numbers && this.$options.uppercase && !this.$options.lowercase && !this.$options.symbols ) {
        password += numericAndUpperCase.charAt( Math.floor( Math.random() * numericAndUpperCase.length ) );
      } else if ( this.$options.numbers && this.$options.uppercase && this.$options.lowercase && !this.$options.symbols ) {
        password += numericAndLowAndUpCase.charAt( Math.floor( Math.random() * numericAndLowAndUpCase.length ) );
      } else if ( this.$options.symbols && this.$options.lowercase && !this.$options.numbers && !this.$options.uppercase ) {
        password += symbolsAndLowerCase.charAt( Math.floor( Math.random() * symbolsAndLowerCase.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && !this.$options.numbers && !this.$options.lowercase ) {
        password += symbolsAndUpperCase.charAt( Math.floor( Math.random() * symbolsAndUpperCase.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && this.$options.lowercase && !this.$options.numbers ) {
        password += numericAndSymbols.charAt( Math.floor( Math.random() * numericAndSymbols.length ) );
      } else if ( this.$options.symbols && this.$options.uppercase && this.$options.lowercase && !this.$options.numbers ) {
        password += symbolsAndLowAndUpCase.charAt( Math.floor( Math.random() * symbolsAndLowAndUpCase.length ) );
      } else if ( this.$options.symbols && this.$options.numbers && this.$options.lowercase && !this.$options.uppercase ) {
        password += numericAndSymbolsAndLowCase.charAt( Math.floor( Math.random() * numericAndSymbolsAndLowCase.length ) );
      } else if ( this.$options.symbols && this.$options.numbers && this.$options.uppercase && !this.$options.lowercase ) {
        password += numericAndSymbolsAndUpCase.charAt( Math.floor( Math.random() * numericAndSymbolsAndUpCase.length ) );
      } else {
        password += lowAndUpCase.charAt( Math.floor( Math.random() * lowAndUpCase.length ) );
      }
    }

    return password;
  }

  onMouseDown ( e ) {
    this.onMouseMove = this.onMouseMove.bind( this );
    let bounds = this.$dotRange.getBoundingClientRect().left;
    let clientX = e.clientX - bounds - ( this.$dotWidth / 2 );

    this.$dot.style.transform = 'translateX(' + clientX + 'px)';
    this.$dotLine.style.width = clientX + 2 + 'px';
    this.lengthValueChange( this.$rangeWidth, clientX );
    this.$generatedInput.value = this.generatePassword();

    if ( e.target.closest( 'button[data-type="dot"]' ) ) {
      this.$dot.classList.add( 'active' );
      document.addEventListener( 'mousemove', this.onMouseMove );
    }
  }

  onMouseUp () {
    this.$dot.classList.remove( 'active' );
    document.removeEventListener( 'mousemove', this.onMouseMove );
  }

  inputLengthValueHandler ( e ) {
    this.$lengthVal = +e.target.value;
    let value = Math.floor( ( ( +this.$lengthVal * 100 / +this.$lengthMax ) * +this.$rangeWidth ) / 100 );
    console.log( value );

    if ( ( value + this.$dotWidth ) >= this.$rangeWidth ) {
      this.$dot.style.transform = 'translateX(' + ( value - ( this.$dotWidth / 2 ) ) + 'px)';
      this.$dotLine.style.width = ( this.$rangeWidth - this.$dotWidth / 2 + 2 ) + 'px';
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    this.$dot.style.transform = 'translateX(' + value + 'px)';
    this.$dotLine.style.width = value + 2 + 'px';
    this.$generatedInput.value = this.generatePassword();
  }

  lengthValueChange ( rangeWidth, clientX ) {
    let percent = Math.floor( ( clientX * 100 ) / rangeWidth );
    this.$lengthVal = Math.floor( ( this.$lengthMax * percent ) / 100 );

    if ( this.$lengthVal >= this.$lengthMax ) {
      this.$lengthInput.value = this.$lengthMax;
      return;
    }

    if ( this.$lengthVal <= 0 ) {
      this.$lengthInput.value = this.$lengthMin;
      return;
    }

    this.$lengthInput.value = this.$lengthVal;
  }

  onMouseMove ( e ) {
    let bounds = this.$dotRange.getBoundingClientRect().left;
    let clientX = e.clientX - bounds - ( this.$dotWidth / 2 );

    if ( ( clientX + this.$dotWidth ) >= this.$rangeWidth ) {
      this.$dot.style.transform = 'translateX(' + ( this.$rangeWidth - this.$dotWidth / 2 ) + 'px)';
      this.$dotLine.style.width = this.$rangeWidth + 'px';
      this.lengthValueChange( this.$rangeWidth, clientX );
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    if ( clientX <= 0 ) {
      clientX = 0;
      this.$dot.style.transform = 'translateX(' + ( clientX - ( this.$dotWidth / 2 ) ) + 'px)';
      this.$dotLine.style.width = clientX + 2 + 'px';
      this.lengthValueChange( this.$rangeWidth, clientX );
      this.$generatedInput.value = this.generatePassword();
      return;
    }

    this.$dot.style.transform = 'translateX(' + clientX + 'px)';
    this.$dotLine.style.width = clientX + 2 + 'px';
    this.lengthValueChange( this.$rangeWidth, clientX );
    this.$generatedInput.value = this.generatePassword();
  }

  #checkerCheckboxes ( type, checked ) {
    if ( type ) {
      this.$options[ type ] = checked;
    }
  }

  checkboxOptionsHandler ( e ) {
    const { type } = e.target.dataset;
    let checked = e.target.checked;

    this.#checkerCheckboxes( type, checked );
    this.$generatedInput.value = this.generatePassword();
  }

  getTemplate () {
    return `
      <div class="awpg-wrapper">
        <div class="awpg-content">
          <div class="awpg-header">
              <h2>Generate a secure password</h2>
              <p>Create a secure, random and really uniq password</p>
          </div>        
          <div class="awpg-value">
              <div class="awpg-value__wrap">
                 <input type="text" readonly data-type="gen-value">
                 <div class="awpg-value__buttons">
                    <button class="awpg-value__buttons--copy" data-type="copy"></button>
                    <button class="awpg-value__buttons--rerender" data-type="rerender"></button>
                 </div>
              </div>
              <div class="awpg-value__strength">
                <span class="awpg-value__strength-fill"></span>
              </div>
          </div>
          <div class="awpg-options">
              <div class="awpg-options__value">
                 <input type="number" data-type="val-number" min="1" max="50" value="3">
                 <div class="awpg-range__wrap">
                    <span class="awpg-range__label" aria-label="Password length">Password length:</span>
                     <div class="awpg-range" data-type="dot-range">
                        <div class="awpg-range__line" data-type="dot-line"></div>
                        <button class="awpg-range__dot" data-type="dot"></button>
                      </div>
                 </div>
                
              </div>
              <div class="awpg-options__checkboxes" data-type="options-checkboxes">
                <div class="awpg-options__checkbox">
                    <input id="checkbox_uppercase" type="checkbox" data-type="uppercase" value="yes">
                    <label for="checkbox_uppercase">Uppercase</label> 

                </div>    
                 <div class="awpg-options__checkbox">
                    <input id="checkbox_lowercase" type="checkbox" data-type="lowercase" value="yes">
                    <label for="checkbox_lowercase">Lowercase</label>
                </div>
                 <div class="awpg-options__checkbox">
                    <input id="checkbox_numbers" type="checkbox" data-type="numbers" value="yes">
                    <label for="checkbox_numbers">Numbers</label>
                </div>
                <div class="awpg-options__checkbox">
                    <input id="checkbox_symbols" type="checkbox" data-type="symbols" value="yes">
                    <label for="checkbox_symbols">Symbols</label>
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZVBhc3NHZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXdha2VQYXNzR2VuIHtcbiAgY29uc3RydWN0b3IgKCBzZWxlY3RvciApIHtcbiAgICB0aGlzLiRibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG5cbiAgICBpZiAoIHRoaXMuJGJsb2NrICkge1xuICAgICAgdGhpcy4kcGFzc3dvcmRTdHJlbmd0aCA9IG51bGw7XG4gICAgICB0aGlzLiRkb3QgPSBudWxsO1xuICAgICAgdGhpcy4kb3B0aW9uQ2hlY2tib3hlcyA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRsZW5ndGhWYWwgPSAxO1xuICAgICAgdGhpcy4kbGVuZ3RoTWF4ID0gNTA7XG4gICAgICB0aGlzLiRsZW5ndGhNaW4gPSAxO1xuICAgICAgdGhpcy4kcmFuZ2VXaWR0aCA9IDEwMDtcbiAgICAgIHRoaXMuJGRvdFdpZHRoID0gMTU7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dCA9IG51bGw7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRQYXNzID0gbnVsbDtcblxuICAgICAgdGhpcy4kb3B0aW9ucyA9IHtcbiAgICAgICAgdXBwZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbG93ZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgbnVtYmVyczogZmFsc2UsXG4gICAgICAgIHN5bWJvbHM6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy4jaW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gICNpbml0ICgpIHtcbiAgICB0aGlzLiRibG9jay5pbm5lckhUTUwgPSB0aGlzLmdldFRlbXBsYXRlKCk7XG4gICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLiRsZW5ndGhJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdpbnB1dFtkYXRhLXR5cGU9XCJ2YWwtbnVtYmVyXCJdJyApO1xuICAgICAgX3RoaXMuJGdlbmVyYXRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2lucHV0W2RhdGEtdHlwZT1cImdlbi12YWx1ZVwiXScgKTtcbiAgICAgIF90aGlzLiRkb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnYnV0dG9uW2RhdGEtdHlwZT1cImRvdFwiXScgKTtcbiAgICAgIF90aGlzLiRkb3RSYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdkaXZbZGF0YS10eXBlPVwiZG90LXJhbmdlXCJdJyApO1xuICAgICAgX3RoaXMuJGRvdExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnZGl2W2RhdGEtdHlwZT1cImRvdC1saW5lXCJdJyApO1xuICAgICAgX3RoaXMuJG9wdGlvbkNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnZGl2W2RhdGEtdHlwZT1cIm9wdGlvbnMtY2hlY2tib3hlc1wiXSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nICk7XG5cbiAgICAgIGlmICggX3RoaXMuJGRvdCAmJiBfdGhpcy4kZG90UmFuZ2UgJiYgX3RoaXMuJGRvdExpbmUgJiYgX3RoaXMuJGxlbmd0aElucHV0ICYmIF90aGlzLiRnZW5lcmF0ZWRJbnB1dCApIHtcbiAgICAgICAgX3RoaXMuJGxlbmd0aFZhbCA9IF90aGlzLiRsZW5ndGhJbnB1dC52YWx1ZTtcbiAgICAgICAgX3RoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gX3RoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICAgICAgICBfdGhpcy4kbGVuZ3RoTWF4ID0gK190aGlzLiRsZW5ndGhJbnB1dC5nZXRBdHRyaWJ1dGUoICdtYXgnICkgPz8gNTA7XG4gICAgICAgIF90aGlzLiRsZW5ndGhNaW4gPSArX3RoaXMuJGxlbmd0aElucHV0LmdldEF0dHJpYnV0ZSggJ21pbicgKSA/PyAxO1xuICAgICAgICBfdGhpcy4kcmFuZ2VXaWR0aCA9IF90aGlzLiRkb3RSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgX3RoaXMuJGRvdFdpZHRoID0gX3RoaXMuJGRvdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICBjb25zb2xlLmxvZyggX3RoaXMuJHJhbmdlV2lkdGggKTtcblxuICAgICAgfVxuXG4gICAgICBfdGhpcy4jYXNzaWduKCk7XG4gICAgfSwgNTAgKTtcbiAgfVxuXG4gICNhc3NpZ24gKCkge1xuXG4gICAgaWYgKCB0aGlzLiRkb3QgJiYgdGhpcy4kZG90UmFuZ2UgJiYgdGhpcy4kbGVuZ3RoSW5wdXQgKSB7XG4gICAgICB0aGlzLmlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyID0gdGhpcy5pbnB1dExlbmd0aFZhbHVlSGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLm9uTW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQoIHRoaXMgKTtcbiAgICAgIHRoaXMuY2hlY2tib3hPcHRpb25zSGFuZGxlciA9IHRoaXMuY2hlY2tib3hPcHRpb25zSGFuZGxlci5iaW5kKCB0aGlzICk7XG5cbiAgICAgIHRoaXMuJGxlbmd0aElucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCB0aGlzLmlucHV0TGVuZ3RoVmFsdWVIYW5kbGVyICk7XG4gICAgICB0aGlzLiRkb3RSYW5nZS5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93biApO1xuICAgICAgdGhpcy4kZG90UmFuZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCApO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCApO1xuXG4gICAgICB0aGlzLiRvcHRpb25DaGVja2JveGVzLmZvckVhY2goIGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgdGhpcy5jaGVja2JveE9wdGlvbnNIYW5kbGVyICkgKTtcbiAgICB9XG4gIH1cblxuICBzaHVmZmxlKGFycil7XG4gICAgbGV0IGosIHRlbXA7XG4gICAgZm9yKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pe1xuICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooaSArIDEpKTtcbiAgICAgIHRlbXAgPSBhcnJbal07XG4gICAgICBhcnJbal0gPSBhcnJbaV07XG4gICAgICBhcnJbaV0gPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZ2VuZXJhdGVQYXNzd29yZCAoKSB7XG4gICAgbGV0IHN0cmluZ0xvd2VyY2FzZSA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicsXG4gICAgICBzdHJpbmdVcHBlckNhc2UgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLFxuICAgICAgbnVtZXJpYyA9ICcwMTIzNDU2Nzg5JyxcbiAgICAgIHN5bWJvbHMgPSAnIUAjJCVeJiooKV8rfmB8fXtbXTpcXFxcOz8+PCwuLy09JztcbiAgICBcbiAgICBsZXQgbG93QW5kVXBDYXNlID0gdGhpcy5zaHVmZmxlKChzdHJpbmdMb3dlcmNhc2UgKyBzdHJpbmdVcHBlckNhc2UpLnNwbGl0KCcnKSkuam9pbignJyksXG4gICAgICBudW1lcmljQW5kTG93ZXJDYXNlID0gdGhpcy5zaHVmZmxlKChzdHJpbmdMb3dlcmNhc2UgKyBudW1lcmljKS5zcGxpdCgnJykpLmpvaW4oJycpLFxuICAgICAgbnVtZXJpY0FuZFVwcGVyQ2FzZSA9IHRoaXMuc2h1ZmZsZSgoc3RyaW5nVXBwZXJDYXNlICsgbnVtZXJpYykuc3BsaXQoJycpKS5qb2luKCcnKSxcbiAgICAgIG51bWVyaWNBbmRMb3dBbmRVcENhc2UgPSB0aGlzLnNodWZmbGUoKGxvd0FuZFVwQ2FzZSArIG51bWVyaWMpLnNwbGl0KCcnKSkuam9pbignJyksXG5cbiAgICAgIHN5bWJvbHNBbmRMb3dlckNhc2UgPSB0aGlzLnNodWZmbGUoKHN0cmluZ0xvd2VyY2FzZSArIHN5bWJvbHMpLnNwbGl0KCcnKSkuam9pbignJyksXG4gICAgICBzeW1ib2xzQW5kVXBwZXJDYXNlID0gdGhpcy5zaHVmZmxlKChzdHJpbmdVcHBlckNhc2UgKyBzeW1ib2xzKS5zcGxpdCgnJykpLmpvaW4oJycpLFxuICAgICAgc3ltYm9sc0FuZExvd0FuZFVwQ2FzZSA9IHRoaXMuc2h1ZmZsZSgobG93QW5kVXBDYXNlICsgc3ltYm9scykuc3BsaXQoJycpKS5qb2luKCcnKSxcblxuICAgICAgbnVtZXJpY0FuZFN5bWJvbHMgPSB0aGlzLnNodWZmbGUoKHN5bWJvbHMgKyBudW1lcmljKS5zcGxpdCgnJykpLmpvaW4oJycpLFxuICAgICAgbnVtZXJpY0FuZFN5bWJvbHNBbmRMb3dDYXNlID0gdGhpcy5zaHVmZmxlKChzeW1ib2xzQW5kTG93ZXJDYXNlICsgbnVtZXJpYykuc3BsaXQoJycpKS5qb2luKCcnKSxcbiAgICAgIG51bWVyaWNBbmRTeW1ib2xzQW5kVXBDYXNlID0gdGhpcy5zaHVmZmxlKChzeW1ib2xzQW5kVXBwZXJDYXNlICsgbnVtZXJpYykuc3BsaXQoJycpKS5qb2luKCcnKSxcblxuICAgICAgYWxsQ2hhciA9IHRoaXMuc2h1ZmZsZSgoc3ltYm9sc0FuZExvd2VyQ2FzZSArIG51bWVyaWNBbmRTeW1ib2xzKS5zcGxpdCgnJykpLmpvaW4oJycpLFxuXG4gICAgICBwYXNzd29yZCA9ICcnO1xuXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgK3RoaXMuJGxlbmd0aFZhbDsgaSsrICkge1xuXG4gICAgICBpZiAoIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmIHRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IGFsbENoYXIuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYWxsQ2hhci5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gc3RyaW5nVXBwZXJDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHN0cmluZ1VwcGVyQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gc3RyaW5nTG93ZXJjYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHN0cmluZ0xvd2VyY2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmICF0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbnVtZXJpYy5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgIXRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5udW1iZXJzICkge1xuICAgICAgICBwYXNzd29yZCArPSBzeW1ib2xzLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHN5bWJvbHMubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmIHRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbG93QW5kVXBDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGxvd0FuZFVwQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5udW1iZXJzICYmIHRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5zeW1ib2xzICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljQW5kTG93ZXJDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG51bWVyaWNBbmRMb3dlckNhc2UubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiB0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbnVtZXJpY0FuZFVwcGVyQ2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljQW5kVXBwZXJDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMuc3ltYm9scyApIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbnVtZXJpY0FuZExvd0FuZFVwQ2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljQW5kTG93QW5kVXBDYXNlLmxlbmd0aCApICk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLiRvcHRpb25zLnN5bWJvbHMgJiYgdGhpcy4kb3B0aW9ucy5sb3dlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiAhdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IHN5bWJvbHNBbmRMb3dlckNhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3ltYm9sc0FuZExvd2VyQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5zeW1ib2xzICYmIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgIXRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICkge1xuICAgICAgICBwYXNzd29yZCArPSBzeW1ib2xzQW5kVXBwZXJDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHN5bWJvbHNBbmRVcHBlckNhc2UubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMuc3ltYm9scyAmJiB0aGlzLiRvcHRpb25zLnVwcGVyY2FzZSAmJiB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy5udW1iZXJzICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljQW5kU3ltYm9scy5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljQW5kU3ltYm9scy5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5zeW1ib2xzICYmIHRoaXMuJG9wdGlvbnMudXBwZXJjYXNlICYmIHRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICYmICF0aGlzLiRvcHRpb25zLm51bWJlcnMgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IHN5bWJvbHNBbmRMb3dBbmRVcENhc2UuY2hhckF0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogc3ltYm9sc0FuZExvd0FuZFVwQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy4kb3B0aW9ucy5zeW1ib2xzICYmIHRoaXMuJG9wdGlvbnMubnVtYmVycyAmJiB0aGlzLiRvcHRpb25zLmxvd2VyY2FzZSAmJiAhdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgKSB7XG4gICAgICAgIHBhc3N3b3JkICs9IG51bWVyaWNBbmRTeW1ib2xzQW5kTG93Q2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljQW5kU3ltYm9sc0FuZExvd0Nhc2UubGVuZ3RoICkgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuJG9wdGlvbnMuc3ltYm9scyAmJiB0aGlzLiRvcHRpb25zLm51bWJlcnMgJiYgdGhpcy4kb3B0aW9ucy51cHBlcmNhc2UgJiYgIXRoaXMuJG9wdGlvbnMubG93ZXJjYXNlICkge1xuICAgICAgICBwYXNzd29yZCArPSBudW1lcmljQW5kU3ltYm9sc0FuZFVwQ2FzZS5jaGFyQXQoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBudW1lcmljQW5kU3ltYm9sc0FuZFVwQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFzc3dvcmQgKz0gbG93QW5kVXBDYXNlLmNoYXJBdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGxvd0FuZFVwQ2FzZS5sZW5ndGggKSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXNzd29yZDtcbiAgfVxuXG4gIG9uTW91c2VEb3duICggZSApIHtcbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKCB0aGlzICk7XG4gICAgbGV0IGJvdW5kcyA9IHRoaXMuJGRvdFJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgbGV0IGNsaWVudFggPSBlLmNsaWVudFggLSBib3VuZHMgLSAoIHRoaXMuJGRvdFdpZHRoIC8gMiApO1xuXG4gICAgdGhpcy4kZG90LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBjbGllbnRYICsgJ3B4KSc7XG4gICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9IGNsaWVudFggKyAyICsgJ3B4JztcbiAgICB0aGlzLmxlbmd0aFZhbHVlQ2hhbmdlKCB0aGlzLiRyYW5nZVdpZHRoLCBjbGllbnRYICk7XG4gICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcblxuICAgIGlmICggZS50YXJnZXQuY2xvc2VzdCggJ2J1dHRvbltkYXRhLXR5cGU9XCJkb3RcIl0nICkgKSB7XG4gICAgICB0aGlzLiRkb3QuY2xhc3NMaXN0LmFkZCggJ2FjdGl2ZScgKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlICk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwICgpIHtcbiAgICB0aGlzLiRkb3QuY2xhc3NMaXN0LnJlbW92ZSggJ2FjdGl2ZScgKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSApO1xuICB9XG5cbiAgaW5wdXRMZW5ndGhWYWx1ZUhhbmRsZXIgKCBlICkge1xuICAgIHRoaXMuJGxlbmd0aFZhbCA9ICtlLnRhcmdldC52YWx1ZTtcbiAgICBsZXQgdmFsdWUgPSBNYXRoLmZsb29yKCAoICggK3RoaXMuJGxlbmd0aFZhbCAqIDEwMCAvICt0aGlzLiRsZW5ndGhNYXggKSAqICt0aGlzLiRyYW5nZVdpZHRoICkgLyAxMDAgKTtcbiAgICBjb25zb2xlLmxvZyggdmFsdWUgKTtcblxuICAgIGlmICggKCB2YWx1ZSArIHRoaXMuJGRvdFdpZHRoICkgPj0gdGhpcy4kcmFuZ2VXaWR0aCApIHtcbiAgICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgKCB2YWx1ZSAtICggdGhpcy4kZG90V2lkdGggLyAyICkgKSArICdweCknO1xuICAgICAgdGhpcy4kZG90TGluZS5zdHlsZS53aWR0aCA9ICggdGhpcy4kcmFuZ2VXaWR0aCAtIHRoaXMuJGRvdFdpZHRoIC8gMiArIDIgKSArICdweCc7XG4gICAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgdmFsdWUgKyAncHgpJztcbiAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gdmFsdWUgKyAyICsgJ3B4JztcbiAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICB9XG5cbiAgbGVuZ3RoVmFsdWVDaGFuZ2UgKCByYW5nZVdpZHRoLCBjbGllbnRYICkge1xuICAgIGxldCBwZXJjZW50ID0gTWF0aC5mbG9vciggKCBjbGllbnRYICogMTAwICkgLyByYW5nZVdpZHRoICk7XG4gICAgdGhpcy4kbGVuZ3RoVmFsID0gTWF0aC5mbG9vciggKCB0aGlzLiRsZW5ndGhNYXggKiBwZXJjZW50ICkgLyAxMDAgKTtcblxuICAgIGlmICggdGhpcy4kbGVuZ3RoVmFsID49IHRoaXMuJGxlbmd0aE1heCApIHtcbiAgICAgIHRoaXMuJGxlbmd0aElucHV0LnZhbHVlID0gdGhpcy4kbGVuZ3RoTWF4O1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICggdGhpcy4kbGVuZ3RoVmFsIDw9IDAgKSB7XG4gICAgICB0aGlzLiRsZW5ndGhJbnB1dC52YWx1ZSA9IHRoaXMuJGxlbmd0aE1pbjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiRsZW5ndGhJbnB1dC52YWx1ZSA9IHRoaXMuJGxlbmd0aFZhbDtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlICggZSApIHtcbiAgICBsZXQgYm91bmRzID0gdGhpcy4kZG90UmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBsZXQgY2xpZW50WCA9IGUuY2xpZW50WCAtIGJvdW5kcyAtICggdGhpcy4kZG90V2lkdGggLyAyICk7XG5cbiAgICBpZiAoICggY2xpZW50WCArIHRoaXMuJGRvdFdpZHRoICkgPj0gdGhpcy4kcmFuZ2VXaWR0aCApIHtcbiAgICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgKCB0aGlzLiRyYW5nZVdpZHRoIC0gdGhpcy4kZG90V2lkdGggLyAyICkgKyAncHgpJztcbiAgICAgIHRoaXMuJGRvdExpbmUuc3R5bGUud2lkdGggPSB0aGlzLiRyYW5nZVdpZHRoICsgJ3B4JztcbiAgICAgIHRoaXMubGVuZ3RoVmFsdWVDaGFuZ2UoIHRoaXMuJHJhbmdlV2lkdGgsIGNsaWVudFggKTtcbiAgICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCBjbGllbnRYIDw9IDAgKSB7XG4gICAgICBjbGllbnRYID0gMDtcbiAgICAgIHRoaXMuJGRvdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgKCBjbGllbnRYIC0gKCB0aGlzLiRkb3RXaWR0aCAvIDIgKSApICsgJ3B4KSc7XG4gICAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gY2xpZW50WCArIDIgKyAncHgnO1xuICAgICAgdGhpcy5sZW5ndGhWYWx1ZUNoYW5nZSggdGhpcy4kcmFuZ2VXaWR0aCwgY2xpZW50WCApO1xuICAgICAgdGhpcy4kZ2VuZXJhdGVkSW5wdXQudmFsdWUgPSB0aGlzLmdlbmVyYXRlUGFzc3dvcmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiRkb3Quc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGNsaWVudFggKyAncHgpJztcbiAgICB0aGlzLiRkb3RMaW5lLnN0eWxlLndpZHRoID0gY2xpZW50WCArIDIgKyAncHgnO1xuICAgIHRoaXMubGVuZ3RoVmFsdWVDaGFuZ2UoIHRoaXMuJHJhbmdlV2lkdGgsIGNsaWVudFggKTtcbiAgICB0aGlzLiRnZW5lcmF0ZWRJbnB1dC52YWx1ZSA9IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgpO1xuICB9XG5cbiAgI2NoZWNrZXJDaGVja2JveGVzICggdHlwZSwgY2hlY2tlZCApIHtcbiAgICBpZiAoIHR5cGUgKSB7XG4gICAgICB0aGlzLiRvcHRpb25zWyB0eXBlIF0gPSBjaGVja2VkO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrYm94T3B0aW9uc0hhbmRsZXIgKCBlICkge1xuICAgIGNvbnN0IHsgdHlwZSB9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICBsZXQgY2hlY2tlZCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICB0aGlzLiNjaGVja2VyQ2hlY2tib3hlcyggdHlwZSwgY2hlY2tlZCApO1xuICAgIHRoaXMuJGdlbmVyYXRlZElucHV0LnZhbHVlID0gdGhpcy5nZW5lcmF0ZVBhc3N3b3JkKCk7XG4gIH1cblxuICBnZXRUZW1wbGF0ZSAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLWhlYWRlclwiPlxuICAgICAgICAgICAgICA8aDI+R2VuZXJhdGUgYSBzZWN1cmUgcGFzc3dvcmQ8L2gyPlxuICAgICAgICAgICAgICA8cD5DcmVhdGUgYSBzZWN1cmUsIHJhbmRvbSBhbmQgcmVhbGx5IHVuaXEgcGFzc3dvcmQ8L3A+XG4gICAgICAgICAgPC9kaXY+ICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy12YWx1ZV9fd3JhcFwiPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWFkb25seSBkYXRhLXR5cGU9XCJnZW4tdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctdmFsdWVfX2J1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF3cGctdmFsdWVfX2J1dHRvbnMtLWNvcHlcIiBkYXRhLXR5cGU9XCJjb3B5XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhd3BnLXZhbHVlX19idXR0b25zLS1yZXJlbmRlclwiIGRhdGEtdHlwZT1cInJlcmVuZGVyXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctdmFsdWVfX3N0cmVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhd3BnLXZhbHVlX19zdHJlbmd0aC1maWxsXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX3ZhbHVlXCI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgZGF0YS10eXBlPVwidmFsLW51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCI1MFwiIHZhbHVlPVwiM1wiPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1yYW5nZV9fd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF3cGctcmFuZ2VfX2xhYmVsXCIgYXJpYS1sYWJlbD1cIlBhc3N3b3JkIGxlbmd0aFwiPlBhc3N3b3JkIGxlbmd0aDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1yYW5nZVwiIGRhdGEtdHlwZT1cImRvdC1yYW5nZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctcmFuZ2VfX2xpbmVcIiBkYXRhLXR5cGU9XCJkb3QtbGluZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImF3cGctcmFuZ2VfX2RvdFwiIGRhdGEtdHlwZT1cImRvdFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94ZXNcIiBkYXRhLXR5cGU9XCJvcHRpb25zLWNoZWNrYm94ZXNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zX19jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVja2JveF91cHBlcmNhc2VcIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLXR5cGU9XCJ1cHBlcmNhc2VcIiB2YWx1ZT1cInllc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3hfdXBwZXJjYXNlXCI+VXBwZXJjYXNlPC9sYWJlbD4gXG5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhd3BnLW9wdGlvbnNfX2NoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94X2xvd2VyY2FzZVwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdHlwZT1cImxvd2VyY2FzZVwiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF9sb3dlcmNhc2VcIj5Mb3dlcmNhc2U8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXdwZy1vcHRpb25zX19jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVja2JveF9udW1iZXJzXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YS10eXBlPVwibnVtYmVyc1wiIHZhbHVlPVwieWVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveF9udW1iZXJzXCI+TnVtYmVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF3cGctb3B0aW9uc19fY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2tib3hfc3ltYm9sc1wiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdHlwZT1cInN5bWJvbHNcIiB2YWx1ZT1cInllc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3hfc3ltYm9sc1wiPlN5bWJvbHM8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG4iXSwiZmlsZSI6ImF3YWtlUGFzc0dlbi5qcyJ9
