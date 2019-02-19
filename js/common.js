$(function(){
  $('h1, h2, table thead th').css('font-weight', '500');
  $('select').selectmenu();

  $('.sub-block:first-child .radio-btn input').on('change', function() {
    $(this).closest('div.radio-btn').parent().children().each(function(i, elem) {
      $(elem).children().children('span').removeClass('radio-checked');
    });
    $(this).next('span').toggleClass('radio-checked', this.checked);
  });

  $('input[name=owner]').on('change', function() {
    var isCheckedFL = $('#fl-input')[0]['checked'];
    if (isCheckedFL) {
      $('#fl-icon').attr('src', 'images/icons/fl-light.png');
      $('#ul-icon').attr('src', 'images/icons/ul-grey.png');
      $('.legal-entity-name, .state-reg-number').css('display', 'none');
      $('.identification-number, .vat-identification-number').css('display', 'none');
      $('.sity-registration>div.title').text('Регистрация собственника автомобиля:');
      $('.drivers .radio-btn input[type=radio]:first-child').parent().css('display', 'block');
      $('#dr-list-radio').parent().css('display', 'block');
      $('.errors').html('');
    } else {
      $('#fl-icon').attr('src', 'images/icons/fl-grey.png');
      $('#ul-icon').attr('src', 'images/icons/ul-light.png');
      $('.legal-entity-name, .state-reg-number').css('display', 'block');
      $('.identification-number, .vat-identification-number').css('display', 'block');
      $('.sity-registration>div.title').text('Регистрация юридического лица:');
      $('#dr-inf-radio').prop('checked', true);
      $('#dr-list-radio').parent().css('display', 'none');
      $('.drivers-list-form, .add-row-block').css('display', 'none');
      $('.drivers-infinity-form, .test-car').css('display', 'block');
      $('.errors').html('');
    }
  });

  $('input[name=vehicle-category]').on('change', function() {
    var isCheckedCatA = $('#cat-a-input')[0]['checked'];
    var isCheckedCatB = $('#cat-b-input')[0]['checked'];
    if (isCheckedCatA) {
      $('#cat-a-icon').attr('src', 'images/icons/cat-a-light.png');
      $('#cat-b-icon').attr('src', 'images/icons/cat-b-grey.png');
      $('#cat-c-icon').attr('src', 'images/icons/cat-c-grey.png');
      $('.engine-power-radio, .has-trailer, .max-weight').css('display', 'none');
    } else if (isCheckedCatB) {
      $('#cat-a-icon').attr('src', 'images/icons/cat-a-grey.png');
      $('#cat-b-icon').attr('src', 'images/icons/cat-b-light.png');
      $('#cat-c-icon').attr('src', 'images/icons/cat-c-grey.png');
      $('.engine-power-radio').css('display', 'block');
      $('.has-trailer, .max-weight').css('display', 'none');
    } else {
      $('#cat-a-icon').attr('src', 'images/icons/cat-a-grey.png');
      $('#cat-b-icon').attr('src', 'images/icons/cat-b-grey.png');
      $('#cat-c-icon').attr('src', 'images/icons/cat-c-light.png');
      $('.has-trailer, .max-weight').css('display', 'block');
      $('.engine-power-radio').css('display', 'none');
    }
  });

  $('input[name=engine-power-radio-text]').on('focus', function() {
    $('#engine-selected-text').prop('checked', true);
    $('#engine-selected-text + span').addClass('radio-checked');
    $('#engine-selected-select + span').removeClass('radio-checked');
  });
  $('.engine-power-radio .ui-selectmenu-button').on('click', function() {
    $('#engine-selected-select').prop('checked', true);
    $('#engine-selected-text + span').removeClass('radio-checked');
    $('#engine-selected-select + span').addClass('radio-checked');
  });

  $('input[name=has-trailer]').on('change', function() {
    var isCheckedYes = $('input[name=has-trailer]')[0]['checked'];
    if (isCheckedYes) {
      $('#trailer-icon').attr('src', 'images/icons/trailer-light.png');
    } else {
      $('#trailer-icon').attr('src', 'images/icons/trailer-grey.png');
    }
  });

  var tableLine2 = '<tr>\
    <td></td>\
    <td>введите ФИО водителя</td>\
    <td>введите дату</td>\
    <td>введите серию и номер</td>\
    <td>введите дату</td>\
    <td></td>\
  </tr>';
  $('.add-row-btn').click(function(e) {
    e.preventDefault();
    tableRows = $('.drivers-list-form tbody tr').length + 1;
    tableRecords = ($('.drivers-list-form tbody tr').length / 2) + 1;
    var tableLine1 = '<tr>\
      <td>' + tableRecords + '</td>\
      <td>\
        <input type="text" class="driver-fio" name="driver-fio[]" placeholder="Шарафутдинов Константин Станиславович">\
      </td>\
      <td>\
        <input type="text" class="driver-birth datepicker" name="driver-birth[]" placeholder="31.12.1975">\
      </td>\
      <td>\
        <input type="text" class="driver-license-series" name="driver-license-series[]" placeholder="77 MB"><input type="text" class="driver-license-number" name="driver-license-number[]" placeholder="000000">\
      </td>\
      <td>\
        <input type="text" class="driver-license-date datepicker" name="driver-license-date[]" placeholder="31.12.2013">\
      </td>\
      <td><button class="remove-row-btn" id="row-' + tableRows + '">\
        <img src="images/icons/remove-btn.png" alt="remove-btn">\
      </button></td>\
    </tr>';
    var tableRow = tableLine1 + tableLine2;

    $('.drivers-list-form tbody').append(tableRow);

    $('.datepicker').datepicker({
      dateFormat: 'dd.mm.yy',
      changeYear: true
    });
  });

  $('.drivers-list-form tbody').delegate('button', 'click', function(e) {
    e.preventDefault();
    if ( $('.drivers-list-form tbody tr').length > 2) {
      var currRow = parseInt((this.id).substring(4));
      var currElem = $('#row-' + currRow).parent().parent().next().remove();
      var currElem = $('#row-' + currRow).parent().parent().remove();

      var rowCount = 1;
      $('.drivers-list-form tbody tr').each(function(i, elem) {
        if (i % 2 == 0) {
          $(this).children().eq(0).text(rowCount);
          var newID = 'row-' + (i + 1);
          rowCount++;
        }
        
      });
    }
  });

  $('input[name=drivers]').on('change', function() {
    var isCheckedList = $('#dr-list-radio').prop('checked');
    if (isCheckedList) {
      $('.drivers-list-form, .add-row-block').css('display', 'block');
      $('.drivers-infinity-form, .test-car').css('display', 'none');
      $('.errors').html('');
    } else {
      $('.drivers-list-form, .add-row-block').css('display', 'none');
      $('.drivers-infinity-form, .test-car').css('display', 'block');
      $('.errors').html('');
    }
  });

  $('.drivers-form').delegate('input.driver-license-series, input.driver-passport-series', 'change paste keyup', function() {
    if ($(this).val().length == 2) {
      $(this).val($(this).val() + " ");
    }
    if ($(this).val().length >= 5) {
      $(this).next('input').focus();
    }
  });

  $(document).delegate('.form1', 'submit', function(e) {
    e.preventDefault();
    var errMsg = '';
    var isCheckedList = $('#dr-list-radio').prop('checked');
    if (isCheckedList) {
      $('.drivers-list-form input.driver-fio').each(function(i, elem) {
        if ($(this).val() === "") {
          errMsg+= '<li>Ошибка! Введите ФИО водителя ' + (i + 1) + '</li>';
        }
      });
      $('.drivers-list-form input.driver-birth').each(function(i, elem) {
        if ($(this).val() === "") {
          errMsg+= '<li>Ошибка! Введите дату рождения водителя ' + (i + 1) + '</li>';
        }
      });
      $('.drivers-list-form input.driver-license-series').each(function(i, elem) {
        if ($(this).val() === "") {
          errMsg+= '<li>Ошибка! Введите серию водительского удостоверения водителя ' + (i + 1) + '</li>';
        }
      });
      $('.drivers-list-form input.driver-license-number').each(function(i, elem) {
        if ($(this).val() === "") {
          errMsg+= '<li>Ошибка! Введите номер водительского удостоверения водителя ' + (i + 1) + '</li>';
        }
      });
      $('.drivers-list-form input.driver-license-date').each(function(i, elem) {
        if ($(this).val() === "") {
          errMsg+= '<li>Ошибка! Введите дату выдачи водительского удостоверения водителя ' + (i + 1) + '</li>';
        }
      });
    } else {
      if ($('.form1 .drivers-infinity-form input.driver-fio').val() === "") {
        errMsg+= '<li>Ошибка! Введите ФИО водителя</li>';
      }
      if ($('.form1 .drivers-infinity-form input.driver-birth').val() === "") {
        errMsg+= '<li>Ошибка! Введите дату рождения водителя</li>';
      }
      if ($('.form1 .drivers-infinity-form input.driver-passport-series').val() === "") {
        errMsg+= '<li>Ошибка! Введите серию паспорта водителя</li>';
      }
      if ($('.form1 .drivers-infinity-form input.driver-passport-series').val() === "") {
        errMsg+= '<li>Ошибка! Введите серию паспорта водителя</li>';
      }
      if ($('.form1 .drivers-infinity-form input.passport-number').val() === "") {
        errMsg+= '<li>Ошибка! Введите номер паспорта водителя</li>';
      }
      if ($('.form1 input[name=test-car-code]').val() === "") {
        errMsg+= '<li>Ошибка! Введите код проверки автомобиля</li>';
      }
    }
    $('.errors').html(errMsg);
  });

  var isRemovedDefSelVal = false;
  $('.insurance-period .ui-selectmenu-button').on('click', function() {
    if (!isRemovedDefSelVal) {
      $(this).parent().children('select').children().first().remove();
      $('#ui-id-4-menu li:first-child').remove();
      isRemovedDefSelVal = true;
    }
    $(this).parent().children('div.radio-btn').each(function(i, elem) {
      $(elem).children().children('span').removeClass('radio-checked');
      $(elem).children().children('input').prop('checked', false);
    });
    $('.insurance-period .ui-selectmenu-button').addClass('select-selected');
  });

  $('.insurance-period input[type=radio]').on('change', function() {
    $('.insurance-period .ui-selectmenu-button').removeClass('select-selected');
  });

  $('.sub-block:first-child .radio-btn input').on('change', function() {
    if ($('.vehicle-brand input[type=radio]:first-child').prop('checked')) {
      $('.vehicle-brand-vis').css('display', 'block');
    } else {
      $('.vehicle-brand-vis').css('display', 'none');
    }
  });


  $('.datepicker').datepicker({
    dateFormat: 'dd.mm.yy',
    changeYear: true
  });
  $('.ui-datepicker-inline').css('display', 'none');

});